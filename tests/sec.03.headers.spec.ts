import { test } from '@playwright/test';
test.describe('Security - HTTP Headers', () => {
  const BASE_URL = 'https://buggy.justtestit.org';

  test('Should set Content-Security-Policy header', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    const csp = response?.headers()['content-security-policy'] || response?.headers()['x-webkit-csp'];
    test.expect(csp).toBeDefined();
  });

  test('Should set X-Frame-Options header', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    const frameOpt = response?.headers()['x-frame-options'];
    test.expect(frameOpt).toBeDefined();
  });

  test('Should set X-Content-Type-Options', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    const contentType = response?.headers()['x-content-type-options'];
    test.expect(contentType).toBeDefined();
  });

  test('Should set Strict-Transport-Security', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    const hsts = response?.headers()['strict-transport-security'];
    test.expect(hsts).toBeDefined();
  });
});
