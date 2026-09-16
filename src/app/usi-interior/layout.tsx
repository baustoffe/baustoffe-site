import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uși de Interior — Baustoffe",
  description: "Uși de interior moderne și clasice la prețuri competitive. Distribuitor autorizat Chirmandi.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
