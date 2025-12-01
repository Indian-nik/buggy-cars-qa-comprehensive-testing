import { test as base, expect } from '@playwright/test';

// =============== PAGE OBJECT MODELS ===============

export class HomePage {
  constructor(private page: any) {}

  async navigate() {
    await this.page.goto('https://buggy.justtestit.org');
  }

  async clickMake(makeName: string) {
    await this.page.click(`a:has-text("${makeName}")`);
  }

  async verifyMakesVisible() {
    const lamborghini = await this.page.locator('a:has-text("Lamborghini")').count();
    return lamborghini > 0;
  }
}

export class LoginPage {
  constructor(private page: any) {}

  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[type="password"]', password);
    await this.page.click('button:has-text("Login")');
  }

  async getErrorMessage() {
    return await this.page.textContent('.error, .alert, [role="alert"]');
  }

  async isLoggedIn() {
    return await this.page.locator(':has-text("Hi,")').count() > 0;
  }
}

export class ModelDetailPage {
  constructor(private page: any) {}

  async navigate(modelId: string) {
    await this.page.goto(`https://buggy.justtestit.org/model/${modelId}`);
  }

  async addComment(text: string) {
    await this.page.fill('textarea[id="comment"]', text);
  }

  async clickVote() {
    await this.page.click('button:has-text("Vote")');
  }

  async getVoteCount() {
    const text = await this.page.textContent(':has-text("Votes:")');
    const match = text?.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  async getComments() {
    return await this.page.locator('.comment').count();
  }
}

// =============== SECURITY TEST FIXTURES ===============

export const securityPayloads = {
  xss: [
    '<script>alert("xss")</script>',
    '<img src=x onerror="alert(1)">',
    '<svg/onload=alert(1)>',
    'javascript:alert(1)',
    '<iframe src="javascript:alert(1)"></iframe>',
  ],
  sqlInjection: [
    "' OR '1'='1'-- -",
    "admin' --",
    "' OR 1=1 --",
    "1' UNION SELECT NULL --",
    "'; DROP TABLE users; --",
  ],
  pathTraversal: [
    '../../../etc/passwd',
    '..\\..\\..\\windows\\system32\\config\\sam',
    '....//....//....//etc/passwd',
  ],
  commandInjection: [
    '; ls -la',
    '| whoami',
    '`cat /etc/passwd`',
    '$(whoami)',
  ],
};

// =============== TEST DATA ===============

export const testData = {
  validUser: {
    username: 'bing',
    password: 'Pass@123',
    email: 'bing@test.com',
  },
  models: {
    lamborghini: 'ckl2phsabijs71623vk0',
    diablo: 'ckl2phsabijs71623vqg',
  },
  testComments: [
    'Great car!',
    'Amazing performance',
    '10/10 would recommend',
    'Best sports car ever',
  ],
};

// =============== CUSTOM FIXTURES ===============

type TestFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  modelDetailPage: ModelDetailPage;
  authenticatedPage: any;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  modelDetailPage: async ({ page }, use) => {
    const modelDetailPage = new ModelDetailPage(page);
    await use(modelDetailPage);
  },
  authenticatedPage: async ({ page }, use) => {
    // Login before providing page
    await page.goto('https://buggy.justtestit.org');
    await page.fill('input[name="username"]', testData.validUser.username);
    await page.fill('input[type="password"]', testData.validUser.password);
    await page.click('button:has-text("Login")');
    await page.waitForURL('https://buggy.justtestit.org');
    await use(page);
  },
});

export { expect };
