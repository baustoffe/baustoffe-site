import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/home/vlad/.npm/_npx/db89d7302a373f10/node_modules/playwright/index.mjs');
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const responses = [];
    page.on('response', r => { if(r.url().includes('/consumer-protection/')) responses.push({url:r.url(),status:r.status()}); });
    await page.goto(process.env.TEST_URL || 'http://localhost:3102', { waitUntil:'networkidle' });
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    for (const [name, url] of [['ANPC','https://www.anpc.ro/'], ['SAL','https://reclamatiisal.anpc.ro/']]) {
      const image = footer.locator(`img[alt="${name}"]`);
      assert.match(await image.getAttribute('src'), /^\/consumer-protection\//, 'Official badges must be served locally');
      await image.evaluate(el=>el.decode());
      assert.ok(await image.evaluate(el=>el.naturalWidth>0));
      assert.equal(await image.locator('..').getAttribute('href'), url);
    }
    assert.ok((await footer.innerText()).includes('J2025062807006'));
    assert.ok((await footer.innerText()).includes('Strada Cazacilor'));
    assert.equal(await footer.locator('a[href*="ec.europa.eu/consumers/odr"]').count(), 0);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.screenshot({path:`/tmp/baustoffe-header-qa/footer-${width}.png`});
    assert.equal(responses.filter(r=>r.status>=400).length,0);
    console.log(JSON.stringify({width,responses,status:'PASS'}));
    await page.close();
  }
} finally { await browser.close(); }
