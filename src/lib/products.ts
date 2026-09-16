export interface ProductSize {
  width_cm: number;
  height_cm: number;
  is_default: boolean;
}

export interface ProductVariant {
  code: string;
  color_name_ro: string;
  color_hex: string;
  price_override_ron: number | null; // exact manufacturer listing price
  is_default: boolean;
  manufacturer_code: string;
  source_id: string;
  source_url: string;
  source_name: string;
  description_ro: string;
  image: string;
  gallery: string[];
  sizes: ProductSize[];
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
  image: string;
  gallery?: string[];
}

export const categories = [
  { slug: "usi-exterior", name_ro: "Uși Exterior", name_en: "Exterior Doors", name_de: "Außen-Türen", sort_order: 1 },
  { slug: "ferestre", name_ro: "Ferestre", name_en: "Windows", name_de: "Fenster", sort_order: 2 },
  { slug: "usi-interior", name_ro: "Uși Interior", name_en: "Interior Doors", name_de: "Innen-Türen", sort_order: 3 },
];

// Generated from the chirmandi.ro scrape by scripts/generate-catalog.mjs.
// Every manufacturer listing (name, price, code, photos, sizes) is preserved:
// 132 exterior doors + 28 windows + 5 interior doors = 165 variants.
import { catalog } from "./catalog-generated";

export const products: Product[] = catalog.map((product) => ({
  ...product,
  variants: product.variants.map((variant) => ({ ...variant })),
}));

/** Exact price for one manufacturer listing: override when set, else product base price. */
export function getVariantPrice(product: Product, variant: ProductVariant): number {
  return variant.price_override_ron ?? product.base_price_ron;
}

/** URL of the product-detail page for one consolidated model. */
export function getProductHref(product: Product): string {
  return `/${product.category_slug}/${product.slug}`;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category_slug === slug);
}

export function getCategoryBySlug(slug: string): (typeof categories)[0] | undefined {
  return categories.find((c) => c.slug === slug);
}
