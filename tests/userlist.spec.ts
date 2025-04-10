import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UserListPage } from './pages/UserListPage';
import { UserAddPage } from './pages/UserAddPage';

test.describe('E2E Test Suite', () => {
  test.beforeEach(async ({ page}) => {
  })
  test('Verify user can login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('TinaNguyen', 'Admin@1234');
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.isLoaded();
    await dashboardPage.goToMenu('Admin');
    const userListPage = new UserListPage(page);
    await userListPage.isLoaded();
    await userListPage.username.fill('admin1');
    await userListPage.selectEmployeeName('tina');
    await userListPage.verifyDropdown('User Role', ['Select', 'Admin', 'ESS']);
    await userListPage.verifyDropdown('Status', ['Select', 'Enabled', 'Disabled']);
    await userListPage.selectDropdown('User Role', 'Admin');
    await userListPage.selectDropdown('Status', 'Enabled');
    await userListPage.searchButton.click();
    await userListPage.userTableRows.first().waitFor({ state: 'visible' });
    await userListPage.clickEditButtonFor('admin1');
  })
})