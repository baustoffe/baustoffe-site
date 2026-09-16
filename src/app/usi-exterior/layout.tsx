import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uși Exterior de PVC — Baustoffe",
  description: "Uși de exterior PVC și termopan distribuite direct de la Chirmandi. Plata la livrare, livrare în toată România.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
