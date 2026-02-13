'use client';

import { useLanguage } from '@/context/LanguageContext';
import { playFair } from '@/lib/fonts';
import React from 'react'

const CanDoVideoHeading = ({header, ar}: {header: string, ar: string}) => {
    const {t, lang} = useLanguage()
  return (
    <h3 className={`${playFair.className} flex gap-3  items-center text-3xl text-center bottom-1 ${lang == "en" ? "left-1" : "right-3"} absolute text-white z-40 `}>
        {t(header, ar, lang)}
    </h3>
  )
}

export default CanDoVideoHeading
