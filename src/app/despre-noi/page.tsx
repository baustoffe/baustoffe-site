"use client";

import { CategoryBanner } from "@/components/category-banner";

export default function DespreNoiPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#141414] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Despre Noi</h1>
        <p className="text-lg text-[#141414]/70 leading-relaxed italic mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>
          &ldquo;Credem că fiecare casă merită o ușă pe măsura ei.&rdquo;
        </p>
        <div className="mb-8"><CategoryBanner category="interior" /></div>
        <div className="space-y-4 text-[#141414]/70 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>
          <p>Baustoffe este distribuitor autorizat Chirmandi pentru România, oferind uși și ferestre PVC de calitate superioară. Ca partener direct al producătorului, avem acces la întreaga gamă de produse și stocăm fiecare comandă în același depozit ca și fabrica.</p>
          <p>Fiecare comandă este confirmată telefonic, astfel încât să fii sigur că ai ales produsul potrivit. Livrăm în toată România sau poți ridica gratuit din Sibiu.</p>
          <p>Plata se face la livrare sau la ridicare — nu solicităm niciun avans.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Distribuitor Autorizat Chirmandi", "Plată la Livrare", "Livrare Națională"].map((c) => (
            <div key={c} className="border border-[#141414]/20 px-4 py-3 text-[11px] uppercase tracking-wider text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c}</div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-[#e5e5e5]">
          <p className="text-[11px] text-[#141414]/30" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Contact: Elena Ungureanu — 0759 378 281
          </p>
        </div>
      </div>
    </div>
  );
}
