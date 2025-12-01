import { test } from '@playwright/test';
import { LoginPage, fixtures } from './fixtures';

test.describe('Authentication - Rate Limiting Tests', () => {
  const BASE_URL = 'https://buggy.justtestit.org';

  test('Should limit login attempts per IP', async ({ page }) => {
    const loginPage = new LoginPage(page);
    let failedAttempts = 0;
    
    for (let i = 0; i < 10; i++) {
      await page.goto(BASE_URL);
      await loginPage.fillUsername('invalid' + i);
      await loginPage.fillPassword('invalid');
      await loginPage.submitLogin();
      
      const errorMsg = await page.locator('text=/error|invalid|unauthorized/i').isVisible();
      if (errorMsg) failedAttempts++;
    }
    
    test.expect(failedAttempts).toBeGreaterThan(0);
  });

  test('Should implement account lockout after failed attempts', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    for (let i = 0; i < 5; i++) {
      await page.goto(BASE_URL);
      await loginPage.fillUsername('bing');
      await loginPage.fillPassword('wrongpass');
      await loginPage.submitLogin();
    }
    
    // Check for lockout message
    const lockedOut = await page.locator('text=/locked|too many|temporarily/i').isVisible();
    test.expect(lockedOut).toBeTruthy();
  });

  test('Should implement exponential backoff', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const timings = [];
    
    for (let i = 0; i < 3; i++) {
      const start = Date.now();
      await page.goto(BASE_URL);
      await loginPage.fillUsername('test');
      await loginPage.fillPassword('test');
      await loginPage.submitLogin();
      const duration = Date.now() - start;
      timings.push(duration);
    }
    
    // Response times should increase with attempts
    test.expect(timings[1]).toBeGreaterThanOrEqual(timings[0]);
  });
});
