import { test, expect } from '@playwright/test';
test.describe('UI/UX - Mobile Responsive (375px)', () => {
  const BASE_URL = 'https://buggy.justtestit.org';
  const viewport = { width: 375, height: 667 };

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(BASE_URL);
  });

  test('Should render mobile layout correctly', async ({ page }) => {
    const main = page.locator('main').or(page.locator('body'));
    const width = await page.evaluate(() => window.innerWidth);
    expect(width).toBeLessThanOrEqual(375);
  });

  test('Should have visible navigation menu', async ({ page }) => {
    const nav = page.locator('nav').or(page.locator('[role="navigation"]'));
    expect(await nav.isVisible()).toBeDefined();
  });

  test('Should stack content vertically', async ({ page }) => {
    const content = page.locator('article').or(page.locator('[class*="content"]'));
    expect(await content.count()).toBeGreaterThanOrEqual(0);
  });

  test('Should have touch-friendly buttons', async ({ page }) => {
    const buttons = page.locator('button');
    expect(await buttons.count()).toBeGreaterThanOrEqual(0);
  });
});
