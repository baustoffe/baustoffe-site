import assert from 'node:assert/strict';
import fs from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || '/home/vlad/.npm/_npx/db89d7302a373f10/node_modules/playwright/index.mjs');
const browser=await chromium.launch({headless:true});
const normal=s=>s.replace(/\s+/g,' ').trim();
try {
 for(const width of [390,1440]) {
  const page=await browser.newPage({viewport:{width,height:900}});
  for(const route of ['termeni-si-conditii','politica-de-confidentialitate','politica-cookies','livrare-si-plata','gdpr']) {
   const response=await page.goto(`${process.env.TEST_URL||'http://localhost:3102'}/${route}`,{waitUntil:'networkidle'});
   assert.equal(response.status(),200);
   const doc=JSON.parse(fs.readFileSync(`src/content/legal/${route}.json`,'utf8'));
   assert.equal(normal(await page.locator('[data-legal-document]').innerText()),normal(doc.blocks.filter(b=>b.tag!=='h1').map(b=>b.text).join('\n')));
   assert.equal(await page.locator('h1').count(),1);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await page.locator('article a[href="/contact"]').scrollIntoViewIfNeeded();
   assert.ok((await page.locator('article').innerText()).includes('J2025062807006'));
   console.log(`PASS ${width} /${route}: complete source wording rendered, company identity, no overflow`);
  }
  await page.close();
 }
} finally {await browser.close();}
