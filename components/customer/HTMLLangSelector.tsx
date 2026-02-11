'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

export default function HtmlLangSetter() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang; // <html lang="en" or "ar">
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; // RTL or LTR
  }, [lang]);

  return null; // does not render anything
}
