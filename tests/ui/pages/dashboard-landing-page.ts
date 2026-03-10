import { expect, type Locator, type Page } from '@playwright/test';
import { GlobalActionsAndElements } from '@pages/global-actions-and-elements';
import { axeScan } from 'axe-playwright-report';

export class DashboardLandingPage extends GlobalActionsAndElements {
  // side panel
  readonly navCollapseButton: Locator;
  readonly navExpandButton: Locator;
  readonly homeLink: Locator;
  readonly calendarLink: Locator;
  readonly clientsLink: Locator;
  readonly casesLink: Locator;
  readonly reportsLink: Locator;
  readonly adminLink: Locator;
  readonly helpLink: Locator;
  readonly logOutButton: Locator;

  constructor(page: Page) {
    super(page);
    //side panel
    this.navCollapseButton = this.page.locator('button[aria-label="Collapse"]');
    this.navExpandButton = this.page.locator('button[aria-label="Expand"]');
    this.homeLink = this.page.locator('a[href="/"]');
    this.calendarLink = this.page.locator('a[href="/calendar"]');
    this.clientsLink = this.page.locator('a[href="/clients"]');
    this.casesLink = this.page.locator('a[href="/cases"]');
    this.reportsLink = this.page.locator('a[href="/reports"]');
    this.adminLink = this.page.locator('a[href="/admin"]');
    this.helpLink = this.page.locator('a[href="/help"]');
    this.logOutButton = this.page.locator('[aria-label="Log out"] button');
  }
}
