'use client';

import React from 'react'
import Link from 'next/link'
import { playFair } from '@/lib/fonts'
import { useLanguage } from '@/context/LanguageContext';
import dynamic from 'next/dynamic';
import { ProductType } from '@/type';
const SwiperCard = dynamic(() => import("./SwiperCard"), {
  ssr: false
})

interface Props {
    header: {
      en: string
      ar: string
    }
    link: string
    data: ProductType[]
    delay: number
}

const CategoryCard = ({header, link, data, delay}: Props) => {
  const {t, lang} = useLanguage()
  return (
    <div className='rounded-md w-full max-w-[500px] flex flex-col items-center justify-center bg-main/80 text-light'>
        <h4 className={`${playFair.className} p-1 ml-4 mt-3 text-3xl`}>{t(header.en, header.ar, lang)}</h4>
        <div className='w-full'>
        <SwiperCard data={data} delay={delay} />
        </div>
    </div>
  )
}

export default CategoryCard
