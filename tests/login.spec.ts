import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('shows error message on invalid login credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_email@example.com', 'wrongpassword123');

    await expect(loginPage.loginErrorMessage).toBeVisible();
});

test('successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginWithValidUser();

    await expect(loginPage.logoutLink).toBeVisible();
});

test('shows validation error when email is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', 'somepassword123');

    const isValid = await loginPage.loginEmailInput.evaluate(
        (input: HTMLInputElement) => input.validity.valid
    );
    const validationMessage = await loginPage.loginEmailInput.evaluate(
        (input: HTMLInputElement) => input.validationMessage
    );

    expect(isValid).toBe(false);
    expect(validationMessage).not.toBe('');
});

test('shows validation error when password is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('someemail@example.com', '');

    const isValid = await loginPage.loginPasswordInput.evaluate(
        (input: HTMLInputElement) => input.validity.valid
    );
    const validationMessage = await loginPage.loginPasswordInput.evaluate(
        (input: HTMLInputElement) => input.validationMessage
    );

    expect(isValid).toBe(false);
    expect(validationMessage).not.toBe('');
});

test('user can logout and is redirected to login page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginWithValidUser();

    await expect(page.locator('a:has-text("Logout")')).toBeVisible();

    await loginPage.logout();

    await expect(page).toHaveURL(/\/login/);
});