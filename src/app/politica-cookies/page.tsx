"use client";

import Link from "next/link";

// DRAFTED FROM CHIRMANDI'S TEMPLATE UNDER PARTNER AUTHORIZATION — PENDING VLAD'S MANUAL LEGAL REVIEW

export default function CookiesPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-[#141414] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Politica Cookies</h1>
        <div className="space-y-6 text-sm text-[#141414]/70 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>
          <p>Acest site utilizează doar cookies strict necesare funcționării și analizei. Nu folosim cookies de marketing terțe părți.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Cookies utilizate:</strong></p>
          <table className="w-full text-left border-t border-[#e5e5e5] mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                <th className="py-2 text-[11px] uppercase tracking-wider text-[#141414]/40">Nume</th>
                <th className="py-2 text-[11px] uppercase tracking-wider text-[#141414]/40">Scop</th>
                <th className="py-2 text-[11px] uppercase tracking-wider text-[#141414]/40">Durată</th>
              </tr>
            </thead>
            <tbody className="text-[#141414]/70">
              <tr className="border-b border-[#e5e5e5]">
                <td className="py-3">cart_session</td>
                <td className="py-3">Identificare coș cumpărături</td>
                <td className="py-3">Sesiune</td>
              </tr>
              <tr className="border-b border-[#e5e5e5]">
                <td className="py-3">_gcl_au / _ga / _gid</td>
                <td className="py-3">Google Analytics (prin GTM)</td>
                <td className="py-3">13 luni / 24h / 24h</td>
              </tr>
              <tr className="border-b border-[#e5e5e5]">
                <td className="py-3">locale</td>
                <td className="py-3">Preferință de limbă (RO/EN/DE)</td>
                <td className="py-3">12 luni</td>
              </tr>
              <tr>
                <td className="py-3">gdpr_consent</td>
                <td className="py-3">Stocare consimțământ GDPR</td>
                <td className="py-3">12 luni</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-6">Poți bloca cookies prin setările browserului, dar unele funcționalități (coș, formulare) pot fi afectate.</p>

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
