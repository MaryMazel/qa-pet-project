import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('homepage loads and displays logo', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await expect(page).toHaveTitle(/Automation Exercise/);
  await expect(homePage.logo).toBeVisible();
});