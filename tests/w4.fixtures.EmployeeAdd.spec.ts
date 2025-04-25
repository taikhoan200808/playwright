import path from 'path';
import { expect, test } from './fixtures';

//25/4
//khac bai tuan 3 page => pages
test.describe('E2E Test User access PIM', () => {
  test.beforeEach(async ({ pages}) => {
  })
  test('Verify Employee list page', async ({ pages, page }) => {

    await pages.loginPage.goto();
    await pages.loginPage.login('Army1', 'Admin@1234');
 
    await pages.dashboardPage.isLoaded();
    await pages.dashboardPage.goToMenu('PIM');
    
    await pages.employeeListPage.isLoaded();
    await pages.employeeListPage.addButton.click();


    
    await pages.employeeAddPage.isLoaded();
    await pages.employeeAddPage.checkStatusButtonsave();
    await pages.employeeAddPage.verifyPageTitle('Add Employee');


    await pages.employeeAddPage.enterFirstName('111111111111111111111111111111111111111111');
    // await employeeAddPage.verifyFieldError('');
    await pages.employeeAddPage.verifyFieldError(pages.employeeAddPage.firstNameError,'Should not exceed 30 characters');

    await pages.employeeAddPage.enterFirstName(' ');
    await pages.employeeAddPage.verifyFieldError(pages.employeeAddPage.firstNameError,'Required')

    
    await pages.employeeAddPage.middletName.fill('22222222222222222222222222222222');
    await pages.employeeAddPage.verifyFieldError(pages.employeeAddPage.middleNameError,'Should not exceed 30 characters');

    await pages.employeeAddPage.lastName.fill(' ');
    await pages.employeeAddPage.verifyFieldError(pages.employeeAddPage.lastNameError,'Required')
    
    
      // Upoad anh ( dang sai page va pages)
    await page.locator('input[type="file"]').setInputFiles(path.join('./Data', '1.png'));


    await pages.employeeAddPage.enterFirstName('Monika');
    await pages.employeeAddPage.middletName.fill('Army');
    await pages.employeeAddPage.lastNameField.fill('214');
    const fillEmployeeID = '250421';
    await pages.employeeAddPage.employeeID.fill(fillEmployeeID);
    
    // await pages.employeeAddPage.saveButton.click();

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