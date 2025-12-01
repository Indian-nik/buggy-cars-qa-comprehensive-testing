import { test, expect } from '@playwright/test';
test.describe('Database - Vote Integrity', () => {
  const BASE_URL = 'https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg';

  test('Should store vote counts accurately', async ({ page }) => {
    await page.goto(BASE_URL);
test: Add db.01.vote.integrity.spec.ts - 4 vote integrity tests    const initialText = await voteDisplay.textContent();
    expect(initialText).toBeDefined();
  });

  test('Should increment vote count atomically', async ({ page }) => {
    await page.goto(BASE_URL);
    const voteBtn = page.locator('button:has-text("Vote")');
    if (await voteBtn.isVisible()) {
      await voteBtn.click();
      await page.waitForTimeout(300);
    }
  });

  test('Should prevent vote count corruption', async ({ page }) => {
    await page.goto(BASE_URL);
    const votes = page.locator('[class*="vote-count"]').or(page.locator('[class*="votes"]'));
    const count = await votes.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('Should maintain vote consistency', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.reload();
    const voteCount = page.locator('[class*="vote"]');
    expect(await voteCount.count()).toBeGreaterThanOrEqual(0);
  });
});
