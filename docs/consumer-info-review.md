# Consumer information update — review pending

## Verified sources

- ANPC current SAL page: https://www.anpc.ro/sal
- Official online SAL pictogram: https://www.anpc.ro/download/sal/SAL-PICTOGRAMA.png (201 × 50 PNG, downloaded without alteration)
- Official ANPC logo: https://www.anpc.ro/uploads/settings/01KPQVAXAYJA6YRBCFTERW7MME.png (4083 × 1920 PNG, downloaded without alteration)
- SAL destination linked by ANPC: https://reclamatiisal.anpc.ro/
- European Commission closure notice: https://consumer-redress.ec.europa.eu/site-relocation_en — ODR/SOL discontinued 20 July 2025 under Regulation (EU) 2024/3228. Do not represent the former service as operational.

## Manufacturer source pages retrieved

- https://www.chirmandi.ro/termeni-si-conditii.html — full browser text 26,597 characters
- https://www.chirmandi.ro/politica-de-confidentialitate.html — 2,697 characters
- https://www.chirmandi.ro/politica-cookies.html — 15,159 characters
- https://www.chirmandi.ro/informatii-despre-livrare.html — 443 characters
- https://www.chirmandi.ro/instrumente-gdpr — 991 characters; an interactive account-tools page, not a standalone policy

Full reference snapshots are retained outside the application at `/home/vlad/websites/baustoffe/asset-generation/legal-reference/` (five sources plus manifest). Web-extraction summaries truncated the terms and cookies pages; use the browser snapshots instead.

## Why exact name substitution is insufficient

Manufacturer terms describe card processors, customer accounts, newsletter subscriptions, different delivery conditions (including large-glass exclusions), email/SMS contract confirmation, and Bucuresti jurisdiction. Their privacy notice claims no third-party transfers and contains a server-security liability disclaimer. Their terms cite Law 677/2001 and impose a 48-hour missing-warranty-certificate notification cutoff. Cookie text describes features not verified on Baustoffe. These statements must be checked against actual operations and current law; copying them does not establish compliance.

The user explicitly approved preserving the manufacturer's wording and structure with company-detail changes only, deferring owner review. All five source documents are now imported. Their policy claims are not verified as compliant or consistent with the checkout; no payment, delivery, account or tracking functionality was changed. A Romanian legal professional should review the final text.

Source blocks are versioned under docs/legal-sources; transformed copies under src/content/legal. Tests compare every block against an explicit replacement map. Company names, registration identifiers, address and phone are replaced. Because no confirmed shop domain or business email was supplied, manufacturer domains become “acest site” and manufacturer emails become “pagina de contact”; a functioning /contact link and full legal identity follow each document. No invented email or domain is used.

Manufacturer header/footer navigation and the Continue button are excluded. Document block order and line breaks are retained; HTML is rendered as escaped text (not executable remote HTML). GDPR account-action labels are retained as static text, not fake working account tools, and the shop contact link is available below. The manufacturer’s legal/operational contradictions remain for owner review as requested.

## Implemented scope

- Desktop nav occupies the existing 64px hero clearance, centering contents at y=32 instead of y=26.25. Mobile sizing unchanged.
- Restored the + suffix on the animated product count.
- Footer serves the two authentic PNGs locally and points SAL at the ANPC dispute-resolution portal.
- Registered address added to the existing footer company identity.
- Rejected icon concepts are not included in the application or this branch.

Legal-page replacement is included in this update under the explicit approval above. Owner review of the preserved source conflicts is deferred. Badge presence alone does not establish full Romanian consumer-law compliance.
