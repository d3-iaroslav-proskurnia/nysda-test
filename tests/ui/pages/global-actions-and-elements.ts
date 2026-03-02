import {Page, Locator, expect} from '@playwright/test'

export class GlobalActionsAndElements {
    readonly page: Page;
    readonly staticPageTitle:Locator;
    // buttons
    readonly anyButton: Locator;

    // dialogs and Modals
    readonly anyDialogModal: Locator;
    readonly anyInnerDialogModal: Locator;

    // dropdowns
    readonly anyOptionInDropdown: Locator;

    // Calendar and clock buttons
    readonly anyCalendarButton: Locator;
    readonly anyClockButton: Locator;

    // alerts
    readonly anyAlertSnackbar: Locator;

    // page stepper
    readonly pageStepper:Locator
    readonly stepLabelOnStepper:Locator

    constructor(page: Page) {
        this.page = page;
        this.staticPageTitle = page.locator('h5.MuiTypography-h5').first(); // always first

        // buttons
        this.anyButton = this.page.locator('button[type="button"]');

        // dialogs and Modals
        this.anyDialogModal = this.page.locator('[role="dialog"]');
        this.anyInnerDialogModal = this.page.locator('[role="dialog"][data-popper-placement]');

        // dropdowns
        this.anyOptionInDropdown = this.page.locator('[role="option"]');

        // Calendar and clock buttons
        this.anyCalendarButton = this.page.locator('[aria-label="Choose date"]');
        this.anyClockButton = this.page.locator('[aria-label="Choose time"]');

        // page stepper
        this.pageStepper = this.page.locator('.MuiStepper-root.MuiStepper-horizontal');
        this.stepLabelOnStepper = this.pageStepper.locator('.MuiStepLabel-label');

        // alerts
        this.anyAlertSnackbar = this.page.locator('[role="alert"]');

    }

    public generateRandomNumberProperLength(stringLength: number) {
        let result: string = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < stringLength) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter++;
        }
        return result;
    }

    public generateRandomSmallCharString(stringLength: number) {
        let result: string = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < stringLength) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter++;
        }
        return result;
    }

    public getTodayDate_YYYY_MM_DD(){
        /*** returns date in format YYYY-MM-DD (2026-02-26)  ***/
        return new Date().toISOString().split('T')[0];
    }

    public getTodayDate_MM_DD_YYYY(){
        /*** returns date in format MM/DD/YYYY (03/02/2026) ***/
        const today = new Date();
        return new Intl.DateTimeFormat('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        }).format(today);
    }

    public convertCaseFileNumberToFormattedString(caseFileNumberString: string): string {
        /*** Convert fileNumber string from "2551037" to "25-51037" ***/
        return caseFileNumberString.slice(0, 2) + "-" + caseFileNumberString.slice(2);
    }

    public getInputFieldLocatorByName(inputFieldName: string): Locator {
        /*** To use properly need to pass the name(text) of element's name attribute as "inputFieldName" parameter ***/
        return this.page.locator(`input[name="${inputFieldName}"]`)
    }

    public getFirstMatchDropdownOptionLocatorByText(optionText:string){
        /*** return 1st matched option in dropdown list that matches the text provided
         Could work improperly if same text value of option is NOT unique within options ***/
        return this.page.locator('[role="option"]',{hasText:optionText}).first();
    }

    public getComplexFieldContainerLocatorByGroupName(groupName:string){
        /*** To use properly need to pass the name(text) within label as "groupName" parameter ***/
        return this.page.getByRole('group', { name: groupName });
    }

    async fillComplexDateFieldWithFormattedDate(groupName:string, formattedDate:string){
        /*** Works after focusing on Month mask (should be first) and TYPING Formatted date
         Expected date format =  MM/DD/YYYY (03/02/2026)
         ***/
       await this.getComplexFieldContainerLocatorByGroupName(groupName).click();
       await this.getComplexFieldContainerLocatorByGroupName(groupName).getByLabel('Month').pressSequentially(formattedDate);
    }

    public getStepLabelByName(stepName: string): Locator {
        /*** To use properly need to pass the name(text) "step" in stepper as "stepName" parameter ***/
        return this.stepLabelOnStepper.filter({hasText:stepName}).first();
    }

    public getAlertSnackbarByText(textInAlert: string): Locator {
        /*** To use properly need to pass the text in alert of SnackBar type as "textInAlert" parameter ***/
        return this.anyAlertSnackbar.filter({hasText:textInAlert}).first();
    }

    public getButtonByName(buttonName: string): Locator {
        /*** To use properly need to pass the text in Button as "buttonName" parameter ***/
        return this.anyButton.filter({hasText:buttonName}).first();
    }


}