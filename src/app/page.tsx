"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useCart } from "@/components/providers";
import { translate, TranslationKey } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

function ClipReveal({ words, className }: { words: string[]; className?: string }) {
  return (
    <div className={className}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
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

  const showcase = [
    { aspect: "4/3", labelKey: "showcase.usi_exterior" as TranslationKey, price: translate("showcase.de_la", locale) + " 3.490 Lei", href: "/usi-exterior" },
    { aspect: "3/4", labelKey: "showcase.ferestre" as TranslationKey, price: translate("showcase.de_la", locale) + " 1.890 Lei", href: "/ferestre" },
    { aspect: "4/3", labelKey: "showcase.usi_interior" as TranslationKey, price: translate("showcase.de_la", locale) + " 1.250 Lei", href: "/usi-interior" },
    { aspect: "3/4", labelKey: "showcase.usi_exterior" as TranslationKey, price: translate("showcase.de_la", locale) + " 4.120 Lei", href: "/usi-exterior" },
    { aspect: "4/3", labelKey: "showcase.geam" as TranslationKey, price: translate("showcase.de_la", locale) + " 2.150 Lei", href: "/ferestre" },
    { aspect: "3/4", labelKey: "showcase.euro_classic" as TranslationKey, price: translate("showcase.de_la", locale) + " 2.890 Lei", href: "/usi-interior" },
  ];

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
      <section className="relative min-h-screen flex flex-col">
        <div className="relative w-full flex-[0.7] bg-[#e8e8e8] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[#999] text-sm uppercase tracking-widest">Hero Image — Higgsfield Tier 2 Asset</p>
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(250,250,250,1) 0%, transparent 40%)" }} />
        </div>
        <div className="flex-1 flex items-end pb-16 md:pb-24 px-6">
          <div className="mx-auto w-full max-w-7xl">
            <p className="label-uppercase text-[#141414]/50 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {translate("hero.label", locale)}
            </p>
            <h1 className="text-[clamp(56px,8vw,128px)] font-bold leading-[0.9] text-[#141414] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                <Link href={item.href} className="group block relative overflow-hidden" style={{ aspectRatio: item.aspect }}>
                  <div className="absolute inset-0 bg-[#e8e8e8] flex items-center justify-center">
                    <span className="text-[#aaa] text-xs uppercase tracking-widest">{translate(item.labelKey, locale)}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/85 transition-opacity duration-300 flex flex-col justify-center px-6">
                    <motion.h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }} initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      {translate(item.labelKey, locale)}
                    </motion.h3>
                    <motion.p className="text-white/70 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }} initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
                      {item.price}
                    </motion.p>
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
            "{translate("about.quote", locale)}"
          </p>
        </div>
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <StaggerFade index={0}>
            <div className="bg-[#e8e8e8] aspect-[4/5] flex items-center justify-center">
              <span className="text-[#aaa] text-xs uppercase tracking-widest">Imagine — detalii produs</span>
            </div>
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
      <section className="bg-[#141414] py-[80px] px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "165", suffix: "+", labelKey: "stats.modele" as TranslationKey },
            { value: "", suffix: "", labelKey: "stats.national" as TranslationKey },
            { value: "", suffix: "", labelKey: "stats.plata" as TranslationKey },
            { value: "", suffix: "", labelKey: "stats.parteneri" as TranslationKey },
          ].map((stat, i) => (
            <StaggerFade key={i} index={i}>
              <div>
                {stat.value ? (
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <CountUp end={parseInt(stat.value)} suffix={stat.suffix} />
                  </p>
                ) : <div className="h-12" />}
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
          <h2 className="text-[clamp(48px,6vw,96px)] font-bold text-white leading-[0.95] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
