"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { translate } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

export default function CereOfertaPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [linkedProduct, setLinkedProduct] = useState("");
  const { locale } = useLocale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#141414] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("cere.title", locale)}</h1>
        <p className="text-[#141414]/40 text-sm mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("cere.subtitle", locale)}</p>

        {submitted ? (
          <div className="bg-[#141414] text-white p-8 text-center">
            <p className="text-lg font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("cere.multumim", locale)}</p>
            <p className="text-sm text-white/60 mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("cere.inregistrat", locale)}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required placeholder={translate("cere.nume", locale)} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
            <input required placeholder={translate("cere.telefon", locale)} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
            <input placeholder={translate("cere.email", locale)} type="email" className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
            <input placeholder={translate("cere.produs", locale)} value={linkedProduct} onChange={(e) => setLinkedProduct(e.target.value)} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder={translate("cere.latime", locale)} type="number" className="border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
              <input placeholder={translate("cere.inaltime", locale)} type="number" className="border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
            </div>
            <input placeholder={translate("cere.culoare", locale)} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
            <textarea placeholder={translate("cere.mesaj", locale)} rows={4} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414] resize-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
            <button type="submit" className="w-full bg-[#141414] text-white py-3 text-sm font-medium tracking-wider hover:bg-[#2a2a2a] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
              {translate("cere.trimite", locale)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
