import { test, expect } from '@playwright/test';

const invalidLoginData = [
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
    description: 'locked out user'
  },
  {
    username: 'invalid_user',
    password: 'wrong_password',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
    description: 'invalid credentials'
  }
];

test.describe('Login unhappy path tests for saucedemo.com', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  for (const data of invalidLoginData) {
    test(`Login should fail with ${data.description}`, async ({ page }) => {
      await page.fill('#user-name', data.username);
      await page.fill('#password', data.password);
      await page.click('#login-button');

      const errorMessage = page.locator('[data-test="error"]');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText(data.expectedError);
    });
  }
});
