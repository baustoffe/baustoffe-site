// Run with: PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node tests/brand-assets-browser.mjs
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true });
const base = process.env.TEST_URL || 'http://localhost:3100';
const results = [];
await mkdir('/tmp/baustoffe-qa', { recursive: true });
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const requests = [], failures = [], errors = [];
    page.on('response', r => { if (r.url().includes('baustoffe-assets')) { requests.push({ url: r.url(), status: r.status() }); if (r.status() >= 400) failures.push(r.url()); } });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1100);
    const hero = page.locator('picture img');
    assert.equal(await hero.evaluate(el => el.complete && el.naturalWidth > 0), true);
    assert.ok((await hero.evaluate(el => el.currentSrc)).includes(width < 640 ? 'hero-mobile.webp' : 'hero.webp'));
    assert.equal(requests.filter(r => /\/hero(?:-mobile)?\.webp$/.test(r.url)).length, 1);
    assert.ok((await hero.boundingBox()).height > 350);
    assert.ok(await page.locator('header img[alt="Baustoffe"]').isVisible());
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'homepage horizontal overflow at width ' + width);
    await page.screenshot({ path: `/tmp/baustoffe-qa/home-${width}.png` });
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y=0; y<height; y+=550) { await page.evaluate(y => window.scrollTo({ top:y, behavior:'instant' }), y); await page.waitForTimeout(180); }
    await page.waitForTimeout(1200);
    assert.ok((await page.locator('header').getAttribute('class')).includes('bg-white/95'));
    const detail = page.locator('img[alt*="Detaliu de tâmplărie"]');
    assert.equal(await detail.evaluate(el => el.complete && el.naturalWidth > 0), true);
    assert.ok(await detail.evaluate(el => { let p=el; while(p) { if(+getComputedStyle(p).opacity===0) return false; p=p.parentElement; } return true; }));
    assert.match(await page.locator('meta[property="og:image"]').getAttribute('content'), /og-image.jpg/);
    if(width<1024) {
      await page.getByRole('button', {name:'Open menu'}).click();
      assert.ok(await page.getByRole('button', {name:'Close menu'}).isVisible());
      await page.getByRole('button', {name:'Close menu'}).click();
    }
    for(const slug of ['usi-exterior','ferestre','usi-interior','despre-noi']) {
      await page.goto(`${base}/${slug}`, {waitUntil:'networkidle'});
      const banner=page.locator('main img[src*="category-"]');
      assert.ok(await banner.count() > 0,slug);
      await banner.first().scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll('main img')].filter(i=>i.src.includes('category-')).every(i=>i.complete && i.naturalWidth>0));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),slug);
    }
    assert.deepEqual(failures,[]); assert.deepEqual(errors,[]);
    results.push({width,passed:true,assetResponses:requests});
    await page.close();
  }
  await writeFile('/tmp/baustoffe-qa/network-results.json',JSON.stringify(results,null,2));
  console.log('PASS: 3 viewport sizes, responsive hero single-download, scroll reveals, navigation, 4 pages, metadata, no asset HTTP failures or page errors.');
} finally { await browser.close(); }
