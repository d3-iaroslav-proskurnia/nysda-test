import { expect, type Locator, type Page } from '@playwright/test';
import {axeScan} from "axe-playwright-report";
import {GlobalActionsAndElements} from "@pages/global-actions-and-elements";

export class HomePage extends GlobalActionsAndElements {
  readonly Logo: Locator;
  readonly WelcomeText: Locator;
  readonly LogoutBttn: Locator;

  constructor(page: Page) {
    super(page);
    this.Logo = page.locator('img.logo');
    this.WelcomeText = page.getByRole('heading', {name: 'Welcome to PDCMS'});
    this.LogoutBttn = page.getByRole('button', { name: 'Log out' });
  }

  @axeScan()
  async navigateByURL() {
    await this.page.goto('/');
    await this.page.waitForLoadState('load'); // Waits for the page to be fully loaded
  }

  @axeScan()
  async validateControls() {
    await this.page.waitForLoadState('load'); // Waits for the page to be fully loaded
    await expect(this.Logo).toBeVisible();
    await expect(this.WelcomeText).toBeVisible();
    await expect(this.LogoutBttn).toBeVisible();
  }

  @axeScan()
  async clickOnLogoutButton() {
    await this.LogoutBttn.click();
    await this.page.waitForLoadState('load'); // Waits for the page to be fully loaded
  }
}
