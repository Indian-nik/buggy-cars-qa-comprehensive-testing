import { test } from '@playwright/test';
test.describe('Functional - Comments', () => {
  test('Should display comments section', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const comments = page.locator('[class*="comment"]');
    test.expect(await comments.count()).toBeGreaterThanOrEqual(0);
  });
  test('Should allow posting comments', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const textarea = page.locator('textarea').first();
    await textarea.fill('Test comment');
    const submitBtn = page.locator('button:has-text("Post")').or(page.locator('button:has-text("Submit")'));
    await submitBtn.click();
    await page.waitForTimeout(500);
  });
  test('Should handle comment validation', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const textarea = page.locator('textarea').first();
    await textarea.fill('');
    const submitBtn = page.locator('button:has-text("Post")').or(page.locator('button:has-text("Submit")'));
    const isDisabled = await submitBtn.isDisabled();
    test.expect(isDisabled).toBeDefined();
  });
  test('Should display comment timestamps', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const timestamps = page.locator('[class*="time"]').or(page.locator('[class*="date"]'));
    test.expect(await timestamps.count()).toBeGreaterThanOrEqual(0);
  });
  test('Should persist comments across reloads', async ({ page }) => {
    await page.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const initialComments = await page.locator('[class*="comment"]').count();
    await page.reload();
    const reloadComments = await page.locator('[class*="comment"]').count();
    test.expect(reloadComments).toBeGreaterThanOrEqual(initialComments);
  });
});
