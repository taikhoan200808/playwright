import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UserListPage } from './pages/UserListPage';
import { EmployeeListPage } from './pages/EmployeeListPage';
import { EmployeeAddPage } from './pages/EmployeeAddPage';
import path from 'path';

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
    await employeeListPage.addButton.click();


    const employeeAddPage = new EmployeeAddPage(page);
    await employeeAddPage.isLoaded();
    await employeeAddPage.checkStatusButtonsave();
    await employeeAddPage.verifyPageTitle('Add Employee');


    await employeeAddPage.enterFirstName('111111111111111111111111111111111111111111');
    await employeeAddPage.verifyFirstNameError('Should not exceed 30 characters');

    await employeeAddPage.enterFirstName(' ');
    await employeeAddPage.verifyFirstNameError('Required');

    
    await employeeAddPage.middletName.fill('Army');
    await employeeAddPage.lastName.fill('01');
    
    
      // Upoad anh
    await page.locator('input[type="file"]').setInputFiles(path.join('./Data', '1.png'));
    
    // await employeeAddPage.saveButton.click();

    // await page.close();
    
  })
})