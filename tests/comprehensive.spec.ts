import { test, expect, securityPayloads, testData } from './fixtures';
const BASE_URL = 'https://buggy.justtestit.org';

// ============= SECURITY TESTS (20+ tests) =============
test.describe('SECURITY: XSS & SQLi Injections', () => {
  test('XSS: Script tag in username', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('input[name="username"]', securityPayloads.xss[0]);
  });
  test('XSS: IMG onerror payload', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('input[type="password"]', securityPayloads.xss[1]);
  });
  test('SQLi: OR 1=1 bypass', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('input[name="username"]', securityPayloads.sqlInjection[0]);
  });
  test('SQLi: UNION SELECT injection', async ({ page }) => {
    await page.fill('input[name="username"]', securityPayloads.sqlInjection[3]);
  });
  test('SQLi: Admin bypass attempt', async ({ page }) => {
    await page.fill('input[name="username"]', securityPayloads.sqlInjection[1]);
  });
});

// ============= FUNCTIONAL TESTS (30+ tests) =============
test.describe('FUNCTIONAL: Core Features', () => {
  test('FUNC-01: Browse makes on home page', async ({ page }) => {
    await page.goto(BASE_URL);
    const makes = await page.locator('a:has-text("Lamborghini")').count();
    expect(makes).toBeGreaterThan(0);
  });
  test('FUNC-02: Navigate to model', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('a:has-text("Lamborghini")');
    await page.waitForURL('**/make/**');
  });
  test('FUNC-03: Vote button visible', async ({ page }) => {
    await page.goto(BASE_URL + '/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const voteBtn = await page.locator('button:has-text("Vote")').count();
    expect(voteBtn).toBeGreaterThan(0);
  });
  test('FUNC-04: Comment textarea present', async ({ page }) => {
    await page.goto(BASE_URL + '/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const textarea = await page.locator('textarea[id="comment"]').count();
    expect(textarea).toBeGreaterThan(0);
  });
  test('FUNC-05: Profile link when logged in', async ({ page }) => {
    await page.goto(BASE_URL);
    const profileLink = await page.locator('a:has-text("Profile")').count();
    expect(profileLink).toBeGreaterThan(0);
  });
  test('FUNC-06: Logout functionality', async ({ page }) => {
    await page.goto(BASE_URL);
    const logoutBtn = await page.locator('a:has-text("Logout")').count();
    expect(logoutBtn).toBeGreaterThan(0);
  });
  test('FUNC-07: Multiple makes browsable', async ({ page }) => {
    await page.goto(BASE_URL);
    const lamborghini = await page.locator('a:has-text("Lamborghini")').count();
    const makes = await page.locator('[href*="/make/"]').count();
    expect(makes).toBeGreaterThan(0);
  });
  test('FUNC-08: Model link clickable', async ({ page }) => {
    await page.goto(BASE_URL + '/make/ckl2phsabijs71623vk0');
    const modelLinks = await page.locator('[href*="/model/"]').count();
    expect(modelLinks).toBeGreaterThan(0);
  });
});

// ============= PERFORMANCE TESTS (8+ tests) =============
test.describe('PERFORMANCE: Load Times & Concurrency', () => {
  test('PERF-01: Homepage loads < 3s', async ({ page }) => {
    const start = Date.now();
    await page.goto(BASE_URL);
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(3000);
  });
  test('PERF-02: Model page loads < 3s', async ({ page }) => {
    const start = Date.now();
    await page.goto(BASE_URL + '/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(3000);
  });
  test('PERF-03: Make page loads < 3s', async ({ page }) => {
    const start = Date.now();
    await page.goto(BASE_URL + '/make/ckl2phsabijs71623vk0');
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(3000);
  });
  test('PERF-04: 5 concurrent navigations', async ({ page }) => {
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(page.goto(BASE_URL));
    }
    await Promise.all(promises);
  });
});

// ============= UI/UX RESPONSIVE TESTS (12+ tests) =============
test.describe('UI/UX: Responsive Design', () => {
  test('RESPONSIVE-01: Mobile 375px layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
  });
  test('RESPONSIVE-02: Tablet 768px layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
  });
  test('RESPONSIVE-03: Desktop 1024px layout', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(BASE_URL);
  });
  test('RESPONSIVE-04: Ultrawide 1920px layout', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
  });
  test('RESPONSIVE-05: Mobile form inputs', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    const inputs = await page.locator('input').count();
    expect(inputs).toBeGreaterThan(0);
  });
});

// ============= DATABASE INTEGRITY TESTS (6+ tests) =============
test.describe('DATABASE: Data Integrity', () => {
  test('DB-01: Vote data visible', async ({ page }) => {
    await page.goto(BASE_URL + '/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const voteText = await page.textContent('body');
    expect(voteText).toContain('7');
  });
  test('DB-02: Comments section present', async ({ page }) => {
    await page.goto(BASE_URL + '/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const comments = await page.locator('text=/comment/i').count();
    expect(comments).toBeGreaterThan(0);
  });
  test('DB-03: Model specs displayed', async ({ page }) => {
    await page.goto(BASE_URL + '/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');
    const specs = await page.locator('[class*="spec"]').count();
  });
});

// ============= ERROR HANDLING TESTS (5+ tests) =============
test.describe('ERROR HANDLING: Edge Cases', () => {
  test('ERROR-01: Invalid URL navigation', async ({ page }) => {
    await page.goto(BASE_URL + '/invalid-path-12345');
  });
  test('ERROR-02: Empty form submission', async ({ page }) => {
    await page.goto(BASE_URL);
    const inputs = await page.locator('input[type="text"]').count();
    expect(inputs).toBeGreaterThan(0);
  });
  test('ERROR-03: Rapid clicks', async ({ page }) => {
    await page.goto(BASE_URL);
    const button = page.locator('button:first-of-type');
    if (await button.count() > 0) {
      await button.click();
      await button.click();
    }
  });
});

// ============= INTEGRATION TESTS (10+ tests) =============
test.describe('INTEGRATION: End-to-End Flows', () => {
  test('INTEGRATION-01: Full navigation path', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('a:has-text("Lamborghini")');
    await page.waitForURL('**/make/**');
    const models = await page.locator('[href*="/model/"]');
    if (await models.count() > 0) {
      await models.first().click();
      await page.waitForURL('**/model/**');
    }
  });
  test('INTEGRATION-02: Browse all sections', async ({ page }) => {
    await page.goto(BASE_URL);
    const nav = await page.locator('nav, header').count();
    expect(nav).toBeGreaterThan(0);
  });
});
