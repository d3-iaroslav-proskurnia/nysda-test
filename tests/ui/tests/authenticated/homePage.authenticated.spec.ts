import { test as baseTest, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';

const test = baseTest.extend<{
  homePage: HomePage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});
test.describe('Homepage', () => {
  test(`Verify Homepage data`, async ({
    homePage,
  }) => {
    await test.step(`Navigate to the "Lead From Scratch" page by URL`, async () => {
      await homePage.navigateByURL();
    });

    await test.step(`Validate fields`, async () => {
      await homePage.validateControls();
    });
  });
});
