'use client';

import ScrollReveal from '@/components/ui/AboutScroll'
import ScrollFloat from '@/components/ui/HeadingScroll'
import { useLanguage } from '@/context/LanguageContext';
import { playFair } from '@/lib/fonts';
import React from 'react'

const AboutUs = () => {
  const {t, lang} = useLanguage()

  return (
    <section className='h-full my-20 max-w-7xl mx-auto flex items-center justify-center flex-col gap-3'>

        {lang === "en" ? <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
        >
        About Us
        </ScrollFloat> : <h3 className={`${playFair.className} text-4xl md:text-5xl my-5`}>معلومات عنا</h3>}

        <ScrollReveal
        baseOpacity={1}
        enableBlur
        baseRotation={3}
        blurStrength={5}
        >
          {t(` At Ama’s Bakery, every creation is baked with love and passion.
        We craft delightful pastries, cakes, and treats that bring joy to every bite.
        Using only the finest ingredients, we blend tradition with a touch of modern artistry.
        
        Our mission is simple: to make every moment sweeter and every celebration memorable.
        Step in, indulge, and let your taste buds experience a little piece of happiness.`, ` في مخبز آما، كل قطعة تُخبز بحب وشغف.
نُعدّ معجنات وكعكات وحلويات شهية تُضفي البهجة على كل لقمة.
باستخدام أجود المكونات فقط، نمزج بين الأصالة ولمسة من الإبداع العصري.

مهمتنا بسيطة: أن نجعل كل لحظة أحلى وكل احتفال لا يُنسى.

تفضلوا بالدخول، واستمتعوا، ودعوا براعم ذوقكم تتذوق لحظات من السعادة.`, lang)}
        </ScrollReveal>
    </section>
  )
}

export default AboutUs
