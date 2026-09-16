"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/components/providers";
import { cn } from "@/lib/utils";
import { ShoppingBag, ChevronDown } from "lucide-react";

/* ─── Sample product data (will be replaced by DB-driven data) ─── */
const sampleProducts = [
  { id: "1", code: "BB-EXT-001", name: "Kira Big", color: "Alb", hex: "#f5f5f0", sizes: "80x200 – 90x210 – 100x220", price: 3490, image: "" },
  { id: "2", code: "BB-EXT-001-NUC", name: "Kira Big", color: "Nuc", hex: "#5c4033", sizes: "80x200 – 90x210 – 100x220", price: 3490, image: "" },
  { id: "3", code: "BB-EXT-002", name: "Euro Classic", color: "Alb", hex: "#f5f5f0", sizes: "90x210 – 100x220", price: 2890, image: "" },
  { id: "4", code: "BB-EXT-002-AURIU", name: "Euro Classic", color: "Stejar Auriu", hex: "#b8860b", sizes: "90x210 – 100x220", price: 2890, image: "" },
  { id: "5", code: "BB-EXT-003", name: "Pragma Plus", color: "Antracit", hex: "#36454f", sizes: "80x200 – 85x205 – 90x210", price: 3890, image: "" },
  { id: "6", code: "BB-EXT-004", name: "Studio M", color: "Alb", hex: "#f5f5f0", sizes: "70x190 – 80x200", price: 2490, image: "" },
];

const colors = ["Toate", "Alb", "Nuc", "Stejar Auriu", "Antracit"];

function ProductCard({ product, index }: { product: typeof sampleProducts[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const { addItem } = useCart();
  const [showSwatches, setShowSwatches] = useState(false);

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
          <span className="text-[#aaa] text-xs uppercase tracking-widest">{product.name}</span>
        </div>
        {/* Color swatches on hover */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {["Alb", "Nuc", "Auriu"].map((c) => (
            <span key={c} className="w-5 h-5 border border-white/50" style={{ backgroundColor: c === "Alb" ? "#f5f5f0" : c === "Nuc" ? "#5c4033" : "#b8860b" }} title={c} />
          ))}
        </div>
      </div>
      <div className="pt-3">
        <h3 className="text-sm font-medium text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.name}</h3>
        <p className="text-[10px] uppercase tracking-wider text-[#141414]/40 mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.sizes}</p>
        <p className="text-sm text-[#141414]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>de la {product.price.toLocaleString("ro-RO")} Lei</p>
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => addItem({ variant_id: product.id, product_id: product.id, name: product.name, color: product.color, size: product.sizes.split(" – ")[0], quantity: 1, unit_price_ron: product.price, image: product.image })}
            className="inline-flex items-center bg-[#141414] text-white px-4 py-2 text-[11px] uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors duration-200"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
          >
            <ShoppingBag size={14} className="mr-1.5" strokeWidth={1.5} />
            Adaugă în coș
          </button>
          <Link href="/cere-oferta" className="text-[11px] text-[#141414]/50 hover:text-[#141414] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Cere ofertă dimensiune →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function UsiExteriorPage() {
  const [activeColor, setActiveColor] = useState("Toate");

  const filtered = activeColor === "Toate"
    ? sampleProducts
    : sampleProducts.filter((p) => p.color === activeColor || (activeColor === "Stejar Auriu" && p.color.includes("Auriu")));

  return (
    <div className="pt-24">
      {/* Breadcrumb + title */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <nav className="text-[11px] text-[#141414]/40 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <Link href="/" className="hover:text-[#141414]">Acasă</Link>
          <span className="mx-2">/</span>
          <span>Uși Exterior</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Uși Exterior</h1>
        <p className="text-sm text-[#141414]/50 mt-2 font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Uși de exterior PVC și termopan, distribuite direct de la Chirmandi.</p>
      </div>

      {/* Filter bar */}
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
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
