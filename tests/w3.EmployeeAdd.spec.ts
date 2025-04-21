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
    // await employeeAddPage.verifyFieldError('');
    await employeeAddPage.verifyFieldError(employeeAddPage.firstNameError,'Should not exceed 30 characters');

    await employeeAddPage.enterFirstName(' ');
    await employeeAddPage.verifyFieldError(employeeAddPage.firstNameError,'Required')

    
    await employeeAddPage.middletName.fill('22222222222222222222222222222222');
    await employeeAddPage.verifyFieldError(employeeAddPage.middleNameError,'Should not exceed 30 characters');

    await employeeAddPage.lastName.fill(' ');
    await employeeAddPage.verifyFieldError(employeeAddPage.lastNameError,'Required')
    
    
      // Upoad anh
    await page.locator('input[type="file"]').setInputFiles(path.join('./Data', '1.png'));


    await employeeAddPage.enterFirstName('Monika');
    await employeeAddPage.middletName.fill('Army');
    await employeeAddPage.lastNameField.fill('214');
    const fillEmployeeID = '250421';
    await employeeAddPage.employeeID.fill(fillEmployeeID);
    
    await employeeAddPage.saveButton.click();

 // Chờ heading với vai trò 'heading' và tên 'Personal Details' hiển thị
 const headingLocator = page.getByRole('heading', { name: 'Personal Details' });
 await headingLocator.waitFor({ state: 'visible', timeout: 12000 });
 // Kiểm tra tiêu đề hiển thị và có đúng nội dung không
 await expect(headingLocator).toHaveText('Personal Details');
 // Tiếp tục thao tác sau khi heading đã xuất hiện
 console.log('Heading Personal Details is visible and validated.');

    await page.getByRole('link', { name: 'Employee List' }).click();
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill(fillEmployeeID);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: ' Yes, Delete' }).click();


    // await employeeListPage.searchButton.click();

    // await employeeListPage.employeeTableRows.first().waitFor({ state: 'visible' });
    // await employeeListPage.clickEditButtonFor(fillEmployeeID);


    await page.close();
    
  })
})