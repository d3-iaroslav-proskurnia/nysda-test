import { expect, type Locator, type Page } from '@playwright/test';
import {GlobalActionsAndElements} from "@pages/global-actions-and-elements";
import {axeScan} from "axe-playwright-report";

export class CalendarPage extends GlobalActionsAndElements {

    readonly createEventButton: Locator;

    // create Event modal
    readonly createSpecialEventModal: Locator;
    readonly eventTypeDropdown: Locator;
    readonly attyDropdown: Locator;
    readonly titleDropdown: Locator;
    readonly startDateField: Locator;
    readonly startDateCalendarBtn: Locator;
    readonly startTmeField: Locator;
    readonly startTimeClockBtn: Locator;
    readonly createBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.createEventButton = this.getButtonByName('Create Event');

        // create Event modal
        this.createSpecialEventModal = this.anyDialogModal.filter({hasText:'Create Special Event'});
        this.eventTypeDropdown = this.createSpecialEventModal.locator(this.getInputFieldLocatorByName('eventType'));
        this.attyDropdown = this.createSpecialEventModal.locator(this.getInputFieldLocatorByName('attorneyCode'));
        this.titleDropdown = this.createSpecialEventModal.locator(this.getInputFieldLocatorByName('title'));
        this.startDateField = this.createSpecialEventModal.locator(this.getComplexFieldContainerLocatorByGroupName('Start Date'))
        this.startDateCalendarBtn = this.startDateField.locator(this.anyCalendarButton);
        this.startTmeField = this.createSpecialEventModal.locator(this.getComplexFieldContainerLocatorByGroupName('Start Time'))
        this.startTimeClockBtn = this.startTmeField.locator(this.anyClockButton);
        this.createBtn = this.createSpecialEventModal.locator('button[type="submit"]');

    }
}