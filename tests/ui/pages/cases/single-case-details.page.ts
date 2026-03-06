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
    this.dispositionSection = this.page.locator(
      'data-section-anchor="disposition"',
    );
  }
}
