import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeeAddPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get headingAddUser() {
    return this.container.getByRole('heading', { name: 'Add Employee' })
  }


  get firstName(){
    return this.container.getByText('Employee Full Name')
      .locator('..').locator('..').locator('..')
      .getByRole('textbox').first();
  }

  get lastName(){
    return this.container.getByText('Employee Full Name')
      .locator('..').locator('..').locator('..')
      .getByRole('textbox').nth(1);
  }

 

  get saveButton() {
    return this.container.getByRole('button', { name: 'Save' });
  }
  
  async checkStatusButtonsave() {
    // Check if the search button is enabled
    const isEnabled = await this.saveButton.isEnabled();
    console.log(`Button is enabled: ${isEnabled}`);
  
    // Check if the search button is disabled
    const isDisabled = await this.saveButton.isDisabled();
    console.log(`Button is disabled: ${isDisabled}`);
  
    // Verify the button's state using an assertion
    // You can customize the expected state here
    expect(isEnabled).toBe(true); // Change to `false` if testing for a disabled state
  }

  async isLoaded() {
    await this.page.waitForLoadState('load');
    await this.verifyModuleTitle('PIM');
    // await this.verifyPageTitle('/ User Management');
  }
  
}