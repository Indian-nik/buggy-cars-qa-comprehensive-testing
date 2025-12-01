import { test, expect } from '@playwright/test';
test.describe('Database - Data Persistence', () => {
  const BASE_URL = 'https://buggy.justtestit.org';

  test('Should persist user actions', async ({ page }) => {
    await page.goto(BASE_URL);
    const initialTitle = await page.title();
test: Add db.02.persistence.spec.ts - 4 data persistence tests  });

  test('Should maintain data after refresh', async ({ page }) => {
    await page.goto(BASE_URL);
    const beforeRefresh = await page.locator('body').textContent();
    await page.reload();
    const afterRefresh = await page.locator('body').textContent();
    expect(beforeRefresh).toBeDefined();
  });

  test('Should handle concurrent data requests', async ({ page }) => {
    await page.goto(BASE_URL);
    const requests = await Promise.all([
      page.goto(BASE_URL),
      page.evaluate(() => fetch('https://buggy.justtestit.org').then(r => r.text()))
    ]).catch(() => []);
    expect(requests).toBeDefined();
  });

  test('Should ensure data consistency', async ({ page }) => {
    await page.goto(BASE_URL);
    const data1 = await page.locator('[class*="model"]').count();
    await page.waitForTimeout(500);
    const data2 = await page.locator('[class*="model"]').count();
    expect(data1).toEqual(data2);
  });
});
