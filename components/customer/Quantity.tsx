'use client';

import { useLanguage } from '@/context/LanguageContext';
import React from 'react'

const Quantity = () => {
    const {t, lang} = useLanguage()
  return (
     <div className="flex items-center gap-4 mt-4">
        <span className="font-medium">{t("Quantity", "كمية", lang)}</span>
        <div className="flex items-center border border-gray-300 rounded">
            <div className="px-3 py-1">-</div>
            <div className="px-4 py-1">1</div>
            <div className="px-3 py-1">+</div>
        </div>
    </div>
  )
}

export default Quantity
