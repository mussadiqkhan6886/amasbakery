'use client';

import { useLanguage } from '@/context/LanguageContext';
import { playFair } from '@/lib/fonts';
import React from 'react';

const MenuHeading = ({ collection }: { collection: string }) => {
  const { t, lang } = useLanguage();

  return (
    <h1 className={`${playFair.className} text-5xl text-center my-14`}>
      {collection === "menu"
        ? t("Menu", "القائمة", lang)
        : t("Occasion Cakes", "كيكات المناسبات", lang)}
    </h1>
  );
};

export default MenuHeading;
