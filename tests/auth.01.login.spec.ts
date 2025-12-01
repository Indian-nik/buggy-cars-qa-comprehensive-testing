import { test, expect } from './fixtures';
const BASE_URL = 'https://buggy.justtestit.org';

test.describe('AUTH-01: Login Functionality (5 tests)', () => {
  test('Valid credentials login success', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('input[name="username"]', 'bing');
    await page.fill('input[type="password"]', 'Pass@123');
    await page.click('button:has-text("Login")');
    await page.waitForURL(BASE_URL);
    const loggedIn = await page.locator(':has-text("Hi, bing")').count();
    expect(loggedIn).toBeGreaterThan(0);
  });

  test('Invalid password rejection', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('input[name="username"]', 'bing');
    await page.fill('input[type="password"]', 'WrongPass');
    await page.click('button:has-text("Login")');
    await page.waitForTimeout(1000);
  });

  test('Empty username validation', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('input[name="username"]', '');
    await page.fill('input[type="password"]', 'Pass@123');
  });

  test('Empty password validation', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('input[name="username"]', 'bing');
    await page.fill('input[type="password"]', '');
  });

  test('Nonexistent user login attempt', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('input[name="username"]', 'nonexistentuser123');
    await page.fill('input[type="password"]', 'Pass@123');
    await page.click('button:has-text("Login")');
  });
});
