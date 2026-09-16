import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Despre Noi — Baustoffe",
  description: "Baustoffe, operat de Best Baustoffe SRL — distribuitor autorizat Chirmandi pentru România.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
