import { Page, Locator, expect, APIRequestContext } from '@playwright/test';
import { axeScan } from 'axe-playwright-report';
import { GlobalActionsAndElements } from '@pages/global-actions-and-elements';
import { prePopulatedClient } from '@lib/storage/client-storage';

export class AddNewClientPage extends GlobalActionsAndElements {
  readonly firstNameInputField: Locator;
  readonly lastNameInputField: Locator;

  // footer buttons
  readonly addCaseToClientBtn: Locator;

  constructor(page: Page) {
    super(page);
    // Main Elements
    this.firstNameInputField = this.getInputFieldLocatorByName('firstName');
    this.lastNameInputField = this.getInputFieldLocatorByName('lastName');

    // footer buttons
    this.addCaseToClientBtn = this.getButtonByName('Add case to client');
  }

  async clickOnAddCaseToClientAndReturnResponse() {
    const addClientResponsePromise = this.page.waitForResponse(
      (response) =>
        response.url().endsWith('/api/clients?api-version=1.0') &&
        response.ok(),
    );

    await this.addCaseToClientBtn.click();
    const responseInterception = await addClientResponsePromise;
    return await responseInterception.json();
  }

  async createRandomNewClientViaApiAndReturnData(request: APIRequestContext) {
    /*** Client payload data needs to be proper and have proper values and fields \
          RETURNS all Clients data object WITHOUT "error" and "isSuccess" values ***/

    const payloadForClientCreation = { ...prePopulatedClient };
    payloadForClientCreation.ssn = this.generateRandomNumberProperLength(9);
    payloadForClientCreation.lastName = `Last_${this.generateRandomNumberProperLength(5)}`;
    payloadForClientCreation.firstName = `First_${this.generateRandomNumberProperLength(5)}`;

    const createClientResponse = await request.post(
      `${process.env.API_URL}clients?api-version=1.0`,
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`,
          'x-requestid': this.generateX_requestIdForHeaderInApiRequests(),
        },
        data: JSON.stringify(payloadForClientCreation),
      },
    );

    expect(createClientResponse.status()).toBe(200);
    const clientId = (await createClientResponse.json()).data;

    // Get full client data

    const getFullClientDataResponse = await request.get(
      `${process.env.API_URL}clients/${clientId}?api-version=1.0`,
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`,
        },
      },
    );

    expect(getFullClientDataResponse.status()).toBe(200);
    const fullClientDataObj = await getFullClientDataResponse.json();
    expect(fullClientDataObj.isSuccess).toBe(true);
    return fullClientDataObj.data;
  }
}
