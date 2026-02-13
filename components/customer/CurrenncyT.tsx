'use client';

import { useLanguage } from '@/context/LanguageContext';
import React from 'react'

const CurrenncyT = () => {
    const {t, lang} = useLanguage()
  return (
    <>
     {t("SAR", " ر.س" , lang)} 
    </>
  )
}

export default CurrenncyT
