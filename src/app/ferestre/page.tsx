"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/components/providers";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

const sampleProducts = [
  { id: "10", code: "BB-FER-001", name: "PVC Complete", color: "Alb", hex: "#f5f5f0", sizes: "60x140 – 70x150 – 80x160", price: 1890, image: "" },
  { id: "11", code: "BB-FER-002", name: "PVC Junior", color: "Nuc", hex: "#5c4033", sizes: "50x130 – 60x140", price: 1290, image: "" },
  { id: "12", code: "BB-FER-003", name: "PVC Royal", color: "Alb", hex: "#f5f5f0", sizes: "90x170 – 100x180 – 120x200", price: 2690, image: "" },
  { id: "13", code: "BB-FER-004", name: "Geam Tripan", color: "Antracit", hex: "#36454f", sizes: "70x150 – 80x160", price: 2150, image: "" },
];

const colors = ["Toate", "Alb", "Nuc", "Stejar Auriu", "Antracit"];

function ProductCard({ product, index }: { product: typeof sampleProducts[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const { addItem } = useCart();

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
          <span className="text-[11px] text-[#141414]/50 hover:text-[#141414] transition-colors cursor-pointer" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Cere ofertă dimensiune →</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FerestrePage() {
  const [activeColor, setActiveColor] = useState("Toate");
  const filtered = activeColor === "Toate" ? sampleProducts : sampleProducts.filter((p) => p.color === activeColor);

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <nav className="text-[11px] text-[#141414]/40 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <Link href="/" className="hover:text-[#141414]">Acasă</Link><span className="mx-2">/</span><span>Ferestre</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ferestre</h1>
        <p className="text-sm text-[#141414]/50 mt-2 font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ferestre PVC cu termoizolație superioară, diverse dimensiuni și configurații.</p>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button key={c} onClick={() => setActiveColor(c)} className={cn("px-4 py-2 text-[11px] uppercase tracking-wider transition-colors duration-200 border", activeColor === c ? "bg-[#141414] text-white border-[#141414]" : "bg-white text-[#141414] border-[#141414]/20 hover:border-[#141414]/50")} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>{c}</button>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
