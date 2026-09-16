"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { translate } from "@/lib/i18n";
import { getProductHref, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { locale } = useLocale();
  const href = getProductHref(product);
  const choose = locale === "de" ? "Variante wählen" : locale === "en" ? "Choose options" : "Alege varianta";
  return (
    <article className="group min-w-0" data-product-code={product.code}>
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-[#f3f3f3] focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={product.base_name_ro}>
        <Image src={product.image} alt={product.base_name_ro} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-5 transition-transform duration-300 motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none" />
      </Link>
      <div className="pt-4">
        <h2 className="text-base font-medium"><Link href={href} className="hover:underline underline-offset-4">{product.base_name_ro}</Link></h2>
        <p className="mt-1 text-[11px] text-[#141414]/60">{product.variants.length} {locale === "de" ? "Varianten" : locale === "en" ? "options" : "variante"}</p>
        <p className="mt-2 text-sm">{translate("cat.de_la", locale)} {formatPrice(product.base_price_ron)}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Link href={href} className="bg-[#141414] px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-white hover:bg-[#333] focus-visible:outline-2 focus-visible:outline-offset-4">{choose} <span aria-hidden="true">↗</span></Link>
          <Link href="/cere-oferta" className="text-[11px] text-[#141414]/60 underline underline-offset-4">{translate("cat.cere_oferta", locale)}</Link>
        </div>
      </div>
    </article>
  );
}
