import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Baustoffe",
  description: "Contactează Baustoffe: telefon 0759 378 281, atrăne în Sibiu. Răspundem rapid.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
