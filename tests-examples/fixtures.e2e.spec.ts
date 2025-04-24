// import { expect, test } from './fixtures';
// import { LoginPage } from './pages/LoginPage';
// import { MyInfoPage } from './pages/MyInfoPage';

// test.describe('E2E Test Suite', () => {
//   test.beforeEach(async ({ multiUser}) => {
//   })
//   test('e2e checklink', async ({ multiUser   }) => {
//     await multiUser.initUser('admin');	
//     const adminPages = multiUser.getPageManager('admin')
//     await adminPages.loginPage.goto();
//     await adminPages.loginPage.loginScreenshot();
//     await adminPages.loginPage.login('TinaNguyen', 'Admin@1234');
//     await adminPages.dashboardPage.isLoaded();
//     await adminPages.dashboardPage.dashboardScreenshot();
//     await adminPages.dashboardPage.validateContentLinks();
    
//   });

//   test('e2e login, list user, add user, logout', async ({ multiUser   }) => {
//     await multiUser.initUser('admin');	
//     const adminPages = multiUser.getPageManager('admin')
//     await adminPages.loginPage.goto();
//     await adminPages.loginPage.login('TinaNguyen', 'Admin@1234');
//     await adminPages.dashboardPage.isLoaded();
//     await adminPages.dashboardPage.goToMenu('Admin');
//     await adminPages.userListPage.isLoaded();
//     await adminPages.userListPage.userListScreenshot();
//     await expect(adminPages.userListPage.addButton).toHaveScreenshot('addButton.png');
//     await adminPages.userListPage.addButton.click();
//     await adminPages.userAddPage.isLoaded();
//     await adminPages.userAddPage.userAddScreenshot();
//     await adminPages.userAddPage.verifyDropdown('User Role', ['Select', 'Admin', 'ESS']);
//     await adminPages.userAddPage.verifyDropdown('Status', ['Select', 'Enabled', 'Disabled']);
//     await adminPages.userAddPage.selectDropdown('User Role', 'ESS');
//     await adminPages.userAddPage.selectDropdown('User Role', 'Select');
//     await adminPages.userAddPage.getRequiredFieldErrorMessage('User Role').isVisible();
//     await adminPages.userAddPage.selectDropdown('User Role', 'ESS');
//     await adminPages.userAddPage.selectDropdown('Status', 'Disabled');
//     await adminPages.userAddPage.selectDropdown('Status', 'Select');
//     await adminPages.userAddPage.getRequiredFieldErrorMessage('Status').isVisible();
//     await adminPages.userAddPage.selectDropdown('Status', 'Enabled');
//     await adminPages.userAddPage.selectEmployeeName('tinasss');
//     await adminPages.getPage().waitForTimeout(3000);
//     await adminPages.getPage().pause();
//     await adminPages.userAddPage.username.fill('tinaNguyen1');
//     await adminPages.userAddPage.password.fill('Admin@1234');
//     await adminPages.userAddPage.confirmPassword.fill('Admin@1234');
//     await adminPages.userAddPage.saveButton.click();
//   });

//   test('Explore all tabs in MyInfoPage using MCP', async ({ multiUser }) => {
//     await multiUser.initUser('admin');
//     const adminPages = multiUser.getPageManager('admin');

//     // Navigate to login page
//     await adminPages.loginPage.goto();

//     // Perform login
//     await adminPages.loginPage.login('TinaNguyen', 'Admin@1234');

//     // Wait for MyInfoPage to load
//     await adminPages.dashboardPage.isLoaded();
//     await adminPages.dashboardPage.goToMenu('My Info');

//     // Explore all tabs and capture their structure
//     //await adminPages.myInfoPage.navigateAndCaptureTabs();
//   });

//   test('Navigate MyInfo tabs via MCP', async ({ multiUser }) => {
//     await multiUser.initUser('admin');
//     const adminPages = multiUser.getPageManager('admin');

//     // Navigate to login page
//     await adminPages.loginPage.goto();

//     // Perform login
//     await adminPages.loginPage.login('TinaNguyen', 'Admin@1234');

//     // Wait for DashboardPage to load
//     await adminPages.dashboardPage.isLoaded();

//     // Navigate to My Info section
//     await adminPages.dashboardPage.goToMenu('My Info');

//     //Iterate through each tab in My Info
//     const tabs = await adminPages.myInfoPage.tabs.locator('a').all();
//     for (const tab of tabs) {
//       const tabName = await tab.textContent();
//       console.log(`Navigating to tab: ${tabName?.trim()}`);
//       await tab.click();
//       await adminPages.getPage().waitForLoadState('networkidle');

//       // Log elements in the current tab
//       const elements = await adminPages.myInfoPage.container.locator('*').allTextContents();
//       console.log(`Elements in ${tabName?.trim()}:`, elements);
//     }
//   });
// });
