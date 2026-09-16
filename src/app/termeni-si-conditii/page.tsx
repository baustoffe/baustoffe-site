"use client";

import Link from "next/link";

// DRAFTED FROM CHIRMANDI'S TEMPLATE UNDER PARTNER AUTHORIZATION — PENDING VLAD'S MANUAL LEGAL REVIEW

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-[#141414] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Termeni și Condiții</h1>
        <div className="space-y-6 text-sm text-[#141414]/70 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>
          <p><strong style={{ color: "#141414", fontWeight: 500 }}>1. Încheierea contractului</strong></p>
          <p>Contractul se încheie la confirmarea telefonică a comenzii, nu la plasarea ei în coș. Confirmarea reprezintă acceptul vânzătorului.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>2. Prețul și plata</strong></p>
          <p>Prețurile afișate sunt în RON, cu TVA inclus (dacă Best Baustoffe SRL este plătitor de TVA). <strong>[ASK VLAD: confirm VAT status]</strong> Plata se face numerar la livrare sau ridicare — nu acceptăm plăți online sau cu cardul.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>3. Livrare și ridicare</strong></p>
          <p>Livrarea națională: 150 RON flat. Ridicare personală: gratuită, Strada Viile Sibiului 1, 550088 Sibiu. Termenul de livrare este orientativ (5–10 zile lucrătoare) și nu face obiectul unui contract de execuție a unui lucru cu termen.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>4. Dreptul de retragere</strong></p>
          <p>Conform OUG 34/2014, ai dreptul de retragere în 14 zile de la primirea produselor standard. Produsele comandate la dimensiuni personalizate sau pe comandă pot fi exceptate de la acest drept, întrucât pot fi considerate produse realizate la specificația consumatorului. <strong>[ASK VLAD: confirm legal basis for this exemption with counsel]</strong></p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>5. Garanție</strong></p>
          <p>Produsele beneficiază de garanția producătorului. Termenii și condițiile garanției sunt cei impuse de fabrică (Chirmandi).</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>6. Litigii</strong></p>
          <p>Orice litigiu va fi soluționat în instanțele competente de la sediul controlorului.</p>
        </div>
      </div>
    </div>
  );
}
