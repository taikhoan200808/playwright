import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://buianthai.online/orangehrm/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Army1');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@1234');

  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).first().click();

// check Placeholder
await expect(page.locator("//*[text() = 'Employee Name']/parent::*//following-sibling::*//input")).toHaveAttribute('placeholder', 'Type for hints...');

    
  //--------check Status button search--------
  // Locate the button
  const button = page.getByRole('button', { name: 'Search' });
  // Check if the button is enabled
  const isEnabled = await button.isEnabled();
  console.log(`Button is enabled: ${isEnabled}`);
  // Check if the button is disabled
  const isDisabled = await button.isDisabled();
  console.log(`Button is disabled: ${isDisabled}`);
  // Verify the button's state with an assertion
  expect(isEnabled).toBe(true); // Or use false to check if disabled


  await page.getByRole('textbox', { name: 'Type for hints...' }).first().fill('Au');

  // verify option of dropdown
  await page.locator('form i').first().click();
  await expect(page.locator('form')).toContainText('-- Select --');
  await expect(page.locator('form')).toContainText('Disable');
  await expect(page.locator('form')).toContainText('ds');
  await expect(page.locator('form')).toContainText('Enable');





  await page.getByRole('option', { name: '-- Select --' }).click();

    // Search
    await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByRole('cell', { name: '008686', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Au Middle' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Rora', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '0088889' })).toBeVisible();


   // Close the browser
   await page.close();
});