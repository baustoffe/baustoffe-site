"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers";
import { createProductCartItem } from "@/components/product-selection";
import { getVariantPrice, type Product } from "@/lib/products";
import { translate } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { formatPrice, formatSize } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const { locale } = useLocale();
  const { addItem } = useCart();
  const initialVariant = product.variants.find((variant) => variant.is_default) || product.variants[0];
  const [variantCode, setVariantCode] = useState(initialVariant?.code || "");
  const [sizeKey, setSizeKey] = useState("");
  const [photo, setPhoto] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((item) => item.code === variantCode);
  const categoryKey = product.category_slug === "ferestre" ? "nav.ferestre" : product.category_slug === "usi-interior" ? "nav.usi_interior" : "nav.usi_exterior";
  const text = (ro: string, en: string, de: string) => locale === "en" ? en : locale === "de" ? de : ro;
  if (!variant) return <div className="pt-32 px-6 pb-20"><h1>{product.base_name_ro}</h1><Link href="/cere-oferta">{translate("cat.cere_oferta", locale)}</Link></div>;
  const gallery = [...new Set([variant.image, ...variant.gallery].filter(Boolean))];
  const defaultSize = variant.sizes.find((size) => size.is_default) || variant.sizes[0];
  const selectedSize = sizeKey || (defaultSize ? formatSize(defaultSize.width_cm, defaultSize.height_cm) : "");
  const cartItem = createProductCartItem(product, variant.code, selectedSize, quantity);
  const quoteHref = `/cere-oferta?produs=${encodeURIComponent(product.base_name_ro)}&cod=${encodeURIComponent(variant.manufacturer_code)}`;
  return (
    <div className="pt-28 pb-20 px-6 text-[#141414]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap gap-2 text-[11px] text-[#141414]/60" aria-label="Breadcrumb">
          <Link href="/">{translate("cat.breadcrumb", locale)}</Link><span>/</span><Link href={`/${product.category_slug}`} className="underline underline-offset-4">{translate(categoryKey, locale)}</Link><span>/</span><span>{product.base_name_ro}</span>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="min-w-0">
            <div className="relative aspect-square bg-[#f3f3f3]">
              <Image src={gallery[photo] || variant.image} alt={`${product.base_name_ro} — ${variant.color_name_ro} · ${variant.manufacturer_code}`} fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-6 md:p-10" preload />
            </div>
            {gallery.length > 1 && <div className="mt-3 flex flex-wrap gap-2" aria-label={text("Fotografii produs", "Product photos", "Produktfotos")}>
              {gallery.map((image, index) => <button key={image} onClick={() => setPhoto(index)} aria-pressed={photo === index} aria-label={`${text("Fotografie", "Photo", "Foto")} ${index + 1}`} className={`relative h-20 w-20 border bg-[#f3f3f3] ${photo === index ? "border-[#141414]" : "border-transparent"}`}><Image src={image} alt="" fill unoptimized sizes="80px" className="object-contain p-2" /></button>)}
            </div>}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] tracking-wider text-[#141414]/60"><span className="uppercase">{text("Cod producător", "Manufacturer code", "Herstellercode")}</span>: <span data-testid="manufacturer-code" className="break-all normal-case">{variant.manufacturer_code}</span></p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold break-words">{product.base_name_ro}</h1>
            <p className="mt-4 text-2xl font-medium" data-testid="variant-price" aria-live="polite">{formatPrice(getVariantPrice(product, variant))}</p>
            <div className="mt-7">
              <label htmlFor="product-variant" className="mb-2 block text-[11px] uppercase tracking-wider">{text("Culoare / variantă producător", "Colour / manufacturer option", "Farbe / Herstellervariante")}</label>
              <select id="product-variant" value={variant.code} onChange={(event) => { setVariantCode(event.target.value); setSizeKey(""); setPhoto(0); setAdded(false); }} className="w-full min-w-0 border border-[#141414]/30 bg-white p-3 text-sm focus-visible:outline-2">
                {product.variants.map((option) => <option key={option.code} value={option.code}>{option.color_name_ro} · {option.manufacturer_code} · {formatPrice(getVariantPrice(product, option))}</option>)}
              </select>
            </div>
            <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-[#141414]/70" data-testid="variant-description">{variant.description_ro}</p>
            <div className="mt-6">
              {variant.sizes.length > 0 ? <>
                <label htmlFor="product-size" className="mb-2 block text-[11px] uppercase tracking-wider">{translate("prod.dimensiune", locale)} (cm)</label>
                <select id="product-size" value={selectedSize} onChange={(event) => { setSizeKey(event.target.value); setAdded(false); }} className="w-full border border-[#141414]/30 bg-white p-3 text-sm">
                  {variant.sizes.map((size) => { const value = formatSize(size.width_cm, size.height_cm); return <option key={value} value={value}>{value} cm</option>; })}
                </select>
              </> : <p className="border-l-2 border-[#141414] pl-4 text-sm leading-relaxed">{text("Dimensiunile acestei variante se confirmă prin ofertă. Nu sunt disponibile dimensiuni verificate pentru comandă online.", "Dimensions for this option are confirmed by quotation. Verified dimensions are not available for online ordering.", "Die Maße dieser Variante werden per Angebot bestätigt. Für eine Onlinebestellung liegen keine bestätigten Maße vor.")}</p>}
              <Link href={quoteHref} className="mt-3 inline-block text-xs underline underline-offset-4">{translate("prod.dimensiune_custom", locale)}</Link>
            </div>
            {cartItem && <div className="mt-7 flex flex-wrap items-end gap-3">
              <label className="text-[11px] uppercase tracking-wider">{text("Cantitate", "Quantity", "Menge")}<input aria-label={text("Cantitate", "Quantity", "Menge")} type="number" min="1" step="1" value={quantity} onChange={(event) => { setQuantity(Math.max(1, Math.floor(Number(event.target.value) || 1))); setAdded(false); }} className="mt-2 block w-20 border border-[#141414]/30 p-3 text-sm" /></label>
              <button onClick={() => { addItem(cartItem); setAdded(true); }} className="bg-[#141414] px-6 py-3.5 text-[11px] font-medium uppercase tracking-wider text-white hover:bg-[#333]">{translate("cat.adauga", locale)}</button>
            </div>}
            {!cartItem && <Link href={quoteHref} className="mt-7 inline-block bg-[#141414] px-6 py-3.5 text-[11px] uppercase tracking-wider text-white">{translate("cat.cere_oferta", locale)}</Link>}
            <p role="status" className="mt-3 text-sm">{added && <>{text("Adăugat în coș.", "Added to cart.", "Zum Warenkorb hinzugefügt.")} <Link href="/cos" className="underline">{text("Vezi coșul", "View cart", "Warenkorb ansehen")}</Link></>}</p>
            <div className="mt-8 border-t border-[#141414]/15 pt-5 text-[11px] text-[#141414]/60">
              <a href={variant.source_url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{text("Fișa producătorului", "Manufacturer listing", "Herstellerangaben")} · {variant.source_name}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
