import { expect, type Locator, type Page } from '@playwright/test';
import { testConfig } from 'testConfig';
import { ENV } from 'playwright.config';

// TODO: FILE is only copy/pasted. Require Review & change locators & methods
export class LoginPage {
  readonly page: Page;
  readonly Logo: Locator;
  readonly Title: Locator;
  readonly WelcomeText: Locator;
  readonly EmailAddressInput: Locator;
  readonly PasswordInput: Locator;
  readonly ShowHidePasswordButton: Locator;
  readonly LoginBttn: Locator;
  readonly ForgotPasswordLink: Locator;
  readonly ProgressBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.Logo = page.locator('img.logo');
    this.Title = page.getByRole('heading', {name: 'Log In to your account'});
    this.WelcomeText = page.locator('p', { hasText: 'Welcome back! Enter your email and password to continue.' });
    this.EmailAddressInput = page.getByRole('textbox', { name: 'Email' })
    this.PasswordInput = page.locator('input[type="password"]');
    this.ShowHidePasswordButton = page.getByRole('button', { name: 'display the password' });
    this.LoginBttn = page.getByRole('button', { name: 'Log in' })
    this.ForgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.ProgressBar = page.locator('progressbar');
  }

  async navigateByURL() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('load'); // Waits for the page to be fully loaded
  }

  async loginToApplication() {
    await this.EmailAddressInput.fill(testConfig[ENV].username);
    await this.PasswordInput.fill(testConfig[ENV].password);
    await this.LoginBttn.click();
    await this.ProgressBar.waitFor({ state: 'hidden' }); // Waits for the progress bar to disappear
    await this.page.waitForLoadState('load'); // Waits for the page to be fully loaded
  }

  async validateControls() {
    await this.page.waitForLoadState('load'); // Waits for the page to be fully loaded
    await expect(this.Logo).toBeVisible();
    await expect(this.Title).toBeVisible();
    await expect(this.WelcomeText).toBeVisible();
    await expect(this.EmailAddressInput).toBeVisible();
    await expect(this.PasswordInput).toBeVisible();
    await expect(this.ShowHidePasswordButton).toBeVisible();
    await expect(this.LoginBttn).toBeVisible();
    await expect(this.ForgotPasswordLink).toBeVisible();
  }
}
