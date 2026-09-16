import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livrare și Plată — Baustoffe",
  description: "Livrare națională 150 RON, ridicare gratuită din Sibiu, plata la livrare.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
