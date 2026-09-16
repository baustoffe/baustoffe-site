// TEST_URL=http://localhost:3100 PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node tests/catalog-browser.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  const out = ts.transpileModule(require('node:fs').readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2020 } });
  module._compile(out.outputText, filename);
};
const filename = new URL('../src/lib/products.ts', import.meta.url);
const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const data = { exports: {} };
new Function('module', 'exports', 'require', compiled)(data, data.exports, createRequire(filename));
const { products, getProductHref, getVariantPrice } = data.exports;
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true });
const base = process.env.TEST_URL || 'http://localhost:3100';
const price = value => `${value.toLocaleString('ro-RO')} Lei TVA inclus`;
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const category of ['usi-exterior', 'ferestre', 'usi-interior']) {
      const catalog = products.filter(p => p.category_slug === category);
      await page.goto(`${base}/${category}`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('[data-product-code]').count(), catalog.length, 'all models are listed');
      const card = page.locator(`[data-product-code="${catalog[0].code}"]`);
      assert.equal(await card.locator('a').first().getAttribute('href'), getProductHref(catalog[0]));
      await card.locator('img').evaluate(img => img.decode());
      await card.locator('a').first().click();
      await page.waitForSelector('#product-variant');
      const product = catalog[0];
      assert.equal(await page.locator('#product-variant option').count(), product.variants.length);
      for (const variant of product.variants) {
        await page.locator('#product-variant').selectOption(variant.code);
        assert.equal(await page.getByTestId('manufacturer-code').innerText(), variant.manufacturer_code);
        assert.equal(await page.getByTestId('variant-price').innerText(), price(getVariantPrice(product, variant)));
        assert.equal(await page.getByTestId('variant-description').innerText(), variant.description_ro.trim());
        const mainImage = page.locator('main img').first();
        assert.equal(await mainImage.getAttribute('src'), variant.image);
        await mainImage.evaluate(img => img.decode());
        if (variant.sizes.length) {
          assert.equal(await page.locator('#product-size option').count(), variant.sizes.length);
        } else {
          assert.equal(await page.locator('#product-size').count(), 0);
          assert.equal(await page.getByRole('button', { name: 'Adaugă în coș', exact: true }).count(), 0);
        }
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${category}: overflow at ${width}`);
      const wrong = products.find(p => p.category_slug !== category);
      const response = await page.goto(`${base}/${category}/${wrong.slug}`);
      assert.equal(response.status(), 404);
    }
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log('PASS: all category model counts, real image loads, clickable cards, SKU switching, variant price/description/images/sizes, category mismatch 404, mobile/desktop overflow.');
} finally { await browser.close(); }
