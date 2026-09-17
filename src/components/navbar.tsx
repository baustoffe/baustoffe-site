"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "./providers";
import { cn } from "@/lib/utils";
import { translate, TranslationKey } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

const navLinks = [
  { href: "/usi-exterior", labelKey: "nav.usi_exterior" as TranslationKey },
  { href: "/ferestre", labelKey: "nav.ferestre" as TranslationKey },
  { href: "/usi-interior", labelKey: "nav.usi_interior" as TranslationKey },
  { href: "/despre-noi", labelKey: "nav.despre" as TranslationKey },
  { href: "/contact", labelKey: "nav.contact" as TranslationKey },
];

export function Navbar() {
  const { totalCount } = useCart();
  const { locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/95 backdrop-blur-sm" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:h-16 lg:py-0">
          <Link
            href="/"
            className="text-xl font-bold tracking-[0.2em] text-[#141414]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Image src="/baustoffe-assets/logo.png" alt="Baustoffe" width={2399} height={232} className="w-[170px] lg:w-[210px] h-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`${locale === "ro" ? "" : `/${locale}`}${link.href}`}
                  className="text-[11px] uppercase tracking-wider text-[#141414]/80 hover:text-[#141414] transition-colors duration-200"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}
                >
                  {translate(link.labelKey, locale)}
                </Link>
              ))}
            </div>

            {/* Locale switcher */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] tracking-wider">
              {(["ro", "en", "de"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={cn(
                    "px-1.5 py-0.5 transition-colors duration-200",
                    locale === l ? "text-[#141414] font-medium" : "text-[#141414]/40 hover:text-[#141414]"
                  )}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Cart */}
            <Link
              href={`${locale === "ro" ? "" : `/${locale}`}/cos`}
              className="relative text-[#141414] hover:text-[#141414]/70 transition-colors duration-200"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center bg-[#141414] text-white text-[9px] font-medium">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* CTA */}
            <Link
              href={`${locale === "ro" ? "" : `/${locale}`}/cere-oferta`}
              className="hidden sm:inline-flex text-[11px] uppercase tracking-wider text-[#141414]/80 hover:text-[#141414] transition-colors duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}
            >
              {translate("nav.cere_oferta", locale)}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-[#141414]"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <span
              className="text-xl font-bold tracking-[0.2em] text-[#141414]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Image src="/baustoffe-assets/logo.png" alt="Baustoffe" width={2399} height={232} className="w-[170px] lg:w-[210px] h-auto" />
            </span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex flex-col gap-4 px-6 pt-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`${locale === "ro" ? "" : `/${locale}`}${link.href}`}
                onClick={() => setMobileOpen(false)}
                className="text-lg text-[#141414]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}
              >
                {translate(link.labelKey, locale)}
              </Link>
            ))}
            <hr className="border-[#e5e5e5]" />
            <div className="flex gap-3">
              {(["ro", "en", "de"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={cn(
                    "text-sm px-3 py-1",
                    locale === l ? "bg-[#141414] text-white" : "bg-[#f0f0f0] text-[#141414]"
                  )}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
