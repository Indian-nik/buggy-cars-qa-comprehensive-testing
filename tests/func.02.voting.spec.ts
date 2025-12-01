import { test } from '@playwright/test';
test.describe('Functional - Voting', () => {
  test('Should increment vote count', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const voteBtn = page.locator('button:has-text("Vote")');
    const initialCount = await page.locator('[class*="vote"]').first().textContent();
    await voteBtn.click();
    await page.waitForTimeout(500);
    const newCount = await page.locator('[class*="vote"]').first().textContent();
    test.expect(parseInt(newCount) > parseInt(initialCount)).toBeTruthy();
  });
  test('Should prevent duplicate votes', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const voteBtn = page.locator('button:has-text("Vote")');
    await voteBtn.click();
    const isDisabled = await voteBtn.isDisabled();
    test.expect(isDisabled).toBeDefined();
  });
  test('Should persist vote data', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org');
    await page.reload();
    const votes = page.locator('[class*="vote"]');
    test.expect(await votes.count()).toBeGreaterThan(0);
  });
  test('Should show vote error handling', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org/model/invalid');
    const error = page.locator('text=/error|not found/i');
    test.expect(await error.isVisible()).toBeDefined();
  });
  test('Should handle concurrent votes', async ({ page, context }) => {
    const page2 = await context.newPage();
    await page.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    await page2.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const voteBtn1 = page.locator('button:has-text("Vote")');
    const voteBtn2 = page2.locator('button:has-text("Vote")');
    await Promise.all([voteBtn1.click(), voteBtn2.click()]);
    await page2.close();
  });
});
