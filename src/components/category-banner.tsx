import Image from "next/image";

const images = {
  exterior: { file: "category-exterior.webp", alt: "Detaliu arhitectural al unei uși de exterior — imagine de inspirație" },
  windows: { file: "category-windows.webp", alt: "Detaliu de tâmplărie PVC — imagine de inspirație" },
  interior: { file: "category-interior.webp", alt: "Ușă interioară cu mâner minimalist — imagine de inspirație" },
};

/** Decorative category imagery, never a substitute for catalog product photos. */
export function CategoryBanner({ category, portrait = false }: { category: keyof typeof images; portrait?: boolean }) {
  const image = images[category];
  return (
    <div className={`relative overflow-hidden bg-[#e8e8e8] ${portrait ? "aspect-[4/5]" : "h-[240px] md:h-[380px]"}`}>
      <Image src={`/baustoffe-assets/${image.file}`} alt={image.alt} fill sizes={portrait ? "(max-width: 768px) 100vw, 500px" : "(max-width: 1280px) 100vw, 1280px"} className="object-cover" />
    </div>
  );
}
