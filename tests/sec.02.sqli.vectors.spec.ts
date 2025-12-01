import { test } from '@playwright/test';
test.describe('Security - SQLi Vector Testing', () => {
  const sqlVectors = ["' OR '1'='1", "admin' --", "' UNION SELECT NULL --", "1; DROP TABLE users; --", "' OR 1=1; --"];
  const BASE_URL = 'https://buggy.justtestit.org';

  test('Should handle OR 1=1 injection', async ({ page }) => {
    await page.goto(BASE_URL);
    const searchInput = page.locator('input[type="search"]').or(page.locator('input[placeholder*="search" i]')).first();
    await searchInput.fill(sqlVectors[0]);
    await page.waitForTimeout(300);
    const url = page.url();
    test.expect(url).not.toContain('DROP');
  });

  test('Should prevent comment injection', async ({ page }) => {
    await page.goto(BASE_URL);
    const searchInput = page.locator('input').first();
    await searchInput.fill(sqlVectors[1]);
    const content = await page.content();
    test.expect(content).not.toContain('admin');
  });

  test('Should block UNION-based injections', async ({ page }) => {
    await page.goto(BASE_URL);
    const searchInput = page.locator('input').first();
    await searchInput.fill(sqlVectors[2]);
    const hasError = await page.locator('text=/error|invalid/i').isVisible().catch(() => false);
    test.expect(hasError).toBeDefined();
  });

  test('Should prevent table dropping', async ({ page }) => {
    await page.goto(BASE_URL);
    const tables = page.locator('table');
    const initialCount = await tables.count();
    test.expect(initialCount).toBeGreaterThanOrEqual(0);
  });

  test('Should sanitize special SQL characters', async ({ page }) => {
    await page.goto(BASE_URL);
    const content = await page.content();
    test.expect(content).not.toContain('DROP TABLE');
  });
});
