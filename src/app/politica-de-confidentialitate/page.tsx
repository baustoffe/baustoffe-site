import { LegalDocument } from "@/components/legal-document";
import document from "@/content/legal/politica-de-confidentialitate.json";

export default function Page() {
  return <LegalDocument document={document} />;
}
