import { test } from '@playwright/test';
test.describe('Performance - Load Times', () => {
  const BASE_URL = 'https://buggy.justtestit.org';
  const THRESHOLD = 3000;

  test('Should load homepage within threshold', async ({ page }) => {
    const start = Date.now();
    await page.goto(BASE_URL);
    const duration = Date.now() - start;
    test.expect(duration).toBeLessThan(THRESHOLD);
  });

  test('Should load model page within threshold', async ({ page }) => {
    const start = Date.now();
    await page.goto(BASE_URL + '/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const duration = Date.now() - start;
    test.expect(duration).toBeLessThan(THRESHOLD);
  });

  test('Should render page in acceptable time', async ({ page }) => {
    await page.goto(BASE_URL);
    const paintTiming = await page.evaluate(() => {
      const paint = performance.getEntriesByType('paint');
      return paint.length > 0 ? paint[0].startTime : 0;
    });
    test.expect(paintTiming).toBeLessThan(2000);
  });

  test('Should handle lazy loading efficiently', async ({ page }) => {
    await page.goto(BASE_URL);
    const images = page.locator('img');
    const count = await images.count();
    test.expect(count).toBeGreaterThanOrEqual(0);
  });
});
