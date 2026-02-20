import {Page, Locator, expect} from '@playwright/test'
import {axeScan} from "axe-playwright-report";
import {GlobalActionsAndElements} from "@pages/global-actions-and-elements";

export class Axe_accessability_Methods extends GlobalActionsAndElements {


    constructor(page: Page) {
        super(page);
        // Main Elements
    }

    @axeScan()
    public async navigateToSpecificPageAndPerformScan(urlAddress:string){
        await this.page.goto(`/${urlAddress}`,{waitUntil:'load'})
        await this.page.waitForTimeout(1000);
    }

    @axeScan()
    public async findElementAndScanPageState(elementToFind:Locator){
        await expect(elementToFind).toBeVisible();
        await this.page.waitForTimeout(1000);
    }
}