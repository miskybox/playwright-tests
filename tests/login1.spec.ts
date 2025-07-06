import { test, expect } from '@playwright/test';

test.describe.only('Pruebas de Login – Sauce Demo Shopify', () => {
//quitar only si quiero ejecutar todos los test


  test.beforeEach(async ({ page }) => {

    await page.goto('https://sauce-demo.myshopify.com/');
    page.click('a[href="/account/login"]');
    await expect(page.locator('form#customer_login')).toBeVisible();
  });

  test('Login válido @login', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'tag', description: 'login' });

    await test.step('Rellenar email y contraseña correctos', async () => {
      await page.getByLabel('Email').fill('standard_user');
      await page.getByLabel('Password').fill('secret_sauce');
    });

    await test.step('Pulsar Sign in y esperar redirección', async () => {
      await Promise.all([
        page.getByRole('button', { name: /Sign in/i }).click(),
      ]);
    });

    await test.step('Verificar que redirige al dashboard de la cuenta', async () => {
      await expect(page).toHaveURL("https://sauce-demo.myshopify.com/account/login");
    });
  });

});
//en este cambiamos el  page.fill por el get by label
