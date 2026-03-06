import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { HomePage } from '@pages/HomePage';
import { ForgotPasswordPage } from '@pages/forgot-password-page';

const test = baseTest.extend<{
  loginPage: LoginPage;
  homePage: HomePage;
  forgotPasswordPage: ForgotPasswordPage;
}>({
  loginPage: async ({ page, context }, use) => {
    await context.clearCookies();
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },
});

test.describe('Login and Logout Tests', () => {
  test(`Verify Login page`, async ({ page, loginPage }) => {
    await test.step(`Navigate to the Application`, async () => {
      await loginPage.navigateByURL();
    });
    await test.step(`Validate Login page controls`, async () => {
      await page.waitForLoadState('load'); // Waits for the page to be fully
      await loginPage.validateControls();
    });
  });

  test(`User can Login`, async ({ page, loginPage, homePage }) => {
    await test.step(`Navigate to the Application`, async () => {
      await loginPage.navigateByURL();
    });

    await test.step(`Login`, async () => {
      await loginPage.validateControls();
      await loginPage.loginToApplication();
    });

    await test.step(`A User is logged in and navigated to Homepage`, async () => {
      await homePage.validateControls();
    });

    await test.step(`Logout`, async () => {
      await homePage.clickOnLogoutButton();
      await page.waitForLoadState('load'); // Waits for the page to be fully loaded

      await expect(homePage.LogoutBttn).not.toBeVisible();
      await loginPage.validateControls();
    });
  });

  test(`User can Logout`, async ({ page, loginPage, homePage }) => {
    await test.step(`Navigate to the Application`, async () => {
      await loginPage.navigateByURL();
    });

    await test.step(`Login`, async () => {
      await loginPage.validateControls();
      await loginPage.loginToApplication();
    });

    await test.step(`A User is logged in and navigated to Homepage`, async () => {
      await homePage.validateControls();
    });

    await test.step(`Logout`, async () => {
      await homePage.clickOnLogoutButton();
      await page.waitForLoadState('load'); // Waits for the page to be fully loaded

      await expect(homePage.LogoutBttn).not.toBeVisible();
      await loginPage.validateControls();
    });
  });

  test(`Verify Forgot password Page`, async ({
    page,
    loginPage,
    forgotPasswordPage,
  }) => {
    await test.step(`Navigate to the Application`, async () => {
      await loginPage.navigateByURL();
    });

    await test.step(`Click on "Forgot Password"`, async () => {
      await loginPage.ForgotPasswordLink.click();
      await expect(forgotPasswordPage.resendPasswordBtn).toBeVisible();
    });
    await test.step(`Validate Login page controls`, async () => {
      await forgotPasswordPage.validateControls();
    });
  });
});
