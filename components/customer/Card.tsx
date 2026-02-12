'use client';

import { playFair } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Card = ({ item }: { item: any }) => {
  const {t, lang } = useLanguage();

  return (
    <Link
      href={`/collections/${item.type}/${item.slug}`}
      className="flex flex-col items-center text-center"
    >
      <div className="w-full h-full relative mb-2">
        <Image
          src={item.image}
          alt={t(item.name.en, item.name.ar, lang)}
          width={400}
          height={350}
          className="object-cover object-center"
        />
      </div>
      <h2 className={`${playFair.className} text-lg`}>
        {t(item.name.en, item.name.ar, lang)}
      </h2>
      <h3 className="text-sm text-gray-700 mt-1">
        {item.price ? item.price['6inch'] : item.basePrice['6inch']} {t("SAR", " ر.س" , lang)}
      </h3>
    </Link>
  );
};

export default Card;
