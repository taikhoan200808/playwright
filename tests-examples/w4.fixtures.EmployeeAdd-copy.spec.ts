import path from 'path';

import { expect, test } from '../tests/fixtures';
import { Locator, Page } from '@playwright/test';
import { validateLinksFromLocator } from '../tests/utils/CheckLinks'; 


test.describe('E2E Test User access PIM', () => {
  test.beforeEach(async ({ pages}) => {
  })
  test('Verify Employee list page', async ({ pages, page }) => {

    await pages.loginPage.goto();
    
    // Xác định khu vực chứa liên kết (ví dụ: kiểm tra toàn bộ trang)
  const pageLocator = page.locator('body');
  // Gọi hàm kiểm tra từ file CheckLinks.ts
  await validateLinksFromLocator(pageLocator, page);
  console.log('Page login: All links have been validated successfully!');

    await pages.loginPage.login('Army1', 'Admin@1234');
    await pages.dashboardPage.isLoaded();

  // Gọi hàm kiểm tra từ file CheckLinks.ts
  await validateLinksFromLocator(pageLocator, page);
  console.log('Page dashboardPage: All links have been validated successfully!');

    await pages.dashboardPage.goToMenu('PIM');
    await pages.employeeListPage.isLoaded();

      // Gọi hàm kiểm tra từ file CheckLinks.ts
  await validateLinksFromLocator(pageLocator, page);
  console.log('Page employeeListPage: All links have been validated successfully!');


    await pages.employeeListPage.addButton.click();
    await pages.employeeAddPage.isLoaded();

      // Gọi hàm kiểm tra từ file CheckLinks.ts
  await validateLinksFromLocator(pageLocator, page);
  console.log('Page employeeAddPage: All links have been validated successfully!');


    await pages.employeeAddPage.checkStatusButtonsave();
    await pages.employeeAddPage.verifyPageTitle('Add Employee');


    await pages.employeeAddPage.enterFirstName('111111111111111111111111111111111111111111');
    await pages.employeeAddPage.verifyFieldError(pages.employeeAddPage.firstNameError,'Should not exceed 30 characters');

    await pages.employeeAddPage.enterFirstName(' ');
    await pages.employeeAddPage.verifyFieldError(pages.employeeAddPage.firstNameError,'Required')

    
    await pages.employeeAddPage.middletName.fill('22222222222222222222222222222222');
    await pages.employeeAddPage.verifyFieldError(pages.employeeAddPage.middleNameError,'Should not exceed 30 characters');

    await pages.employeeAddPage.lastName.fill(' ');
    await pages.employeeAddPage.verifyFieldError(pages.employeeAddPage.lastNameError,'Required')
    
    
      // Upoad anh 
    await page.locator('input[type="file"]').setInputFiles(path.join('./Data', '1.png'));


    await pages.employeeAddPage.enterFirstName('Monika');
    await pages.employeeAddPage.middletName.fill('Army');
    await pages.employeeAddPage.lastNameField.fill('214');

    // Random EMPLOYEE ID
    const fillEmployeeID = await pages.utilities.getRandomNumber(500, 1000);
    console.log('Random Employee ID:', fillEmployeeID.toString()); // In ra ID ngẫu nhiên

  
    await pages.employeeAddPage.employeeID.fill(fillEmployeeID.toString());
    
    await pages.employeeAddPage.saveButton.click();

 // Chờ heading với vai trò 'heading' và tên 'Personal Details' hiển thị
 const headingLocator = page.getByRole('heading', { name: 'Personal Details' });
 await headingLocator.waitFor({ state: 'visible', timeout: 12000 });
 // Kiểm tra tiêu đề hiển thị và có đúng nội dung không
 await expect(headingLocator).toHaveText('Personal Details');
 // Tiếp tục thao tác sau khi heading đã xuất hiện
 console.log('Heading Personal Details is visible and validated.');

    await page.getByRole('link', { name: 'Employee List' }).click();
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill(fillEmployeeID.toString());
    await page.getByRole('button', { name: 'Search' }).click();
    
    //delete employee
    await pages.utilities.clickDeleteInableButtonFor(fillEmployeeID.toString());

    await page.getByRole('button', { name: ' Yes, Delete' }).click();


 


    await page.close();
    
  })
})

