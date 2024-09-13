import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

class OtherPage extends BasePage{
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
}


export default OtherPage;