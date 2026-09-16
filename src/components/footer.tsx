"use client";

import Link from "next/link";
import { translate, TranslationKey } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="bg-white border-t border-[#e5e5e5]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-lg font-bold tracking-[0.2em] text-[#141414]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            BAUSTOFFE
          </Link>

          {/* Center nav */}
          <nav className="flex flex-wrap gap-6">
            {[
              { href: "/usi-exterior", labelKey: "nav.usi_exterior" as TranslationKey },
              { href: "/ferestre", labelKey: "nav.ferestre" as TranslationKey },
              { href: "/usi-interior", labelKey: "nav.usi_interior" as TranslationKey },
              { href: "/despre-noi", labelKey: "nav.despre" as TranslationKey },
              { href: "/contact", labelKey: "nav.contact" as TranslationKey },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] uppercase tracking-wider text-[#141414]/60 hover:text-[#141414] transition-colors duration-200"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}
              >
                {translate(link.labelKey, locale)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom line — legal compliance */}
        <div className="mt-10 pt-6 border-t border-[#e5e5e5]">
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
            <Link
              href="/livrare-si-plata"
              className="text-[11px] uppercase tracking-wider text-[#141414]/40 hover:text-[#141414]/70 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {translate("footer.livrare", locale)}
            </Link>
            <Link
              href="/politica-de-confidentialitate"
              className="text-[11px] uppercase tracking-wider text-[#141414]/40 hover:text-[#141414]/70 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {translate("footer.confidentialitate", locale)}
            </Link>
            <Link
              href="/termeni-si-conditii"
              className="text-[11px] uppercase tracking-wider text-[#141414]/40 hover:text-[#141414]/70 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {translate("footer.termeni", locale)}
            </Link>
            <Link
              href="/gdpr"
              className="text-[11px] uppercase tracking-wider text-[#141414]/40 hover:text-[#141414]/70 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {translate("footer.gdpr", locale)}
            </Link>
            <Link
              href="/politica-cookies"
              className="text-[11px] uppercase tracking-wider text-[#141414]/40 hover:text-[#141414]/70 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {translate("footer.cookies", locale)}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* ANPC — official logo from anpc.ro */}
            <a
              href="https://anpc.ro"
              target="_blank"
              rel="noopener noreferrer"
              title="ANPC - Autoritatea Națională pentru Protecția Consumatorilor"
            >
              <img
                src="https://anpc.ro/wp-content/uploads/2021/03/logo-anpc.png"
                alt="ANPC"
                height={40}
                style={{ display: "block" }}
              />
            </a>
            {/* SAL badge (not SOL) — current 2026 regulatory badge from anpc.ro */}
            <a
              href="https://anpc.ro"
              target="_blank"
              rel="noopener noreferrer"
              title="SAL - Soluționarea Alternativă a Litigiilor"
            >
              <img
                src="https://anpc.ro/wp-content/uploads/2024/01/sal.png"
                alt="SAL"
                height={40}
                style={{ display: "block" }}
              />
            </a>
          </div>

          {/* Legal identity line */}
          <p className="text-[11px] text-[#141414]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {translate("footer.legal_line", locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
