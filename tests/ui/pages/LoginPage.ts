import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

class LoginPage extends BasePage{
  private AccountLogin: Locator;
  private PersonalBankingLogin: Locator;
  private UserId: Locator;

  constructor(page: Page) {
    super(page);
    this.AccountLogin = page.locator("//*[@id='top-menu']//a[.='Account Login']");
    this.PersonalBankingLogin = page.locator("//*[@id='top-menu']//a[@title='Personal Banking Login']");
    this.UserId = page.locator("//*[@id='userId']");
  }

  async Navigate(): Promise<void> {
    // await this.page.goto(process.env.LOGIN_URL!);
    await this.page.goto("/");
  }

  async HoverOverAccountLogin(): Promise<void> {
    await this.AccountLogin.hover();
  }

  async ClickPersonalBankingLogin(): Promise<void> {
    await this.PersonalBankingLogin.click();
  }

  async TypeUserId(userId: string): Promise<void> {
    await this.UserId.fill(userId);
  }

  async ClearUserId(): Promise<void> {
    await this.UserId.fill('');
  }

  async GetUserId(): Promise<string> {
    const text = await this.UserId.inputValue();
    return text ?? '';
  }
}

export default LoginPage;