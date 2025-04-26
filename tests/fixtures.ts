import { test as baseTest } from '@playwright/test';
import { PageManager } from './utils/PageManager';
import { MultiUserManager } from './utils/MultiUserManager';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UserListPage } from './pages/UserListPage';
import { UserAddPage } from './pages/UserAddPage';
import { EmployeeAddPage } from './pages/EmployeeAddPage';
import { EmployeeListPage } from './pages/EmployeeListPage';
import { Utilities } from './utils/Utilities';


export type PageFixtures = {
  pages: PageManager;
  multiUser: MultiUserManager;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  userListPage: UserListPage;
  userAddPage: UserAddPage;
  employeeAddPage: EmployeeAddPage;
  employeeListPage: EmployeeListPage;
  utilities: Utilities;
};

export const test = baseTest.extend<PageFixtures>({
  pages: async ({ page }, use) => {
    const manager = new PageManager(page);
    await use(manager);
  },
  multiUser: async ({ context }, use) => {
    const multi = new MultiUserManager(context);
    await use(multi);
  },
  loginPage: async ({ pages }, use) => {
    await use(pages.loginPage);
  },
  dashboardPage: async ({ pages }, use) => {
    await use(pages.dashboardPage);
  },

  userListPage: async ({ pages }, use) => {
    await use(pages.userListPage);
  },
  userAddPage: async ({ pages }, use) => {
    await use(pages.userAddPage);
  },


  employeeAddPage: async ({ pages }, use) => {
    await use(pages.employeeAddPage);
  },
  employeeListPage: async ({ pages }, use) => {
    await use(pages.employeeListPage);
  },
  utilities: async ({ pages }, use) => {
    await use(pages.utilities);
  }

});

export { expect } from '@playwright/test';