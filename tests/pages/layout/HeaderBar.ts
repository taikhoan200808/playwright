import { Locator, Page } from '@playwright/test';

export class HeaderBar {
  readonly container: Locator;
  constructor(private readonly page: Page) {
    this.container = page.locator('header.oxd-topbar');
  }

  private get userDropdown(): Locator {
    return this.container.locator('.oxd-userdropdown-name');
  }

  private get logoutOption(): Locator {
    return this.container.locator('.oxd-userdropdown-link', { hasText: 'Logout' });
  }

  async verifyModuleTitle(title: string) {
    await this.container.getByRole('heading', { name: title }).isVisible();
  }

  async verifyPageTitle(title: string) {
    await this.container.getByRole('heading', { name: title }).isVisible();
  }

  async openUserDropdown() {
    await this.userDropdown.click();
  }

  async logout() {
    await this.openUserDropdown();
    await this.logoutOption.click();
  }

  async getUsername(): Promise<string> {
    const name = await this.userDropdown.textContent();
    return name?.trim() ?? '';
  }
}