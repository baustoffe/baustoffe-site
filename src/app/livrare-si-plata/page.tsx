import { LegalDocument } from "@/components/legal-document";
import document from "@/content/legal/livrare-si-plata.json";

export default function Page() {
  return <LegalDocument document={document} />;
}
