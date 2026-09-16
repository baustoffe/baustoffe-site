import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LocaleProvider } from "@/lib/locale-context";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/gtm";

export const metadata: Metadata = {
  title: "Baustoffe – Uși și Ferestre PVC",
  description: "Baustoffe — Distribuitor Autorizat Chirmandi. Uși și ferestre PVC de calitate, livrare în toată România.",
  alternates: {
    languages: {
      ro: "/",
      en: "/en",
      de: "/de",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <GoogleTagManagerNoscript />
        <GoogleTagManager />
        <LocaleProvider>
          <Providers>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Providers>
        </LocaleProvider>
      </body>
    </html>
  );
}
