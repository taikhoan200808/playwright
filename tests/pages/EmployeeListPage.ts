import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeeListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get headingAddUser() {
    return this.container.getByRole('heading', { name: 'PIM' })
  }

  get addButton() {
    return this.container.getByRole('button', { name: 'Add' });
  }



  getEmployeeName(nameText: string): Locator {
    return this.container.getByText('Employee Name')
      .locator('..').locator('..').locator('..')
      .getByRole('textbox')
      .first();
  }

  getEmployeeNameOption(nameText: string): Locator {
    return this.container.getByText('Employee Information')
      .locator('..').locator('..').locator('..')
      .getByRole('option', { name: nameText })
      .first();
  }

  async selectEmployeeName(nameText: string) {
    await this.getEmployeeName(nameText).fill(nameText);
    await this.getEmployeeNameOption(nameText).click();
  }

  get employeeId(){
    return this.container.getByText('Employee Id')
      .locator('..').locator('..').locator('..')
      .getByRole('textbox').first();
  }

  get searchButton() {
    return this.container.getByRole('button', { name: 'Search' });
  }

  get employeeTableRows() {
    return this.container.locator('.oxd-table-body .oxd-table-row');
  }

  getDropdown(labelText: string): Locator {
    return this.container.getByText(labelText)
      .locator('..').locator('..').locator('..')
      .locator('.oxd-select-text')
      .first();
  }

  getRequiredFieldErrorMessage(labelText: string): Locator {
    return this.container.getByText(labelText)
      .locator('..').locator('..').locator('..')
      .getByText('Required')
      .first();
  }

  async selectDropdown(labelText: string, option:string) {
    await this.getDropdown(labelText).click();

    const optionMap: Record<string, string> = {
      'Select': '-- Select --',
      'Admin': 'Admin',
      'ESS': 'ESS',
      'Enabled': 'Enabled',
      'Disabled': 'Disabled',
    };

    const visibleOption = optionMap[option] ?? option;

    await this.container.getByText(labelText)
        .locator('..').locator('..').locator('..')
        .getByRole('option', { name: visibleOption }).click();
  }

  async verifyDropdown(labelText: string, expectedOptions: string[]): Promise<void> {
    const dropdown = this.getDropdown(labelText);
    await dropdown.click();

    // Mapping for visible values if needed
    const optionMap: Record<string, string> = {
      'Select': '-- Select --',
      'Enabled': 'Enabled',
      'Disabled': 'Disabled',
      'Admin': 'Admin',
      'ESS': 'ESS',
      'ds': 'ds',

      'Current Employees Only': 'Current Employees Only',
      'Current and Past Employees': 'Current and Past Employees',
      'Past Employees Only':'Past Employees Only',
    };

    const visibleOptions = expectedOptions.map(opt => optionMap[opt] ?? opt);

    for (const option of visibleOptions) {
      const optionLocator = this.container.getByRole('option', { name: option });
      await expect(optionLocator).toBeVisible(); // Requires `@playwright/test`
    }

    // Optional: close the dropdown if needed
    await dropdown.press('Escape');
  }

  async isLoaded() {
    await this.page.waitForLoadState('load');
    await this.addButton.waitFor({ state: 'visible' });
    await this.verifyModuleTitle('PIM');
    // await this.verifyPageTitle('/ User Management');
  }
  
  async clickEditButtonFor(id: string) {
    const row = this.container.locator(
      `.oxd-table-body .oxd-table-row:has-text("${id}")`
    );
    await row.locator('i.bi-pencil-fill').click();
  }

  async verifyEmployeeInTable(id: string, firstName: string, lastName: string) {
    const row = this.container.locator(
      `.oxd-table-body .oxd-table-row:has-text("${id}")`
    );
    await expect(row.locator('div').nth(1)).toHaveText(id);
    await expect(row.locator('div').nth(2)).toHaveText(firstName);
    await expect(row.locator('div').nth(3)).toHaveText(lastName);
  }


  

}