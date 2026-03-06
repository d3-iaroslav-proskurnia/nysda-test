import {test as baseTest, expect, Locator} from '@playwright/test';
import {ClientsPage} from "@pages/clients/clients-page";
import {AddNewClientPage} from "@pages/clients/add-new-client-page";
import {Axe_accessability_Methods} from "@pages/axe-accessability-methods";
import {AddNewCasePage} from "@pages/cases/add-new-case-page";
import {CasesPage} from "@pages/cases/cases-page";
import{SingleCaseDetailsPage} from "@pages/cases/single-case-details.page";
import {SingleCaseClosingFormPage} from "@pages/cases/single-case-closing-form.page";
import {ClientProfilePage} from "@pages/clients/client-profile-page";
import {simpleCriminalCaseExample} from "@lib/storage/cases/criminal-case-storage"

const test = baseTest.extend<{
    clientsPage: ClientsPage;
    addNewClientPage: AddNewClientPage;
    axeMethods: Axe_accessability_Methods;
    addNewCasePage: AddNewCasePage;
    casesPage: CasesPage;
    caseDetailsPage: SingleCaseDetailsPage;
    caseClosingFormPage: SingleCaseClosingFormPage;
    clientProfilePage: ClientProfilePage;
}>({
    clientsPage: async ({ page }, use) => {
        await use(new ClientsPage(page));
    },
    addNewClientPage: async ({ page }, use) => {
        await use(new AddNewClientPage(page));
    },
    axeMethods: async ({ page }, use) => {
        await use(new Axe_accessability_Methods(page));
    },
    addNewCasePage: async ({ page }, use) => {
        await use(new AddNewCasePage(page));
    },
    casesPage: async ({ page }, use) => {
        await use(new CasesPage(page));
    },
    caseDetailsPage: async ({ page }, use) => {
        await use(new SingleCaseDetailsPage(page));
    },
    caseClosingFormPage: async ({ page }, use) => {
        await use(new SingleCaseClosingFormPage(page));
    },
    clientProfilePage: async ({ page }, use) => {
        await use(new ClientProfilePage(page));
    },
});

test.describe('End-to-end basic tests', () => {

    test('Add New Criminal Case through adding Client with ONLY Required data via UI + verifications', async ({page,
                                                                                                                  request,
                                                                                                                  clientsPage,
                                                                                                                  addNewClientPage,
                                                                                                                  axeMethods,
                                                                                                                  addNewCasePage,
                                                                                                                  casesPage,}) => {

        // Some data init
        const clientInfoStepLabel:Locator = addNewClientPage.getStepLabelByName('Client Information');
        const additionalDetailsStepLabel:Locator = addNewClientPage.getStepLabelByName('Additional Details');
        const financialInfoStepLabel:Locator = addNewClientPage.getStepLabelByName('Financial information');
        const clientFirstName = `Aqa_${addNewClientPage.generateRandomSmallCharString(6)}`;
        // const clientLastName = `Last${addNewClientPage.generateRandomSmallCharString(6)}`
        const clientCreationAlert = addNewClientPage.getAlertSnackbarByText('Pre Client have been created successfully');
        const caseTypeStepLabel:Locator = addNewCasePage.getStepLabelByName('Case Type');
        const caseDetailsStepLabel:Locator = addNewCasePage.getStepLabelByName('Case Details');
        const caseEventsStepLabel:Locator = addNewCasePage.getStepLabelByName('Case Events');
        const invalidCaseStepPopulationAlert:Locator = addNewCasePage.getAlertSnackbarByText('Some fields on this step are invalid. Please correct them to continue');
        const defaultCriminalCaseData = simpleCriminalCaseExample;

        // Data to be received
        let clientCreationResponse:any
        let createdCaseId:number
        let formattedCaseFileNumber:string

        await test.step('Navigate to the "Clients" page by URL', async () => {
            await clientsPage.navigateByUrl();
        })

        await test.step('Click on "Add New Client" button', async () => {
            await clientsPage.addNewClientBtn.click();
        })

        await test.step('Verify "Add New Client" page is opened properly', async () => {
            await expect(clientInfoStepLabel).toContainClass('Mui-active');
            await expect(additionalDetailsStepLabel).toContainClass('Mui-disabled');
            await expect(financialInfoStepLabel).toContainClass('Mui-disabled');

            // scan
            await axeMethods.findElementAndScanPageState(addNewClientPage.pageStepper);
        })

        await test.step('Populate ONLY First name for the client', async () => {
            await addNewClientPage.firstNameInputField.fill(clientFirstName);
        })

        await test.step('Click on "Add Case to Client" and verify transfer', async () => {
            clientCreationResponse = await addNewClientPage.clickOnAddCaseToClientAndReturnResponse();
            expect(clientCreationResponse.isSuccess).toBe(true);
        })

        await test.step('Alert Message Verification', async () => {
            await expect(clientCreationAlert).toBeVisible();

            // scan
            await axeMethods.findElementAndScanPageState(clientCreationAlert);
        })

        await test.step('Add Case page verification', async () => {
            expect(page.url()).toContain(`/clients/${clientCreationResponse.data}/cases/add`)
            await expect(addNewCasePage.staticPageTitle).toContainText(clientFirstName);
            await expect(caseTypeStepLabel).toContainClass('Mui-active');
            await expect(caseDetailsStepLabel).toContainClass('Mui-disabled');
            await expect(caseEventsStepLabel).toContainClass('Mui-disabled');
        })

        await test.step('Invalid Step Population alert triggering', async () => {
            await addNewCasePage.getButtonByName('Next').click();
            await expect(invalidCaseStepPopulationAlert).toBeVisible();

            // scan
            await axeMethods.findElementAndScanPageState(invalidCaseStepPopulationAlert);
        })

        await test.step('Populating "Case Matter" section', async () => {
            await addNewCasePage.populateCaseMatterSection(defaultCriminalCaseData.matter,defaultCriminalCaseData.caseType);
        })

        await test.step('Proper Step Population -> moving to the next step', async () => {
            await addNewCasePage.getButtonByName('Next').click();
            await expect(caseTypeStepLabel).toContainClass('Mui-completed');
            await expect(caseDetailsStepLabel).toContainClass('Mui-active');
            await expect(caseEventsStepLabel).toContainClass('Mui-disabled');

            // scan
            await axeMethods.findElementAndScanPageState(caseDetailsStepLabel);
        })

        await test.step('Populate "Open Date" field', async () => {
            await addNewCasePage.fillComplexDateFieldWithFormattedDate('Open Date',addNewCasePage.getTodayDate_MM_DD_YYYY());
        })

        await test.step('Proper Step Population -> moving to the next step', async () => {
            await addNewCasePage.getButtonByName('Next').click();
            await expect(caseTypeStepLabel).toContainClass('Mui-completed');
            await expect(caseDetailsStepLabel).toContainClass('Mui-completed');
            await expect(caseEventsStepLabel).toContainClass('Mui-active');

            // scan
            await axeMethods.findElementAndScanPageState(caseEventsStepLabel);
        })

        await test.step('Click on "Save And Exit" without setting any data on Optional step', async () => {
            // setting interception
            const addCaseResponsePromise = page.waitForResponse(
                (response) => response.url().endsWith('/api/cases?api-version=1.0') && response.ok(),
            );
            await addNewCasePage.getButtonByName('Save And Exit').click();
            const addCaseResponseInterception = await addCaseResponsePromise;
            const addCaseResponseObj = await addCaseResponseInterception.json();
            expect(addCaseResponseObj.isSuccess).toBe(true);
            createdCaseId = addCaseResponseObj.data;
        })

        await test.step('Created Case Success Alert verification', async () => {
            formattedCaseFileNumber = await casesPage.getFormattedCaseFileNumberViaApi(request,createdCaseId);
            await expect(casesPage.getAlertSnackbarByText(`Case ${formattedCaseFileNumber} has been created`)).toBeVisible();
            await expect(page).toHaveURL('/cases');
        })

        await test.step('Filter Cases page by caseFile number and verification', async () => {
            await casesPage.caseNumberFilterField.fill(formattedCaseFileNumber);
        })

        await test.step('Created Case verification within cases table', async () => {
            await expect(casesPage.getRowByCaseId(createdCaseId)).toBeVisible();
            await expect(casesPage.getRowByCaseId(createdCaseId)).toContainText(formattedCaseFileNumber);
        })

        await test.step('Side panel scan', async () => {
            const neededRow = casesPage.tableRow.filter({hasText:clientFirstName}).first();
            const tabListElement = page.locator('[role="tablist"]');
            await neededRow.click();
            await expect(tabListElement).toBeVisible();

            // scan
            await axeMethods.findElementAndScanPageState(tabListElement);
        })


    })

    test('Create new Case via API + Case page verifications', async ({
                                                                                                                  page,
                                                                                                                  request,
                                                                                                                  addNewClientPage,
                                                                                                                  axeMethods,
                                                                                                                  addNewCasePage,
                                                                                                                  caseDetailsPage
                                                                                                              }) => {

        // data init
        let clientData:any;
        let caseData:any

        await test.step('Navigate to home page', async () => {
            await page.goto(`/`,{waitUntil:"load"})
        })

        await test.step('Created client via API and get data', async () => {
            clientData = await addNewClientPage.createRandomNewClientViaApiAndReturnData(request);
        })

        await test.step('Created new FamilyCase for created client via API and get data', async () => {
            caseData = await addNewCasePage.createNewFamilyCaseViaApiAndReturnFullData(request,clientData.nameId)
        })

        await test.step('Navigate to created case details page', async () => {
            await page.goto(`/cases/${caseData.id}/details`,{waitUntil:"load"})
        })

        await test.step('Case page verification', async () => {
            const formattedCaseFileNumber = caseDetailsPage.convertCaseFileNumberToFormattedString(caseData.fileNumber);
            await expect(caseDetailsPage.staticPageTitle).toHaveText(`Case No. ${formattedCaseFileNumber}`)

            // scan
            await axeMethods.findElementAndScanPageState(caseDetailsPage.staticPageTitle);
        })

    })

    test('Navigate to specific Case for Axe scans @accessibility', async ({ page,
                                                                              caseDetailsPage,
                                                                              caseClosingFormPage,
                                                                              axeMethods}) => {

        // data init
        const preparedCaseId = '2688552363';

        await test.step('Navigate to specific Case page and perform scan', async () => {
            await axeMethods.navigateToSpecificPageAndPerformScan(`cases/${preparedCaseId}/details`);
        })

        await test.step('Move to closing Form tab', async () => {
            await caseDetailsPage.closingFormTab.click();
            await page.waitForLoadState('load')
            await expect(caseDetailsPage.closingFormTab).toHaveAttribute('aria-selected','true');

            // Scan
            await axeMethods.findElementAndScanPageState(caseClosingFormPage.staticPageTitle);
        })

        await test.step('Expand all sections on Closing form tab', async () => {
            await caseClosingFormPage.namedSectionHeaderExpander('Section 1').click();
            await caseClosingFormPage.namedSectionHeaderExpander('Section 2').click();
            await expect(caseClosingFormPage.namedSectionHeaderExpander('Section 1')).toHaveAttribute('aria-expanded','true');
            await expect(caseClosingFormPage.namedSectionHeaderExpander('Section 2')).toHaveAttribute('aria-expanded','true');

            // scan
            await axeMethods.findElementAndScanPageState(caseClosingFormPage.namedSectionHeaderExpander('Section 2'));
        })

    })

    test('Navigate to specific Client for Axe scans @accessibility', async ({clientProfilePage, axeMethods}) => {

        // data init
        const preparedClientId = '560137745';

        await test.step('Navigate to specific Client page and perform scan', async () => {
            await axeMethods.navigateToSpecificPageAndPerformScan(`clients/${preparedClientId}`);
        })

        await test.step('Scan page for specific locator', async () => {
            await axeMethods.findElementAndScanPageState(clientProfilePage.alsoKnownAsButton);
        })

    })

})