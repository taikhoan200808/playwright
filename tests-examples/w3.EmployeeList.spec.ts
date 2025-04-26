import { expect, test } from '@playwright/test';
import { LoginPage } from '../tests/pages/LoginPage';
import { DashboardPage } from '../tests/pages/DashboardPage';
import { UserListPage } from '../tests/pages/UserListPage';
import { EmployeeListPage } from '../tests/pages/EmployeeListPage';
import { UserAddPage } from '../tests/pages/UserAddPage';

test.describe('E2E Test User access PIM', () => {
  test.beforeEach(async ({ page}) => {
  })
  test('Verify Employee list page', async ({ page }) => {
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
   
    await employeeListPage.employeeId.fill('0013');
    await employeeListPage.selectDropdown('Employment Status', '-- Select --');
  
    await employeeListPage.selectDropdown('Include', 'Current and Past Employees');
    await employeeListPage.verifyDropdown('Include', ['Current Employees Only', 'Current and Past Employees', 'Past Employees Only']);
    
    
    await employeeListPage.searchButton.click();

    await employeeListPage.employeeTableRows.first().waitFor({ state: 'visible' });
    await employeeListPage.clickEditButtonFor('0013');

    await page.close();
    
  })
})