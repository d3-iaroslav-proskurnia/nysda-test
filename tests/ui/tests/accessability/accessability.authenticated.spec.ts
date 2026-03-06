import { test as baseTest, expect, Locator } from '@playwright/test';
import { Axe_accessability_Methods } from '@pages/axe-accessability-methods';
import { HomePage } from '@pages/HomePage';
import { CalendarPage } from '@pages/calendar-page';

const test = baseTest.extend<{
  homePage: HomePage;
  axeMethods: Axe_accessability_Methods;
  calendarPage: CalendarPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  axeMethods: async ({ page }, use) => {
    await use(new Axe_accessability_Methods(page));
  },
  calendarPage: async ({ page }, use) => {
    await use(new CalendarPage(page));
  },
});

test.describe('Accessibility fast check suite @accessibility', () => {
  test.beforeEach(async () => {
    console.log(`Starting test with name: "${test.info().title}"`);
  });

  test(`Scanning pages within app`, async ({ calendarPage, axeMethods }) => {
    test.slow(); // since lots of scanning, it takes approx 5 minutes

    // data init
    const preparedCaseDetailId = '117899274';
    const preparedAttorneyId = '30408704';
    const preparedCourtLocationId = '4587520';

    await test.step(`Navigate to the Home page -> Upcoming tab`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan('?tab=upcoming');
    });

    await test.step(`Navigate to the Home page -> Past events tab`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan('?tab=past');
    });

    await test.step(`Navigate to the Home page -> Active cases tab`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        '?tab=active-cases',
      );
    });

    await test.step(`Navigate to the Calendar`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        `calendar?date=${calendarPage.getTodayDate_YYYY_MM_DD()}`,
      );
    });

    await test.step(`Navigate to the Clients page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan('clients');
    });

    await test.step(`Navigate to the Clients -> ADD page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan('clients/add');
    });

    await test.step(`Navigate to the Cases page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan('cases');
    });

    await test.step(`Navigate to the Report Builder page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'reports/report-builder/personal',
      );
    });

    await test.step(`Navigate to the Report ILS 195 page (staff details)`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'reports/ils195/staff-details',
      );
    });

    await test.step(`Navigate to the Report PRR 195 page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan('reports/prr195');
    });

    await test.step(`Navigate to the Report pre-canned page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'reports/pre-canned',
      );
    });

    await test.step(`Navigate to the HELP page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan('help');
    });

    // Admin Section - Just in Case - ONLY several pages taken

    await test.step(`Navigate to the Admin-account-users page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/account/users',
      );
    });

    await test.step(`Navigate to the Admin-account-officeInfo page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/account/office',
      );
    });

    await test.step(`Navigate to the Admin-account-permissions page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/account/permissions',
      );
    });

    await test.step(`Navigate to the Admin-account-logs page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/account/logs',
      );
    });

    await test.step(`Navigate to the Admin-maintenance-caseType page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/maintenance/case-type',
      );
    });

    await test.step(`Navigate to the Admin-maintenance-charges page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/maintenance/charges',
      );
    });

    await test.step(`Navigate to the Admin-maintenance-maritalStatus page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/maintenance/marital-status',
      );
    });

    await test.step(`Navigate to the Admin-maintenance-staff page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/maintenance/staff',
      );
    });

    await test.step(`Navigate to the Admin-maintenance-staff-details page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/maintenance/staff-details',
      );
    });

    await test.step(`Navigate to the Admin-help page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan('admin/help');
    });

    // Admin Section - Create Page - ONLY several pages taken

    await test.step(`Navigate to the Admin-maintenance-case-detail-add page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/maintenance/case-detail/add',
      );
    });

    await test.step(`Navigate to the Admin-maintenance-court-locations-add page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/maintenance/court-locations/add',
      );
    });

    await test.step(`Navigate to the Admin-maintenance-attorneys-add page`, async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        'admin/maintenance/attorneys/add',
      );
    });

    // Admin Section - Edit Page - ONLY several pages taken

    await test.step('Navigate to specific Case Detail record and perform scan', async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        `admin/maintenance/case-detail/${preparedCaseDetailId}/edit`,
      );
    });

    await test.step('Navigate to specific Attorney record and perform scan', async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        `admin/maintenance/attorneys/${preparedAttorneyId}/edit`,
      );
    });

    await test.step('Navigate to specific Attorney record and perform scan', async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        `admin/maintenance/court-locations/${preparedCourtLocationId}/edit`,
      );
    });
  });

  test(`Calendar detailed scan`, async ({ page, axeMethods, calendarPage }) => {
    await test.step(`Navigate to the Calendar`, async () => {
      await page.goto(
        `calendar?date=${calendarPage.getTodayDate_YYYY_MM_DD()}`,
        { waitUntil: 'load' },
      );
    });

    await test.step(`Open Dialog Modal`, async () => {
      await calendarPage.createEventButton.click();
      await expect(calendarPage.createSpecialEventModal).toBeVisible();
    });

    await test.step(`Selecting event type in dropdown and scanning dropdown`, async () => {
      await calendarPage.eventTypeDropdown.click();
      await axeMethods.findElementAndScanPageState(
        calendarPage.getFirstMatchDropdownOptionLocatorByText('Voucher Events'),
      );
      await calendarPage
        .getFirstMatchDropdownOptionLocatorByText('Voucher Events')
        .click();
    });

    await test.step(`Selecting attorney in dropdown and scanning dropdown`, async () => {
      await calendarPage.attyDropdown.click();
      await axeMethods.findElementAndScanPageState(
        calendarPage.anyOptionInDropdown.first(),
      );
      await calendarPage.anyOptionInDropdown.first().click();
    });

    await test.step(`Scanning calendar and time setter`, async () => {
      await calendarPage.startDateCalendarBtn.click();
      await axeMethods.findElementAndScanPageState(
        calendarPage.anyInnerDialogModal,
      );
      await calendarPage.titleDropdown.click();
      await expect(calendarPage.anyInnerDialogModal).not.toBeVisible();
      await calendarPage.startTimeClockBtn.click();
      await axeMethods.findElementAndScanPageState(
        calendarPage.anyInnerDialogModal,
      );
      await calendarPage.titleDropdown.click();
      await expect(calendarPage.anyInnerDialogModal).not.toBeVisible();
    });

    await test.step(`Click on Create Button and scanning modal with alerts`, async () => {
      await calendarPage.createBtn.click();
      await axeMethods.findElementAndScanPageState(
        page.getByText('Field is required').first(),
      );
    });
  });
});
