'use client';

import { useLanguage } from '@/context/LanguageContext';
import { playFair } from '@/lib/fonts';
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
    <h1 className={`${playFair.className} text-5xl text-center my-14 capitalize`}>
      {getHeading()}
    </h1>
  );
};

export default MenuHeading;