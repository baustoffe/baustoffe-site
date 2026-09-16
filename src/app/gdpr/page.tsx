import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Drepturile tale GDPR | Baustoffe",
  description: "Informații despre drepturile tale conform GDPR: acces, rectificare, ștergere, portabilitate, opoziție. Contactează-ne pentru exercitarea drepturilor.",
};

export default function GdprPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-[#141414] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Drepturile tale GDPR</h1>
        <div className="space-y-6 text-sm text-[#141414]/70 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>
          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Operator de date</strong></p>
          <p>Best Baustoffe SRL</p>

          <p className="mt-6">Conform Regulamentului (UE) 2016/679 (GDPR), ai următoarele drepturi în legătură cu datele personale prelucrate de Baustoffe:</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Dreptul de acces</strong></p>
          <p>Poți solicita o copie a datelor personale pe care le deținem despre tine.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Dreptul la rectificare</strong></p>
          <p>Poți solicita corectarea datelor inexacte sau incomplete.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Dreptul la ștergere</strong></p>
          <p>Poți solicita ștergerea datelor personale, cu excepția cazurilor în care legea impune păstrarea lor (ex. facturi).</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Dreptul la portabilitate</strong></p>
          <p>Poți solicita transferul datelor către alt operator, într-un format structurat.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Dreptul de opoziție</strong></p>
          <p>Poți să te opui prelucrării datelor în anumite circumstanțe.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Dreptul la retragerea consimțământului</strong></p>
          <p>Poți retrage consimțământul oricând, fără a afecta legalitatea prelucrării anterioare.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Autoritatea de supraveghere</strong></p>
          <p>Ai dreptul să depui o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) — www.dataprotection.ro.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>Contact</strong></p>
          <p>Pentru exercitarea drepturilor GDPR, contactează-ne la 0759 378 281 sau la adresa din Jud. Vâlcea, Sat Câinenii Mici, Comuna Câineni, Strada Cazacilor, Nr. 9.</p>
        </div>
      </div>
    </div>
  );
}
