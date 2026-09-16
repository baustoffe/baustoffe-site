import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LocaleProvider } from "@/lib/locale-context";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/gtm";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")),
  icons: { icon: "/baustoffe-assets/favicon.png", apple: "/baustoffe-assets/favicon.png" },
  openGraph: {
    title: "Baustoffe – Uși și Ferestre PVC",
    images: [{ url: "/baustoffe-assets/og-image.jpg", width: 1200, height: 630, alt: "Baustoffe – Uși și Ferestre PVC" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/baustoffe-assets/og-image.jpg"] },
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
