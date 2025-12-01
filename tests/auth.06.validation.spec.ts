import { test } from '@playwright/test';
import { LoginPage } from './fixtures';

test.describe('Authentication - Input Validation Tests', () => {
  const BASE_URL = 'https://buggy.justtestit.org';
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
  });

  test('Should reject empty username', async ({ page }) => {
    await loginPage.fillUsername('');
    await loginPage.fillPassword('Pass@123');
    await loginPage.submitLogin();
    
    const error = page.locator('text=/required|empty/i');
    test.expect(await error.isVisible()).toBeTruthy();
  });

  test('Should reject empty password', async ({ page }) => {
    await loginPage.fillUsername('bing');
    await loginPage.fillPassword('');
    await loginPage.submitLogin();
    
    const error = page.locator('text=/required|empty/i');
    test.expect(await error.isVisible()).toBeTruthy();
  });

  test('Should validate username length', async ({ page }) => {
    const longUsername = 'a'.repeat(300);
    await loginPage.fillUsername(longUsername);
    await loginPage.fillPassword('Pass@123');
    await loginPage.submitLogin();
    
    const inputField = await page.inputValue('input[name="username"]');
    test.expect(inputField.length).toBeLessThanOrEqual(255);
  });

  test('Should sanitize special characters in input', async ({ page }) => {
    const specialChars = '<script>alert(1)</script>';
    await loginPage.fillUsername(specialChars);
    await loginPage.fillPassword('Pass@123');
    await loginPage.submitLogin();
    
    const pageSource = await page.content();
    test.expect(pageSource).not.toContain('<script>');
  });
});
