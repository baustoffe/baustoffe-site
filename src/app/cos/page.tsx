"use client";

import { useCart } from "@/components/providers";
import CartDrawer from "@/components/cart-drawer";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { translate } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

export default function CartPage() {
  const { items, totalPrice, removeItem, updateQuantity } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { locale } = useLocale();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-lg text-center">
          <ShoppingBag size={48} className="mx-auto text-[#141414]/20" strokeWidth={1} />
          <h1 className="text-2xl font-bold text-[#141414] mt-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("cart.title", locale)}</h1>
          <p className="text-[#141414]/50 mt-2">{translate("cart.empty", locale)}</p>
          <Link href="/usi-exterior" className="inline-flex mt-6 bg-[#141414] text-white px-6 py-3 text-sm font-medium tracking-wider hover:bg-[#2a2a2a] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
            {translate("cart.vezi_produse", locale)}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#141414] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("cart.title", locale)} ({items.length})</h1>
        <div className="space-y-6">
          {items.map((item) => (
            <div key={`${item.variant_id}-${item.size}`} className="flex gap-6 items-start">
              <div className="w-24 h-24 bg-[#e8e8e8] flex-shrink-0 flex items-center justify-center">
                <span className="text-[#aaa] text-xs uppercase">Imagine</span>
              </div>
              <div className="flex-1">
                <h2 className="text-base font-medium text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.name}</h2>
                <p className="text-[11px] text-[#141414]/40 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.color} · {item.size}</p>
                <p className="text-sm text-[#141414]/60 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.quantity} × {item.unit_price_ron.toLocaleString("ro-RO")} Lei TVA inclus = {(item.quantity * item.unit_price_ron).toLocaleString("ro-RO")} Lei TVA inclus
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.variant_id, item.size, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center border border-[#141414]/20 hover:border-[#141414]/50">−</button>
                <span className="w-4 text-center text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.variant_id, item.size, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center border border-[#141414]/20 hover:border-[#141414]/50">+</button>
              </div>
              <button onClick={() => removeItem(item.variant_id, item.size)} className="text-[11px] text-[#141414]/30 hover:text-[#141414] uppercase tracking-wider">{translate("cart.sterge", locale)}</button>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-[#e5e5e5] flex justify-between items-center">
          <span className="text-lg font-bold text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("cart.total", locale)}</span>
          <span className="text-2xl font-bold text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{totalPrice.toLocaleString("ro-RO")} Lei TVA inclus</span>
        </div>
        <Link href="/finalizare-comanda" className="inline-flex mt-6 w-full justify-center bg-[#141414] text-white py-4 text-sm font-medium tracking-wider hover:bg-[#2a2a2a] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
          {translate("cart.finalizeaza", locale)}
        </Link>
      </div>
    </div>
  );
}
