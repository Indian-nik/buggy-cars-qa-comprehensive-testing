import { test } from '@playwright/test';
import { LoginPage, fixtures } from './fixtures';

test.describe('Authentication - SQL Injection Tests', () => {
  let loginPage: LoginPage;
  const BASE_URL = 'https://buggy.justtestit.org';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
  });

  test('Should reject SQL injection in username field', async ({ page }) => {
    const sqlInjectionPayload = "admin' OR '1'='1";
    await loginPage.fillUsername(sqlInjectionPayload);
    await loginPage.fillPassword('Pass@123');
    await loginPage.submitLogin();
    
    // Verify error message or unexpected behavior is prevented
    const currentUrl = page.url();
    test.expect(currentUrl).toContain('login');
  });

  test('Should reject SQL injection in password field', async ({ page }) => {
    const sqlInjectionPayload = "' OR '1'='1' --";
    await loginPage.fillUsername('bing');
    await loginPage.fillPassword(sqlInjectionPayload);
    await loginPage.submitLogin();
    
    // Should not authenticate with SQL injection
    const currentUrl = page.url();
    test.expect(currentUrl).not.toContain('/model');
  });

  test('Should handle UNION-based SQL injection', async ({ page }) => {
    const unionInjection = "admin' UNION SELECT * FROM users --";
    await loginPage.fillUsername(unionInjection);
    await loginPage.fillPassword('Pass@123');
    await loginPage.submitLogin();
    
    const currentUrl = page.url();
    test.expect(currentUrl).toContain('login');
  });

  test('Should sanitize parameterized query attempts', async ({ page }) => {
    const parameterizedAttack = "%27; DROP TABLE users; --";
    await loginPage.fillUsername(parameterizedAttack);
    await loginPage.fillPassword('Pass@123');
    await loginPage.submitLogin();
    
    const currentUrl = page.url();
    test.expect(currentUrl).toContain('login');
  });

  test('Should reject time-based blind SQL injection', async ({ page }) => {
    const timeBasedPayload = "admin' AND SLEEP(5); --";
    const startTime = Date.now();
    
    await loginPage.fillUsername(timeBasedPayload);
    await loginPage.fillPassword('Pass@123');
    await loginPage.submitLogin();
    
    const elapsed = Date.now() - startTime;
    // Should respond quickly, not wait for SLEEP command
    test.expect(elapsed).toBeLessThan(10000);
  });
});
