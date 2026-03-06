import { Page, Locator, expect, APIRequestContext } from '@playwright/test';
import { axeScan } from 'axe-playwright-report';
import { GlobalActionsAndElements } from '@pages/global-actions-and-elements';
import { populatedFamilyCaseExample1 } from '@lib/storage/cases/family-case-storage';

export class AddNewCasePage extends GlobalActionsAndElements {
  // Case type Elements
  readonly caseMatterRadioButtonsGroup: Locator;
  readonly anyRadioButtonContainer: Locator;

  // Case details

  constructor(page: Page) {
    super(page);
    // Case type Elements
    this.caseMatterRadioButtonsGroup = this.page.locator('[role="radiogroup"]'); // The only radiogroup on page
    this.anyRadioButtonContainer = this.page.locator('.MuiRadio-root');

    // Case details
  }

  public getRadiobuttonByValueName(valueName: string): Locator {
    /*** Works with value attribute in Radiobutton input ***/
    return this.anyRadioButtonContainer.filter({
      has: this.page.locator(`[value="${valueName}"]`),
    });
  }

  async populateCaseMatterSection(
    matterRadioBtnValue: string,
    caseTypeValue: string,
  ) {
    await this.getRadiobuttonByValueName(matterRadioBtnValue).click();
    await this.getInputFieldLocatorByName('caseType').click();
    await this.getFirstMatchDropdownOptionLocatorByText(caseTypeValue).click();
  }

  async createNewFamilyCaseViaApiAndReturnFullData(
    request: APIRequestContext,
    clientNameId: string,
  ) {
    /*** Family case payload data needs to be proper and have proper values and fields \
         RETURNS all Case data object WITHOUT "error" and "isSuccess" values
         Requires valid ClientNameId(Client Alias) ***/

    const payloadForCaseCreation = { ...populatedFamilyCaseExample1 };
    const dateToUse = this.getTodayDate_YYYY_MM_DD();
    payloadForCaseCreation.nameId = clientNameId;
    payloadForCaseCreation.openDate = dateToUse;
    payloadForCaseCreation.caseEvents.firstEvent.startDate = dateToUse;
    payloadForCaseCreation.caseEvents.nextEvent.startDate = dateToUse;

    const createCaseResponse = await request.post(
      `${process.env.API_URL}cases?api-version=1.0`,
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`,
          'x-requestid': this.generateX_requestIdForHeaderInApiRequests(),
        },
        data: JSON.stringify(payloadForCaseCreation),
      },
    );

    expect(createCaseResponse.status()).toBe(200);
    const caseId = (await createCaseResponse.json()).data;

    // Get full client data

    const getFullCaseDataResponse = await request.get(
      `${process.env.API_URL}cases/${caseId}?api-version=1.0`,
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`,
        },
      },
    );

    expect(getFullCaseDataResponse.status()).toBe(200);
    const fullCaseDataObj = await getFullCaseDataResponse.json();
    expect(fullCaseDataObj.isSuccess).toBe(true);
    return fullCaseDataObj.data;
  }
}
