import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni și Condiții — Baustoffe",
  description: "Termenii și condițiile de comandă la Baustoffe.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
