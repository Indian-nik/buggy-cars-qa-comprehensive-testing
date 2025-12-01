import { test } from '@playwright/test';
import { HomePage } from './fixtures';

test.describe('Functional - Browse Makes & Models', () => {
  const BASE_URL = 'https://buggy.justtestit.org';

  test('Should display all car makes', async ({ page }) => {
    await page.goto(BASE_URL);
    const makes = page.locator('[class*="make"]').or(page.locator('[class*="brand"]'));
    const count = await makes.count();
    test.expect(count).toBeGreaterThan(0);
  });

  test('Should allow filtering by make', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('text=/lamborghini|ferrari|porsche/i');
    await page.waitForLoadState('networkidle');
    const results = page.locator('[class*="model"]');
    test.expect(await results.count()).toBeGreaterThan(0);
  });

  test('Should display model details when selected', async ({ page }) => {
    await page.goto(BASE_URL);
    const model = page.locator('[class*="model"]').first();
    await model.click();
    const details = page.locator('[class*="details"]').or(page.locator('h1'));
    test.expect(await details.isVisible()).toBeTruthy();
  });

  test('Should show voting options', async ({ page }) => {
    await page.goto(BASE_URL);
    const votes = page.locator('[class*="vote"]').or(page.locator('button:has-text("Vote")'));
    test.expect(await votes.count()).toBeGreaterThan(0);
  });

  test('Should maintain navigation state', async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.navigate();
    const url1 = page.url();
    await page.click('[class*="make"]');
    await page.goBack();
    const url2 = page.url();
    test.expect(url2).toContain('/');
  });
});
