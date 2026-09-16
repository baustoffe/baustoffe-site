import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate — Baustoffe",
  description: "Cum prelucrăm datele tale personale.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
