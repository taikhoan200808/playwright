import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL || 'https://buianthai.online/orangehrm/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}