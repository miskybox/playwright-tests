import { test, expect } from '@playwright/test';
import users from '../data/users.json'; 

test.describe('Login unhappy path tests for saucedemo.com', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  users.forEach((user) => {
    test(`Login con ${user.username} debe ${user.shouldPass ? 'pasar' : 'fallar'}`, async ({ page }, testInfo) => {
      
      user.tags.split(' ').forEach(tag => {
        testInfo.annotations.push({ type: 'tag', description: tag });
      });

      
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
