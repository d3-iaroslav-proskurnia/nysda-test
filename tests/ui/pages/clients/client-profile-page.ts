import {Page, Locator, expect, APIRequestContext} from '@playwright/test'
import {axeScan} from "axe-playwright-report";
import {GlobalActionsAndElements} from "@pages/global-actions-and-elements";

export class ClientProfilePage extends GlobalActionsAndElements {

    readonly alsoKnownAsButton:Locator

    constructor(page: Page) {
        super(page);
        this.alsoKnownAsButton = this.getButtonByName('Also known as');

    }

}