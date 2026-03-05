import {Page, Locator, expect, APIRequestContext} from '@playwright/test'
import {axeScan} from "axe-playwright-report";
import {GlobalActionsAndElements} from "@pages/global-actions-and-elements";

export class CasesPage extends GlobalActionsAndElements {


    // Filters
    readonly firstNameFilterField:Locator;
    readonly middleNameFilterField:Locator;
    readonly lastNameFilterField:Locator;
    readonly caseNumberFilterField:Locator;

    // Table
    readonly tableRow:Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameFilterField = this.getInputFieldLocatorByName('clientFirstName');
        this.middleNameFilterField = this.getInputFieldLocatorByName('clientMiddleName');
        this.lastNameFilterField = this.getInputFieldLocatorByName('clientLastName');
        this.caseNumberFilterField = this.getInputFieldLocatorByName('fileNumber');

        // Table
        this.tableRow = this.page.locator('.MuiDataGrid-row[role="row"]');
    }


    async getFormattedCaseFileNumberViaApi(request: APIRequestContext,caseId:number) {
        const caseDetailsResponse = await request.get(`${process.env.API_URL}cases/${caseId}?api-version=1.0`,
            {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`,
                },
            },
        );

        expect(caseDetailsResponse.status()).toBe(200);
        const responseObject =  await caseDetailsResponse.json();
        return this.convertCaseFileNumberToFormattedString(responseObject.data.fileNumber);

    }

    public getRowByCaseId(caseId:number) {
        return this.page.locator(`[data-id="${caseId}"]`)
    }

}