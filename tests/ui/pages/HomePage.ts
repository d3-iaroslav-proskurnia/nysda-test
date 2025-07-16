import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly Logo: Locator;
  readonly WelcomeText: Locator;
  readonly LogoutBttn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.Logo = page.locator('img.logo');
    this.WelcomeText = page.getByRole('heading', {name: 'Welcome to PDCMS'});
    this.LogoutBttn = page.getByRole('button', { name: 'Log out' });
  }


  async navigateByURL() {
    await this.page.goto('/');
    await this.page.waitForLoadState('load'); // Waits for the page to be fully loaded
  }

  async validateControls() {
    await this.page.waitForLoadState('load'); // Waits for the page to be fully loaded
    await expect(this.Logo).toBeVisible();
    await expect(this.WelcomeText).toBeVisible();
    await expect(this.LogoutBttn).toBeVisible();
  }
    async clickOnLogoutButton() {
        await this.LogoutBttn.click();
        await this.page.waitForLoadState('load'); // Waits for the page to be fully loaded
    }
}
