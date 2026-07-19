import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { TestDataGenerator } from '../utils/TestDataGenerator';

test('shows error when registering with an already existing email', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.goto();
    await signupPage.startSignup('Maria Test', process.env.TEST_USER_EMAIL!);

    await expect(signupPage.signupErrorMessage).toBeVisible();
});

test('successfully registers a new user with valid data', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const uniqueEmail = TestDataGenerator.generateUniqueEmail();

    await signupPage.goto();
    await signupPage.startSignup('Test User', uniqueEmail);
    await signupPage.completeRegistration();

    await expect(signupPage.accountCreatedMessage).toBeVisible();
});

test('shows validation errors when required fields are empty on account info form', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const uniqueEmail = TestDataGenerator.generateUniqueEmail();

    await signupPage.goto();
    await signupPage.startSignup('Test User', uniqueEmail);

    // Try to submit without filling password and other required fields
    await signupPage.createAccountButton.click();

    const isPasswordValid = await signupPage.passwordInput.evaluate(
        (input: HTMLInputElement) => input.validity.valid
    );
    const isFirstNameValid = await signupPage.firstNameInput.evaluate(
        (input: HTMLInputElement) => input.validity.valid
    );
    const isAddressValid = await signupPage.addressInput.evaluate(
        (input: HTMLInputElement) => input.validity.valid
    );

    expect(isPasswordValid).toBe(false);
    expect(isFirstNameValid).toBe(false);
    expect(isAddressValid).toBe(false);
});