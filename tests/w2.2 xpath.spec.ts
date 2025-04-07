import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://buianthai.online/orangehrm/web/index.php/auth/login');
  // await page.getByRole('textbox', { name: 'Username' }).fill('Army1');

  await page.locator('input[placeholder="Username"]').fill('Army1');
  await page.locator('input[placeholder="Password"]').fill('Admin@1234');

 
  //await page.locator('button[type="submit"]').click();

  await page.locator('//button[normalize-space()="Login"]').click();
  

  await page.locator('//span[@class="oxd-text oxd-text--span oxd-main-menu-item--name"][normalize-space()="PIM"]').click();

  
  // Input Employee Name
  await page.locator('//div[@class="oxd-grid-4 orangehrm-full-width-grid"]//div[1]//div[1]//div[2]//div[1]//div[1]//input[1]').click();
  

  // check Placeholder Employee Name
  await expect(page.locator("//*[text() = 'Employee Name']/parent::*//following-sibling::*//input")).toHaveAttribute('placeholder', 'Type for hints...');

    
  //--------check Status button search--------
  // Locate the button
  const button = page.locator("//button[normalize-space()='Search']");
  // Check if the button is enabled
  const isEnabled = await button.isEnabled();
  console.log(`Button is enabled: ${isEnabled}`);
  // Check if the button is disabled
  const isDisabled = await button.isDisabled();
  console.log(`Button is disabled: ${isDisabled}`);
  // Verify the button's state with an assertion
  expect(isEnabled).toBe(true); // Or use false to check if disabled


  


  await page.locator("//*[text() = 'Employee Name']/parent::*//following-sibling::*//input").first().fill('Au');

  // verify option of dropdown
  await page.locator('//div[@class="oxd-select-text oxd-select-text--active"]//div[@class="oxd-select-text-input"][normalize-space()="-- Select --"]').first().click();
  await expect(page.locator('form')).toContainText('-- Select --');
  await expect(page.locator('form')).toContainText('Disable');
  await expect(page.locator('form')).toContainText('ds');
  await expect(page.locator('form')).toContainText('Enable');

  await page.getByRole('option', { name: '-- Select --' }).click();

  // Search
  await page.locator("//button[normalize-space()='Search']").click();

  // Verify First (& Middle) Name OF employee ID  008686
  await expect(page.locator('(//div[text() = "008686"]/parent::*//following-sibling::div//div)[1]')).toHaveText('Au Middle');


   // Close the browser
   await page.close();
});