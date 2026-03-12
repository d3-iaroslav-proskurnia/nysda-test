import { Page, Locator, expect, APIRequestContext } from '@playwright/test';
import { axeScan } from 'axe-playwright-report';
import { GlobalActionsAndElements } from '@pages/global-actions-and-elements';
import { populatedFamilyCaseExample1 } from '@lib/storage/cases/family-case-storage';
import {AddNewContactData} from "@lib/storage/cases/add-new-contact-data-storage";

export class AddNewCasePage extends GlobalActionsAndElements {

  constructor(page: Page) {
    super(page);

  }

  async addNewAddressInAddressModal(contactData: AddNewContactData){
    /*** Populates Address data from properly received object ***/
    await this.getInputFieldLocatorByName('addressLine1').fill(contactData.address1);
    if (contactData.address2){
      await this.getInputFieldLocatorByName('addressLine2').fill(contactData.address2);
    }
    await this.getInputFieldLocatorByName('city').fill(contactData.city);
    await this.getInputFieldLocatorByName('state').fill(contactData.state);
    await this.getInputFieldLocatorByName('zipCode').fill(contactData.zipCode);

    // click on save
    await this.anyDialogModal.locator(this.getButtonByName('Save')).click();
  }

  async addNewPhoneNumberInAddPhoneModal(contactData: AddNewContactData){
    /*** Populates Phone data from properly received object ***/
    await this.getInputFieldLocatorByName('newEntry.number').fill(contactData.phoneNumber);
    if (contactData.phoneType){
      await this.getInputFieldLocatorByName('newEntry.type').fill(contactData.phoneType);
    }
    if (contactData.acceptText === true){
      await this.getCheckboxByName('newEntry.acceptText').click(); // default is unchecked
    }

    // click on save
    await this.anyDialogModal.locator(this.getButtonByName('Save')).click();
  }

  async populateCaseMatterSection(
    matterRadioBtnValue: string,
    caseTypeValue: string,
  ) {
    await this.getRadiobuttonByValueName(matterRadioBtnValue).click();
    await this.getInputFieldLocatorByName('caseType').click();
    await this.getFirstMatchDropdownOptionLocatorByText(caseTypeValue).click();
  }

  async populateLegalPersonnelSection(attorneyNameValue: string, judgeNameValue:string,courtNameValue:string,daNameValue:string) {
    await this.getInputFieldLocatorByName('attorney').click();
    await this.getFirstMatchDropdownOptionLocatorByText(attorneyNameValue).click();
    await this.getInputFieldLocatorByName('judge').click();
    await this.getFirstMatchDropdownOptionLocatorByText(judgeNameValue).click();
    await this.getInputFieldLocatorByName('court').click();
    await this.getFirstMatchDropdownOptionLocatorByText(courtNameValue).click();
    await this.getInputFieldLocatorByName('ada').click();
    await this.getFirstMatchDropdownOptionLocatorByText(daNameValue).click();
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
