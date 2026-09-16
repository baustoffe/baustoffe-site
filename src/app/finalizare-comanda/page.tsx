"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/providers";
import { Check } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [step, setStep] = useState<"customer" | "delivery" | "billing" | "confirm">("customer");
  const [customerType, setCustomerType] = useState<"individual" | "company">("individual");
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [gdpr, setGdpr] = useState(false);
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    street: "", city: "", county: "", postal: "",
    billingName: "", billingCui: "", billingRegCom: "",
    billingStreet: "", billingCity: "", billingCounty: "", billingPostal: "",
    notes: "",
  });

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <p className="text-[#141414]/50">Coșul tău este gol.</p>
        <Link href="/usi-exterior" className="inline-flex mt-4 bg-[#141414] text-white px-6 py-3 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Vezi produse →</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-[#141414] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Finalizare comandă</h1>
        <p className="text-[#141414]/40 text-sm mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {items.length} produs(e) · Total: {totalPrice.toLocaleString("ro-RO")} Lei
        </p>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {["Client", "Livrare", "Facturare", "Confirmare"].map((label, i) => {
            const steps = ["customer", "delivery", "billing", "confirm"];
            const current = steps[i];
            return (
              <div key={i} className="flex-1 text-center">
                <div className={`text-[10px] uppercase tracking-wider py-1 ${step === current ? "bg-[#141414] text-white" : "text-[#141414]/40"}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</div>
              </div>
            );
          })}
        </div>

        {/* Customer step */}
        {step === "customer" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Date client</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setCustomerType("individual")}
                className={`flex-1 py-2 text-[11px] uppercase tracking-wider border transition-colors ${customerType === "individual" ? "bg-[#141414] text-white border-[#141414]" : "bg-white text-[#141414] border-[#141414]/20"}`}
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
              >
                Persoană fizică
              </button>
              <button
                onClick={() => setCustomerType("company")}
                className={`flex-1 py-2 text-[11px] uppercase tracking-wider border transition-colors ${customerType === "company" ? "bg-[#141414] text-white border-[#141414]" : "bg-white text-[#141414] border-[#141414]/20"}`}
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
              >
                Persoană juridică
              </button>
            </div>
            <input placeholder="Nume complet" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
            <input placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
            <input placeholder="Email (opțional)" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
            <button onClick={() => setStep("delivery")} className="w-full bg-[#141414] text-white py-3 text-sm font-medium tracking-wider hover:bg-[#2a2a2a] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Continuă →</button>
          </div>
        )}

        {/* Delivery step */}
        {step === "delivery" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Metodă livrare</h2>
            <div className="flex gap-2">
              <button onClick={() => setDeliveryMethod("delivery")} className={`flex-1 py-2 text-[11px] uppercase tracking-wider border transition-colors ${deliveryMethod === "delivery" ? "bg-[#141414] text-white border-[#141414]" : "bg-white text-[#141414] border-[#141414]/20"}`} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Livrare (+150 RON)</button>
              <button onClick={() => setDeliveryMethod("pickup")} className={`flex-1 py-2 text-[11px] uppercase tracking-wider border transition-colors ${deliveryMethod === "pickup" ? "bg-[#141414] text-white border-[#141414]" : "bg-white text-[#141414] border-[#141414]/20"}`} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Ridicare personală (gratuit)</button>
            </div>
            {deliveryMethod === "delivery" && (
              <>
                <input placeholder="Stradă + nr." value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Oraș" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
                  <input placeholder="Județ" value={form.county} onChange={(e) => setForm({ ...form, county: e.target.value })} className="border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
                </div>
                <input placeholder="Cod poștal" value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
              </>
            )}
            <div className="flex gap-2">
              <button onClick={() => setStep("customer")} className="flex-1 py-3 border border-[#141414]/20 text-[11px] uppercase tracking-wider hover:bg-[#f5f5f5] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>← Înapoi</button>
              <button onClick={() => setStep("billing")} className="flex-1 bg-[#141414] text-white py-3 text-sm font-medium tracking-wider hover:bg-[#2a2a2a] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Continuă →</button>
            </div>
          </div>
        )}

        {/* Billing step */}
        {step === "billing" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Facturare</h2>
            {customerType === "company" && (
              <>
                <input placeholder="Denumire companie" value={form.billingName} onChange={(e) => setForm({ ...form, billingName: e.target.value })} className="w-full border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="CUI" value={form.billingCui} onChange={(e) => setForm({ ...form, billingCui: e.target.value })} className="border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
                  <input placeholder="Reg. Com. (J...)" value={form.billingRegCom} onChange={(e) => setForm({ ...form, billingRegCom: e.target.value })} className="border border-[#141414]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
                </div>
              </>
            )}
            <div className="flex gap-2">
              <button onClick={() => setStep("delivery")} className="flex-1 py-3 border border-[#141414]/20 text-[11px] uppercase tracking-wider hover:bg-[#f5f5f5] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>← Înapoi</button>
              <button onClick={() => setStep("confirm")} className="flex-1 bg-[#141414] text-white py-3 text-sm font-medium tracking-wider hover:bg-[#2a2a2a] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Vezi comanda →</button>
            </div>
          </div>
        )}

        {/* Confirm step */}
        {step === "confirm" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Confirmă comanda</h2>
            <div className="bg-[#f8f8f8] p-4 space-y-2 text-sm text-[#141414]/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <p>Nume: {form.fullName || "—"}</p>
              <p>Telefon: {form.phone || "—"}</p>
              <p>Livrare: {deliveryMethod === "delivery" ? "La adresă" : "Ridicare Sibiu"}</p>
              <p>Total: {totalPrice.toLocaleString("ro-RO")} Lei</p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={gdpr} onChange={(e) => setGdpr(e.target.checked)} className="mt-0.5" />
              <span className="text-[11px] text-[#141414]/60 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Am citit și accept <Link href="/gdpr" className="underline">politica GDPR</Link> și <Link href="/politica-de-confidentialitate" className="underline">confidențialitatea</Link>. Consimțăm la prelucrarea datelor personale.
              </span>
            </label>
            <div className="flex gap-2">
              <button onClick={() => setStep("billing")} className="flex-1 py-3 border border-[#141414]/20 text-[11px] uppercase tracking-wider hover:bg-[#f5f5f5] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>← Înapoi</button>
              <button disabled={!gdpr} className="flex-1 bg-[#141414] text-white py-3 text-sm font-medium tracking-wider hover:bg-[#2a2a2a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>Confirmă comanda</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
