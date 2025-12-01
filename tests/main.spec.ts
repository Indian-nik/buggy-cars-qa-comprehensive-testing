import { test, expect } from '@playwright/test';
const BASE_URL = 'https://buggy.justtestit.org';
const USER = { username: 'bing', password: 'Pass@123' };

test('AUTH-001: Login with valid credentials', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[name="username"]', USER.username);
  await page.fill('input[type="password"]', USER.password);
  await page.click('button:has-text("Login")');
  await page.waitForURL(BASE_URL);
  const isLoggedIn = await page.textContent(':has-text("Hi, bing")');
  expect(isLoggedIn).toBeTruthy();
});

test('AUTH-002: Invalid password', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[name="username"]', USER.username);
  await page.fill('input[type="password"]', 'Wrong');
  await page.click('button:has-text("Login")');
});

test('AUTH-003: SQL Injection', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[name="username"]', "' OR '1'='1'-- -");
  await page.fill('input[type="password"]', 'any');
  await page.click('button:has-text("Login")');
});

test('FUNC-001: View home page', async ({ page }) => {
  await page.goto(BASE_URL);
  const lamborghini = await page.$('a:has-text("Lamborghini")');
  expect(lamborghini).toBeTruthy();
});

test('FUNC-002: Navigate to make', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.click('a:has-text("Lamborghini")');
  await page.waitForURL(/\/make\//);  
});

test('FUNC-003: View model', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.click('a:has-text("Lamborghini")');
  await page.click('a:has-text("Diablo")');
  await page.waitForURL(/\/model\//);  
});

test('SEC-001: XSS check', async ({ page }) => {
  await page.goto(BASE_URL);
  const payload = '<script>alert("XSS")<\/script>';
});

test('PERF-001: Load time', async ({ page }) => {
  const start = Date.now();
  await page.goto(BASE_URL);
  const loadTime = Date.now() - start;
});

test('UI-001: Form validation', async ({ page }) => {
  await page.goto(BASE_URL + '/register');
  await page.click('button[type="submit"]');
});
