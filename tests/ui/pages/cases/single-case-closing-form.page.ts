import { Page } from '@playwright/test';
import { GlobalActionsAndElements } from '@pages/global-actions-and-elements';

export class SingleCaseClosingFormPage extends GlobalActionsAndElements {
  constructor(page: Page) {
    super(page);
  }

  public namedSectionHeaderExpander(sectionName: string) {
    return this.page.getByRole('button', { name: sectionName });
  }
}
