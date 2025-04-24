import { test, expect } from '@playwright/test';
import path from 'path';

test('test', async ({ page }) => {
  await page.goto('https://buianthai.online/orangehrm/web/index.php/auth/login');

  await page.getByRole('textbox', { name: 'Username' }).fill('Army1');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  // await page.getByRole('button', { name: '' }).click();
  // await page.locator('input[type="file"]').setInputFiles('Army.png');

  // Select one file
await page.locator('input[type="file"]').setInputFiles(path.join('./Data', '1.png'));
// await page.getByLabel('Upload file').setInputFiles(path.join(__dirname, 'myfile.pdf'));

});