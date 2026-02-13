'use client';

import CanDoHeader from '@/components/customer/CanDoHeader';
import { useLanguage } from '@/context/LanguageContext';
import React from 'react'

const AboutUs = () => {
  const {t, lang} = useLanguage()

  return (
    <section className='h-full my-20 max-w-7xl mx-auto flex items-center justify-center flex-col gap-3'>

        <CanDoHeader en="About Us" ar="معلومات عنا" />

        <p className="text-center max-w-4xl mx-auto">{t(` At Ama’s Bakery, every creation is baked with love and passion.
        We craft delightful pastries, cakes, and treats that bring joy to every bite.
        Using only the finest ingredients, we blend tradition with a touch of modern artistry.
        
        Our mission is simple: to make every moment sweeter and every celebration memorable.
        Step in, indulge, and let your taste buds experience a little piece of happiness.`, ` في مخبز آما، كل قطعة تُخبز بحب وشغف.
نُعدّ معجنات وكعكات وحلويات شهية تُضفي البهجة على كل لقمة.
باستخدام أجود المكونات فقط، نمزج بين الأصالة ولمسة من الإبداع العصري.

مهمتنا بسيطة: أن نجعل كل لحظة أحلى وكل احتفال لا يُنسى.

تفضلوا بالدخول، واستمتعوا، ودعوا براعم ذوقكم تتذوق لحظات من السعادة.`, lang)}</p>
    </section>
  )
}

export default AboutUs
