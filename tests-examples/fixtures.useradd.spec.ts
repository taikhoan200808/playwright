// import { expect, test } from './fixtures';

// test.describe('E2E Test Suite', () => {
//   test.beforeEach(async ({ pages}) => {
//   })
//   test('Verify user can login', async ({ pages }) => {
//     await pages.loginPage.goto();
//     await pages.loginPage.login('TinaNguyen', 'Admin@1234');
//     await pages.dashboardPage.isLoaded();
//     await expect(pages.dashboardPage.getWidgetByName('My Actions')).toHaveScreenshot('myActions.png');
//     await expect(pages.dashboardPage.getWidgetByName('Quick Launch')).toHaveScreenshot('quickLaunch.png');
//     await pages.dashboardPage.goToMenu('Admin');
//     await pages.userListPage.isLoaded();
//     await pages.userListPage.addButton.click();
//     await pages.userAddPage.isLoaded();
//     await pages.userAddPage.verifyDropdown('User Role', ['Select', 'Admin', 'ESS']);
//     await pages.userAddPage.verifyDropdown('Status', ['Select', 'Enabled', 'Disabled']);
//     await pages.userAddPage.selectDropdown('User Role', 'ESS');
//     await pages.userAddPage.selectDropdown('User Role', 'Select');
//     await pages.userAddPage.getRequiredFieldErrorMessage('User Role').isVisible();
//     await pages.userAddPage.selectDropdown('User Role', 'ESS');
//     await pages.userAddPage.selectDropdown('Status', 'Disabled');
//     await pages.userAddPage.selectDropdown('Status', 'Select');
//     await pages.userAddPage.getRequiredFieldErrorMessage('Status').isVisible();
//     await pages.userAddPage.selectDropdown('Status', 'Enabled');
//     await pages.userAddPage.selectEmployeeName('tina');
//     await pages.userAddPage.username.fill('tinaNguyen1');
//     await pages.userAddPage.password.fill('Admin@1234');
//     await pages.userAddPage.confirmPassword.fill('Admin@1234');
//     await pages.userAddPage.saveButton.click();
//   })
// })