"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/components/providers";
import { ShoppingBag } from "lucide-react";
import { getProductBySlug } from "@/lib/products";
import { formatPrice, formatSize } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.productSlug as string;
  const product = getProductBySlug(slug);
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
  const size = product.sizes[selectedSize];

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <div className="bg-[#e8e8e8] aspect-square flex items-center justify-center mb-3">
            <div className="text-center">
              <span className="text-[#aaa] text-xs uppercase tracking-widest block">{product.base_name_ro}</span>
              <span className="text-[#aaa] text-[10px] uppercase tracking-widest">{variant.color_name_ro}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {product.variants.map((v, i) => (
              <button
                key={v.code}
                onClick={() => { setSelectedVariant(i); setSelectedSize(0); }}
                className={`w-16 h-16 bg-[#e8e8e8] border-2 ${i === selectedVariant ? "border-[#141414]" : "border-transparent"} flex items-center justify-center`}
                title={v.color_name_ro}
              >
                <span className="w-8 h-8 block" style={{ backgroundColor: v.color_hex, border: "1px solid rgba(0,0,0,0.1)" }} />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#141414]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.code}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#141414] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.base_name_ro}</h1>
          <p className="text-2xl font-bold text-[#141414] mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {formatPrice(product.base_price_ron)}
          </p>

          <p className="text-sm text-[#141414]/60 mt-6 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.description_ro}</p>

          {/* Color swatches */}
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-wider text-[#141414]/40 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Culoare</p>
            <div className="flex gap-2">
              {product.variants.map((v, i) => (
                <button
                  key={v.code}
                  onClick={() => setSelectedVariant(i)}
                  className={`w-8 h-8 border-2 ${i === selectedVariant ? "border-[#141414]" : "border-transparent"}`}
                  style={{ backgroundColor: v.color_hex }}
                  title={v.color_name_ro}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-wider text-[#141414]/40 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dimensiune</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s, i) => (
                <button
                  key={`${s.width_cm}x${s.height_cm}`}
                  onClick={() => setSelectedSize(i)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-wider border transition-colors ${i === selectedSize ? "bg-[#141414] text-white border-[#141414]" : "bg-white text-[#141414] border-[#141414]/20 hover:border-[#141414]/50"}`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                >
                  {formatSize(s.width_cm, s.height_cm)}
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
              onClick={() => addItem({ variant_id: variant.code, product_id: product.code, name: product.base_name_ro, color: variant.color_name_ro, size: size ? formatSize(size.width_cm, size.height_cm) : "Standard", quantity, unit_price_ron: product.base_price_ron })}
              className="inline-flex items-center bg-[#141414] text-white px-8 py-3 text-[11px] uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
            >
              <ShoppingBag size={14} className="mr-2" strokeWidth={1.5} />
              Adaugă în coș
            </button>
          </div>

          {/* Meta */}
          <div className="mt-8 pt-6 border-t border-[#e5e5e5] space-y-1 text-[11px] text-[#141414]/40 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <p>Material: {product.material}</p>
            <p>Sticlă: {product.glass_type}</p>
            <p>Frunză: {product.is_double ? "Dublă" : "Simplă"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
