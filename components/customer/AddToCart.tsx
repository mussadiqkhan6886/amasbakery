'use client';

import { useLanguage } from '@/context/LanguageContext';
import React from 'react'

const AddToCart = () => {
    const {t, lang} = useLanguage()
  return (
    <button className="mt-6 px-6 py-3 bg-main/90 text-white hover:bg-main transition w-full">
        {t("Add To Cart", "أضف إلى السلة" , lang)}
    </button>
  )
}

export default AddToCart
