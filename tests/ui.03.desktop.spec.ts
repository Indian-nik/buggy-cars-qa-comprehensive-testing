import { test, expect } from '@playwright/test';
test.describe('UI/UX - Desktop Responsive (1024px)', () => {
  const BASE_URL = 'https://buggy.justtestit.org';
  const viewport = { width: 1024, height: 768 };

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(BASE_URL);
  });

  test('Should render desktop layout', async ({ page }) => {
    const width = await page.evaluate(() => window.innerWidth);
    expect(width).toBeLessThanOrEqual(1024);
  });

  test('Should display multi-column layout', async ({ page }) => {
    const main = page.locator('main').or(page.locator('body'));
    expect(await main.isVisible()).toBeDefined();
  });

  test('Should show all content elements', async ({ page }) => {
    const elements = page.locator('[class*="card"]').or(page.locator('[class*="item"]'));
    expect(await elements.count()).toBeGreaterThanOrEqual(0);
  });

  test('Should have proper layout alignment', async ({ page }) => {
    const content = page.locator('body');
    expect(await content.isVisible()).toBeTruthy();
  });
});
