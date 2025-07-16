// tests/ui/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './testConfig';
import { AUTH_FILE_PATH } from '@lib/constants';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Determine which environment to load
export const ENV = process.env.UI_TEST_ENV || 'local';
if (!ENV || ![`local`, `dev`, `qa`, `stg`].includes(ENV)) {
  console.log(
    `Please provide a correct environment value like "npx cross-env ENV=dev|qa|stg"`,
  );
  process.exit();
}
process.env.API_URL = testConfig[ENV].apiUrl;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  testMatch: '**/*.spec.ts',
  expect: { timeout: 20_000 },
  //sets timeout for each test case
  timeout: 120 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 2,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // Concise 'list' for CI, default 'html' when running locally
  reporter: process.env.CI
    ? [['list', { FORCE_COLOR: true /*printSteps: true,*/ }]]
    : [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // testIdAttribute: 'data-pw',
    /* Emulates consistent viewport for each page. Defaults to an 1280x720 viewport. */
    viewport: { width: 1280, height: 800 },
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: testConfig[ENV].appUrl,
    // baseURL: "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { name: 'auth_setup', testMatch: '**/auth.setup.ts' },

    {
      name: 'chromium authenticated',
      use: {
        storageState: AUTH_FILE_PATH,
        ...devices['Desktop Chrome'],
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
      testMatch: '**/*.authenticated.*.ts',
      dependencies: ['auth_setup'],
    },

    // All tests for a non-authenticated user
    {
      name: 'chromium non-authenticated',
      use: {
        ...devices['Desktop Chrome'],
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
      },
      testMatch: '**/*.non-authenticated.*.ts',
    },

    // {
    //   name: 'Microsoft Edge authenticated',
    //   use: {
    //     storageState: AUTH_FILE_PATH,
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //     screenshot: 'only-on-failure',
    //     video: 'retain-on-failure',
    //     trace: 'retain-on-failure',
    //   },
    //   testMatch: '**/*.authenticated.*.ts',
    //   dependencies: ['auth_setup', 'data_setup'],
    // },
    // {
    //   name: 'Microsoft Edge non-authenticated',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //     screenshot: 'only-on-failure',
    //     video: 'retain-on-failure',
    //     trace: 'retain-on-failure',
    //   },
    //   testMatch: '**/*.non-authenticated.*.ts',
    // },
  ],
});
