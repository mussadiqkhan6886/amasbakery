import { Metadata } from "next";
import CustomizeYourCake from '@/components/customer/CustomizeYouCake'
import React from 'react'

export const metadata: Metadata = {
  title: "Design Your Dream Cake ",
  description: "Use our custom cake builder to design your perfect celebration cake. Choose flavors, sizes, and tiers, or upload your own design for delivery in Al Khobar and Dammam.",
  keywords: [
    "design your own cake",
    "custom cake builder",
    "personalized cake message",
    "bespoke wedding cakes",
    "tiered cake customization",
    "cake flavor options",
    "custom cake design Al Khobar",
    "online cake ordering",
    "build a cake Dammam",
    "cake design upload",
    "Amas Bakery customization"
  ],
  openGraph: {
    title: "Customize Your Cake | Amas Bakery",
    description: "Handcraft your dream cake with our interactive builder.",
    url: "https://amasbakery.vercel.app/customize-your-cake", // Replace with your actual URL
    type: "website",
    images: [
      {
        url: "/custom.webp", // Create a specific image for the customize page
        width: 1200,
        height: 630,
        alt: "Amas Bakery Cake Customization Tool",
      },
    ],
  },
};

const page = () => {
  return (
    <CustomizeYourCake />
  )
}

export default page