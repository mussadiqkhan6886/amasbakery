'use client';

import { useLanguage } from '@/context/LanguageContext';
import React from 'react'
import ScrollFloat from '../ui/HeadingScroll';
import { playFair } from '@/lib/fonts';

const CanDoHeader = () => {
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
        What can we do for you
        </ScrollFloat> : <h3 className={`${playFair.className} text-center mt-30 text-4xl md:text-5xl my-15`}>
        ما الذي يمكننا تقديمه لكم؟</h3>} 
    </>
  )
}

export default CanDoHeader
