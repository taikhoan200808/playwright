import { Page } from '@playwright/test';

export class Utilities {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 📌 Hàm lấy múi giờ theo định dạng động ('hh:mm:ss' hoặc 'hh:mm')
  async getCurrentTimeZone(format: 'hh:mm' | 'hh:mm:ss' = 'hh:mm'): Promise<string> {
    return await this.page.evaluate((format) => {
      // Lấy múi giờ theo offset từ UTC
      const offsetMinutes = new Date().getTimezoneOffset();
      const hours = Math.floor(Math.abs(offsetMinutes) / 60);
      const minutes = Math.abs(offsetMinutes) % 60;
      const seconds = new Date().getSeconds(); // Lấy giây hiện tại
      const sign = offsetMinutes < 0 ? '+' : '-';

      // Định dạng theo yêu cầu của người dùng
      const formattedTimeZone = format === 'hh:mm:ss'
        ? `UTC ${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        : `UTC ${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      return formattedTimeZone;
    }, format);
  }


  async getRandomNumber(min: number, max: number): Promise<number> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async clickDeleteInableButtonFor(id: string) {
    // const row = this.container.locator(
      const row = this.page.locator(
      `.oxd-table-body .oxd-table-row:has-text("${id}")`
    );
    await row.locator('i.bi-trash').click();
  }

  
}
