'use client';

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent } from "react";
import {FiPhoneCall, FiSearch, FiShoppingCart} from "react-icons/fi"

export default function Header() {
  const { lang, switchLang } = useLanguage();

  const headerLinks = [
    { name: lang === 'en' ? 'About' : 'من نحن', link: '/about' },
    { name: lang === 'en' ? 'Menu' : 'قائمة الطعام', link: '/collections/all' },
    { name: lang === 'en' ? 'Customize Your Cake' : 'خصص كعكتك', link: '/collections/customize-your-cake' },
    { name: lang === 'en' ? 'Occasion Cakes' : 'كعكات المناسبات', link: '/collections/occasion-cakes' }
  ];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    switchLang(e.target.value)
  }

  return (
    <header className={`${lang === 'ar' ? 'rtl' : 'ltr'} p-2  m-5 backdrop-blur-sm rounded-md border border-white/50 flex justify-between gap-2`}>
        <div>
            <nav className="flex gap-5">
                {headerLinks.map((link, i) => (
                <Link key={i} href={link.link}>{link.name}</Link>
                ))}
            </nav>
        </div>
        <div>
            <Image src="/logo.png" alt="header logo image" width={100} height={100} />
        </div>
        <div className="flex gap-3">
            <div>
                <FiPhoneCall />
            </div>
            <div className="flex gap-2">
                <FiShoppingCart />
                <FiSearch />
            </div>
            <div>
                <select onChange={handleChange} value={lang}>
                    <option  value="en">ENGLISH</option>
                    <option  value="ar">العربية</option>
                </select>
            </div>
        </div>
    </header>
  );
}
