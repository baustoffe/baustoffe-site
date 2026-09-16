"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Truck, Banknote, Handshake } from "lucide-react";
import { products, getProductHref } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { CategoryBanner } from "@/components/category-banner";
import { translate, TranslationKey } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

function ClipReveal({ words, className }: { words: string[]; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <div className={className}>
      {words.map((word, i) => (
        <span key={i} data-reveal-line className="block overflow-visible">
          <motion.span
            className="inline-block py-[0.18em] -my-[0.18em]"
            initial={reducedMotion ? false : { clipPath: "inset(-20% 100% -25% -2%)" }}
            animate={{ clipPath: "inset(-20% -2% -25% -2%)" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function StaggerFade({ children, index, className }: { children: React.ReactNode; index: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const { locale } = useLocale();

  const showcase = ["usi-exterior", "ferestre", "usi-interior"].flatMap(category =>
    products.filter(product => product.category_slug === category).slice(0, 2)
  );
  const articleCount = products.reduce((total, product) => total + product.variants.length, 0);

  const vindem = [
    { nameKey: "vindem.usi_exterior" as TranslationKey, descKey: "vindem.usi_exterior_desc" as TranslationKey, href: "/usi-exterior" },
    { nameKey: "vindem.ferestre" as TranslationKey, descKey: "vindem.ferestre_desc" as TranslationKey, href: "/ferestre" },
    { nameKey: "vindem.usi_interior" as TranslationKey, descKey: "vindem.usi_interior_desc" as TranslationKey, href: "/usi-interior" },
    { nameKey: "vindem.oferta" as TranslationKey, descKey: "vindem.oferta_desc" as TranslationKey, href: "/cere-oferta" },
  ];

  const steps = [
    { num: "01", titleKey: "cum.step1_title" as TranslationKey, descKey: "cum.step1_desc" as TranslationKey },
    { num: "02", titleKey: "cum.step2_title" as TranslationKey, descKey: "cum.step2_desc" as TranslationKey },
    { num: "03", titleKey: "cum.step3_title" as TranslationKey, descKey: "cum.step3_desc" as TranslationKey },
    { num: "04", titleKey: "cum.step4_title" as TranslationKey, descKey: "cum.step4_desc" as TranslationKey },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col pt-16">
        <div className="relative w-full h-[70svh] min-h-[360px] bg-[#e8e8e8] overflow-hidden">
          <picture>
            <source media="(max-width: 639px)" srcSet="/baustoffe-assets/hero-mobile.webp" />
            {/* Art-directed, pre-compressed hero: only the matching crop downloads. */}
            <img src="/baustoffe-assets/hero.webp" alt="Casă contemporană cu ușă închisă la culoare și ferestre ample — imagine de inspirație" width={1920} height={1086} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          </picture>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(250,250,250,1) 0%, transparent 40%)" }} />
        </div>
        <div className="flex-1 flex items-end pb-16 md:pb-24 px-6">
          <div className="mx-auto w-full max-w-7xl">
            <p className="label-uppercase text-[#141414]/50 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {translate("hero.label", locale)}
            </p>
            <h1 className="text-[clamp(56px,8vw,128px)] font-bold leading-[1.08] text-[#141414] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <ClipReveal words={translate("hero.headline", locale).split("\n")} />
            </h1>
            <div className="flex items-center gap-6">
              <Link href="/usi-exterior" className="inline-flex items-center bg-[#141414] text-white px-8 py-3 text-sm font-medium tracking-wider hover:bg-[#2a2a2a] transition-colors duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                {translate("hero.cta_products", locale)}
              </Link>
              <Link href="/cere-oferta" className="inline-flex items-center text-[#141414] text-sm tracking-wider hover:text-[#141414]/70 transition-colors duration-200" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}>
                {translate("hero.cta_quote", locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCELE NOSTRE */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("showcase.title", locale)}</h2>
            <span className="text-[11px] uppercase tracking-wider text-[#141414]/40" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>{translate("showcase.count", locale)}</span>
          </div>
          <div className="columns-1 md:columns-2 gap-6">
            {showcase.map((item, i) => (
              <StaggerFade key={i} index={i} className="break-inside-avoid mb-6">
                <Link href={getProductHref(item)} className="group block relative bg-[#ededeb] focus-visible:outline-2 focus-visible:outline-offset-4" style={{ aspectRatio: i % 2 ? "3/4" : "4/3" }}>
                  {/* Real manufacturer photography, never an inspiration render. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.base_name_ro} loading="lazy" width={700} height={800} className="absolute inset-0 w-full h-full object-contain p-8 pb-24 transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none" />
                  <div className="absolute bottom-0 inset-x-0 bg-white/95 px-6 py-4 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[#141414] text-base font-medium">{item.base_name_ro}</h3>
                      <p className="text-[#141414]/60 text-xs mt-1">{translate("showcase.de_la", locale)} {formatPrice(item.base_price_ron)}</p>
                    </div>
                    <ArrowRight aria-hidden="true" size={20} className="shrink-0" />
                  </div>
                </Link>
              </StaggerFade>
            ))}
          </div>
        </div>
      </section>

      {/* CE VINDEM */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#141414] mb-8 pt-8 border-t border-[#e5e5e5]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("vindem.title", locale)}</h2>
          <div className="border-t border-[#e5e5e5]">
            {vindem.map((item, i) => (
              <StaggerFade key={i} index={i}>
                <a href={item.href} className="group flex items-center justify-between py-6 border-b border-[#e5e5e5] hover:bg-[#141414] transition-colors duration-200 px-2 -mx-2">
                  <span className="text-lg font-bold text-[#141414] group-hover:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate(item.nameKey, locale)}</span>
                  <span className="hidden md:block text-[#141414]/60 group-hover:text-white/70 text-sm font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate(item.descKey, locale)}</span>
                  <ArrowRight size={20} className="text-[#141414] group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
                </a>
              </StaggerFade>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / TRUST */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <p className="italic text-[#141414]/80 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: "clamp(28px, 3vw, 48px)" }}>
            &ldquo;{translate("about.quote", locale)}&rdquo;
          </p>
        </div>
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <StaggerFade index={0}>
            <CategoryBanner category="windows" portrait />
          </StaggerFade>
          <div className="pt-2">
            <StaggerFade index={1}>
              <p className="text-[11px] uppercase tracking-widest text-[#141414]/50 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("about.elena_role", locale)}</p>
              <p className="text-sm text-[#141414]/70 mb-8 font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("about.elena_bio", locale)}</p>
            </StaggerFade>
            <div className="flex flex-wrap gap-2">
              {(["about.badge1", "about.badge2", "about.badge3"] as TranslationKey[]).map((key, i) => (
                <StaggerFade key={i} index={i + 2}>
                  <span className="inline-block border border-[#141414]/20 px-4 py-2 text-[11px] uppercase tracking-wider text-[#141414]">{translate(key, locale)}</span>
                </StaggerFade>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-widest text-[#141414]/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("about.telefon", locale)}</p>
              <a href="tel:0759378281" className="text-lg text-[#141414] hover:text-[#141414]/70 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0759 378 281</a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section data-trust-strip className="bg-[#141414] py-[80px] px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: articleCount, icon: null, labelKey: "stats.modele" as TranslationKey },
            { value: 0, icon: Truck, labelKey: "stats.national" as TranslationKey },
            { value: 0, icon: Banknote, labelKey: "stats.plata" as TranslationKey },
            { value: 0, icon: Handshake, labelKey: "stats.parteneri" as TranslationKey },
          ].map((stat, i) => (
            <StaggerFade key={i} index={i}>
              <div>
                <div data-stat-visual style={{ minHeight: "64px", display: "flex", alignItems: "center", justifyContent: "center" }} className="mb-3 text-white">
                  {stat.icon ? <stat.icon size={44} strokeWidth={1.5} aria-hidden="true" /> : (
                    <p className="text-4xl md:text-5xl font-bold leading-none"><CountUp end={stat.value} /></p>
                  )}
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate(stat.labelKey, locale)}</p>
              </div>
            </StaggerFade>
          ))}
        </div>
      </section>

      {/* CUM FUNCȚIONEAZĂ */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#141414] mb-16" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("cum.title", locale)}</h2>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <StaggerFade key={i} index={i}>
                <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-6 border-b border-[#e5e5e5]">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[120px] md:text-[180px] font-bold text-[#141414]/[0.06] leading-none select-none hidden md:block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.num}</span>
                  <div className="md:w-24 flex-shrink-0">
                    <span className="text-[11px] uppercase tracking-widest text-[#141414]/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.num}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#141414] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate(step.titleKey, locale)}</h3>
                    <p className="text-sm text-[#141414]/50 font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate(step.descKey, locale)}</p>
                  </div>
                  <ArrowRight size={20} className="text-[#141414]/30 hidden md:block" strokeWidth={1.5} />
                </div>
              </StaggerFade>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[#141414] py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-[clamp(48px,6vw,96px)] font-bold text-white leading-[1.08] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <ClipReveal words={translate("cta.headline", locale).split("\n")} />
          </h2>
          <p className="text-white/50 font-light mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("cta.sub", locale)}</p>
          <Link href="/cere-oferta" className="inline-flex items-center bg-white text-[#141414] px-8 py-3 text-sm font-medium tracking-wider hover:bg-white/90 transition-colors duration-200 mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>{translate("cta.button", locale)}</Link>
          <div>
            <a href="tel:0759378281" className="block text-xl text-white hover:text-white/70 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0759 378 281</a>
            <p className="text-[11px] uppercase tracking-wider text-white/40 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{translate("cta.phone_note", locale)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
