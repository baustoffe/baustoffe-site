import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ferestre PVC — Baustoffe",
  description: "Ferestre PVC cu termoizolație superioară, diverse dimensiuni. Ridicare gratuită din Sibiu.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
