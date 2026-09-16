"use client";

import Link from "next/link";
import { Truck, Home, CreditCard, FileText } from "lucide-react";
import { translate } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

export default function LivrarePage() {
  const { locale } = useLocale();
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#141414] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {translate("livrare.title", locale)}
        </h1>

        <div className="space-y-8">
          {/* Delivery */}
          <section className="border-t border-[#e5e5e5] pt-6">
            <h2 className="text-xl font-bold text-[#141414] mb-4 flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Truck size={20} strokeWidth={1.5} /> {translate("livrare.livrare_section", locale)}
            </h2>
            <div className="space-y-2 text-sm text-[#141414]/70 leading-relaxed pl-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <p>{translate("livrare.nationala", locale)}</p>
              <p><strong>{translate("livrare.taxa", locale)}</strong> {translate("livrare.flat", locale)}.</p>
              <p>{translate("livrare.termen", locale)}</p>
              <p>{translate("livrare.uscar", locale)}</p>
            </div>
          </section>

          {/* Pickup */}
          <section className="border-t border-[#e5e5e5] pt-6">
            <h2 className="text-xl font-bold text-[#141414] mb-4 flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Home size={20} strokeWidth={1.5} /> {translate("livrare.ridicare_section", locale)}
            </h2>
            <div className="space-y-2 text-sm text-[#141414]/70 leading-relaxed pl-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <p><strong>{translate("livrare.gratuita", locale)}</strong> Ridică comanda direct din depozitul nostru din Sibiu.</p>
              <p><strong>{translate("livrare.adresa", locale)}</strong> Strada Viile Sibiului 1, 550088 Sibiu</p>
              <p>{translate("livrare.program", locale)}</p>
            </div>
          </section>

          {/* Payment */}
          <section className="border-t border-[#e5e5e5] pt-6">
            <h2 className="text-xl font-bold text-[#141414] mb-4 flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <CreditCard size={20} strokeWidth={1.5} /> {translate("livrare.plata_section", locale)}
            </h2>
            <div className="space-y-2 text-sm text-[#141414]/70 leading-relaxed pl-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <p><strong>{translate("livrare.ramburs", locale)}</strong> — {translate("livrare.numerar", locale)}</p>
              <p>{translate("livrare.fara_card", locale)}</p>
              <p>{translate("livrare.factura", locale)}</p>
            </div>
          </section>

          {/* Note */}
          <section className="border-t border-[#e5e5e5] pt-6">
            <h2 className="text-xl font-bold text-[#141414] mb-4 flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <FileText size={20} strokeWidth={1.5} /> {translate("livrare.note_section", locale)}
            </h2>
            <div className="space-y-2 text-sm text-[#141414]/70 leading-relaxed pl-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <p>{translate("livrare.fare_anulare", locale)}</p>
              <p>{translate("livrare.diferente_culoare", locale)}</p>
            </div>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-[#e5e5e5]">
          <p className="text-[11px] text-[#141414]/30" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            ← Acest pagină este adaptată din <Link href="https://www.chirmandi.ro/informatii-despre-livrare.html" target="_blank" className="underline">chirmandi.ro</Link> sub partenerizare directă.
          </p>
        </div>
      </div>
    </div>
  );
}
