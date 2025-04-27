import path from 'path';

import { expect, test } from './fixtures';
import { Locator, Page } from '@playwright/test';
import { validateLinksFromLocator } from './utils/CheckLinks'; 


test.describe('E2E Test User access PIM', () => {
  test.beforeEach(async ({ page}) => {
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
    await pages.dashboardPage.goToMenu('PIM');
    // const userListPage = new UserListPage(page);

    
    await pages.employeeListPage.isLoaded();

   // Gọi hàm kiểm tra từ file CheckLinks.ts
  await validateLinksFromLocator(pageLocator, page);
  console.log('Page employeeListPage: All links have been validated successfully!');

    await pages.employeeListPage.selectEmployeeName('Monika  Army');
   
    const employeeId = '0013';
    await pages.employeeListPage.employeeId.fill(employeeId);
    await pages.employeeListPage.selectDropdown('Employment Status', '-- Select --');
  
    await pages.employeeListPage.selectDropdown('Include', 'Current and Past Employees');
    await pages.employeeListPage.verifyDropdown('Include', ['Current Employees Only', 'Current and Past Employees', 'Past Employees Only']);
    
    
    await pages.employeeListPage.searchButton.click();

    await pages.employeeListPage.employeeTableRows.first().waitFor({ state: 'visible' });
    await pages.employeeListPage.clickEditButtonFor(employeeId);

    await page.close();
    
  })
})