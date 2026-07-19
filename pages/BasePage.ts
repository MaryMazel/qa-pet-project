import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutLink = page.locator('a:has-text("Logout")');
    }

    async dismissCookieConsent() {
        const consentButton = this.page.locator('.fc-cta-consent, .fc-button.fc-cta-consent');
        if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await consentButton.click();
        }
    }

    async logout() {
        await this.logoutLink.click();
    }
}