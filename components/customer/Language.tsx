'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { ChangeEvent } from 'react'

const Language = () => {

      const { lang, switchLang } = useLanguage();
     const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        switchLang(e.target.value)
      }
  return (
    <select
      onChange={handleChange}
      value={lang}
      className="bg-zinc-200 block lg:hidden border border-white/20 rounded-md px-2 py-1 text-sm z-50 focus:outline-none fixed bottom-4 -right-0.5"
    >
      <option value="en" className="text-black">EN</option>
      <option value="ar" className="text-black">AR</option>
    </select>
  )
}

export default Language
