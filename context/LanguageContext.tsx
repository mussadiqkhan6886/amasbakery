'use client'; 

import React, { createContext, useState, useContext, useEffect } from 'react';

interface ContextType {
    lang: string
    switchLang: (l: string) => void
    t: (en: string, ar:string, lang: string) => string
}

const LanguageContext = createContext<ContextType | null>(null);

export function LanguageProvider({ children }: {children: React.ReactNode}) {
  const [lang, setLang] = useState('en'); 

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved) setLang(saved);
  }, []);

  const switchLang = (l: string) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  function t(en: string, ar: string, lang: string) {
    return lang === 'en' ? en : ar;
    }

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): ContextType {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
} 

