import {Page, Locator, expect} from '@playwright/test'
import {axeScan} from "axe-playwright-report";

export class Axe_accessability_Methods{
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
        // Main Top Nav Elements
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