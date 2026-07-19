import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async dismissCookieConsent() {
        const consentButton = this.page.locator('.fc-cta-consent, .fc-button.fc-cta-consent');
        if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await consentButton.click();
        }
    }
}