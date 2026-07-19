import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupPage extends BasePage {
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly signupButton: Locator;
    readonly signupErrorMessage: Locator;

    readonly passwordInput: Locator;
    readonly daySelect: Locator;
    readonly monthSelect: Locator;
    readonly yearSelect: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreatedMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = page.locator('input[data-qa="signup-name"]');
        this.emailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');
        this.signupErrorMessage = page.locator('p:has-text("Email Address already exist!")');

        this.passwordInput = page.locator('input[data-qa="password"]');
        this.daySelect = page.locator('select[data-qa="days"]');
        this.monthSelect = page.locator('select[data-qa="months"]');
        this.yearSelect = page.locator('select[data-qa="years"]');
        this.firstNameInput = page.locator('input[data-qa="first_name"]');
        this.lastNameInput = page.locator('input[data-qa="last_name"]');
        this.addressInput = page.locator('input[data-qa="address"]');
        this.countrySelect = page.locator('select[data-qa="country"]');
        this.stateInput = page.locator('input[data-qa="state"]');
        this.cityInput = page.locator('input[data-qa="city"]');
        this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('button[data-qa="create-account"]');
        this.accountCreatedMessage = page.locator('h2:has-text("Account Created!")');
    }

    async goto() {
        await this.page.goto('https://automationexercise.com/login');
        await this.dismissCookieConsent();
    }

    async startSignup(name: string, email: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();
    }

    async completeRegistration() {
        await this.passwordInput.fill('TestPass123!');
        await this.daySelect.selectOption('10');
        await this.monthSelect.selectOption('5');
        await this.yearSelect.selectOption('1995');
        await this.firstNameInput.fill('Test');
        await this.lastNameInput.fill('User');
        await this.addressInput.fill('123 Test Street');
        await this.countrySelect.selectOption('Canada');
        await this.stateInput.fill('Ontario');
        await this.cityInput.fill('Toronto');
        await this.zipcodeInput.fill('M5H 2N2');
        await this.mobileNumberInput.fill('+15551234567');
        await this.createAccountButton.click();
    }
}