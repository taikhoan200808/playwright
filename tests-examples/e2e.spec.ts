import { test } from '@playwright/test';
import { LoginPage } from '../tests/pages/LoginPage';
import { DashboardPage } from '../tests/pages/DashboardPage';
import { UserListPage } from '../tests/pages/UserListPage';
import { UserAddPage } from '../tests/pages/UserAddPage';

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
    await userListPage.addButton.click();
    const userAddPage = new UserAddPage(page);
    await userAddPage.isLoaded();
    await userAddPage.verifyDropdown('User Role', ['Select', 'Admin', 'ESS']);
    await userAddPage.verifyDropdown('Status', ['Select', 'Enabled', 'Disabled']);
    await userAddPage.selectDropdown('User Role', 'ESS');
    await userAddPage.selectDropdown('User Role', 'Select');
    await userAddPage.getRequiredFieldErrorMessage('User Role').isVisible();
    await userAddPage.selectDropdown('User Role', 'ESS');
    await userAddPage.selectDropdown('Status', 'Disabled');
    await userAddPage.selectDropdown('Status', 'Select');
    await userAddPage.getRequiredFieldErrorMessage('Status').isVisible();
    await userAddPage.selectDropdown('Status', 'Enabled');
    await userAddPage.selectEmployeeName('tina');
    await userAddPage.username.fill('tinaNguyen1');
    await userAddPage.password.fill('Admin@1234');
    await userAddPage.confirmPassword.fill('Admin@1234');
    await userAddPage.saveButton.click();})

})  