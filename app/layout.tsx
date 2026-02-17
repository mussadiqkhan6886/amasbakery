import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import HtmlLangSetter from "@/components/customer/HTMLLangSelector";
import { roboto } from "@/lib/fonts";
import { CartContextProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: {
    default: "Delicious Cakes in Al khobar and Dammam | Amas Bakery",
    template: "%s | Amas Bakery",
  },
  description: "Experience the finest custom cakes, tiered wedding cakes, and artisanal pastries at Amas Bakery. Freshly baked in Al Khobar and Dammam.",
  keywords: [
  "Amas Bakery",
  "custom cakes Al Khobar",
  "cake delivery Dammam",
  "customized birthday cakes",
  "wedding cakes Saudi Arabia",
  "artisanal bakery Khobar",
  "bento cakes Dammam",
  "luxury desserts",
  "pastry shop Al Khobar",
  "personalized cakes",
  "graduation cakes 2026",
  "anniversary cakes",
  "best bakery Eastern Province",
  "designer cakes KSA",
  "bakery near me Khobar"
],
  authors: [{ name: "Amas Bakery" }],
  metadataBase: new URL("https://amasbakery.vercel.app"), // Replace with your real domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Amas Bakery | Artisanal Cakes",
    description: "Handcrafted cakes and sweets for your special occasions.",
    url: "https://amasbakery.vercel.app",
    siteName: "Amas Bakery",
    images: [
      {
        url: "/logo.webp", // Make sure to put an image in your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`antialiased ${roboto.className}`}>
        <LanguageProvider>
          <CartContextProvider>
            {children}
          </CartContextProvider>
          <HtmlLangSetter />
        </LanguageProvider>
      </body>
    </html>
  );
}