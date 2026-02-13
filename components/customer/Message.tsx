'use client';

import { useLanguage } from '@/context/LanguageContext'
import React from 'react'

const Message = () => {
    const {t, lang} = useLanguage()
  return (
   <div className="flex flex-col gap-2">
        <label className="font-medium">{t("Add Personalized Message", "إضافة رسالة شخصية", lang)}</label>
        <input
        type="text"
        placeholder="Your message here"
        className="border border-gray-300 rounded px-3 py-2 w-full"
        />
    </div>
  )
}

export default Message
