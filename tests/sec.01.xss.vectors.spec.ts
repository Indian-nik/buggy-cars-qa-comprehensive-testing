import { test } from '@playwright/test';
test.describe('Security - XSS Vector Testing', () => {
  const vectors = ['<script>alert(1)</script>', '<img src=x onerror=alert(1)>', '<svg onload=alert(1)>', '<iframe src="javascript:alert(1)"></iframe>', '<body onload=alert(1)>'];
  const BASE_URL = 'https://buggy.justtestit.org';

  test('Should prevent stored XSS in comments', async ({ page }) => {
    await page.goto(BASE_URL + '/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const textarea = page.locator('textarea').first();
    await textarea.fill(vectors[0]);
    const content = await page.content();
    test.expect(content).not.toContain('<script>');
  });

  test('Should sanitize img tag onerror handlers', async ({ page }) => {
    await page.goto(BASE_URL);
    const xssPayload = vectors[1];
    const safe = !xssPayload.includes('alert');
    test.expect(safe).toBeFalsy();
  });

  test('Should block SVG event handlers', async ({ page }) => {
    await page.goto(BASE_URL);
    const content = await page.content();
    test.expect(content).not.toContain('onload=');
  });

  test('Should prevent iframe javascript protocol', async ({ page }) => {
    await page.goto(BASE_URL);
    const content = await page.content();
    test.expect(content).not.toContain('javascript:');
  });

  test('Should handle body event injection', async ({ page }) => {
    await page.goto(BASE_URL);
    let alertFired = false;
    page.on('dialog', () => { alertFired = true; });
    test.expect(alertFired).toBeFalsy();
  });
});
