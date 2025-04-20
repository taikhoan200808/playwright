import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// export class EmployeeAddPage extends BasePage {

//   constructor(page: Page) {
//     super(page);

//     }


export class EmployeeAddPage extends BasePage {
  // Khai báo Locator cho trường "Firstname"
  readonly firstNameField: Locator;

  constructor(page: Page) {
    super(page);

    // Định nghĩa XPath cho trường "Firstname"
    this.firstNameField = page.locator('//input[@name="firstName"]'); 
    // Thay đổi XPath dựa trên DOM của bạn
  }

  // Thêm phương thức để tương tác với trường "Firstname"
  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameField.fill(firstName); // Nhập giá trị vào trường "Firstname"
  }

  async verifyFirstNameError(expectedError: string): Promise<void> {
    // const errorLocator = this.page.locator('//input[@id="firstName"]/following-sibling::span[contains(@class, "error-message")]');
    
    const errorLocator = this.page.locator("//*[text() = 'Employee Full Name']/parent::*//following-sibling::*//span");
   
    await expect(errorLocator).toBeVisible(); // Kiểm tra mã lỗi hiển thị
    const actualError = await errorLocator.textContent();
    expect(actualError?.trim()).toBe(expectedError); // So sánh nội dung lỗi
  }

  get headingAddUser() {
    return this.container.getByRole('heading', { name: 'Add Employee' })
  }


  get firstName(){
    return this.container.getByText('Employee Full Name')
      .locator('..').locator('..').locator('..')
      .getByRole('textbox').first();
  }

  get firstName1(){
    return this.container.getByText('Employee Full Name')
      .locator('..').locator('..').locator('..')
      .getByRole('textbox',{name:'firstName'});
  }

  get middletName(){
    return this.container.getByText('Employee Full Name')
      .locator('..').locator('..').locator('..')
      .getByRole('textbox').nth(1);
  }

  get lastName(){
    return this.container.getByText('Employee Full Name')
      .locator('..').locator('..').locator('..')
      .getByRole('textbox').nth(2);
  }
 





  getRequiredFieldErrorMessage(labelText: string): Locator {
    return this.container.getByText(labelText)
      .locator('..').locator('..').locator('..')
      .getByText('Required')
      .first();
  }

  getRequiredFieldErrorMessage30(labelText: string): Locator {
    return this.container.getByText(labelText)
      .locator('..').locator('..').locator('..')
      .getByText('Should not exceed 30 characterszzz')
      .first();
  }

  getRequiredFieldErrorMessage1(labelText: string): Locator {
    return this.container.getByText(labelText)
      .locator('..').locator('..').locator('..')
      .getByText('Required')
      .first();
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