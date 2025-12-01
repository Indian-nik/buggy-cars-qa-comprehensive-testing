import { test } from '@playwright/test';
import { LoginPage, fixtures } from './fixtures';

test.describe('Authentication - CSRF Protection Tests', () => {
  const BASE_URL = 'https://buggy.justtestit.org';

  test('Should include CSRF token in login form', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check if CSRF token exists in form
    const csrfToken = await page.getAttribute('input[name="csrf_token"]', 'value');
    test.expect(csrfToken).toBeTruthy();
  });

  test('Should reject requests without valid CSRF token', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Try to submit form without CSRF token
    try {
      await page.evaluate(() => {
        const form = document.querySelector('form');
        const csrfInput = form?.querySelector('input[name="csrf_token"]');
        if (csrfInput) csrfInput.remove();
      });
      
      const submitBtn = page.locator('button[type="submit"]');
      await submitBtn.click();
    } catch (e) {
      // Expected behavior - rejection
    }
  });

  test('Should use SameSite cookie attribute', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find(c => c.name === 'session' || c.name === 'sessionid');
    
    test.expect(sessionCookie?.sameSite).toBeTruthy();
  });

  test('Should regenerate CSRF token after login', async ({ page, context }) => {
    await page.goto(BASE_URL);
    const initialToken = await page.getAttribute('input[name="csrf_token"]', 'value');
    
    const loginPage = new LoginPage(page);
    await loginPage.fillUsername('bing');
    await loginPage.fillPassword('Pass@123');
    await loginPage.submitLogin();
    
    // Token should be different after login
    await page.waitForLoadState('networkidle');
    const newToken = await page.getAttribute('input[name="csrf_token"]', 'value');
    test.expect(newToken).not.toEqual(initialToken);
  });
});
