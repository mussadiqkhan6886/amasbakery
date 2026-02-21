'use client';

import { useLanguage } from '@/context/LanguageContext'
import { playFair } from '@/lib/fonts';
import React from 'react'

const MayLikeHeading = ({en, ar}: {en:string, ar:string}) => {
    const {t, lang} = useLanguage() 
  return (
       <h3 className={`${playFair.className} text-3xl md:text-4xl text-center my-12`}>
        {t(en, ar,lang)}
        </h3>
  )
}

export default MayLikeHeading
