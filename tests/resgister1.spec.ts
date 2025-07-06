import { test, expect } from '@playwright/test';

test('Registro en OpenCart', async ({ page }) => {
  await page.goto('https://opencart.com/en-gb?route=account/register');

  // Wait up to 10 seconds for the form; fail fast if not visible
  const form = page.locator('form');
  await expect(form).toBeVisible({ timeout: 10000 });

  await page.fill('input[name="firstname"]', 'Eva');
  await page.fill('input[name="lastname"]', 'Sisalli');
  await page.fill('input[name="email"]', `eva${Date.now()}@mail.com`);
  await page.fill('input[name="password"]', 'Password123!');
  await page.check('input[type="checkbox"]');
  await page.click('text=Continue');

  await expect(page).toHaveURL(/.*success.*/);
});
