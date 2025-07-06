import { test, expect } from '@playwright/test';

test.describe.only('Pruebas de Login – Sauce Demo Shopify', () => {
//quitar only si quiero ejecutar todos los test
//test.only('Solo este test se ejecuta', async ({ page }) => {});
//test.describe.only('Solo este grupo se ejecuta', () => {});

//test.skip('Este test será saltado', async ({ page }) => {});
//test.describe.skip('Saltamos todos estos tests', () => {});

//test.fixme('Este test está roto y lo voy a arreglar después', async ({ page }) => {});
//test.describe.fixme('Este grupo de tests está roto y lo arreglaré después', () => {});

//test.fail('Este test debería fallar por ahora', async ({ page }) => {});
//test.describe.fail('Este grupo de tests debería fallar por ahora', () => {});

//test.slow('Este test es lento', async ({ page }) => {});
//test.describe.slow('Este grupo de tests es lento', () => {});



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
