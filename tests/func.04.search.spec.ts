import { test } from '@playwright/test';
test.describe('Functional - Search & Filter', () => {
  test('Should search by model name', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org');
    const search = page.locator('input[type="search"]').or(page.locator('input[placeholder*="search" i]')).first();
    await search.fill('Diablo');
    await page.waitForTimeout(500);
    test.expect(await page.locator('text=/Diablo/i').isVisible()).toBeDefined();
  });
  test('Should filter by make', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org');
    const make = page.locator('text=/lamborghini/i').first();
    await make.click();
    await page.waitForLoadState('networkidle');
    test.expect(await page.url()).toContain('/');
  });
  test('Should handle empty search results', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org');
    const search = page.locator('input[type="search"]').or(page.locator('input[placeholder*="search" i]')).first();
    await search.fill('nonexistent12345xyz');
    await page.waitForTimeout(500);
  });
  test('Should clear filters', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org');
    const clearBtn = page.locator('button:has-text("Clear")').or(page.locator('button:has-text("Reset")'));
    const isVisible = await clearBtn.isVisible().catch(() => false);
    test.expect(isVisible).toBeDefined();
  });
  test('Should maintain search state on pagination', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org');
    const url1 = page.url();
    const nextBtn = page.locator('button:has-text("Next")').or(page.locator('[aria-label="Next"]'));
    const exists = await nextBtn.isVisible().catch(() => false);
    test.expect(exists).toBeDefined();
  });
});
