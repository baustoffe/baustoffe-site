import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Politica de Confidențialitate | Baustoffe",
  description: "Informații despre colectarea, prelucrarea și protecția datelor personale pe Baustoffe.ro.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-[#141414] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Politica de Confidențialitate</h1>
        <div className="space-y-6 text-sm text-[#141414]/70 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>
          <p><strong style={{ color: "#141414", fontWeight: 500 }}>1. Controlor de date</strong></p>
          <p>Controlorul datelor tale personale este Baustoffe, operat de Best Baustoffe SRL, CUI 52365190, Reg. Com. J2025062807006, Jud. Vâlcea, Sat Câinenii Mici, Comuna Câineni, Strada Cazacilor, Nr. 9.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>2. Date colectate</strong></p>
          <p>Colectăm date prin formularele noastre (checkout, contact, cerere ofertă), în funcție de contextul în care le-ai furnizat. Acestea pot include: numele, adresa de email, numărul de telefon, adresa de livrare, datele de facturare (CUI, Reg. Com.) și preferințele tale de produs.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>3. Prelucrarea datelor</strong></p>
          <p>Datele tale sunt stocate și prelucrate prin platforma Supabase (procesor de date). Comunicările email sunt gestionate prin Brevo (procesor email). Analizle web sunt gestionate prin Google Tag Manager / Google Analytics.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>4. Scopul prelucrării</strong></p>
          <p>Datele sunt utilizate exclusiv pentru procesarea comenzilor, răspunsul la solicitări și comunicarea comercială (doar cu consimțământ). Nu vindem datele terților.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>5. Drepturile tale</strong></p>
          <p>Poți solicita accesul, rectificarea, ștergerea sau portabilitatea datelor tale. Contactează-ne la telefonul 0759 378 281.</p>

          <p><strong style={{ color: "#141414", fontWeight: 500 }}>6. Cookies</strong></p>
          <p>Folosim cookies strict necesare (sesiune coș), Google Analytics (analiză) și preferința de limbă. Vezi <Link href="/politica-cookies" className="underline">Politica Cookies</Link> pentru detalii.</p>
        </div>
      </div>
    </div>
  );
}
