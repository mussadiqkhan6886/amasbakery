'use client';

import { useLanguage } from '@/context/LanguageContext';
import React from 'react'
import ScrollFloat from '../ui/HeadingScroll';
import { playFair } from '@/lib/fonts';

const CanDoHeader = ({en, ar}: {en: string, ar: string}) => {
    const {t, lang} = useLanguage()
  return (
    <>
     {lang === "en" ? <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
        >
       {en}
        </ScrollFloat> : <h3 className={`${playFair.className} text-center mt-30 text-4xl md:text-5xl my-15`}>
        {ar}</h3>} 
    </>
  )
}

export default CanDoHeader
