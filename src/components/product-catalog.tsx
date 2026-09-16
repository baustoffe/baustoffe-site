"use client";

import Link from "next/link";
import { useState } from "react";
import { CategoryBanner } from "@/components/category-banner";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { translate } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

export type CatalogCategory = "usi-exterior" | "ferestre" | "usi-interior";
const config = {
  "usi-exterior": { banner: "exterior", title: "nav.usi_exterior", description: "cat.usi_exterior_desc" },
  ferestre: { banner: "windows", title: "nav.ferestre", description: "cat.ferestre_desc" },
  "usi-interior": { banner: "interior", title: "nav.usi_interior", description: "cat.usi_interior_desc" },
} as const;

export function ProductCatalog({ category }: { category: CatalogCategory }) {
  const { locale } = useLocale();
  const [activeColor, setActiveColor] = useState("");
  const catalog = products.filter((product) => product.category_slug === category);
  const colors = [...new Set(catalog.flatMap((product) => product.variants.map((variant) => variant.color_name_ro)))];
  const filtered = activeColor ? catalog.filter((product) => product.variants.some((variant) => variant.color_name_ro === activeColor)) : catalog;
  const current = config[category];
  return (
    <div className="pt-24 pb-20 text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="mx-auto max-w-7xl px-6 mb-8"><CategoryBanner category={current.banner} /></div>
      <div className="mx-auto max-w-7xl px-6">
        <nav className="mb-6 text-[11px] text-[#141414]/60" aria-label="Breadcrumb">
          <Link href="/" className="hover:underline">{translate("cat.breadcrumb", locale)}</Link><span className="mx-2">/</span><span>{translate(current.title, locale)}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold">{translate(current.title, locale)}</h1>
        <p className="mt-2 text-sm text-[#141414]/60">{translate(current.description, locale)}</p>
        <div className="my-8 flex flex-wrap gap-2" aria-label={translate("prod.culoare", locale)}>
          {["", ...colors].map((color) => <button key={color} onClick={() => setActiveColor(color)} aria-pressed={activeColor === color} className={`border px-4 py-2 text-[11px] uppercase tracking-wider ${activeColor === color ? "bg-[#141414] border-[#141414] text-white" : "border-[#141414]/20 hover:border-[#141414]"}`}>{color || translate("cat.toate", locale)}</button>)}
        </div>
        <p className="mb-4 text-xs text-[#141414]/60" aria-live="polite">{filtered.length} {locale === "de" ? "Modelle" : locale === "en" ? "models" : "modele"}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {filtered.map((product) => <ProductCard key={product.code} product={product} />)}
        </div>
      </div>
    </div>
  );
}
