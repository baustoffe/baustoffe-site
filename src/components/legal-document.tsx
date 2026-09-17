import Link from "next/link";

type Document = { title: string; blocks: { tag: string; text: string }[] };

// Render captured content as escaped text, never executable manufacturer HTML.
export function LegalDocument({ document }: { document: Document }) {
  return (
    <article lang="ro" className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-[#141414] mb-6">{document.title}</h1>
        <div data-legal-document className="space-y-6 text-sm text-[#141414]/80 leading-relaxed break-words">
          {document.blocks.map((block, index) => {
            if (block.tag === "h1") return null;
            const heading = /^h[2-6]$/.test(block.tag) || /^\d+\. [A-Z]/.test(block.text.trim());
            return heading
              ? <h2 key={index} className="text-lg font-medium text-[#141414] whitespace-pre-line">{block.text}</h2>
              : <div key={index} className="whitespace-pre-line">{block.text}</div>;
          })}
        </div>
        <div className="mt-10 border-t border-[#e5e5e5] pt-6 text-xs text-[#141414]/70">
          <p>BEST BAUSTOFFE SRL · CUI 52365190 · Reg. Com. J2025062807006</p>
          <p>Sediu Social: Jud. Valcea, Sat Cainenii Mici, Comuna Caineni, Strada Cazacilor Nr 9.</p>
          <Link href="/contact" className="inline-block mt-3 underline underline-offset-4">Contact — 0759 378 281</Link>
        </div>
      </div>
    </article>
  );
}
