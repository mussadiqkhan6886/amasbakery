import WeddingCakeOrder from '@/components/customer/WeddingCakeOrder'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Luxury Wedding Cakes',
  description: 'Discover our exclusive gallery of handcrafted wedding cakes. From classic elegance to modern designs, book your dream wedding cake consultation with Amas Bakery in alkhobar and dammam.',
  keywords: ['wedding cakes', 'bridal cakes', 'custom wedding cakes', 'wedding cake gallery', 'luxury cakes', 'order wedding cake', "cakes in al-khobar", "cakes in dammam", "wedding cake in saudi", "wedding cake in dammam", "wedding cake in al-khobar", "custom wedding cake in saudi", "custom wedding cake booking"],
  openGraph: {
    title: 'Exquisite Wedding Cakes | Amass Bakery',
    description: 'Transform your special day with a masterpiece. View our wedding cake gallery and contact us for custom bookings.',
    images: [
      {
        url: '/custom.webp', // Make sure to have a high-quality wedding cake image in your public folder
        width: 1200,
        height: 630,
        alt: 'Elegant Tiered Wedding Cake',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Wedding Cakes | Amass Bakery',
    description: 'Bespoke wedding cake designs for your big day. Browse our gallery and book now.',
    images: ['/custom.webp'],
  },
}

const WeddingCake = () => {
  return (
      <WeddingCakeOrder />
  )
}

export default WeddingCake