# OrangeHRM E2E Test Automation Framework

## 📘 Project Overview

This project automates end-to-end testing for the **OrangeHRM** application, a human resource management system. The test suite uses **Playwright** for browser automation and **TypeScript** for type safety. The **Page Object Model (POM)** is implemented to encapsulate the UI structure and interactions, making tests more readable, maintainable, and reusable.

### 🔑 Key Features

- **Page Object Model (POM):** Each page/component has a corresponding class that encapsulates its locators and actions.
- **Modular Design:** Reusable layout components (sidebar, header) and page-specific classes (Dashboard, User List) are cleanly separated.
- **TypeScript:** Ensures type safety and developer-friendly tooling.
- **Playwright:** Fast and reliable browser automation for end-to-end testing.

---

## 🧱 Page Object Model (POM) Structure

The POM is structured into three main layers:
- **BasePage**
- **Layout Components**
- **Page Classes**

---

### 📄 BasePage (`BasePage.ts`)

#### 🧭 Purpose:
Parent class for all page classes. Provides shared functionality and access to common UI elements.

#### 🔧 Properties:
- `page`: Playwright's Page object
- `sidebar`: Instance of `SidebarMenu`
- `headerbar`: Instance of `HeaderBar`
- `submenu`: Instance of `SubMenuBar`
- `container`: Locator for main content area (`.oxd-layout-context`)

#### 🔨 Methods:
- `verifyModuleTitle(title: string)`
- `verifyPageTitle(title: string)`
- `verifyLayoutHasSubMenu(hasSubMenu: boolean)`

---

### 🧩 Layout Components

#### 🪟 SidebarMenu (`SidebarMenu.ts`)
Represents: `aside.oxd-sidepanel`

```ts
import { Page, Locator } from '@playwright/test';

export class SidebarMenu {
  readonly container: Locator;

  constructor(page: Page) {
    this.container = page.locator('aside.oxd-sidepanel');
  }

  async waitForSidebar() {
    await this.container.waitFor({ state: 'visible' });
  }

  async clickMenuItem(name: string) {
    const item = this.container.getByText(name, { exact: true });
    await item.waitFor({ state: 'visible' });
    await item.click();
  }

  getMenuItem(name: string): Locator {
    return this.container.getByText(name, { exact: true });
  }
}
```

#### 📌 HeaderBar (`HeaderBar.ts`)
Represents: `header.oxd-topbar`

```ts
Methods:
- verifyModuleTitle(title: string)
- getUsername()
```

#### 🧭 SubMenuBar (`SubMenuBar.ts`)
Represents: `.oxd-topbar-body-nav`

```ts
Methods:
- clickSubMenuItem()
- hasSubMenu()
```

---

### 📄 Page Classes

#### 📊 DashboardPage (`DashboardPage.ts`)
- Inherits from `BasePage`
- Uses `container` to interact with `.oxd-layout-context`

#### 👤 UserListPage (`UserListPage.ts`)
Represents: Admin > User Management > System Users

```ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class UserListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get addButton() {
    return this.container.getByRole('button', { name: 'Add' });
  }

  get usernameInput() {
    return this.container
      .locator('div')
      .filter({ hasText: /^Username$/ })
      .nth(1)
      .getByRole('textbox');
  }

  async isLoaded() {
    await this.page.waitForLoadState('load');
    await this.container.waitFor({ state: 'visible' });
    await this.addButton.waitFor({ state: 'visible' });
    await this.verifyModuleTitle('Admin');
    await this.verifyPageTitle('/ User Management');
  }

  async searchByUsername(username: string) {
    await this.usernameInput.fill(username);
    await this.container.getByRole('button', { name: 'Search' }).click();
    await this.page.waitForLoadState('load');
  }
}
```

---

## 🛠 How to Implement POM

### ✅ Step 1: Define Layout Components
Create classes like `SidebarMenu`, `HeaderBar`, and `SubMenuBar` in layout folder.

### ✅ Step 2: Create BasePage

```ts
import { Page, Locator } from '@playwright/test';
import { SidebarMenu } from './layout/SidebarMenu';
import { HeaderBar } from './layout/HeaderBar';
import { SubMenuBar } from './layout/SubMenuBar';

export class BasePage {
  readonly page: Page;
  readonly sidebar: SidebarMenu;
  readonly headerbar: HeaderBar;
  readonly submenu: SubMenuBar;
  readonly container: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new SidebarMenu(page);
    this.headerbar = new HeaderBar(page);
    this.submenu = new SubMenuBar(page);
    this.container = page.locator('.oxd-layout-context');
  }

  async verifyModuleTitle(title: string) {
    await this.headerbar.verifyModuleTitle(title);
  }

  async verifyPageTitle(title: string) {
    await this.submenu.verifyPageTitle(title);
  }

  async verifyLayoutHasSubMenu(hasSubMenu: boolean) {
    if (hasSubMenu) {
      await this.submenu.waitForSubMenu();
    } else {
      await this.submenu.verifyNoSubMenu();
    }
  }
}
```

### ✅ Step 3: Create Page Classes
Each page should extend `BasePage`.

---

## 🧪 Writing Tests Using POM

### Example Test: `user-list.spec.ts`

```ts
import { test, expect } from '@playwright/test';
import { UserListPage } from '../pages/UserListPage';

test('should search for a user by username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const userListPage = new UserListPage(page);

    await loginPage.goto();
    await loginPage.login('TinaNguyen', 'Admin@1234');
    await dashboardPage.isLoaded();
    await dashboardPage.showWelcomeUser('tina Nguyen');
    await dashboardPage.goToMenu('Admin');
    await userListPage.isLoaded();
    await dashboardPage.clickSubMenuItem('User Management', 'Users');
    await userListPage.isLoaded();
    await userListPage.searchByUsername('admin1');
    await userListPage.logout();
    await userListPage.verifyUserInTable('admin1', 'Admin', 'tina Nguyen', 'Enabled');  
});
```

---

## 🧼 Best Practices

- ✅ Scope all locators to `this.container`
- ✅ Use descriptive method names
- ✅ Use `waitFor()` or `waitForLoadState()` before actions
- ✅ Keep locators inside page classes
- ✅ Handle dynamic content
- ✅ Override `container` if needed for custom layout pages

```ts
export class SpecialPage extends BasePage {
  readonly container: Locator;
  constructor(page: Page) {
    super(page);
    this.container = page.locator('.custom-layout-class');
  }
}
```

---

## 🚀 Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npx playwright test
```

### Run Tests in UI Mode
```bash
npx playwright test --ui
```

### Generate a Test Report
```bash
npx playwright show-report
```

---

## ➕ Extending the Framework

### Add a New Page: `AddUserPage.ts`

```ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddUserPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get saveButton() {
    return this.container.getByRole('button', { name: 'Save' });
  }

  async fillUserDetails(username: string) {
    await this.container.locator('input[placeholder="Type here"]').fill(username);
  }
}
```

### Use in Test
```ts
import { test } from '@playwright/test';
import { AddUserPage } from '../pages/AddUserPage';

test('should add a new user', async ({ page }) => {
  const addUserPage = new AddUserPage(page);
  await page.goto('/admin/addSystemUser');
  await addUserPage.fillUserDetails('newuser');
  await addUserPage.saveButton.click();
});
```

---

## 🛠 Troubleshooting

### Locator Not Found?
- Inspect with browser dev tools.
- Use codegen to identify selectors:
```bash
npx playwright codegen <url>
```

### Test Timeout?
- Ensure elements are visible before interacting:
```ts
await this.container.waitFor({ state: 'visible' });
```

### Dynamic Content?
- Add waits after triggering changes:
```ts
await this.page.waitForLoadState('load');
```

---

This `README.md` provides a complete guide for understanding, using, and extending the Playwright-based POM testing framework for OrangeHRM. Add this file to your project root to help onboard new contributors and maintain clarity.
