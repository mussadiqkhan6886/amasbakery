'use client';

import { useLanguage } from '@/context/LanguageContext';
import React from 'react'

const ProductDescription = ({en,ar}: {en: string, ar: string}) => {
    const {t, lang} = useLanguage()
  return (
    <p>
      {t(en, ar, lang)}
    </p>
  )
}

export default ProductDescription
