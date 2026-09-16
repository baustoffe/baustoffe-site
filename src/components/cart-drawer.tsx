"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/providers";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[80] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5]">
              <h2 className="text-lg font-bold text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Coșul tău ({items.length})
              </h2>
              <button onClick={onClose} className="text-[#141414]/50 hover:text-[#141414] transition-colors">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-[#141414]/30">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="mt-4 text-sm">Coșul este gol</p>
                  <Link href="/usi-exterior" onClick={onClose} className="mt-2 text-[11px] uppercase tracking-wider text-[#141414]/50 hover:text-[#141414]">
                    Vezi produse →
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.variant_id}-${item.size}`} className="flex gap-4">
                    <div className="w-20 h-20 bg-[#e8e8e8] flex-shrink-0 flex items-center justify-center">
                      <span className="text-[#aaa] text-[10px] uppercase">Imagine</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#141414] truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.name}</h3>
                      <p className="text-[10px] text-[#141414]/40 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {item.color} · {item.size}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.variant_id, item.size, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center border border-[#141414]/20 hover:border-[#141414]/50 transition-colors"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="text-sm w-4 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variant_id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center border border-[#141414]/20 hover:border-[#141414]/50 transition-colors"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {(item.quantity * item.unit_price_ron).toLocaleString("ro-RO")} Lei
                      </p>
                      <button
                        onClick={() => removeItem(item.variant_id, item.size)}
                        className="text-[10px] text-[#141414]/30 hover:text-[#141414]/70 mt-1 transition-colors"
                      >
                        Șterge
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#e5e5e5] px-6 py-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#141414]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Subtotal</span>
                  <span className="text-sm font-medium text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {totalPrice.toLocaleString("ro-RO")} Lei
                  </span>
                </div>
                <p className="text-[11px] text-[#141414]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Livrare: 150 RON sau ridicare gratuită</p>
                <button
                  onClick={() => setCheckingOut(true)}
                  className="w-full bg-[#141414] text-white py-3 text-sm font-medium tracking-wider hover:bg-[#2a2a2a] transition-colors duration-200"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                >
                  Finalizează comanda →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
