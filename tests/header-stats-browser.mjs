import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/home/vlad/.npm/_npx/db89d7302a373f10/node_modules/playwright/index.mjs');
const browser = await chromium.launch({ headless: true });
const reports = [];
await mkdir('/tmp/baustoffe-header-qa', { recursive: true });
try {
  for (const width of [1440, 1024, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(process.env.TEST_URL || 'http://localhost:3101', { waitUntil: 'networkidle' });
    const geometry = await page.evaluate(() => {
      const header = document.querySelector('header').getBoundingClientRect();
      const hero = document.querySelector('main picture').getBoundingClientRect();
      const items = [...document.querySelectorAll('header nav a, header nav button')].filter(el => el.getBoundingClientRect().width > 0).map(el => {
        const r = el.getBoundingClientRect();
        return { label: el.textContent || el.getAttribute('aria-label') || 'logo/cart', center: r.top + r.height / 2 };
      });
      return { headerHeight: header.height, heroTop: hero.top, items };
    });
    reports.push({ width, geometry });
    console.log(JSON.stringify(reports.at(-1)));
    if (width >= 1024) {
      assert.ok(Math.abs(geometry.headerHeight - geometry.heroTop) <= 1, 'Desktop header must fill the reserved 64px band, not float above its vertical center');
      assert.ok(geometry.items.every(i => Math.abs(i.center - geometry.heroTop / 2) <= 1), 'All desktop navigation items must share the band center');
    }
    await page.locator('[data-trust-strip]').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-trust-strip] [data-stat-visual] p')?.textContent === '165+', null, { timeout: 5000 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow');
    assert.deepEqual(errors, []);
    await page.screenshot({ path: `/tmp/baustoffe-header-qa/stats-${width}.png` });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `/tmp/baustoffe-header-qa/header-${width}.png` });
    await page.close();
  }
  console.log('PASS: header centered in reserved band and animated 165+ at desktop/tablet/mobile sizes');
} finally {
  await writeFile('/tmp/baustoffe-header-qa/results.json', JSON.stringify(reports, null, 2));
  await browser.close();
}
