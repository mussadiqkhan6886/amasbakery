'use client';

import { useLanguage } from '@/context/LanguageContext';
import { playFair } from '@/lib/fonts'
import Link from 'next/link'
import React from 'react'
import { FiInstagram } from 'react-icons/fi'

const Footer = () => {
  const {t, lang} = useLanguage()
  return (
    <footer className='pt-7 flex flex-col'>
      <div className="text-center flex items-center justify-center p-2">
        <FiInstagram />
      </div>
      <div className='flex gap-4 flex-col md:flex-row justify-between py-5 px-2 items-center'>
        <div className='flex flex-col gap-2 text-sm'>
          <Link href={"/"}>{t("Shipping & Returns", "الشحن والإرجاع", lang)}</Link>
          <Link href={"/"}>{t("Terms & Condition", "الشروط والأحكام" ,lang)}</Link>
          <Link href={"/"}> {t("Privacy Policy", "سياسة الخصوصية",lang)} </Link>
        </div>
        <h6 className={`${playFair.className} text-7xl text-center `}>{t("Amas Bakery", "مخبز أماس", lang)}</h6>
        <div className="text-sm">
          <p>{t("Based In Al Khobar", "مقرنا في الخبر", lang)}</p>
          <p>{t("Amas Bakery Est. 2023", "مخبز أماس، تأسس عام 2023" ,lang)}</p>
        </div>
      </div>
      <p className='text-center border-t border-main py-2'>&copy; {t("All rights reserved","جميع الحقوق محفوظة" ,lang)} {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
