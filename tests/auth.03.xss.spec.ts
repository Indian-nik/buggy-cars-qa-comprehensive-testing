import { test } from '@playwright/test';
import { LoginPage, fixtures } from './fixtures';

test.describe('Authentication - XSS Vulnerability Tests', () => {
  let loginPage: LoginPage;
  const BASE_URL = 'https://buggy.justtestit.org';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
  });

  test('Should sanitize XSS payload in username field', async ({ page }) => {
    const xssPayload = "<script>alert('XSS')</script>";
    await loginPage.fillUsername(xssPayload);
    await loginPage.fillPassword('Pass@123');
    await loginPage.submitLogin();
    
    // Check for console errors or alert dialogs
    let alertFired = false;
    page.on('dialog', () => { alertFired = true; });
    
    test.expect(alertFired).toBeFalsy();
  });

  test('Should prevent event handler XSS in password field', async ({ page }) => {
    const xssPayload = '" onmouseover="alert("XSS")';
    await loginPage.fillUsername('bing');
    await loginPage.fillPassword(xssPayload);
    await loginPage.submitLogin();
    
    const pageContent = await page.content();
    test.expect(pageContent).not.toContain('onmouseover');
  });

  test('Should escape HTML entities in auth forms', async ({ page }) => {
    const xssPayload = '<img src=x onerror="alert(1)">';
    await loginPage.fillUsername(xssPayload);
    await loginPage.fillPassword('Pass@123');
    await loginPage.submitLogin();
    
    const pageSource = await page.content();
    test.expect(pageSource).not.toContain('onerror=');
  });

  test('Should prevent DOM-based XSS attacks', async ({ page }) => {
    const xssPayload = 'javascript:alert(1)';
    await loginPage.fillUsername('bing');
    await loginPage.fillPassword(xssPayload);
    await loginPage.submitLogin();
    
    // Check if javascript: protocol is blocked
    const pageUrl = page.url();
    test.expect(pageUrl).not.toContain('javascript:');
  });

  test('Should handle SVG/XML-based XSS attempts', async ({ page }) => {
    const svgXss = '<svg onload="alert(1)">';
    await loginPage.fillUsername(svgXss);
    await loginPage.fillPassword('Pass@123');
    await loginPage.submitLogin();
    
    const content = await page.content();
    test.expect(content).not.toContain('onload=');
  });
});
