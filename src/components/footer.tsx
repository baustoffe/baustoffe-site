import Link from "next/link";

export function Footer() {
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
              { href: "/usi-exterior", label: "Uși Exterior" },
              { href: "/ferestre", label: "Ferestre" },
              { href: "/usi-interior", label: "Uși Interior" },
              { href: "/despre-noi", label: "Despre" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] uppercase tracking-wider text-[#141414]/60 hover:text-[#141414] transition-colors duration-200"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}
              >
                {link.label}
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
              Livrare & Plata
            </Link>
            <Link
              href="/politica-de-confidentialitate"
              className="text-[11px] uppercase tracking-wider text-[#141414]/40 hover:text-[#141414]/70 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Confidențialitate
            </Link>
            <Link
              href="/termeni-si-conditii"
              className="text-[11px] uppercase tracking-wider text-[#141414]/40 hover:text-[#141414]/70 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Termeni & Condiții
            </Link>
            <Link
              href="/gdpr"
              className="text-[11px] uppercase tracking-wider text-[#141414]/40 hover:text-[#141414]/70 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              GDPR
            </Link>
            <Link
              href="/politica-cookies"
              className="text-[11px] uppercase tracking-wider text-[#141414]/40 hover:text-[#141414]/70 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Cookies
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* ANPC link */}
            <a
              href="https://anpc.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-wider text-[#141414]/40 hover:text-[#141414]/70 transition-colors"
            >
              ANPC
            </a>
            {/* SAL badge placeholder */}
            <span className="text-[11px] uppercase tracking-wider text-[#141414]/40">
              SAL
            </span>
          </div>

          {/* Legal identity line */}
          <p className="text-[11px] text-[#141414]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Baustoffe este operat de Best Baustoffe SRL, CUI 52365190, Reg. Com. J2025062807006.
          </p>
        </div>
      </div>
    </footer>
  );
}
