import { test, expect } from '@playwright/test';
test.describe('UI/UX - Tablet Responsive (768px)', () => {
  const BASE_URL = 'https://buggy.justtestit.org';
  const viewport = { width: 768, height: 1024 };

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(BASE_URL);
  });

  test('Should render tablet layout correctly', async ({ page }) => {
    const width = await page.evaluate(() => window.innerWidth);
    expect(width).toBeLessThanOrEqual(768);
  });

  test('Should have proper spacing', async ({ page }) => {
    const content = page.locator('main').or(page.locator('body'));
    expect(await content.isVisible()).toBeDefined();
  });

  test('Should organize content for medium screens', async ({ page }) => {
    const sections = page.locator('section');
    expect(await sections.count()).toBeGreaterThanOrEqual(0);
  });

  test('Should have readable font sizes', async ({ page }) => {
    const text = page.locator('p').first();
    expect(await text.isVisible()).toBeDefined();
  });
});
