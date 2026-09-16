"use client";

import Link from "next/link";

// DRAFTED FROM CHIRMANDI'S TEMPLATE UNDER PARTNER AUTHORIZATION — PENDING VLAD'S MANUAL LEGAL REVIEW

export default function GdprPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-[#141414] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>GDPR — Drepturi privind datele personale</h1>
        <div className="space-y-6 text-sm text-[#141414]/70 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>
          <p><strong style={{ color: "#141414", fontWeight: 500 }}>1. Controlor</strong></p>
          <p>Best Baustoffe SRL, CUI 52365190, Jud. Vâlcea, Sat Câinenii Mici, Comuna Câineni, Strada Cazacilor, Nr. 9.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>2. Procesori</strong></p>
          <p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Supabase</strong> — gazdă date și autentificare</li>
              <li><strong>Brevo</strong> — serviciu email transacțional</li>
              <li><strong>Google (GTM/GA4)</strong> — analiză web</li>
            </ul>
          </p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>3. Drepturi</strong></p>
          <p>Poți exercita următoarele drepturi: acces, rectificare, ștergere, restricționare, portabilitate, obiectiv. Pentru a exercita orice drept, contactează-ne la 0759 378 281 sau prin formularul de contact.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>4. Bazele legale</strong></p>
          <p>Prelucrarea are ca bază executarea contractului, obligația legală sau consimțământul tău explicit (pentru marketing).</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>5. Perioada de retenție</strong></p>
          <p>Datele de comandă sunt păstrate conform termenelor legale fiscale. Datele de contact pentru marketing sunt șterse la retragerea consimțământului.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>6. Plângere</strong></p>
          <p>Poți depune plângere la ANPC sau la Autoritatea Națională de Supraveghere a Prelucrării Datelor Personale (ANSPDP).</p>
        </div>
      </div>
    </div>
  );
}
