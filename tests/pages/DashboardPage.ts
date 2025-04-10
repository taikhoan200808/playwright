import { BasePage } from './BasePage';
import { Page,expect, Locator } from '@playwright/test';

export class DashboardPage extends BasePage {
    constructor(page: Page) {
      super(page);
    }
  
    async isLoaded() {
      await this.headerbar.verifyModuleTitle('Dashboard');
      await this.container.waitFor({ state: 'visible' });
    }
  
    async verifyLayoutForDashboard() {
      await this.verifyLayoutHasSubMenu(false);
      await this.container.waitFor({ state: 'visible' });
    }

    async showWelcomeUser(user: string) {
      expect(await this.headerbar.getUsername()).toBe('tina Nguyen');    }
  }