import {Page, Locator, expect} from '@playwright/test'
import {axeScan} from "axe-playwright-report";
import {GlobalActionsAndElements} from "@pages/global-actions-and-elements";

export class AddNewCasePage extends GlobalActionsAndElements {

    // Case type Elements
    readonly caseMatterRadioButtonsGroup:Locator;
    readonly anyRadioButtonContainer:Locator;

    // Case details

    constructor(page: Page) {
        super(page);
        // Case type Elements
        this.caseMatterRadioButtonsGroup = this.page.locator('[role="radiogroup"]'); // The only radiogroup on page
        this.anyRadioButtonContainer = this.page.locator('.MuiRadio-root');

        // Case details


    }

    public getRadiobuttonByValueName(valueName:string):Locator{
        /*** Works with value attribute in Radiobutton input ***/
        return this.anyRadioButtonContainer.filter({has:this.page.locator(`[value="${valueName}"]`)});
    }

    async populateCaseMatterSection(matterRadioBtnValue:string, caseTypeValue:string) {
        await this.getRadiobuttonByValueName(matterRadioBtnValue).click();
        await this.getInputFieldLocatorByName('caseType').click();
        await this.getFirstMatchDropdownOptionLocatorByText(caseTypeValue).click();
    }

}