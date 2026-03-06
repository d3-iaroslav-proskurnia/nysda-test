import { Page, Locator, expect, APIRequestContext } from '@playwright/test';
import { axeScan } from 'axe-playwright-report';
import { GlobalActionsAndElements } from '@pages/global-actions-and-elements';

export class SingleCaseClosingFormPage extends GlobalActionsAndElements {
  readonly sectionExpandableHeaderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionExpandableHeaderButton = this.page.locator(
      '#additional-info-header',
    );
  }

  public namedSectionHeaderExpander(sectionName: string) {
    return this.sectionExpandableHeaderButton.filter({ hasText: sectionName });
  }
}
