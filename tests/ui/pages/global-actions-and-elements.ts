import {Page, Locator, expect} from '@playwright/test'

export class GlobalActionsAndElements {
    readonly page: Page;
    readonly anyButton: Locator;
    readonly anyDialogModal: Locator;
    readonly anyInnerDialogModal: Locator;
    readonly anyOptionInDropdown: Locator;
    readonly anyCalendarButton: Locator;
    readonly anyClockButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.anyButton = this.page.locator('button[type="button"]');
        this.anyDialogModal = this.page.locator('[role="dialog"]');
        this.anyInnerDialogModal = this.page.locator('[role="dialog"][data-popper-placement]');
        this.anyOptionInDropdown = this.page.locator('[role="option"]');
        this.anyCalendarButton = this.page.locator('[aria-label="Choose date"]');
        this.anyClockButton = this.page.locator('[aria-label="Choose time"]');

    }

    public getInputFieldLocatorByName(inputFieldName: string): Locator {
        return this.page.locator(`input[name="${inputFieldName}"]`)
    }

    public getFirstMatchDropdownOptionLocatorByText(optionText:string){
        /*** return 1st matched option in dropdown list that matches the text provided
         Could work improperly if same text value of option is NOT unique within options ***/

        return this.page.locator('[role="option"]',{hasText:optionText}).first();
    }

    public getComplexFieldContainerLocatorByGroupName(groupName:string){
        return this.page.getByRole('group', { name: groupName });
    }

    public getTodayDate(){
        /*** returns date in format YYYY-MM-DD (2026-02-26) ***/
        return new Date().toISOString().split('T')[0];
    }
}