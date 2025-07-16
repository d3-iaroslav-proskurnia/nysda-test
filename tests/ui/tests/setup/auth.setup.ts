import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { AUTH_FILE_PATH } from '@lib/constants';
import { HomePage } from '@pages/HomePage';

const auth_setup = baseTest.extend<{
  loginPage: LoginPage;
  homePage: HomePage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

auth_setup(
  'authenticate',
  async ({ page, loginPage, homePage }) => {
    await auth_setup.step(`Navigate to Application`, async () => {
      await loginPage.navigateByURL();
    });

    await auth_setup.step(`Login to application`, async () => {
      await loginPage.loginToApplication();
    });

    await auth_setup.step(
      `Verify User is logged in and Logo is visible`,
      async () => {
        await page.waitForLoadState('load'); // Waits for the page to be fully loaded
        await expect(homePage.Logo).toBeVisible();
        await expect(homePage.LogoutBttn).toBeVisible();
        await expect(homePage.WelcomeText).toBeVisible();
      },
    );

    // Save the authentication state to a file
    await page.context().storageState({ path: AUTH_FILE_PATH });
  },
);
