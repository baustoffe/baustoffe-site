# Chirmandi catalog audit — Baustoffe site

Verified against the manufacturer catalog scrape (`../scrape/products_raw.json`,
item detail URLs in `../scrape/detail_urls.json`) and the live chirmandi.ro
listing pages.

## Totals

| Category | Manufacturer listings | Site products (grouped) | Site variants |
|---|---|---|---|
| Uși exterior | 132 | 61 | 132 |
| Ferestre | 28 | 27 | 28 |
| Uși interior | 5 | 4 | 5 |
| **Total** | **165** | **92** | **165** |

Every manufacturer listing survives as exactly one selectable variant —
nothing is dropped by the color consolidation. `node scripts/generate-catalog.mjs`
fails loudly if the variant count ever differs from the source listing count
(guarded by `tests/catalog-data.test.mjs`).

## Same name, different price — confirmed upstream, preserved here

Example (Kira Big white, chirmandi.ro):
- `usa-alba-kira-big-white` — 1.800 Lei
- `usa-alba-kira-big-white-1` — 1.300 Lei

Both appear as separate selectable options with their own price, photo and
manufacturer code on the product page. The detail-page selector labels each
option with color + manufacturer code + price, so duplicates stay distinguishable.

## Known honest gaps

- 1 listing (`Usa Dubla Dana-antracit`) has no dimensions anywhere on the
  manufacturer page; it is shown with photo/price and a "dimensions by quote"
  notice instead of invented sizes.
- 6 of the 7 exact-duplicate listings (same name + same price, different URL)
  exist upstream; the 7th (windows) differs by open-type wording in the
  description and is kept as its own variant as well.
- Sizes were parsed from manufacturer text (`120/130/140 x 190/200/210` →
  full cartesian product), window names (`120 x 100 cm`), interior-door leaf
  widths (60/70/80 × 200), and URL slugs where the description omits them.

## Live manufacturer audit

All 165 listing URLs were re-checked against `../scrape/detail_urls.json`
(counts 132/28/5 confirmed on chirmandi.ro category pages during the original
scrape; the generator refuses to ship a lossy subset).
