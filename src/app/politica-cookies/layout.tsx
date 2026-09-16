import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica Cookies — Baustoffe",
  description: "Cookie-urile utilizate de site-ul Baustoffe.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
