import {Page, Locator, expect} from '@playwright/test'
import {axeScan} from "axe-playwright-report";
import {GlobalActionsAndElements} from "@pages/global-actions-and-elements";

export class ClientsPage extends GlobalActionsAndElements {

    readonly addNewClientBtn:Locator;

    constructor(page: Page) {
        super(page);
        // Main Elements
        this.addNewClientBtn = this.getButtonByName('Add new Client');
    }

    async navigateByUrl(){
        await this.page.goto('/clients',{waitUntil:'load'});
    }
}