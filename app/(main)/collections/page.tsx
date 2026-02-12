'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { playFair } from '@/lib/fonts';

const collectionsCatalog = [
  {
    id: 1,
    name: {
      en: "All",
      ar: "الكل"
    },
    image: "/cake.jpg",
    link: "/collections/all"
  },
  {
    id: 2,
    name: {
      en: "Occasion Cakes",
      ar: "كيكات المناسبات"
    },
    image: "/cake.jpg",
    link: "/collections/occasion-cakes"
  },
  {
    id: 3,
    name: {
      en: "Customize Cake",
      ar: "كيك حسب الطلب"
    },
    image: "/cake.jpg",
    link: "/collections/customize-cake"
  },
  {
    id: 4,
    name: {
      en: "Dates",
      ar: "تمور"
    },
    image: "/cake.jpg",
    link: "/collections/dates"
  },
  {
    id: 5,
    name: {
      en: "Cakes",
      ar: "كيكات"
    },
    image: "/cake.jpg",
    link: "/collections/cakes"
  },
  {
    id: 6,
    name: {
      en: "Pastry",
      ar: "معجنات"
    },
    image: "/cake.jpg",
    link: "/collections/pastry"
  },
  {
    id: 7,
    name: {
      en: "Cookies",
      ar: "كوكيز"
    },
    image: "/cake.jpg",
    link: "/collections/cookies"
  },
  {
    id: 8,
    name: {
      en: "Brownie",
      ar: "براونيز"
    },
    image: "/cake.jpg",
    link: "/collections/brownie"
  },
  {
    id: 9,
    name: {
      en: "Cupcake",
      ar: "كب كيك"
    },
    image: "/cake.jpg",
    link: "/collections/cupcake"
  }
];


const Collections = () => {
  const { t, lang } = useLanguage();

  return (
    <main
      className={`min-h-screen bg-light/50 px-4 py-32 ${
        lang === 'ar' ? 'rtl text-right' : 'ltr text-left'
      }`}
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className={`${playFair.className} text-4xl md:text-5xl font-bold text-main mb-4`}>
          {t('Our Collections', 'مجموعاتنا', lang)}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t(
            'Explore our handcrafted selections made with premium ingredients and refined artistry.',
            'اكتشف تشكيلتنا المصنوعة يدوياً بمكونات فاخرة ولمسة فنية راقية.',
            lang
          )}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectionsCatalog.map((item) => (
          <Link
            href={item.link}
            key={item.id}
            className="group relative overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full h-[460px]">
              <Image
                src={item.image}
                alt={item.name.en}
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-500" />

            {/* Text */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className={`${playFair.className} text-2xl font-semibold`}>
                {t(item.name.en, item.name.ar, lang)}
              </h3>
              <span className="text-sm opacity-90">
                {t('View Collection →', 'عرض المجموعة →', lang)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Collections;
