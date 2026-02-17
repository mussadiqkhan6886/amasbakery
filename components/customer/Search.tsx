'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

const Search = ({setSearchOpen}: {setSearchOpen: (o: boolean) => void}) => {
    
      const [query, setQuery] = useState("")
      const router = useRouter()
      const {t, lang} = useLanguage()
    
        const handleSearch = (e: React.FormEvent) => {
          e.preventDefault();
          if (!query.trim()) return;
          setSearchOpen(false)
          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        };
  return (
    <>
    <div onClick={() => setSearchOpen(false)} className='h-screen fixed inset-0 bg-black/30 w-full' />
        <div className='fixed inset-0'>
        <div className='bg-white text-black px-2 flex justify-center items-center gap-4 py-3'>
        <form onSubmit={handleSearch} className='flex items-center justify-between px-4 max-w-xl mx-auto w-full bg-white border border-main'>
            <input value={query} onChange={e => setQuery(e.target.value)}  className='w-full py-2 pr-3 outline-none ' placeholder={t("Search...", "يبحث...", lang)} type='text' />
            <button type='submit'><FiSearch className='cursor-pointer' /></button>
        </form>
        <FiX onClick={() => setSearchOpen(false)} />
        </div>
        </div>
    </>
  )
}

export default Search
