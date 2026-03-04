'use client';

import { useLanguage } from '@/context/LanguageContext';
import { playFair } from '@/lib/fonts';
import Image from 'next/image';
import React from 'react';

const MenuHeading = ({ collection }: { collection: string }) => {
  const { t, lang } = useLanguage();

  // Helper to determine what text to show based on the collection string
  const getHeading = () => {
    // lowercase the check to be safe
    const type = collection.toLowerCase();

    if (type === "menu") {
      return t("Menu", "القائمة", lang);
    }
    if (type === "occasion-cakes") {
      return t("Occasion Cakes", "كيكات المناسبات", lang);
    }
    if (type === "gifts") {
      return t("Gifts", "الهدايا", lang);
    }
    
    // Fallback to the collection name if no match
    return collection;
  };

  return (
    <div className='h-[200px] md:h-[260px] relative mb-20'>
      <div className='absolute inset-0 h-full scale-110 w-full bg-black/30 z-10' />
      <Image src="/menuPage.webp" alt='collections main hero image' className='scale-110 object-cover h-40 object-cover blur-[3px] object-center overflow-hidden' fill priority fetchPriority='high' />
      <h1 className={`${playFair.className} absolute uppercase text-5xl md:text-6xl z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center capitalize`}>
        {getHeading()}
      </h1>
    </div>
  );
};

export default MenuHeading;