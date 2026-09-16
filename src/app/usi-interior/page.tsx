"use client";

import Link from "next/link";
import { CategoryBanner } from "@/components/category-banner";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/components/providers";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { translate } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { products } from "@/lib/products";
import { formatPrice, formatSize } from "@/lib/utils";

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const { addItem } = useCart();
  const { locale } = useLocale();
  const defaultSize = product.sizes.find((s) => s.is_default) || product.sizes[0];

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="relative bg-[#e8e8e8] aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#aaa] text-xs uppercase tracking-widest">{product.base_name_ro}</span>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {product.variants.map((v) => (
            <span
              key={v.code}
              className="w-5 h-5 border border-white/50"
              style={{ backgroundColor: v.color_hex }}
              title={v.color_name_ro}
            />
          ))}
        </div>
      </div>
      <div className="pt-3">
        <h3 className="text-sm font-medium text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {product.base_name_ro}
        </h3>
        <p className="text-[10px] uppercase tracking-wider text-[#141414]/40 mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {product.sizes.map((s) => formatSize(s.width_cm, s.height_cm)).join(" · ")}
        </p>
        <p className="text-sm text-[#141414]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {translate('cat.de_la', locale)} {formatPrice(product.base_price_ron)}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() =>
              addItem({
                variant_id: product.variants[0].code,
                product_id: product.code,
                name: product.base_name_ro,
                color: product.variants[0].color_name_ro,
                size: defaultSize ? formatSize(defaultSize.width_cm, defaultSize.height_cm) : "Standard",
                quantity: 1,
                unit_price_ron: product.base_price_ron,
                image: "",
              })
            }
            className="inline-flex items-center bg-[#141414] text-white px-4 py-2 text-[11px] uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors duration-200"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
          >
            <ShoppingBag size={14} className="mr-1.5" strokeWidth={1.5} />
            {translate('cat.adauga', locale)}
          </button>
          <Link href="/cere-oferta" className="text-[11px] text-[#141414]/50 hover:text-[#141414] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {translate('cat.cere_oferta', locale)}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function UsiInteriorPage() {
  const [activeColor, setActiveColor] = useState("Toate");
  const { locale } = useLocale();
  const sampleProducts = products.filter((p) => p.category_slug === "usi-interior");
  const colors = ["Toate", "Alb", "Nuc", "Stejar Auriu", "Antracit"];

  const filtered =
    activeColor === "Toate"
      ? sampleProducts
      : sampleProducts.filter((p) => p.variants.some((v) => v.color_name_ro === activeColor));

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6 mb-8"><CategoryBanner category="interior" /></div>
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <nav className="text-[11px] text-[#141414]/40 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <Link href="/" className="hover:text-[#141414]">{translate('cat.breadcrumb', locale)}</Link>
          <span className="mx-2">/</span>
          <span>{translate('nav.usi_interior', locale)}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate('nav.usi_interior', locale)}</h1>
        <p className="text-sm text-[#141414]/50 mt-2 font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {translate('cat.usi_interior_desc', locale)}
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setActiveColor(c)}
              className={cn(
                "px-4 py-2 text-[11px] uppercase tracking-wider transition-colors duration-200 border",
                activeColor === c ? "bg-[#141414] text-white border-[#141414]" : "bg-white text-[#141414] border-[#141414]/20 hover:border-[#141414]/50"
              )}
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
            >
              {c === "Toate" ? translate('cat.toate', locale) : c}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.code} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
