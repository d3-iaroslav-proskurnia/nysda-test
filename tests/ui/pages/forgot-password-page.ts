import { expect, type Locator, type Page } from '@playwright/test';
import {GlobalActionsAndElements} from "@pages/global-actions-and-elements";
import {axeScan} from "axe-playwright-report";

export class ForgotPasswordPage extends GlobalActionsAndElements {
    readonly Logo: Locator;
    readonly Title: Locator;
    readonly EmailAddressInput: Locator;
    readonly resendPasswordBtn: Locator;
    readonly backToLoginLink: Locator;

    constructor(page: Page) {
        super(page);
        this.Logo = page.locator('img.logo');
        this.Title = page.getByRole('heading', {name: 'Forgot password?'});
        this.EmailAddressInput = page.locator('input[type="email"]');
        this.resendPasswordBtn = page.getByRole('button', { name: 'Reset Password' })
        this.backToLoginLink = page.locator('a[href="/login"]')
    }

    @axeScan()
    async validateControls() {
        await this.page.waitForLoadState('load');
        await expect(this.Logo).toBeVisible();
        await expect(this.Title).toBeVisible();
        await expect(this.EmailAddressInput).toBeVisible();
        await expect(this.resendPasswordBtn).toBeVisible();
        await expect(this.backToLoginLink).toBeVisible();
    }
}
