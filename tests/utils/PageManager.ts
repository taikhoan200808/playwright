import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UserAddPage } from '../pages/UserAddPage';
import { UserListPage } from '../pages/UserListPage';
import { EmployeeAddPage } from '../pages/EmployeeAddPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';
import { Utilities } from '../utils/Utilities';

export class PageManager {
  public readonly loginPage: LoginPage;
  public readonly dashboardPage: DashboardPage;
  public readonly userAddPage: UserAddPage;
  public readonly userListPage: UserListPage;
  public readonly employeeAddPage: EmployeeAddPage;
  public readonly employeeListPage: EmployeeListPage;
  public readonly utilities: Utilities;


  constructor(private readonly page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.userAddPage = new UserAddPage(page);
    this.userListPage = new UserListPage(page);
    this.employeeAddPage = new EmployeeAddPage(page);
    this.employeeListPage = new EmployeeListPage(page);
    this.utilities = new Utilities(page);
  
  }

  public getPage(): Page {
    return this.page;
  }
  
}