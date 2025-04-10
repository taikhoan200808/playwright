import { Locator, Page } from '@playwright/test';

export class SidebarMenu {
  readonly container: Locator;

  constructor(private readonly page: Page) {
    this.container = page.locator('aside.oxd-sidepanel');
  }

  /**
   * Click a menu item by visible text inside the sidebar.
   */
  async clickMenuItem(name: string) {
    const item = this.container.getByText(name, { exact: true });
    await item.waitFor({ state: 'visible' });
    await item.click();
  }

  /**
   * Return the Locator for a menu item by name.
   */
  getMenuItem(name: string): Locator {
    return this.container.getByText(name, { exact: true });
  }

  /**
   * Wait for sidebar to be visible.
   */
  async waitForSidebar() {
    await this.container.waitFor({ state: 'visible' });
  }
}