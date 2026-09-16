import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR — Baustoffe",
  description: "Drepturile tale privind datele personale la Baustoffe (Best Baustoffe SRL).",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
