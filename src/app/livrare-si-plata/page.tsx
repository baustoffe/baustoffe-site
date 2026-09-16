"use client";

import Link from "next/link";
import { Truck, Home, CreditCard, FileText } from "lucide-react";

export default function LivrarePage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#141414] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Livrare și Plată
        </h1>

        <div className="space-y-8">
          {/* Delivery */}
          <section className="border-t border-[#e5e5e5] pt-6">
            <h2 className="text-xl font-bold text-[#141414] mb-4 flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Truck size={20} strokeWidth={1.5} /> Livrare
            </h2>
            <div className="space-y-2 text-sm text-[#141414]/70 leading-relaxed pl-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <p>Livram în toată România, prin curieri parteneri.</p>
              <p><strong>Taxă de livrare: 150 RON</strong> (flat, indiferent de destinație).</p>
              <p>Termenul estimativ de livrare: 5–10 zile lucrătoare de la confirmarea comenzii.</p>
              <p>Livrarea se face la poartă / scară (verificat cu curierul la sosire).</p>
            </div>
          </section>

          {/* Pickup */}
          <section className="border-t border-[#e5e5e5] pt-6">
            <h2 className="text-xl font-bold text-[#141414] mb-4 flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Home size={20} strokeWidth={1.5} /> Ridicare personală
            </h2>
            <div className="space-y-2 text-sm text-[#141414]/70 leading-relaxed pl-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <p><strong>Gratuită.</strong> Ridică comanda direct din depozitul nostru din Sibiu.</p>
              <p><strong>Adresă:</strong> Strada Viile Sibiului 1, 550088 Sibiu</p>
              <p>Program: Luni – Vineri, 08:00 – 17:00. Programarea se face telefonic.</p>
            </div>
          </section>

          {/* Payment */}
          <section className="border-t border-[#e5e5e5] pt-6">
            <h2 className="text-xl font-bold text-[#141414] mb-4 flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <CreditCard size={20} strokeWidth={1.5} /> Plată
            </h2>
            <div className="space-y-2 text-sm text-[#141414]/70 leading-relaxed pl-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <p><strong>Plata Ramburs / la livrare</strong> — numerar la livrare sau ridicare.</p>
              <p>Nu acceptăm plăți cu cardul sau online la momentul comenzii.</p>
              <p>Factura se emite la cerere, pentru comenzile de la persoană juridică.</p>
            </div>
          </section>

          {/* Note */}
          <section className="border-t border-[#e5e5e5] pt-6">
            <h2 className="text-xl font-bold text-[#141414] mb-4 flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <FileText size={20} strokeWidth={1.5} /> Note
            </h2>
            <div className="space-y-2 text-sm text-[#141414]/70 leading-relaxed pl-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <p>Produsele comandate nu pot fi anulate după confirmarea telefonică.</p>
              <p>Diferențe de culoare între monitor și produsul real pot apărea datorită calibrării ecranului.</p>
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
