import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Politica de Cookies | Baustoffe",
  description: "Informații despre cookies utilizate pe Baustoffe.ro: sesiune coș, preferință limbă, Google Tag Manager / GA4.",
};

export default function CookiesPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-[#141414] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Politica de Cookies</h1>
        <div className="space-y-6 text-sm text-[#141414]/70 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>
          <p>Această pagină descrie cookies utilizate de Baustoffe (operat de Best Baustoffe SRL) pe acest site.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Ce sunt cookies?</strong></p>
          <p>Cookies sunt fișiere text mici stocate pe dispozitivul când vizitezi un site. Sunt utilizate pentru a face site-ul funcțional și pentru a îmbunătăți experiența utilizatorului.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Cookies utilizate de acest site</strong></p>

          <div className="space-y-4 mt-4">
            <div className="border-t border-[#e5e5e5] pt-4">
              <p className="text-[11px] uppercase tracking-wider text-[#141414]/40 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Cookie de sesiune coș</p>
              <p>Stochează ID-ul sesiunii coșului de cumpărături pentru a păstra produsele adăugate. Fără acest cookie, coșul nu funcționează.</p>
            </div>

            <div className="border-t border-[#e5e5e5] pt-4">
              <p className="text-[11px] uppercase tracking-wider text-[#141414]/40 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Cookie preferință limbă</p>
              <p>Stochează limba selectată (RO/EN/DE) pentru a afișa site-ul în limba preferată la vizitele ulterioare.</p>
            </div>

            <div className="border-t border-[#e5e5e5] pt-4">
              <p className="text-[11px] uppercase tracking-wider text-[#141414]/40 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Google Tag Manager / GA4</p>
              <p>Dacă este configurat, GTM poate seta cookies pentru Google Analytics 4 și alte instrumente de analiză. Acestea sunt opționale și pot fi dezactivate prin consimțământ.</p>
            </div>
          </div>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Controlul cookies</strong></p>
          <p>Poți șterge cookies din setările browserului. Cookies esențiali (sesiune coș, limbă) sunt necesare pentru funcționalitatea site-ului.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Contact</strong></p>
          <p>Pentru întrebări despre cookies, contactează-ne la 0759 378 281.</p>

          <div className="mt-6 pt-6 border-t border-[#e5e5e5]">
            <p className="text-[11px] text-[#141414]/30" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ← Informațiile despre cookies reflectă practicile actuale ale site-ului. Consultă <Link href="/politica-de-confidentialitate" className="underline">politica de confidențialitate</Link> pentru detalii complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
