"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/components/providers";
import { ShoppingBag } from "lucide-react";

const mockProduct: Record<string, any> = {
  "kira-big": {
    name: "Kira Big",
    code: "BB-EXT-001",
    price: 3490,
    baseSizes: ["80x200", "90x210", "100x220"],
    materials: "PVC / Termopan",
    glass: "Sticlă termoizolantă",
    leaf: "Simplă",
    description: "Ușa Kira Big combină designul modern cu performanța termică superioară. Profilele PVC de înaltă calitate asigură izolație termică și fonică excelentă.",
    variants: [
      { color: "Alb", hex: "#f5f5f0", code: "BB-EXT-001-ALB" },
      { color: "Nuc", hex: "#5c4033", code: "BB-EXT-001-NUC" },
      { color: "Stejar Auriu", hex: "#b8860b", code: "BB-EXT-001-AURIU" },
    ],
  },
  "euro-classic": {
    name: "Euro Classic",
    code: "BB-EXT-002",
    price: 2890,
    baseSizes: ["90x210", "100x220"],
    materials: "PVC",
    glass: "Sticlă standard",
    leaf: "Dublă",
    description: "Ușa Euro Classic oferă un aspect clasic cu performanțe moderne. Ideală pentru interioare care apreciază eleganța și funcționalitatea.",
    variants: [
      { color: "Alb", hex: "#f5f5f0", code: "BB-EXT-002-ALB" },
      { color: "Stejar Auriu", hex: "#b8860b", code: "BB-EXT-002-AURIU" },
    ],
  },
  "pragma-plus": {
    name: "Pragma Plus",
    code: "BB-EXT-003",
    price: 3890,
    baseSizes: ["80x200", "85x205", "90x210"],
    materials: "PVC Premium / Termopan",
    glass: "Sticlă termoizolantă 3 camere",
    leaf: "Simplă",
    description: "Pragma Plus este alegerea premium — design contemporan, izolație termică superioară și securitate crescută.",
    variants: [
      { color: "Antracit", hex: "#36454f", code: "BB-EXT-003-Antracit" },
      { color: "Alb", hex: "#f5f5f0", code: "BB-EXT-003-ALB" },
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.productSlug as string;
  const product = mockProduct[slug];
  const { addItem } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold text-[#141414] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Produsul nu a fost găsit</h1>
          <Link href="/usi-exterior" className="text-[#141414]/60 hover:text-[#141414] underline" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>← Întoarce-te la catalog</Link>
        </div>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const size = product.baseSizes[selectedSize];

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <div className="bg-[#e8e8e8] aspect-square flex items-center justify-center mb-3">
            <div className="text-center">
              <span className="text-[#aaa] text-xs uppercase tracking-widest block">{product.name}</span>
              <span className="text-[#aaa] text-[10px] uppercase tracking-widest">{variant.color}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {product.variants.map((v: any, i: number) => (
              <button
                key={v.code}
                onClick={() => { setSelectedVariant(i); setSelectedSize(0); }}
                className={`w-16 h-16 bg-[#e8e8e8] border-2 ${i === selectedVariant ? "border-[#141414]" : "border-transparent"} flex items-center justify-center`}
                title={v.color}
              >
                <span className="w-8 h-8 block" style={{ backgroundColor: v.hex, border: "1px solid rgba(0,0,0,0.1)" }} />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#141414]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.code}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#141414] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.name}</h1>
          <p className="text-2xl font-bold text-[#141414] mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {product.price.toLocaleString("ro-RO")} Lei
          </p>

          <p className="text-sm text-[#141414]/60 mt-6 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.description}</p>

          {/* Color swatches */}
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-wider text-[#141414]/40 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Culoare</p>
            <div className="flex gap-2">
              {product.variants.map((v: any, i: number) => (
                <button
                  key={v.code}
                  onClick={() => setSelectedVariant(i)}
                  className={`w-8 h-8 border-2 ${i === selectedVariant ? "border-[#141414]" : "border-transparent"}`}
                  style={{ backgroundColor: v.hex }}
                  title={v.color}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-wider text-[#141414]/40 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dimensiune</p>
            <div className="flex flex-wrap gap-2">
              {product.baseSizes.map((s: string, i: number) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(i)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-wider border transition-colors ${i === selectedSize ? "bg-[#141414] text-white border-[#141414]" : "bg-white text-[#141414] border-[#141414]/20 hover:border-[#141414]/50"}`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                >
                  {s}
                </button>
              ))}
            </div>
            <Link href="/cere-oferta" className="inline-block mt-2 text-[11px] text-[#141414]/50 hover:text-[#141414] underline" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Dimensiune personalizată? Cere ofertă →
            </Link>
          </div>

          {/* Quantity + Add to cart */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-[#141414]/20">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#f5f5f5]">−</button>
              <span className="w-8 text-center text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-[#f5f5f5]">+</button>
            </div>
            <button
              onClick={() => addItem({ variant_id: variant.code, product_id: product.code, name: product.name, color: variant.color, size, quantity, unit_price_ron: product.price })}
              className="inline-flex items-center bg-[#141414] text-white px-8 py-3 text-[11px] uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
            >
              <ShoppingBag size={14} className="mr-2" strokeWidth={1.5} />
              Adaugă în coș
            </button>
          </div>

          {/* Meta */}
          <div className="mt-8 pt-6 border-t border-[#e5e5e5] space-y-1 text-[11px] text-[#141414]/40 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <p>Material: {product.materials}</p>
            <p>Sticlă: {product.glass}</p>
            <p>Frunză: {product.leaf}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
