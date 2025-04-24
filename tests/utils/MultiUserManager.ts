import { BrowserContext } from '@playwright/test';
import { PageManager } from './PageManager';

export class MultiUserManager {
  private pageManagers = new Map<string, PageManager>();

  constructor(private context: BrowserContext) {}

  async initUser(userId: string): Promise<void> {
    if (!this.pageManagers.has(userId)) {
      const page = await this.context.newPage();
      this.pageManagers.set(userId, new PageManager(page));
    }
  }

  getPageManager(userId: string): PageManager {
    const manager = this.pageManagers.get(userId);
    if (!manager) throw new Error(`User '${userId}' is not initialized.`);
    return manager;
  }
}