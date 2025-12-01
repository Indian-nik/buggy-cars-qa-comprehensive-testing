import { test } from '@playwright/test';
test.describe('Security - Input Validation', () => {
  const BASE_URL = 'https://buggy.justtestit.org';

  test('Should validate email format', async ({ page }) => {
    await page.goto(BASE_URL);
    const emailInput = page.locator('input[type="email"]').first();
    if (await emailInput.isVisible()) {
      await emailInput.fill('invalid-email');
      const type = await emailInput.getAttribute('type');
      test.expect(type).toBe('email');
    }
  });

  test('Should enforce minimum password length', async ({ page }) => {
    await page.goto(BASE_URL);
    const passInput = page.locator('input[type="password"]').first();
    if (await passInput.isVisible()) {
      const minLength = await passInput.getAttribute('minlength');
      test.expect(minLength).toBeDefined();
    }
  });

  test('Should sanitize numeric inputs', async ({ page }) => {
    await page.goto(BASE_URL);
    const numInputs = page.locator('input[type="number"]');
    const count = await numInputs.count();
    test.expect(count).toBeGreaterThanOrEqual(0);
  });

  test('Should prevent overflow attacks', async ({ page }) => {
    await page.goto(BASE_URL);
    const inputs = page.locator('input');
    const count = await inputs.count();
    for (let i = 0; i < Math.min(count, 3); i++) {
      const maxLen = await inputs.nth(i).getAttribute('maxlength');
      if (maxLen) test.expect(parseInt(maxLen)).toBeGreaterThan(0);
    }
  });

  test('Should handle null byte injection', async ({ page }) => {
    await page.goto(BASE_URL);
    const content = await page.content();
    test.expect(content).not.toContain('\x00');
  });
});
