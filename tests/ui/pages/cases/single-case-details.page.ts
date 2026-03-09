import { Page, Locator, expect, APIRequestContext } from '@playwright/test';
import { axeScan } from 'axe-playwright-report';
import { GlobalActionsAndElements } from '@pages/global-actions-and-elements';

export class SingleCaseDetailsPage extends GlobalActionsAndElements {
  readonly jumpToNavButton: Locator;
  readonly caseDetailsNavButton: Locator;
  readonly expendituresNavButton: Locator;
  readonly sectionsNavigatorDropdown: Locator;

  // tabs
  readonly caseDetailsTab: Locator;
  readonly closingFormTab: Locator;
  readonly docsTab: Locator;

  // sections
  readonly caseDetailsSection: Locator;
  readonly dispositionSection: Locator;

  constructor(page: Page) {
    super(page);
    this.jumpToNavButton = this.getButtonByName('Jump to...');
    this.caseDetailsNavButton = this.page.locator('button', {
      hasText: '💼 Case Details',
    });
    this.expendituresNavButton = this.page.locator('button', {
      hasText: '💸 Expenditures',
    });
    this.sectionsNavigatorDropdown = this.page.locator('ul[role="menu"]');

    // tabs
    this.caseDetailsTab = this.page.locator('#case-tab-details');
    this.closingFormTab = this.page.locator('#case-tab-closing-form');
    this.docsTab = this.page.locator('#case-tab-docs');

    // Sections
    this.caseDetailsSection = this.page.locator('#case-details');
    this.dispositionSection = this.page.locator(
      'data-section-anchor="disposition"',
    );
  }

  async getLookupsDataViaApi(request: APIRequestContext) {
    const lookUpsResponse = await request.get(
      `${process.env.API_URL}lookups?api-version=1.0`,
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`,
        },
      },
    );

    expect(lookUpsResponse.status()).toBe(200);
    return await lookUpsResponse.json();
  }

  async setValueIntoDropdownInputField(field:Locator, exactValueToSet: string) {
    await field.click();
    await this.anyOptionInDropdown.filter({ hasText: exactValueToSet }).first().click();
    await expect(field).toHaveAttribute('value', exactValueToSet);
  }
}
