import Language from '@/components/customer/Language'
import { getAndResetOrderControl } from '@/lib/helper'
import AboutUs from '@/sections/AboutUs'
import CanDo from '@/sections/CanDo'
import Categories from '@/sections/Categories'
import Hero from '@/sections/Hero'
import Review from '@/sections/Review'
import React from 'react'

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amas Bakery | Custom Cakes & Artisanal Treats in Al Khobar and Dammam",
  description: "Amas Bakery crafts premium custom cakes, tiered wedding cakes, and artisanal pastries. Delivering fresh, handcrafted sweets across Al Khobar and Dammam.",
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
  openGraph: {
    title: "Amas Bakery | Custom Cakes & Artisanal Treats",
    description: "Handcrafted cakes for your special moments in Al Khobar and Dammam.",
    url: "https://amasbakery.vercel.app", // Replace with your actual domain
    siteName: "Amas Bakery",
    images: [
      {
        url: "/logo.webp", // Ensure this exists in your public folder
        width: 1200,
        height: 630,
        alt: "Amas Bakery Custom Cakes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amas Bakery | Custom Cakes",
    description: "Premium handcrafted cakes in Al Khobar and Dammam.",
    images: ["/logo.webp"],
  },
};

export const revalidate = 0; // Forces the page to run the logic on every request

const Home = async () => {
  const orderControl = await getAndResetOrderControl();
  return (
    <main>
      <Language />
      <Hero />
      <CanDo />
      <AboutUs />
      <Categories />
      <Review />
    </main>
  )
}

export default Home
