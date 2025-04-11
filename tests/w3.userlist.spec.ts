import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UserListPage } from './pages/UserListPage';
import { EmployeeListPage } from './pages/EmployeeListPage';
import { UserAddPage } from './pages/UserAddPage';

test.describe('E2E Test Suite', () => {
  test.beforeEach(async ({ page}) => {
  })
  test('Verify user can login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Army1', 'Admin@1234');
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.isLoaded();
    await dashboardPage.goToMenu('PIM');
    // const userListPage = new UserListPage(page);

    const employeeListPage = new EmployeeListPage(page);

    
    await employeeListPage.isLoaded();

    await employeeListPage.selectEmployeeName('Monika  Army');
    // sai --- await employeeListPage.verifyDropdown('Employment Status', ['Select', 'Enabled', 'ds']);
    
    // Pass  --- await employeeListPage.selectDropdown('Employment Status', '-- Select --');
    await employeeListPage.selectDropdown('Include', 'Current and Past Employees');
    
    // await employeeListPage.selectDropdown('Status', 'Enabled');
    await employeeListPage.searchButton.click();
    // await employeeListPage.userTableRows.first().waitFor({ state: 'visible' });
    // await employeeListPage.clickEditButtonFor('admin1');
  })
})