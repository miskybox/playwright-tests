import { test, expect } from '@playwright/test';

const users = [
  {
    "username": "standard_user",
    "password": "secret_sauce",
    "expectedError": "",
    "shouldPass": true,
    "tags": "@login @smoke"
  },
  {
    "username": "problem_user",
    "password": "secret_sauce",
    "shouldPass": true,
    "expectedError": "",
    "tags": "@login @error"
  },
  {
    "username": "locked_out_user",
    "password": "secret_sauce",
    "expectedError": "Epic sadface: Sorry, this user has been locked out.",
    "shouldPass": false,
    "tags": "@login @locked @error"
  },
  {
    "username": "invalid_user",
    "password": "wrong_pass",
    "expectedError": "Epic sadface: Username and password do not match any user in this service",
    "shouldPass": false,
    "tags": "@login @error"
  }
];

test.describe('Login unhappy path tests for saucedemo.com', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

 users.forEach((user) => {
    const testName = `Login con ${user.username} debe ${user.shouldPass ? 'pasar' : 'fallar'}`;
    
    test(testName, {
      tag: user.tags.split(' ')
    }, async ({ page }) => {
      await page.fill('#user-name', user.username);
      await page.fill('#password', user.password);
      await page.click('#login-button');

      if (user.shouldPass) {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      } else {
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(user.expectedError);
      }
    });
  });
});
