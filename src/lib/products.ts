export interface ProductSize {
  width_cm: number;
  height_cm: number;
  is_default: boolean;
}

export interface ProductVariant {
  code: string;
  color_name_ro: string;
  color_hex: string;
  price_override_ron: number | null; // null = inherit base_price
  is_default: boolean;
}

export interface Product {
  code: string;
  category_slug: string; // "usi-exterior" | "ferestre" | "usi-interior"
  base_name_ro: string;
  slug: string;
  material: string;
  glass_type: string;
  is_double: boolean;
  description_ro: string;
  base_price_ron: number;
  variants: ProductVariant[];
  sizes: ProductSize[];
  source_url: string;
}

// Color hex reference for consistent swatches
const COLORS = {
  Alb: "#f5f5f0",
  Nuc: "#5c4033",
  "Stejar Auriu": "#b8860b",
  Antracit: "#36454f",
  Black: "#1a1a1a",
  Gold: "#c9a84c",
  Inox: "#c0c0c0",
};

export const categories = [
  { slug: "usi-exterior", name_ro: "Uși Exterior", name_en: "Exterior Doors", name_de: "Außen-Türen", sort_order: 1 },
  { slug: "ferestre", name_ro: "Ferestre", name_en: "Windows", name_de: "Fenster", sort_order: 2 },
  { slug: "usi-interior", name_ro: "Uși Interior", name_en: "Interior Doors", name_de: "Innen-Türen", sort_order: 3 },
];

export const products: Product[] = [
  // ── EXTERIOR DOORS (Uși Exterior) ──
  {
    code: "BB-EXT-001",
    category_slug: "usi-exterior",
    base_name_ro: "Kira Big",
    slug: "kira-big",
    material: "PVC",
    glass_type: "Sticlă termoizolantă",
    is_double: false,
    description_ro:
      "Ușa Kira Big combină designul modern cu performanța termică superioară. Profilele PVC de înaltă calitate asigură izolație termică și fonică excelentă. Se livrează cu balamale reglabile și maner inclus.",
    base_price_ron: 1300,
    source_url: "https://www.chirmandi.ro/usi-si-geamuri-termopan/usi/",
    sizes: [
      { width_cm: 80, height_cm: 170, is_default: false },
      { width_cm: 80, height_cm: 180, is_default: false },
      { width_cm: 80, height_cm: 190, is_default: false },
      { width_cm: 80, height_cm: 200, is_default: false },
      { width_cm: 80, height_cm: 210, is_default: false },
      { width_cm: 90, height_cm: 170, is_default: false },
      { width_cm: 90, height_cm: 180, is_default: false },
      { width_cm: 90, height_cm: 190, is_default: false },
      { width_cm: 90, height_cm: 200, is_default: false },
      { width_cm: 90, height_cm: 210, is_default: true },
      { width_cm: 100, height_cm: 170, is_default: false },
      { width_cm: 100, height_cm: 180, is_default: false },
      { width_cm: 100, height_cm: 190, is_default: false },
      { width_cm: 100, height_cm: 200, is_default: true },
      { width_cm: 100, height_cm: 210, is_default: false },
      { width_cm: 110, height_cm: 190, is_default: false },
      { width_cm: 110, height_cm: 200, is_default: false },
      { width_cm: 110, height_cm: 210, is_default: false },
    ],
    variants: [
      { code: "BB-EXT-001-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: true },
      { code: "BB-EXT-001-NUC", color_name_ro: "Nuc", color_hex: COLORS.Nuc, price_override_ron: null, is_default: false },
      { code: "BB-EXT-001-AURIU", color_name_ro: "Stejar Auriu", color_hex: COLORS["Stejar Auriu"], price_override_ron: null, is_default: false },
      { code: "BB-EXT-001-BLACK", color_name_ro: "Black", color_hex: COLORS.Black, price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-EXT-002",
    category_slug: "usi-exterior",
    base_name_ro: "Euro Classic",
    slug: "euro-classic",
    material: "PVC",
    glass_type: "Sticlă standard",
    is_double: true,
    description_ro:
      "Ușa Euro Classic oferă un aspect clasic cu performanțe moderne. Ideală pentru interioare care apreciază eleganța și funcționalitatea. Configurație dublă cu termoizolație bună.",
    base_price_ron: 1800,
    source_url: "https://www.chirmandi.ro/usi-si-geamuri-termopan/usi/",
    sizes: [
      { width_cm: 90, height_cm: 190, is_default: true },
      { width_cm: 90, height_cm: 200, is_default: false },
      { width_cm: 90, height_cm: 210, is_default: false },
      { width_cm: 100, height_cm: 190, is_default: false },
      { width_cm: 100, height_cm: 200, is_default: false },
      { width_cm: 100, height_cm: 210, is_default: true },
    ],
    variants: [
      { code: "BB-EXT-002-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: true },
      { code: "BB-EXT-002-AURIU", color_name_ro: "Stejar Auriu", color_hex: COLORS["Stejar Auriu"], price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-EXT-003",
    category_slug: "usi-exterior",
    base_name_ro: "Pragma Plus",
    slug: "pragma-plus",
    material: "PVC Premium",
    glass_type: "Sticlă termoizolantă 3 camere",
    is_double: false,
    description_ro:
      "Pragma Plus este alegerea premium — design contemporan, izolație termică superioară și securitate crescută. Profiluri de 70 mm cu 6 camere și închidere în 5 puncte.",
    base_price_ron: 2050,
    source_url: "https://www.chirmandi.ro/usi-si-geamuri-termopan/usi/",
    sizes: [
      { width_cm: 80, height_cm: 170, is_default: false },
      { width_cm: 80, height_cm: 180, is_default: false },
      { width_cm: 80, height_cm: 190, is_default: true },
      { width_cm: 80, height_cm: 200, is_default: false },
      { width_cm: 80, height_cm: 210, is_default: false },
      { width_cm: 90, height_cm: 170, is_default: false },
      { width_cm: 90, height_cm: 180, is_default: false },
      { width_cm: 90, height_cm: 190, is_default: false },
      { width_cm: 90, height_cm: 200, is_default: true },
      { width_cm: 90, height_cm: 210, is_default: false },
      { width_cm: 100, height_cm: 170, is_default: false },
      { width_cm: 100, height_cm: 180, is_default: false },
      { width_cm: 100, height_cm: 190, is_default: false },
      { width_cm: 100, height_cm: 200, is_default: true },
      { width_cm: 100, height_cm: 210, is_default: false },
      { width_cm: 110, height_cm: 190, is_default: false },
      { width_cm: 110, height_cm: 200, is_default: false },
      { width_cm: 110, height_cm: 210, is_default: false },
    ],
    variants: [
      { code: "BB-EXT-003-ANTRACIT", color_name_ro: "Antracit", color_hex: COLORS.Antracit, price_override_ron: null, is_default: true },
      { code: "BB-EXT-003-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-EXT-004",
    category_slug: "usi-exterior",
    base_name_ro: "Studio M",
    slug: "studio-m",
    material: "PVC",
    glass_type: "Sticlă mată",
    is_double: false,
    description_ro:
      "Ușa Studio M este soluția compactă și elegantă pentru spații mici. Profile PVC cu termoizolație, design minimalist la preț accesibil.",
    base_price_ron: 1100,
    source_url: "https://www.chirmandi.ro/usi-si-geamuri-termopan/usi/",
    sizes: [
      { width_cm: 70, height_cm: 190, is_default: true },
      { width_cm: 70, height_cm: 200, is_default: false },
      { width_cm: 80, height_cm: 190, is_default: false },
      { width_cm: 80, height_cm: 200, is_default: true },
    ],
    variants: [
      { code: "BB-EXT-004-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: true },
      { code: "BB-EXT-004-AURIU", color_name_ro: "Stejar Auriu", color_hex: COLORS["Stejar Auriu"], price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-EXT-005",
    category_slug: "usi-exterior",
    base_name_ro: "Della",
    slug: "della",
    material: "PVC",
    glass_type: "Sticlă mată",
    is_double: false,
    description_ro:
      "Ușa Della — exterior PVC, culoare antracit, sticlă mată. Dimensiuni variate de la 80 la 110 cm lățime, 170–210 cm înălțime. Caracteristici: 6 camere, profil 70 mm, închidere în 5 puncte, prag termoizolant din aluminiu, balamale reglabile.",
    base_price_ron: 1500,
    source_url: "https://www.chirmandi.ro/usi-si-geamuri-termopan/usi/usa-termopan-100x200-100x210-100x190-110x200-110x210-12",
    sizes: [
      { width_cm: 80, height_cm: 170, is_default: true },
      { width_cm: 80, height_cm: 180, is_default: false },
      { width_cm: 80, height_cm: 190, is_default: false },
      { width_cm: 80, height_cm: 200, is_default: false },
      { width_cm: 80, height_cm: 210, is_default: false },
      { width_cm: 90, height_cm: 170, is_default: false },
      { width_cm: 90, height_cm: 180, is_default: false },
      { width_cm: 90, height_cm: 190, is_default: true },
      { width_cm: 90, height_cm: 200, is_default: false },
      { width_cm: 90, height_cm: 210, is_default: false },
      { width_cm: 100, height_cm: 170, is_default: false },
      { width_cm: 100, height_cm: 180, is_default: false },
      { width_cm: 100, height_cm: 190, is_default: true },
      { width_cm: 100, height_cm: 200, is_default: false },
      { width_cm: 100, height_cm: 210, is_default: false },
      { width_cm: 110, height_cm: 200, is_default: false },
      { width_cm: 110, height_cm: 210, is_default: false },
    ],
    variants: [
      { code: "BB-EXT-005-ANTRACIT", color_name_ro: "Antracit", color_hex: COLORS.Antracit, price_override_ron: null, is_default: true },
      { code: "BB-EXT-005-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-EXT-006",
    category_slug: "usi-exterior",
    base_name_ro: "Amely 03 Black",
    slug: "amely-03-black",
    material: "PVC",
    glass_type: "Sticlă mată",
    is_double: false,
    description_ro:
      "Ușa Amely 03 Black — exterior PVC, culoare Stejar Auriu cu decoratiuni negre, sticlă mată. Dimensiuni 90/100/110 x 190/200/210. Caracteristici premium la preț competitiv.",
    base_price_ron: 1700,
    source_url: "https://www.chirmandi.ro/usi-si-geamuri-termopan/usi/usa-termopan-98x-190-cm-html",
    sizes: [
      { width_cm: 90, height_cm: 190, is_default: true },
      { width_cm: 90, height_cm: 200, is_default: false },
      { width_cm: 90, height_cm: 210, is_default: false },
      { width_cm: 100, height_cm: 190, is_default: false },
      { width_cm: 100, height_cm: 200, is_default: true },
      { width_cm: 100, height_cm: 210, is_default: false },
      { width_cm: 110, height_cm: 190, is_default: false },
      { width_cm: 110, height_cm: 200, is_default: false },
      { width_cm: 110, height_cm: 210, is_default: true },
    ],
    variants: [
      { code: "BB-EXT-006-STEJAR-AURIU-BLACK", color_name_ro: "Stejar Auriu Black", color_hex: "#8b7355", price_override_ron: null, is_default: true },
      { code: "BB-EXT-006-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-EXT-007",
    category_slug: "usi-exterior",
    base_name_ro: "Alba InoxLine 03",
    slug: "alba-inoxline-03",
    material: "PVC",
    glass_type: "Sticlă mată",
    is_double: true,
    description_ro:
      "Ușa Alba InoxLine 03 — exterior dublă, material PVC, culoare Alb cu decoratiuni inox, sticlă mată. Configurație premium cu termoizolație superioară.",
    base_price_ron: 2050,
    source_url: "https://www.chirmandi.ro/usi-si-geamuri-termopan/usi/",
    sizes: [
      { width_cm: 90, height_cm: 190, is_default: false },
      { width_cm: 90, height_cm: 200, is_default: true },
      { width_cm: 90, height_cm: 210, is_default: false },
      { width_cm: 100, height_cm: 190, is_default: false },
      { width_cm: 100, height_cm: 200, is_default: true },
      { width_cm: 100, height_cm: 210, is_default: false },
      { width_cm: 110, height_cm: 190, is_default: false },
      { width_cm: 110, height_cm: 200, is_default: false },
      { width_cm: 110, height_cm: 210, is_default: true },
    ],
    variants: [
      { code: "BB-EXT-007-ALB-INOX", color_name_ro: "Alb Inox", color_hex: "#d0d0d0", price_override_ron: null, is_default: true },
    ],
  },
  {
    code: "BB-EXT-008",
    category_slug: "usi-exterior",
    base_name_ro: "Hamburg",
    slug: "hamburg",
    material: "PVC",
    glass_type: "Sticlă mată",
    is_double: false,
    description_ro:
      "Ușa Hamburg Alb — exterior PVC simplă, sticlă mată. Dimensiuni de la 70/80/90/110 x 190/200/210. Soluție elegantă și accesibilă pentru intrare.",
    base_price_ron: 1300,
    source_url: "https://www.chirmandi.ru/usi-si-geamuri-termopan/usi/",
    sizes: [
      { width_cm: 70, height_cm: 190, is_default: false },
      { width_cm: 80, height_cm: 190, is_default: true },
      { width_cm: 80, height_cm: 200, is_default: false },
      { width_cm: 90, height_cm: 190, is_default: false },
      { width_cm: 90, height_cm: 200, is_default: true },
      { width_cm: 90, height_cm: 210, is_default: false },
      { width_cm: 110, height_cm: 190, is_default: false },
      { width_cm: 110, height_cm: 200, is_default: false },
      { width_cm: 110, height_cm: 210, is_default: true },
    ],
    variants: [
      { code: "BB-EXT-008-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: true },
    ],
  },

  // ── WINDOWS (Ferestre) ──
  {
    code: "BB-FER-001",
    category_slug: "ferestre",
    base_name_ro: "PVC Complete",
    slug: "pvc-complete",
    material: "PVC",
    glass_type: "Sticlă termoizolantă",
    is_double: true,
    description_ro:
      "Fereastră PVC completă — termoizolantă, cu funcțiune de deschidere, pentru necesități standard de locuință. Dimensiuni comune disponibile cu livrare rapidă.",
    base_price_ron: 1890,
    source_url: "https://www.chirmandi.ro/usi-si-geamuri-termopan/ferestre/",
    sizes: [
      { width_cm: 60, height_cm: 140, is_default: true },
      { width_cm: 70, height_cm: 150, is_default: false },
      { width_cm: 80, height_cm: 160, is_default: false },
    ],
    variants: [
      { code: "BB-FER-001-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: true },
      { code: "BB-FER-001-NUC", color_name_ro: "Nuc", color_hex: COLORS.Nuc, price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-FER-002",
    category_slug: "ferestre",
    base_name_ro: "PVC Junior",
    slug: "pvc-junior",
    material: "PVC",
    glass_type: "Sticlă standard",
    is_double: false,
    description_ro:
      "Fereastră PVC Junior — soluție compactă pentru birouri sau spații mici. Profil simplu, funcțional, la preț accesibil.",
    base_price_ron: 1290,
    source_url: "https://www.chirmandi.ro/usi-si-geamuri-termopan/ferestre/",
    sizes: [
      { width_cm: 50, height_cm: 130, is_default: true },
      { width_cm: 60, height_cm: 140, is_default: false },
    ],
    variants: [
      { code: "BB-FER-002-NUC", color_name_ro: "Nuc", color_hex: COLORS.Nuc, price_override_ron: null, is_default: true },
      { code: "BB-FER-002-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-FER-003",
    category_slug: "ferestre",
    base_name_ro: "PVC Royal",
    slug: "pvc-royal",
    material: "PVC Premium",
    glass_type: "Sticlă termoizolantă 3 camere",
    is_double: true,
    description_ro:
      "Fereastră PVC Royal — profil premium cu 3 camere de izolație. Dimensiuni mari disponibile, ideală pentru livinguri și suprafețe mari de curent.",
    base_price_ron: 2690,
    source_url: "https://www.chirmandi.ro/usi-si-geamuri-termopan/ferestre/",
    sizes: [
      { width_cm: 90, height_cm: 170, is_default: false },
      { width_cm: 100, height_cm: 180, is_default: true },
      { width_cm: 100, height_cm: 200, is_default: false },
      { width_cm: 120, height_cm: 200, is_default: false },
    ],
    variants: [
      { code: "BB-FER-003-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: true },
      { code: "BB-FER-003-ANTRACIT", color_name_ro: "Antracit", color_hex: COLORS.Antracit, price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-FER-004",
    category_slug: "ferestre",
    base_name_ro: "Geam Tripan",
    slug: "geam-tripan",
    material: "PVC",
    glass_type: "Sticlă tripan",
    is_double: true,
    description_ro:
      "Fereastră cu geam tripan — izolație termică și fonică maximă. Recomandată pentru zone cu zgomot exterior sau climă rece.",
    base_price_ron: 2150,
    source_url: "https://www.chirmandi.ro/usi-si-geamuri-termopan/ferestre/",
    sizes: [
      { width_cm: 70, height_cm: 150, is_default: true },
      { width_cm: 80, height_cm: 160, is_default: false },
    ],
    variants: [
      { code: "BB-FER-004-ANTRACIT", color_name_ro: "Antracit", color_hex: COLORS.Antracit, price_override_ron: null, is_default: true },
      { code: "BB-FER-004-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: false },
    ],
  },

  // ── INTERIOR DOORS (Uși Interior) ──
  {
    code: "BB-INT-001",
    category_slug: "usi-interior",
    base_name_ro: "Euro Classic Interior",
    slug: "euro-classic-interior",
    material: "PVC",
    glass_type: "Sticlă standard",
    is_double: false,
    description_ro:
      "Ușa de interior Euro Classic — simplă, elegantă, la preț competitiv. Profile din PVC cu finisare albă, potrivită pentru orice stil de decor.",
    base_price_ron: 1250,
    source_url: "https://www.chirmandi.ro/usi-de-interior/",
    sizes: [
      { width_cm: 80, height_cm: 200, is_default: true },
      { width_cm: 90, height_cm: 210, is_default: false },
    ],
    variants: [
      { code: "BB-INT-001-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: true },
      { code: "BB-INT-001-AURIU", color_name_ro: "Stejar Auriu", color_hex: COLORS["Stejar Auriu"], price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-INT-002",
    category_slug: "usi-interior",
    base_name_ro: "Kira Slim",
    slug: "kira-slim",
    material: "PVC",
    glass_type: "Sticlă mată",
    is_double: false,
    description_ro:
      "Ușa Kira Slim pentru interior — design modern la dimensiuni standard. Termoizolație bună, finisare Nuc natural.",
    base_price_ron: 1490,
    source_url: "https://www.chirmandi.ro/usi-de-interior/",
    sizes: [
      { width_cm: 70, height_cm: 190, is_default: false },
      { width_cm: 70, height_cm: 200, is_default: true },
      { width_cm: 80, height_cm: 200, is_default: false },
    ],
    variants: [
      { code: "BB-INT-002-NUC", color_name_ro: "Nuc", color_hex: COLORS.Nuc, price_override_ron: null, is_default: true },
      { code: "BB-INT-002-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-INT-003",
    category_slug: "usi-interior",
    base_name_ro: "Studio M Interior",
    slug: "studio-m-interior",
    material: "PVC",
    glass_type: "Sticlă standard",
    is_double: false,
    description_ro:
      "Ușa Studio M Interior — dimensiuni standard cu finisare Stejar Auriu. Elegantă și practică pentru orice cameră.",
    base_price_ron: 1350,
    source_url: "https://www.chirmandi.ro/usi-de-interior/",
    sizes: [
      { width_cm: 80, height_cm: 200, is_default: true },
      { width_cm: 90, height_cm: 210, is_default: false },
    ],
    variants: [
      { code: "BB-INT-003-AURIU", color_name_ro: "Stejar Auriu", color_hex: COLORS["Stejar Auriu"], price_override_ron: null, is_default: true },
      { code: "BB-INT-003-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: false },
    ],
  },
  {
    code: "BB-INT-004",
    category_slug: "usi-interior",
    base_name_ro: "Pragma Interior",
    slug: "pragma-interior",
    material: "PVC Premium",
    glass_type: "Sticlă mată",
    is_double: true,
    description_ro:
      "Ușa Pragma Interior — variantă dublă, premium. Profil mai gros pentru izolație superioară, finisare Antracit modernă.",
    base_price_ron: 1690,
    source_url: "https://www.chirmandi.ro/usi-de-interior/",
    sizes: [
      { width_cm: 90, height_cm: 210, is_default: true },
      { width_cm: 100, height_cm: 220, is_default: false },
    ],
    variants: [
      { code: "BB-INT-004-ANTRACIT", color_name_ro: "Antracit", color_hex: COLORS.Antracit, price_override_ron: null, is_default: true },
      { code: "BB-INT-004-ALB", color_name_ro: "Alb", color_hex: COLORS.Alb, price_override_ron: null, is_default: false },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category_slug === slug);
}

export function getCategoryBySlug(slug: string): (typeof categories)[0] | undefined {
  return categories.find((c) => c.slug === slug);
}
