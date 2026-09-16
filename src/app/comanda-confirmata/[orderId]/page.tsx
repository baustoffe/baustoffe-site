"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { translate } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

export default function OrderConfirmedPage() {
  const { orderId } = useParams();
  const { locale } = useLocale();

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="mx-auto max-w-lg text-center">
        <div className="w-16 h-16 bg-[#141414] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h1 className="text-3xl font-bold text-[#141414] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {translate("order.title", locale)}
        </h1>
        <p className="text-[#141414]/60 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {translate("order.message", locale)}
        </p>
        <p className="text-[11px] text-[#141414]/30 mt-4 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {translate("order.numar", locale)}: {orderId}
        </p>
        <Link href="/" className="inline-flex mt-8 bg-[#141414] text-white px-8 py-3 text-sm font-medium tracking-wider hover:bg-[#2a2a2a] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
          {translate("order.back_home", locale)}
        </Link>
      </div>
    </div>
  );
}
