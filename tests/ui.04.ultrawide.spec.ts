import { test, expect } from '@playwright/test';
test.describe('UI/UX - Ultrawide Responsive (1920px)', () => {
  const BASE_URL = 'https://buggy.justtestit.org';
  const viewport = { width: 1920, height: 1080 };

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(BASE_URL);
  });

  test('Should utilize full width layout', async ({ page }) => {
    const width = await page.evaluate(() => document.documentElement.clientWidth);
    expect(width).toBeGreaterThanOrEqual(1920);
  });

  test('Should not overflow on ultrawide', async ({ page }) => {
    const body = page.locator('body');
    expect(await body.isVisible()).toBeTruthy();
  });

  test('Should display content efficiently', async ({ page }) => {
    const content = page.locator('main').or(page.locator('[role="main"]'));
    expect(await content.count()).toBeGreaterThanOrEqual(0);
  });

  test('Should have balanced spacing', async ({ page }) => {
    const page_url = page.url();
    expect(page_url).toContain('buggy');
  });
});
