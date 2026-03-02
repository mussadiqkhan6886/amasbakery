import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import HtmlLangSetter from "@/components/customer/HTMLLangSelector";
import { roboto } from "@/lib/fonts";
import { CartContextProvider } from "@/context/CartContext";
import Language from "@/components/customer/Language";

export const metadata: Metadata = {
  title: {
    default: "Delicious Cakes in Al khobar and Dammam",
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
  "graduation cakes",
  "anniversary cakes",
  "best bakery Eastern Province",
  "designer cakes KSA",
  "bakery near me Khobar",
  "bakery near me dammam"
],
  authors: [{ name: "Amas Bakery" }],
  metadataBase: new URL("https://www.amassbakery.com"), // Replace with your real domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Amas Bakery | Artisanal Cakes",
    description: "Handcrafted cakes and sweets for your special occasions.",
    url: "https://www.amassbakery.com",
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
  verification: {
    google: "WDwCpz3nM2cEE1YE3u4y_NwR357V2FnRwBtC4wXKvmY"
  }
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
            <Language />
          </CartContextProvider>
          <HtmlLangSetter />
        </LanguageProvider>
      </body>
    </html>
  );
}