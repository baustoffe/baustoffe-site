import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('homepage serves desktop and mobile hero art with a stable height', () => {
  const source = readFileSync('src/app/page.tsx', 'utf8');
  assert.ok(source.includes('/baustoffe-assets/hero-mobile.webp'));
  assert.ok(source.includes('/baustoffe-assets/hero.webp'));
  assert.ok(!source.includes('Hero Image — Higgsfield Tier 2 Asset'));
  assert.ok(source.includes('h-[70svh]'));
});

test('category banners and social metadata are connected', () => {
  for (const slug of ['usi-exterior', 'ferestre', 'usi-interior']) {
    const sources = [readFileSync(`src/app/${slug}/page.tsx`, 'utf8'), readFileSync('src/components/product-catalog.tsx', 'utf8')].join('\n');
    assert.ok(sources.includes('<CategoryBanner'));
  }
  const layout = readFileSync('src/app/layout.tsx', 'utf8');
  assert.ok(layout.includes('og-image.jpg'));
  assert.ok(layout.includes('favicon.png'));
  assert.ok(readFileSync('src/app/page.tsx', 'utf8').includes('<CategoryBanner'));
});

test('hero clears the fixed navigation and preserves headline lines', () => {
  const source = readFileSync('src/app/page.tsx', 'utf8');
  assert.ok(source.includes('min-h-screen flex flex-col pt-16'));
  // headline lines reveal via clip-path with overflow kept visible (diacritics must not clip)
  assert.ok(source.includes('data-reveal-line'));
});

test('header uses the approved logo with explicit dimensions', () => {
  const source = readFileSync('src/components/navbar.tsx', 'utf8');
  assert.match(source, /src="\/baustoffe-assets\/logo.png"/);
  assert.match(source, /width=\{2399\}/);
  assert.match(source, /height=\{232\}/);
});
