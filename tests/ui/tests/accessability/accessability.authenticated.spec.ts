import {test as baseTest, expect, Locator} from "@playwright/test";
import {Axe_accessability_Methods} from "@pages/axe-accessability-methods";
import {HomePage} from "@pages/HomePage";
import {CalendarPage} from "@pages/calendar-page";

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

test.describe('Accessability fast check suite', ()=> {

    test.beforeEach(async () => {
        console.log(`Starting test with name: "${test.info().title}"`);
    })

    test(`Scanning pages within app`, async ({
                                         calendarPage,
                                         axeMethods,
                                     }) => {
        await test.step(`Navigate to the Home page -> Upcoming tab`, async () => {
            await axeMethods.navigateToSpecificPageAndPerformScan('?tab=upcoming');
        });

        await test.step(`Navigate to the Home page -> Past events tab`, async () => {
            await axeMethods.navigateToSpecificPageAndPerformScan('?tab=past');
        });

        await test.step(`Navigate to the Home page -> Active cases tab`, async () => {
            await axeMethods.navigateToSpecificPageAndPerformScan('?tab=active-cases');
        });

        await test.step(`Navigate to the Calendar`, async () => {
            await axeMethods.navigateToSpecificPageAndPerformScan(`calendar?date=${calendarPage.getTodayDate()}`);
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
            await axeMethods.navigateToSpecificPageAndPerformScan('reports/report-builder/personal');
        });

        await test.step(`Navigate to the Report ILS 195 page (staff details)`, async () => {
            await axeMethods.navigateToSpecificPageAndPerformScan('reports/ils195/staff-details');
        });

        await test.step(`Navigate to the Report PRR 195 page`, async () => {
            await axeMethods.navigateToSpecificPageAndPerformScan('reports/prr195');
        });

        await test.step(`Navigate to the Report pre-canned page`, async () => {
            await axeMethods.navigateToSpecificPageAndPerformScan('reports/pre-canned');
        });

        await test.step(`Navigate to the HELP page`, async () => {
            await axeMethods.navigateToSpecificPageAndPerformScan('help');
        });

    });

    test(`Calendar detailed scan`, async ({
                                                 page,
                                                 axeMethods,
        calendarPage
                                             }) => {

        await test.step(`Navigate to the Calendar`, async () => {
            await page.goto(`calendar?date=${calendarPage.getTodayDate()}`,{waitUntil:"load"});
        });

        await test.step(`Open Dialog Modal`, async () => {
            await calendarPage.createEventButton.click();
            await expect(calendarPage.createSpecialEventModal).toBeVisible();
        });

        await test.step(`Selecting event type in dropdown and scanning dropdown`, async () => {
            await calendarPage.eventTypeDropdown.click();
            await axeMethods.findElementAndScanPageState(calendarPage.getFirstMatchDropdownOptionLocatorByText('Voucher Events'));
            await calendarPage.getFirstMatchDropdownOptionLocatorByText('Voucher Events').click();
        })

        await test.step(`Selecting attorney in dropdown and scanning dropdown`, async () => {
            await calendarPage.attyDropdown.click();
            await axeMethods.findElementAndScanPageState(calendarPage.anyOptionInDropdown.first());
            await calendarPage.anyOptionInDropdown.first().click();
        })

        await test.step(`Scanning calendar and time setter`, async () => {
            await calendarPage.startDateCalendarBtn.click();
            await axeMethods.findElementAndScanPageState(calendarPage.anyInnerDialogModal);
            await calendarPage.titleDropdown.click();
            await expect(calendarPage.anyInnerDialogModal).not.toBeVisible();
            await calendarPage.startTimeClockBtn.click();
            await axeMethods.findElementAndScanPageState(calendarPage.anyInnerDialogModal);
            await calendarPage.titleDropdown.click();
            await expect(calendarPage.anyInnerDialogModal).not.toBeVisible();
        })

        await test.step(`Click on Create Button and scanning modal with alerts`, async () => {
            await calendarPage.createBtn.click()
            await axeMethods.findElementAndScanPageState(page.getByText('Field is required').first());

        })


    });

})