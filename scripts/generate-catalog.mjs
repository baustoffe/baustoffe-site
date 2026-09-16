#!/usr/bin/env node
/**
 * Lossless catalog generation from the scraped manufacturer data.
 * Every scraped listing (SKU) survives as one variant — including listings that
 * share a name but differ in price. Nothing is invented: sizes come from the
 * source description/name, images from the downloaded image map.
 *
 * Run: node scripts/generate-catalog.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..'); // /home/vlad/websites/baustoffe
const SCRAPE = resolve(ROOT, 'scrape');
const OUT = resolve(ROOT, 'baustoffe-site/src/lib/catalog-generated.ts');

const raw = JSON.parse(readFileSync(resolve(SCRAPE, 'products_raw.json'), 'utf8'));
const imageMap = JSON.parse(readFileSync(resolve(SCRAPE, 'image_map.json'), 'utf8'));

const COLOR_WORDS = ['stejar auriu', 'stejar', 'auriu', 'alba', 'alb mat', 'alb', 'nuc', 'nuca', 'antracit', 'maro', 'neagra', 'negru', 'fag cenusiu', 'fag', 'cenusiu'];
const STRUCT_WORDS = ['usa', 'de', 'exterior', 'interior', 'dubla', 'dublu', 'simpla', 'si', 'cu', '-', 'the', 'la', 'pe', 'din', 'pentru', 'fereastra', 'pvc'];
const DECOR_WORDS = ['gold', 'black', 'white', 'flower', 'mirror', 'glass', 'inox'];
const COLOR_HEX = {
  'Alb': '#f5f5f0', 'Nuc': '#8a5a3b', 'Stejar Auriu': '#c9a05e', 'Antracit': '#3d3d3f',
  'Maro': '#6b4423', 'Fag Cenusiu': '#cbb9a3', 'Black': '#1a1a1a', 'Gold': '#c9a84c',
  'Inox': '#c0c0c0', 'Negru': '#1a1a1a',
};

const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const stripTags = t => (t || '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const cleanDesc = t => stripTags(t)
  .replace(/^.*?Nu sunt opinii despre acest produs\.?/i, m => m) // kept until removed below
  .replace(/Nu sunt opinii despre acest produs\.?/i, '')
  .replace(/^.*?Caracteristici:/i, 'Caracteristici:')
  .trim();

function colorOf(name) {
  const low = name.toLowerCase();
  if (low.includes('stejar auriu')) return 'Stejar Auriu';
  if (low.includes('auriu') || low.includes('gold')) return 'Gold';
  if (low.includes('nuc')) return 'Nuc';
  if (low.includes('antracit')) return 'Antracit';
  if (low.includes('maro')) return 'Maro';
  if (low.includes('fag')) return 'Fag Cenusiu';
  if (low.includes('negru') || low.includes('neagra') || low.includes('black')) return 'Black';
  if (low.includes('inox')) return 'Inox';
  return 'Alb';
}

// Model identity: manufacturer name minus material-color words. Decoration words
// (Gold/Black/Flower/Mirror/Glass/Inox) stay — they are distinct products upstream.
function modelOf(name) {
  let low = name.toLowerCase().replace(/[()]/g, ' ');
  for (const w of [...COLOR_WORDS, ...STRUCT_WORDS].sort((a, b) => b.length - a.length)) {
    low = low.replace(new RegExp(`\\b${w.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'g'), ' ');
  }
  const isWindow = /fereastra/i.test(name);
  const tokens = low.split(/[\s\-_/]+/).filter(Boolean).filter(t => !/^\d+$/.test(t) || DECOR_WORDS.some(d => t.includes(d)) || isWindow);
  return tokens.length ? tokens.join(' ') : name.replace(/Usa|Fereastra/i, '').trim() || 'Model';
}

function parseSizes(record) {
  // normalize entities/linebreaks first — "140&nbsp;x 190" must read as "140 x 190"
  const text = `${record.name} ${(record.description || '').replace(/&nbsp;?/g, ' ')}`;
  const sizes = [];
  // "120/130/140/150 x 190/200/210" — cartesian product, exactly as offered upstream
  const m = text.match(/(\d{3}(?:\/\d{3})*)\s*[x×]\s*(\d{3}(?:\/\d{3})*)/);
  if (m) {
    for (const w of m[1].split('/')) for (const h of m[2].split('/')) sizes.push([+w, +h]);
  }
  // windows: name carries "120 x 100 cm"
  const single = record.name.match(/(\d{2,3})\s*[x×]\s*(\d{2,3})\s*cm/i);
  if (!sizes.length && single) sizes.push([+single[1], +single[2]]);
  // interior doors: leaf sizes are fixed upstream (600/700/800 x 2000 mm)
  if (!sizes.length && /interior/i.test(record.url)) {
    for (const w of [60, 70, 80]) sizes.push([w, 200]);
  }
  // "Usa Dubla Luna Big Glass" — sizes live in the source URL slug (…-120x200-210-130x200-210-…)
  const urlSizes = [...record.url.matchAll(/(\d{3})x(\d{2,3})/g)];
  if (!sizes.length && urlSizes.length) {
    for (const [, w, h] of urlSizes) sizes.push([+w, +h]);
  }
  const seen = new Set();
  return sizes.filter(([w, h]) => { const k = `${w}x${h}`; if (seen.has(k) || w < 30 || h < 30 || w > 300 || h > 300) return false; seen.add(k); return true; })
    .slice(0, 60)
    .map(([width_cm, height_cm]) => ({ width_cm, height_cm, is_default: false }));
}

const audit = { unparsedSizes: [], missingImages: [] };
const usedSlugs = new Set();
const products = [];
const codeIdx = { 'usi-exterior': 0, 'ferestre': 0, 'usi-interior': 0 };
const PREFIX = { 'usi-exterior': 'BB-EXT', 'ferestre': 'BB-FER', 'usi-interior': 'BB-INT' };
const CATEGORY_NAMES = {
  'usi-exterior': 'Uși Exterior — chirmandi.ro',
  'ferestre': 'Ferestre — chirmandi.ro',
  'usi-interior': 'Uși Interior — chirmandi.ro',
};

for (const [category, records] of Object.entries(raw)) {
  // group ALL records by model identity — none discarded
  const groups = new Map();
  for (const record of records) {
    const key = `${modelOf(record.name)}|${record.name.toLowerCase().includes('dubla') || record.name.toLowerCase().includes('dublu') ? 'dubla' : 'simpla'}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }

  for (const [key, items] of [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const modelName = key.split('|')[0];
    codeIdx[category] += 1;
    const code = `${PREFIX[category]}-${String(codeIdx[category]).padStart(3, '0')}`;
    let slug = slugify(modelName);
    if (usedSlugs.has(slug)) slug = `${slug}-${codeIdx[category]}`;
    usedSlugs.add(slug);

    const variants = items.map((record, idx) => {
      const color = colorOf(record.name);
      const price = Math.round(parseFloat(record.price));
      const gallery = (record.gallery || []).map(g => imageMap[g]).filter(Boolean);
      const image = gallery[0] || '';
      if (!image) audit.missingImages.push(`${category}: ${record.name} → ${record.url}`);
      const sizes = parseSizes(record);
      if (!sizes.length) audit.unparsedSizes.push(`${category}: ${record.name}`);
      return {
        code: `${code}-V${idx + 1}`,
        color_name_ro: color,
        color_hex: COLOR_HEX[color] || '#999999',
        price_override_ron: price,
        is_default: idx === 0,
        manufacturer_code: record.url.split('/').filter(Boolean).pop() || '',
        source_id: record.url,
        source_url: record.url.startsWith('http') ? record.url : `https://www.chirmandi.ro${record.url}`,
        source_name: CATEGORY_NAMES[category],
        description_ro: cleanDesc(record.description),
        image,
        gallery,
        sizes,
      };
    });

    const basePrice = Math.min(...variants.map(v => v.price_override_ron));
    const allSizes = [];
    const sizeSeen = new Set();
    for (const v of variants) for (const s of v.sizes) { const k = `${s.width_cm}x${s.height_cm}`; if (!sizeSeen.has(k)) { sizeSeen.add(k); allSizes.push(s); } }
    const name = modelName;
    products.push({
      code,
      category_slug: category,
      base_name_ro: name,
      slug,
      material: category === 'usi-interior' ? 'Lemn stratificat' : 'PVC',
      glass_type: /mata|mat\b/i.test(items[0].description || '') ? 'Sticlă mată' : 'Sticlă standard',
      is_double: key.endsWith('dubla'),
      description_ro: variants.find(v => v.description_ro)?.description_ro || '',
      base_price_ron: basePrice,
      source_url: variants[0].source_url,
      image: variants.find(v => v.image)?.image || '',
      gallery: variants.flatMap(v => v.gallery).filter((g, i, arr) => arr.indexOf(g) === i),
      sizes: allSizes,
      variants,
    });
  }
}

// --- validation: fail loudly instead of writing a lossy catalog ---
const totalVariants = products.reduce((n, p) => n + p.variants.length, 0);
const expected = Object.values(raw).reduce((n, list) => n + list.length, 0);
if (totalVariants !== expected) {
  console.error(`LOSSY: generated ${totalVariants} variants but source has ${expected} listings`);
  process.exit(1);
}
const codes = new Set();
for (const p of products) {
  if (codes.has(p.code)) { console.error(`duplicate product code ${p.code}`); process.exit(1); }
  codes.add(p.code);
  for (const v of p.variants) {
    if (codes.has(v.code)) { console.error(`duplicate variant code ${v.code}`); process.exit(1); }
    codes.add(v.code);
  }
}

const banner = `// AUTO-GENERATED by scripts/generate-catalog.mjs — DO NOT EDIT BY HAND.
// Source: chirmandi.ro scrape (${new Date().toISOString().slice(0, 10)}).
// Every manufacturer listing is preserved as a variant (name, price, code, images, sizes).
export const catalog = ${JSON.stringify(products, null, 1)};
`;
writeFileSync(OUT, banner);
console.log(`products=${products.length} variants=${totalVariants} (source listings=${expected})`);
console.log('by category:', JSON.stringify(Object.fromEntries(Object.entries(raw).map(([c, l]) => [c, { listings: l.length, products: products.filter(p => p.category_slug === c).length }]))));
console.log('missing images:', audit.missingImages.length, '| records without parsed sizes:', audit.unparsedSizes.length);
