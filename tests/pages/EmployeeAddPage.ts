import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeeAddPage extends BasePage {
  // Khai báo Locator cho trường "Firstname"
  readonly firstNameField: Locator;
  readonly firstNameError: Locator;

  readonly middleNameField: Locator;
  readonly middleNameError: Locator;

  readonly lastNameField: Locator;
  readonly lastNameError: Locator;

  readonly employeeID: Locator;
  readonly employeeIDError: Locator;

  constructor(page: Page) {
    super(page);

    // Định nghĩa XPath cho trường "Firstname"
    this.firstNameField = page.locator('//input[@name="firstName"]'); 
    // Định nghĩa XPath cho trường firstName error:
    this.firstNameError = page.locator('//input[@name="firstName"]//parent::*//parent::*//span[contains(@class, "oxd-input-field-error-message")]');

    // Định nghĩa XPath cho trường "middleName"
    this.middleNameField = page.locator('//input[@name="middleName"]'); 
    // Định nghĩa XPath cho trường middleName error:
    this.middleNameError = page.locator('//input[@name="middleName"]//parent::*//parent::*//span[contains(@class, "oxd-input-field-error-message")]');


    // Định nghĩa XPath cho trường "lastNameField"
    this.lastNameField = page.locator('//input[@name="lastName"]'); 
    // Định nghĩa XPath cho trường lastNameField error:
    this.lastNameError = page.locator('//input[@name="lastName"]//parent::*//parent::*//span[contains(@class, "oxd-input-field-error-message")]');



    // Định nghĩa XPath cho trường Employee ID:
    this.employeeID = page.locator('//*[text() = "Employee Id"]/parent::*//following-sibling::*//input');

    // Định nghĩa XPath cho trường Employee Id error:
    this.employeeIDError = page.locator('//*[text() = "Employee Id"]/parent::*//parent::*//span');

    

    


    
  }



  // Thêm phương thức để tương tác với trường "Firstname"
  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameField.fill(firstName); // Nhập giá trị vào trường "Firstname"
  }

  // async verifyFirstNameError(expectedError: string): Promise<void> {
  //   // const errorLocator = this.page.locator('//input[@id="firstName"]/following-sibling::span[contains(@class, "error-message")]');
    
  //   const errorLocator = this.page.locator("//*[text() = 'Employee Full Name']/parent::*//following-sibling::*//span");
   
  //   await expect(errorLocator).toBeVisible(); // Kiểm tra mã lỗi hiển thị
  //   const actualError = await errorLocator.textContent();
  //   expect(actualError?.trim()).toBe(expectedError); // So sánh nội dung lỗi
  // }


  // Phương thức kiểm tra lỗi động cho bất kỳ trường nào
  async verifyFieldError(fieldLocator: Locator, expectedError: string): Promise<void> {
    // Kiểm tra mã lỗi hiển thị
    await expect(fieldLocator).toBeVisible();
    // Lấy nội dung mã lỗi
    const actualError = await fieldLocator.textContent();
    // So sánh nội dung mã lỗi với giá trị mong đợi
    expect(actualError?.trim()).toBe(expectedError);
  }

  get headingAddUser() {
    return this.container.getByRole('heading', { name: 'Add Employee' })
  }


  get firstName(){
    return this.container.getByText('Employee Full Name')
      .locator('..').locator('..').locator('..')
      .getByRole('textbox').first();
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