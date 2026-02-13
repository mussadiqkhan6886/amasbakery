'use client';

import { useLanguage } from '@/context/LanguageContext'
import { playFair } from '@/lib/fonts';
import React from 'react'

const ProductHeading = ({en, ar}: {en:string, ar:string}) => {
    const {t, lang} = useLanguage() 
  return (
       <h1 className={`${playFair.className} text-5xl ${lang === "en" ? "text-left" : "text-right"} my-14`}>
        {t(en, ar,lang)}
        </h1>
  )
}

export default ProductHeading
