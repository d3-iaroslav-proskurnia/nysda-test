import {Page, Locator, expect} from '@playwright/test'
import {axeScan} from "axe-playwright-report";
import {GlobalActionsAndElements} from "@pages/global-actions-and-elements";

export class AddNewClientPage extends GlobalActionsAndElements {


    readonly firstNameInputField:Locator;
    readonly lastNameInputField:Locator;

    // footer buttons
    readonly addCaseToClientBtn:Locator;

    constructor(page: Page) {
        super(page);
        // Main Elements
        this.firstNameInputField = this.getInputFieldLocatorByName('firstName');
        this.lastNameInputField = this.getInputFieldLocatorByName('lastName');

        // footer buttons
        this.addCaseToClientBtn = this.getButtonByName('Add case to client');

    }

    async clickOnAddCaseToClientAndReturnResponse(){
        const addClientResponsePromise = this.page.waitForResponse(
            (response) => response.url().endsWith('/api/clients?api-version=1.0') && response.ok(),
        );

       await this.addCaseToClientBtn.click();
       const responseInterception = await addClientResponsePromise;
       return await responseInterception.json();
    }


}