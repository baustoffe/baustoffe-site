const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(root, 'src', request.slice(2));
  return originalResolve.call(this, request, parent, ...rest);
};
for (const ext of ['.ts', '.tsx']) {
  require.extensions[ext] = (module, filename) => {
    const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2020 },
    });
    module._compile(result.outputText, filename);
  };
}

const fixture = {
  code: 'TEST', category_slug: 'ferestre', slug: 'test', base_name_ro: 'Test window', base_price_ron: 100,
  image: '/test.jpg', sizes: [{width_cm: 999, height_cm: 999, is_default: true}],
  variants: [
    {code: 'SKU-A', manufacturer_code: 'A', color_name_ro: 'Alb', price_override_ron: 120, image: '/a.jpg', description_ro: 'Variant A', gallery: [], sizes: [{width_cm: 80,height_cm: 100,is_default: true}]},
    {code: 'SKU-B', manufacturer_code: 'B', color_name_ro: 'Alb', price_override_ron: 180, image: '/b.jpg', description_ro: 'Variant B', gallery: [], sizes: []},
  ],
};

test('cart selection preserves manufacturer SKU, exact price and image, refusing unverified sizes', () => {
  const filename = path.join(root, 'src/components/product-selection.ts');
  assert.ok(fs.existsSync(filename), 'a verified SKU cart selection boundary exists');
  const { createProductCartItem } = require(filename);
  const item = createProductCartItem(fixture, 'SKU-A', '80x100', 2);
  assert.equal(item.variant_id, 'SKU-A');
  assert.equal(item.unit_price_ron, 120);
  assert.equal(item.image, '/a.jpg');
  assert.equal(item.quantity, 2);
  assert.equal(createProductCartItem(fixture, 'SKU-B', '999x999', 1), null);
  assert.equal(createProductCartItem(fixture, 'SKU-A', '999x999', 1), null);
});

test('detail presents exact SKU price, source image, description, and distinct duplicate-color options', () => {
  const filename = path.join(root, 'src/components/product-detail.tsx');
  assert.ok(fs.existsSync(filename), 'shared product detail exists');
  const { ProductDetail } = require(filename);
  const html = renderToStaticMarkup(React.createElement(ProductDetail, { product: fixture }));
  assert.match(html, /src="\/a.jpg"/);
  assert.match(html, /Variant A/);
  assert.match(html, /Alb · A · 120/);
  assert.match(html, /Alb · B · 180/);
  assert.doesNotMatch(html, /999x999/);
  const quoteOnly = renderToStaticMarkup(React.createElement(ProductDetail, { product: { ...fixture, variants: [fixture.variants[1]] } }));
  assert.doesNotMatch(quoteOnly, /id="product-size"/);
  assert.doesNotMatch(quoteOnly, /Adaugă în coș/);
  assert.match(quoteOnly, /cere-oferta\?produs=/);
});

test('each detail route resolves its category only and rejects missing or mismatched products', async () => {
  const { products } = require('../src/lib/products.ts');
  for (const category of ['usi-exterior', 'ferestre', 'usi-interior']) {
    const filename = path.join(root, `src/app/${category}/[productSlug]/page.tsx`);
    assert.ok(fs.existsSync(filename), category + ' detail route exists');
    const Page = require(filename).default;
    const product = products.find(p => p.category_slug === category);
    const element = await Page({ params: Promise.resolve({ productSlug: product.slug }) });
    assert.equal(element.props.product.code, product.code);
    for (const slug of ['definitely-missing', products.find(p => p.category_slug !== category).slug]) {
      await assert.rejects(() => Page({ params: Promise.resolve({ productSlug: slug }) }), /NEXT_HTTP_ERROR_FALLBACK;404/);
    }
  }
});

test('every category renders a real product image inside a detail link, with no blind add-to-cart', () => {
  for (const category of ['usi-exterior', 'ferestre', 'usi-interior']) {
    const Page = require(`../src/app/${category}/page.tsx`).default;
    const html = renderToStaticMarkup(React.createElement(Page));
    assert.match(html, new RegExp(`href="/${category}/[^"/]+"[^>]*>[\\s\\S]*?<img`), category + ' has clickable product photography');
    assert.doesNotMatch(html, /Adaugă în coș/, 'cards require choosing a manufacturer SKU first');
  }
});
