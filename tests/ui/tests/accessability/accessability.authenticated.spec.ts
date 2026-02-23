import {test as baseTest, expect, Locator} from "@playwright/test";
import {Axe_accessability_Methods} from "@pages/axe-accessability-methods";
import {HomePage} from "@pages/HomePage";

const test = baseTest.extend<{
    homePage: HomePage;
    axeMethods: Axe_accessability_Methods;
}>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    axeMethods: async ({ page }, use) => {
        await use(new Axe_accessability_Methods(page));
    },
});

test.describe('Accessability fast check suite', ()=> {

    test.beforeEach(async () => {
        console.log(`Starting test with name: "${test.info().title}"`);
    })

    test(`Scanning pages within app`, async ({
                                         page,
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
            await axeMethods.navigateToSpecificPageAndPerformScan('calendar?date=2026-02-23');
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

})