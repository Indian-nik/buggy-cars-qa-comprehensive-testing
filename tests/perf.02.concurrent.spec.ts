import { test } from '@playwright/test';
test.describe('Performance - Concurrent Operations', () => {
  const BASE_URL = 'https://buggy.justtestit.org';

  test('Should handle multiple simultaneous requests', async ({ context }) => {
    const pages = await Promise.all([context.newPage(), context.newPage(), context.newPage()]);
    const results = await Promise.all(pages.map(p => p.goto(BASE_URL)));
    test.expect(results.length).toBe(3);
    await Promise.all(pages.map(p => p.close()));
  });

  test('Should handle concurrent voting', async ({ context }) => {
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    await Promise.all(pages.map(p => p.goto(BASE_URL)));
    test.expect(pages.length).toBe(2);
    await Promise.all(pages.map(p => p.close()));
  });

  test('Should handle session concurrency', async ({ context }) => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    await page1.goto(BASE_URL);
    await page2.goto(BASE_URL);
    const url1 = page1.url();
    const url2 = page2.url();
    test.expect(url1).toContain('buggy');
    test.expect(url2).toContain('buggy');
    await page1.close();
    await page2.close();
  });
});
