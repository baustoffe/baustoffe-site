"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { translate } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { locale } = useLocale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#141414] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("contact.title", locale)}</h1>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin size={18} className="text-[#141414]/40 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("contact.adresa_sediu", locale)}</p>
                <p className="text-sm text-[#141414]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Jud. Vâlcea, Sat Câinenii Mici, Comuna Câineni, Strada Cazacilor, Nr. 9</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={18} className="text-[#141414]/40 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("contact.telefon", locale)}</p>
                <a href="tel:0759378281" className="text-sm text-[#141414]/60 hover:text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0759 378 281</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={18} className="text-[#141414]/40 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("contact.punct_ridicare", locale)}</p>
                <p className="text-sm text-[#141414]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Strada Viile Sibiului 1, 550088 Sibiu</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={18} className="text-[#141414]/40 mt-1 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("contact.pers_juridica", locale)}</p>
                <p className="text-sm text-[#141414]/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Elena Ungureanu — Relații Clienți</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div>
          {submitted ? (
            <div className="bg-[#141414] text-white p-8 text-center">
              <p className="text-lg font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("contact.multumim", locale)}</p>
              <p className="text-sm text-white/60 mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("contact.mesaj_inregistrat", locale)}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder={translate("contact.nume", locale)} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
              <input required placeholder={translate("contact.email", locale)} type="email" className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
              <input required placeholder={translate("contact.telefon", locale)} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
              <input placeholder={translate("contact.subiect", locale)} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
              <textarea required placeholder={translate("contact.mesaj", locale)} rows={5} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414] resize-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
              <button type="submit" className="w-full bg-[#141414] text-white py-3 text-sm font-medium tracking-wider hover:bg-[#2a2a2a] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                {translate("contact.trimite", locale)}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
