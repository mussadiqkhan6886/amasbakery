'use client';

import CanDoHeader from '@/components/customer/CanDoHeader';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import React from 'react'

const AboutUs = () => {
  const {t, lang} = useLanguage()

  return (
    <section className='h-full  max-w-7xl mx-auto flex overflow-hidden items-center justify-center flex-col relative py-20 gap-3'>
      <div>
        <Image src={"/580.webp"} alt='background about' width={1000} height={700} className='w-full h-full object-cover object-center absolute opacity-20 inset-0' />
      </div>
        <CanDoHeader en="About Us" ar="معلومات عنا" />

        <p className={`${lang === "en" ? "text-base" : "text-lg"} text-center max-w-4xl mx-auto px-3`}>{t(` At Ama’s Bakery, every creation is baked with love and passion.
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
