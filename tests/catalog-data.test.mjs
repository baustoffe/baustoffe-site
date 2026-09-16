import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = new URL('..', import.meta.url).pathname;
require.extensions['.ts'] = (module, filename) => {
  const out = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2020 } });
  module._compile(out.outputText, filename);
};

const { products, getVariantPrice, getProductHref } = require(path.join(root, 'src/lib/products.ts'));

test('catalog preserves every manufacturer listing (132/28/5 → 165 variants)', () => {
  const variants = products.flatMap(p => p.variants);
  assert.equal(variants.length, 165);
  assert.equal(products.filter(p => p.category_slug === 'usi-exterior').flatMap(p => p.variants).length, 132);
  assert.equal(products.filter(p => p.category_slug === 'ferestre').flatMap(p => p.variants).length, 28);
  assert.equal(products.filter(p => p.category_slug === 'usi-interior').flatMap(p => p.variants).length, 5);
});

test('every variant is a real manufacturer listing with photo, code and source', () => {
  for (const p of products) {
    assert.ok(p.image, `${p.code} missing image`);
    for (const v of p.variants) {
      assert.ok(v.image, `${v.code} missing image`);
      assert.ok(v.manufacturer_code, `${v.code} missing manufacturer code`);
      assert.match(v.source_url, /^https:\/\/www\.chirmandi\.ro\//, `${v.code} bad source`);
      assert.ok(typeof getVariantPrice(p, v) === 'number' && getVariantPrice(p, v) > 0);
    }
  }
});

test('same name, different price stays two selectable variants with exact prices', () => {
  const kira = products.find(p => p.variants.some(v => v.manufacturer_code === 'usa-alba-kira-big-white-1'));
  assert.ok(kira);
  const whitePrices = kira.variants.filter(v => v.manufacturer_code.includes('kira-big-white')).map(v => v.price_override_ron);
  assert.ok(whitePrices.includes(1300) && whitePrices.includes(1800), `expected 1300 & 1800, got ${whitePrices}`);
});

test('listing without verified dimensions stays quote-only (no invented size)', () => {
  const dana = products.flatMap(p => p.variants).find(v => v.source_url.endsWith('usa-dubla-termopan-antracit-dana'));
  assert.ok(dana, 'Dana antracit listing missing from catalog');
  assert.equal(dana.price_override_ron, 2400);
  assert.deepEqual(dana.sizes, []);
  assert.ok(dana.image);
});

test('product codes, variant codes and slugs are unique', () => {
  const codes = new Set();
  for (const p of products) {
    assert.ok(!codes.has(p.code), `dup product code ${p.code}`);
    assert.ok(!codes.has(p.slug), `dup slug ${p.slug}`);
    codes.add(p.code); codes.add(p.slug);
    for (const v of p.variants) { assert.ok(!codes.has(v.code), `dup variant code ${v.code}`); codes.add(v.code); }
  }
});

test('helpers build real detail links and prices', () => {
  const first = products[0];
  assert.equal(getProductHref(first), `/${first.category_slug}/${first.slug}`);
  const v = first.variants[0];
  assert.equal(getVariantPrice(first, v), v.price_override_ron ?? first.base_price_ron);
});
