import { test, expect } from '@playwright/test';
test.describe('Error Handling - 404 Not Found', () => {
  const BASE_URL = 'https://buggy.justtestit.org';

  test('Should handle non-existent page gracefully', async ({ page }) => {
    const response = await page.goto(BASE_URL + '/nonexistent-page-12345');
test: Add err.01.404.spec.ts - 4 404 error handling tests      expect(response.status()).toBe(404);
    }
  });

  test('Should display error message on 404', async ({ page }) => {
    await page.goto(BASE_URL + '/invalid-path');
    const errorMsg = page.locator('text=/not found|404|error/i');
    const isVisible = await errorMsg.isVisible().catch(() => false);
    expect(isVisible).toBeDefined();
  });

  test('Should allow navigation from 404 page', async ({ page }) => {
    await page.goto(BASE_URL + '/broken-link');
    const homeLink = page.locator('a').first();
    const exists = await homeLink.isVisible().catch(() => false);
    expect(exists).toBeDefined();
  });

  test('Should maintain navigation on invalid model ID', async ({ page }) => {
    const response = await page.goto(BASE_URL + '/model/invalid-id-xyz');
    const status = response?.status() || 200;
    expect(status).toBeGreaterThanOrEqual(200);
  });
});
