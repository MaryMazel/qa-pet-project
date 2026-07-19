import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly logo: Locator;

    constructor(page: Page) {
        super(page);
        this.logo = page.locator('img[alt="Website for automation practice"]');
    }

    async goto() {
        await this.page.goto('https://automationexercise.com');
        await this.dismissCookieConsent();
    }
}