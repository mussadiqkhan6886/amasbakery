'use client';

import { playFair } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Product } from '@/type';
import CurrenncyT from './CurrenncyT';

const Card = ({ item }: { item: Product }) => {
  const {t, lang } = useLanguage();

  return (
    <Link
      href={`/collections/${item.type}/${item.slug}`}
      className="flex h-full flex-col items-center text-center"
    >
      <div className="w-80 h-88 relative mb-2">
        <Image
          src={item.image}
          alt={t(item.name.en, item.name.ar, lang)}
          width={300}
          height={300}
          className="object-cover h-full object-center"
        />
      </div>
      <h2 className={`${playFair.className} mt-3 text-center text-lg`}>
        {t(item.name.en, item.name.ar, lang)}
      </h2>
      <h3 className="text-sm text-center text-gray-700 mt-1">
        {item.varieties[0].price} <CurrenncyT />
      </h3>
    </Link>
  );
};

export default Card;
