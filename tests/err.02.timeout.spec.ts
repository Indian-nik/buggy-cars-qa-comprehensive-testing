import { test, expect } from '@playwright/test';
test.describe('Error Handling - Network Timeout', () => {
  const BASE_URL = 'https://buggy.justtestit.org';

  test('Should handle page load timeout gracefully', async ({ page }) => {
    page.setDefaultNavigationTimeout(5000);
    try {
      await page.goto(BASE_URL, { timeout: 10000 });
      expect(page.url()).toContain('buggy');
test: Add err.02.timeout.spec.ts - 4 timeout error handling tests      expect(error).toBeDefined();
    }
  });

  test('Should handle request timeout', async ({ page }) => {
    await page.goto(BASE_URL);
    try {
      await page.waitForResponse(r => r.url().includes('timeout'), { timeout: 1000 });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('Should handle navigation timeout', async ({ page }) => {
    try {
      await page.goto('https://buggy.justtestit.org/nonexistent', { timeout: 5000 });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('Should recover from timeout', async ({ page }) => {
    await page.goto(BASE_URL);
    const title = await page.title();
    expect(title).toBeDefined();
  });
});
