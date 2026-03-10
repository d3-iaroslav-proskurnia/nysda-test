import { test as baseTest, expect, Locator } from '@playwright/test';
import {DashboardLandingPage} from '@pages/dashboard-landing-page';
import { ClientsPage } from '@pages/clients/clients-page';
import { AddNewClientPage } from '@pages/clients/add-new-client-page';
import { Axe_accessability_Methods } from '@pages/axe-accessability-methods';
import { AddNewCasePage } from '@pages/cases/add-new-case-page';
import { CasesPage } from '@pages/cases/cases-page';
import { SingleCaseDetailsPage } from '@pages/cases/single-case-details.page';
import { SingleCaseClosingFormPage } from '@pages/cases/single-case-closing-form.page';
import { ClientProfilePage } from '@pages/clients/client-profile-page';
import { simpleCriminalCaseExample } from '@lib/storage/cases/criminal-case-storage';

const test = baseTest.extend<{
  dashboardLandingPage: DashboardLandingPage;
  clientsPage: ClientsPage;
  addNewClientPage: AddNewClientPage;
  axeMethods: Axe_accessability_Methods;
  addNewCasePage: AddNewCasePage;
  casesPage: CasesPage;
  caseDetailsPage: SingleCaseDetailsPage;
  caseClosingFormPage: SingleCaseClosingFormPage;
  clientProfilePage: ClientProfilePage;
}>({
  dashboardLandingPage: async ({ page }, use) => {
    await use(new DashboardLandingPage(page));
  },
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

  test('Landing page navigation elements check @smoke', async ({
    page,
    dashboardLandingPage,
  }) => {

    // data init
    const homelinkText = 'PDCMS';
    const calendarlinkText = 'Calendar';
    const clientslinkText = 'Clients';
    const caseslinkText = 'Cases';
    const reportslinkText = 'Reports';
    const helplinkText = 'Help';
    const logOutButtonText = 'Log out';

    await test.step('Navigate to the "Clients" page by URL', async () => {
      await page.goto('/',{waitUntil:"load"});
    });

    await test.step('Verify default extended state', async () => {
      await expect(dashboardLandingPage.navCollapseButton).toBeVisible();
      await expect(dashboardLandingPage.homeLink).toContainText(homelinkText);
      await expect(dashboardLandingPage.calendarLink).toContainText(
        calendarlinkText,
      );
      await expect(dashboardLandingPage.clientsLink).toContainText(
        clientslinkText,
      );
      await expect(dashboardLandingPage.casesLink).toContainText(caseslinkText);
      await expect(dashboardLandingPage.reportsLink).toContainText(
        reportslinkText,
      );
      await expect(dashboardLandingPage.helpLink).toContainText(helplinkText);
      await expect(dashboardLandingPage.logOutButton).toContainText(
        logOutButtonText,
      );
    });

    await test.step('Collapsing side menu', async () => {
      await dashboardLandingPage.navCollapseButton.click();
      await expect(dashboardLandingPage.navExpandButton).toBeVisible();
      await expect(dashboardLandingPage.navCollapseButton).not.toBeVisible();
    })

    await test.step('Verification for collapsed side menu', async () => {
      await expect(dashboardLandingPage.homeLink).not.toContainText(homelinkText);
      await expect(dashboardLandingPage.calendarLink).not.toContainText(
        calendarlinkText,
      );
      await expect(dashboardLandingPage.clientsLink).not.toContainText(
        clientslinkText,
      );
      await expect(dashboardLandingPage.casesLink).not.toContainText(caseslinkText);
      await expect(dashboardLandingPage.reportsLink).not.toContainText(
        reportslinkText,
      );
      await expect(dashboardLandingPage.helpLink).not.toContainText(helplinkText);
      await expect(dashboardLandingPage.logOutButton).not.toContainText(
        logOutButtonText,
      );
    })

    await test.step('Expanding side menu back', async () => {
      await dashboardLandingPage.navExpandButton.click();
      await expect(dashboardLandingPage.navExpandButton).not.toBeVisible();
      await expect(dashboardLandingPage.navCollapseButton).toBeVisible();
    })

    await test.step('Verify extended state', async () => {
      await expect(dashboardLandingPage.homeLink).toContainText(homelinkText);
      await expect(dashboardLandingPage.calendarLink).toContainText(
        calendarlinkText,
      );
      await expect(dashboardLandingPage.clientsLink).toContainText(
        clientslinkText,
      );
      await expect(dashboardLandingPage.casesLink).toContainText(caseslinkText);
      await expect(dashboardLandingPage.reportsLink).toContainText(
        reportslinkText,
      );
      await expect(dashboardLandingPage.helpLink).toContainText(helplinkText);
      await expect(dashboardLandingPage.logOutButton).toContainText(
        logOutButtonText,
      );
    });

  });
  
  test('Add New Criminal Case through adding Client with ONLY Required data via UI + verifications @smoke', async ({
    page,
    request,
    clientsPage,
    addNewClientPage,
    axeMethods,
    addNewCasePage,
    casesPage,
  }) => {
    // Some data init
    const clientInfoStepLabel: Locator =
      addNewClientPage.getStepLabelByName('Client Information');
    const additionalDetailsStepLabel: Locator =
      addNewClientPage.getStepLabelByName('Additional Details');
    const financialInfoStepLabel: Locator = addNewClientPage.getStepLabelByName(
      'Financial information',
    );
    const clientFirstName = `Aqa_${addNewClientPage.generateRandomSmallCharString(6)}`;
    // const clientLastName = `Last${addNewClientPage.generateRandomSmallCharString(6)}`
    const clientCreationAlert = addNewClientPage.getAlertSnackbarByText(
      'Pre Client have been created successfully',
    );
    const caseTypeStepLabel: Locator =
      addNewCasePage.getStepLabelByName('Case Type');
    const caseDetailsStepLabel: Locator =
      addNewCasePage.getStepLabelByName('Case Details');
    const caseEventsStepLabel: Locator =
      addNewCasePage.getStepLabelByName('Case Events');
    const invalidCaseStepPopulationAlert: Locator =
      addNewCasePage.getAlertSnackbarByText(
        'Some fields on this step are invalid. Please correct them to continue',
      );
    const defaultCriminalCaseData = simpleCriminalCaseExample;

    // Data to be received
    let clientCreationResponse: any;
    let createdCaseId: number;
    let formattedCaseFileNumber: string;

    await test.step('Navigate to the "Clients" page by URL', async () => {
      await clientsPage.navigateByUrl();
    });

    await test.step('Click on "Add New Client" button', async () => {
      await clientsPage.addNewClientBtn.click();
    });

    await test.step('Verify "Add New Client" page is opened properly', async () => {
      await expect(clientInfoStepLabel).toContainClass('Mui-active');
      await expect(additionalDetailsStepLabel).toContainClass('Mui-disabled');
      await expect(financialInfoStepLabel).toContainClass('Mui-disabled');

      // scan
      await axeMethods.findElementAndScanPageState(
        addNewClientPage.pageStepper,
      );
    });

    await test.step('Populate ONLY First name for the client', async () => {
      await addNewClientPage.firstNameInputField.fill(clientFirstName);
    });

    await test.step('Click on "Add Case to Client" and verify transfer', async () => {
      clientCreationResponse =
        await addNewClientPage.clickOnAddCaseToClientAndReturnResponse();
      expect(clientCreationResponse.isSuccess).toBe(true);
    });

    await test.step('Alert Message Verification', async () => {
      await expect(clientCreationAlert).toBeVisible();

      // scan
      await axeMethods.findElementAndScanPageState(clientCreationAlert);
    });

    await test.step('Add Case page verification', async () => {
      expect(page.url()).toContain(
        `/clients/${clientCreationResponse.data}/cases/add`,
      );
      await expect(addNewCasePage.staticPageTitle).toContainText(
        clientFirstName,
      );
      await expect(caseTypeStepLabel).toContainClass('Mui-active');
      await expect(caseDetailsStepLabel).toContainClass('Mui-disabled');
      await expect(caseEventsStepLabel).toContainClass('Mui-disabled');
    });

    await test.step('Invalid Step Population alert triggering', async () => {
      await addNewCasePage.getButtonByName('Next').click();
      await expect(invalidCaseStepPopulationAlert).toBeVisible();

      // scan
      await axeMethods.findElementAndScanPageState(
        invalidCaseStepPopulationAlert,
      );
    });

    await test.step('Populating "Case Matter" section', async () => {
      await addNewCasePage.populateCaseMatterSection(
        defaultCriminalCaseData.matter,
        defaultCriminalCaseData.caseType,
      );
    });

    await test.step('Proper Step Population -> moving to the next step', async () => {
      await addNewCasePage.getButtonByName('Next').click();
      await expect(caseTypeStepLabel).toContainClass('Mui-completed');
      await expect(caseDetailsStepLabel).toContainClass('Mui-active');
      await expect(caseEventsStepLabel).toContainClass('Mui-disabled');

      // scan
      await axeMethods.findElementAndScanPageState(caseDetailsStepLabel);
    });

    await test.step('Populate "Open Date" field', async () => {
      await addNewCasePage.fillComplexDateFieldWithFormattedDate(
        'Open Date',
        addNewCasePage.getTodayDate_MM_DD_YYYY(),
      );
    });

    await test.step('Proper Step Population -> moving to the next step', async () => {
      await addNewCasePage.getButtonByName('Next').click();
      await expect(caseTypeStepLabel).toContainClass('Mui-completed');
      await expect(caseDetailsStepLabel).toContainClass('Mui-completed');
      await expect(caseEventsStepLabel).toContainClass('Mui-active');

      // scan
      await axeMethods.findElementAndScanPageState(caseEventsStepLabel);
    });

    await test.step('Click on "Save And Exit" without setting any data on Optional step', async () => {
      // setting interception
      const addCaseResponsePromise = page.waitForResponse(
        (response) =>
          response.url().endsWith('/api/cases?api-version=1.0') &&
          response.ok(),
      );
      await addNewCasePage.getButtonByName('Save And Exit').click();
      const addCaseResponseInterception = await addCaseResponsePromise;
      const addCaseResponseObj = await addCaseResponseInterception.json();
      expect(addCaseResponseObj.isSuccess).toBe(true);
      createdCaseId = addCaseResponseObj.data;
    });

    await test.step('Created Case Success Alert verification', async () => {
      formattedCaseFileNumber =
        await casesPage.getFormattedCaseFileNumberViaApi(
          request,
          createdCaseId,
        );
      await expect(
        casesPage.getAlertSnackbarByText(
          `Case ${formattedCaseFileNumber} has been created`,
        ),
      ).toBeVisible();
      await expect(page).toHaveURL('/cases');
    });

    await test.step('Filter Cases page by caseFile number and verification', async () => {
      await casesPage.caseNumberFilterField.fill(formattedCaseFileNumber);
    });

    await test.step('Created Case verification within cases table', async () => {
      await expect(casesPage.getRowByCaseId(createdCaseId)).toBeVisible();
      await expect(casesPage.getRowByCaseId(createdCaseId)).toContainText(
        formattedCaseFileNumber,
      );
    });

    await test.step('Side panel scan', async () => {
      const neededRow = casesPage.tableRow
        .filter({ hasText: clientFirstName })
        .first();
      const tabListElement = page.locator('[role="tablist"]');
      await neededRow.click();
      await expect(tabListElement).toBeVisible();

      // scan
      await axeMethods.findElementAndScanPageState(tabListElement);
    });
  });

  test('Create new Case via API + Case page verifications @smoke', async ({
    page,
    request,
    addNewClientPage,
    axeMethods,
    addNewCasePage,
    caseDetailsPage,
  }) => {
    // data init
    let clientData: any;
    let caseData: any;

    await test.step('Navigate to home page', async () => {
      await page.goto(`/`, { waitUntil: 'load' });
    });

    await test.step('Created client via API and get data', async () => {
      clientData =
        await addNewClientPage.createRandomNewClientViaApiAndReturnData(
          request,
        );
    });

    await test.step('Created new FamilyCase for created client via API and get data', async () => {
      caseData =
        await addNewCasePage.createNewFamilyCaseViaApiAndReturnFullData(
          request,
          clientData.nameId,
        );
    });

    await test.step('Navigate to created case details page', async () => {
      await page.goto(`/cases/${caseData.id}/details`, { waitUntil: 'load' });
    });

    await test.step('Case page verification', async () => {
      const formattedCaseFileNumber =
        caseDetailsPage.convertCaseFileNumberToFormattedString(
          caseData.fileNumber,
        );
      await expect(caseDetailsPage.staticPageTitle).toHaveText(
        `Case No. ${formattedCaseFileNumber}`,
      );

      // scan
      await axeMethods.findElementAndScanPageState(
        caseDetailsPage.staticPageTitle,
      );
    });
  });

  test('Create new Case via API + Update Case on UI @smoke', async ({
    page,
    request,
    addNewClientPage,
    axeMethods,
    addNewCasePage,
    caseDetailsPage,
  }) => {
    // data init
    let clientData: any;
    let caseData: any;
    let lookupsData: any;
    const indexToLook = 0; // controls index of data to be taken
    const updatedData = {
      office: undefined,
      intakeType: undefined,
      legalStatus: undefined,
      attorney: undefined,
      court: undefined,
      judge: undefined,
    };
    // special locators
    const caseDetailsSctn = caseDetailsPage.caseDetailsSection;

    await test.step('Navigate to home page', async () => {
      await page.goto(`/`, { waitUntil: 'load' });
    });

    await test.step('Created client via API and get data', async () => {
      clientData =
        await addNewClientPage.createRandomNewClientViaApiAndReturnData(
          request,
        );
    });

    await test.step('Created new FamilyCase for created client via API and get data', async () => {
      caseData =
        await addNewCasePage.createNewFamilyCaseViaApiAndReturnFullData(
          request,
          clientData.nameId,
        );
    });

    await test.step('Navigate to created case details page', async () => {
      await page.goto(`/cases/${caseData.id}/details`, { waitUntil: 'load' });
    });

    await test.step('Case page verification', async () => {
      const formattedCaseFileNumber =
        caseDetailsPage.convertCaseFileNumberToFormattedString(
          caseData.fileNumber,
        );
      await expect(caseDetailsPage.staticPageTitle).toHaveText(
        `Case No. ${formattedCaseFileNumber}`,
      );
    });

    await test.step('Get all lookups values via API', async () => {
      lookupsData = await caseDetailsPage.getLookupsDataViaApi(request);
      // setting needed data for update
      updatedData.office = lookupsData.offices[indexToLook].displayName;
      updatedData.intakeType = lookupsData.intakeTypes[indexToLook].displayName;
      updatedData.legalStatus =
        lookupsData.legalStatuses[indexToLook].displayName;
      updatedData.attorney = lookupsData.allAttorneys[indexToLook].displayName;
      updatedData.court = lookupsData.courts[indexToLook].displayName;
      updatedData.judge = lookupsData.judges[indexToLook].displayName;
    });

    await test.step('Click on "Edit" button within "Case Details" section', async () => {
      await caseDetailsSctn
        .locator(caseDetailsPage.getButtonByName('Edit'))
        .click();
      await expect(
        caseDetailsSctn.locator(caseDetailsPage.getButtonByName('Save')),
      ).toBeVisible();
    });

    await test.step('Populating fields with values', async () => {
      await caseDetailsPage.setValueIntoDropdownInputField(
        caseDetailsPage.getInputFieldLocatorByName('office'),
        updatedData.office,
      );
      await caseDetailsPage.setValueIntoDropdownInputField(
        caseDetailsPage.getInputFieldLocatorByName('intakeType'),
        updatedData.intakeType,
      );
      await caseDetailsPage.setValueIntoDropdownInputField(
        caseDetailsPage.getInputFieldLocatorByName('legalStatus'),
        updatedData.legalStatus,
      );
      await caseDetailsPage.setValueIntoDropdownInputField(
        caseDetailsPage.getInputFieldLocatorByName('attorney'),
        updatedData.attorney,
      );
      await caseDetailsPage.setValueIntoDropdownInputField(
        caseDetailsPage.getInputFieldLocatorByName('court'),
        updatedData.court,
      );
      await caseDetailsPage.setValueIntoDropdownInputField(
        caseDetailsPage.getInputFieldLocatorByName('judge'),
        updatedData.judge,
      );
    });

    await test.step('Click on "Save" and verify Success message', async () => {
      const expectedAlertText = 'Case have been updated successfully';
      await caseDetailsSctn.locator(caseDetailsPage.getButtonByName('Save')).click();
      await expect(caseDetailsPage.anyAlertSnackbar.filter({hasText:expectedAlertText})).toBeVisible();
    })

  });

  test('Navigate to specific Case for Axe scans @accessibility', async ({
    page,
    caseDetailsPage,
    caseClosingFormPage,
    axeMethods,
  }) => {
    // data init
    const preparedCaseId = '2688552363';

    await test.step('Navigate to specific Case page and perform scan', async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        `cases/${preparedCaseId}/details`,
      );
    });

    await test.step('Move to closing Form tab', async () => {
      await caseDetailsPage.closingFormTab.click();
      await page.waitForLoadState('load');
      await expect(caseDetailsPage.closingFormTab).toHaveAttribute(
        'aria-selected',
        'true',
      );

      // Scan
      await axeMethods.findElementAndScanPageState(
        caseClosingFormPage.staticPageTitle,
      );
    });

    await test.step('Expand all sections on Closing form tab', async () => {
      await caseClosingFormPage.namedSectionHeaderExpander('Section 1').click();
      await caseClosingFormPage.namedSectionHeaderExpander('Section 2').click();
      await expect(
        caseClosingFormPage.namedSectionHeaderExpander('Section 1'),
      ).toHaveAttribute('aria-expanded', 'true');
      await expect(
        caseClosingFormPage.namedSectionHeaderExpander('Section 2'),
      ).toHaveAttribute('aria-expanded', 'true');

      // scan
      await axeMethods.findElementAndScanPageState(
        caseClosingFormPage.namedSectionHeaderExpander('Section 2'),
      );
    });
  });

  test('Navigate to specific Client for Axe scans @accessibility', async ({
    clientProfilePage,
    axeMethods,
  }) => {
    // data init
    const preparedClientId = '560137745';

    await test.step('Navigate to specific Client page and perform scan', async () => {
      await axeMethods.navigateToSpecificPageAndPerformScan(
        `clients/${preparedClientId}`,
      );
    });

    await test.step('Scan page for specific locator', async () => {
      await axeMethods.findElementAndScanPageState(
        clientProfilePage.alsoKnownAsButton,
      );
    });

    // Scan Clien page in EDIT
    await test.step('Click on "Edit" button within "Client Details" section', async () => {
      await clientProfilePage.editButton.click();
      await expect(clientProfilePage.saveButton).toBeVisible();
    });

    await test.step('Scan page for specific locator', async () => {
      await axeMethods.findElementAndScanPageState(
        clientProfilePage.saveButton,
      );
    });

  });

  test('Additional specific modals scans on Case Details Page @accessibility', async ({
    page,
    caseDetailsPage,
    axeMethods,
  }) => {
    // data init
    const preparedCaseId = '2688552363';
    const firstAddressButton: Locator = page
      .locator('[id="players"]')
      .locator('button', { hasText: 'Address' })
      .first();
    const unsavedChangesLocator: Locator = page.locator('h6', {
      hasText: 'Unsaved Changes',
    });

    await test.step('Navigate to specific Case page', async () => {
      await page.goto(`/cases/${preparedCaseId}/details`);
    });

    await test.step('Open Address modal and scanning things there', async () => {
      await firstAddressButton.click();
      await caseDetailsPage.anyDialogModal
        .getByText('Choose Reusable Addresses')
        .click();
      await caseDetailsPage
        .getInputFieldLocatorByName('predefinedAddress')
        .click();
      await expect(caseDetailsPage.anyOptionInDropdown.first()).toBeVisible();

      // scan
      await axeMethods.findElementAndScanPageState(
        axeMethods.anyOptionInDropdown.first(),
      );

      // close modal
      await caseDetailsPage.anyDialogModal
        .locator(caseDetailsPage.getButtonByName('Cancel'))
        .click();
    });

    await test.step('Team row adding verifications', async () => {
      const addTeamButton = page
        .locator('[id="teams"]')
        .locator('button', { hasText: 'Team' })
        .first();
      const teamTypeField =
        caseDetailsPage.getInputFieldLocatorByName('teamType');
      await addTeamButton.click();
      await expect(teamTypeField).toBeVisible();

      // scan
      await axeMethods.findElementAndScanPageState(teamTypeField);
    });

    await test.step('Unsaved Modal Scan', async () => {
      await firstAddressButton.click();
      await expect(unsavedChangesLocator).toBeVisible();

      // scan
      await axeMethods.findElementAndScanPageState(unsavedChangesLocator);
    });
  });
});
