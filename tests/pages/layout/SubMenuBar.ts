import { Locator, Page } from '@playwright/test';

export class SubMenuBar {
  readonly container: Locator;

  constructor(private readonly page: Page) {
    this.container = page.locator('.oxd-topbar-body-nav');
  }

  async clickSubMenuItem(mainTab: string, subItem?: string) {
    const mainTabLocator = this.container.getByText(mainTab)
    await mainTabLocator.waitFor({ state: 'visible' });

    if (subItem) {
      await mainTabLocator.click();
      const subItemLocator = this.page.getByRole('menuitem', { name: subItem });
      await subItemLocator.waitFor({ state: 'visible' });
      await subItemLocator.click();
    } else {
      await mainTabLocator.click();
    }
  }

  async getActiveTab(): Promise<string | null> {
    const active = this.container.locator('.--active');
    if (await active.isVisible()) {
      return (await active.textContent())?.trim() ?? null;
    }
    return null;
  }

  async hasSubMenu(): Promise<boolean> {
    return await this.container.isVisible();
  }
}