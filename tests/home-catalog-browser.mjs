import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/home/vlad/.npm/_npx/db89d7302a373f10/node_modules/playwright/index.mjs');
const browser = await chromium.launch({ headless:true });
const results=[];
await mkdir('/tmp/baustoffe-catalog-qa',{recursive:true});
try {
 for (const width of [390,1440]) {
  const page=await browser.newPage({viewport:{width,height:900}});
  const failures=[],errors=[],responses=[];
  page.on('response',r=>{if(r.url().includes('/images/products/')) {responses.push({url:r.url(),status:r.status()});if(r.status()>=400)failures.push(r.url());}});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.TEST_URL || 'http://localhost:3101',{waitUntil:'networkidle'});
  const photos=page.locator('main a[href] img[src^="/images/products/"]');
  assert.equal(await photos.count(),6,'Homepage must show six real linked product photos');
  for(const image of await photos.all()) {
   await image.scrollIntoViewIfNeeded();
   await image.evaluate(el=>el.decode());
   assert.ok(await image.evaluate(el=>el.naturalWidth>0));
   const href=await image.locator('..').getAttribute('href');
   assert.match(href,/^\/(usi-exterior|ferestre|usi-interior)\/[^/]+$/);
  }
  await page.locator('[data-trust-strip]').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.querySelectorAll('[data-trust-strip] p')].some(p => p.textContent === '165'), null, { timeout: 5000 });
  await page.waitForTimeout(1500);
  assert.equal(await page.locator('[data-trust-strip] svg').count(),3);
  const boxes=await page.locator('[data-stat-visual]').evaluateAll(els=>els.map(el=>{const b=el.getBoundingClientRect();return {height:b.height,bottom:b.bottom};}));
  assert.ok(boxes.every(b=>Math.abs(b.height-boxes[0].height)<1));
  if(width>800) assert.ok(boxes.every(b=>Math.abs(b.bottom-boxes[0].bottom)<1));
  for (const heading of await page.locator('h1, h2').all()) {
   const lines=heading.locator('[data-reveal-line]');
   if(await lines.count()) {
    await heading.scrollIntoViewIfNeeded(); await page.waitForTimeout(1000);
    assert.ok(await lines.evaluateAll(els=>els.every(el=>getComputedStyle(el).overflow==='visible')),'Reveal lines cannot clip Romanian diacritics');
    await heading.screenshot({path:`/tmp/baustoffe-catalog-qa/heading-${width}-${await heading.evaluate(e=>e.tagName)}.png`});
   }
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow');
  assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
  results.push({width,photos:await photos.count(),icons:3,responses});
  await page.close();
 }
 await writeFile('/tmp/baustoffe-catalog-qa/home-results.json',JSON.stringify(results,null,2));
 console.log('PASS: homepage real photos/detail links, diacritics, aligned icons, image network and mobile/desktop overflow');
} finally {await browser.close();}
