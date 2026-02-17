'use client';

import { useLanguage } from '@/context/LanguageContext';
import { playFair } from '@/lib/fonts'
import Link from 'next/link'
import React from 'react'
import { FiInstagram, FiMail } from 'react-icons/fi'

const Footer = () => {
  const {t, lang} = useLanguage()
  return (
    <footer className='pt-7 flex flex-col border-t border-main'>
      <div className="text-center flex gap-4 text-main text-lg items-center justify-center p-2">
        <Link target='_blank' href={"https://www.instagram.com/amassbakery/?__pwa=1"}>
          <FiInstagram />
        </Link>
          <Link href="mailto:sadafsafdar18@gmail.com">
        </Link>
        <FiMail />
      </div>
      <div className='flex gap-4 flex-col md:flex-row justify-between py-5 px-2 items-center'>
        <div className='flex flex-col gap-2 text-[12px]'>
          <Link href={"/shipping-and-returns"}>{t("Shipping & Returns", "الشحن والإرجاع", lang)}</Link>
          <Link href={"/terms-and-condition"}>{t("Terms & Condition", "الشروط والأحكام" ,lang)}</Link>
          <Link href={"/privacy-policy"}> {t("Privacy Policy", "سياسة الخصوصية",lang)} </Link>
        </div>
        <h6 className={`${playFair.className} text-main text-7xl text-center `}>{t("Amas Bakery", "مخبز أماس", lang)}</h6>
        <div className="text-[12px]">
          <p>{t("Based In Al Khobar", "مقرنا في الخبر", lang)}</p>
          <p>{t("Amas Bakery Est. 2023", "مخبز أماس، تأسس عام 2023" ,lang)}</p>
        </div>
      </div>
      <p className='text-center border-t text-[13px] border-main py-2'>&copy; {t("All rights reserved","جميع الحقوق محفوظة" ,lang)} {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
