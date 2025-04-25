import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UserAddPage } from '../pages/UserAddPage';
import { UserListPage } from '../pages/UserListPage';

// import { MyInfoPage } from '../pages/MyInfoPage';

import { EmployeeAddPage } from '../pages/EmployeeAddPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';


export class PageManager {
  public readonly loginPage: LoginPage;
  public readonly dashboardPage: DashboardPage;
  public readonly userAddPage: UserAddPage;
  public readonly userListPage: UserListPage;
//   public readonly myInfoPage: MyInfoPage;

  public readonly employeeAddPage: EmployeeAddPage;
  public readonly employeeListPage: EmployeeListPage;

  constructor(private readonly page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.userAddPage = new UserAddPage(page);
    this.userListPage = new UserListPage(page);
    // this.myInfoPage = new MyInfoPage(page);

    this.employeeAddPage = new EmployeeAddPage(page);
    this.employeeListPage = new EmployeeListPage(page);
  }

  public getPage(): Page {
    return this.page;
  }
  
}