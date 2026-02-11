'use client';

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import {FiPhoneCall, FiSearch, FiShoppingCart} from "react-icons/fi"

export default function Header() {
  const { lang, switchLang } = useLanguage();

  const headerLinks = [
    { name: lang === 'en' ? 'About' : 'من نحن', link: '/about' },
    { name: lang === 'en' ? 'Menu' : 'قائمة الطعام', link: '/collections/all' },
    { name: lang === 'en' ? 'Customize Your Cake' : 'خصص كعكتك', link: '/collections/customize-your-cake' },
    { name: lang === 'en' ? 'Occasion Cakes' : 'كعكات المناسبات', link: '/collections/occasion-cakes' }
  ];

  return (
    <header className={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div>
            <nav>
                {headerLinks.map((link, i) => (
                <Link key={i} href={link.link}>{link.name}</Link>
                ))}
            </nav>
        </div>
        <div>
                <Image src="/logo.png" alt="header logo image" width={100} height={100} />
        </div>
        <div>
            <div>
                <FiPhoneCall />
            </div>
            <div>
                <FiShoppingCart />
                <FiSearch />
            </div>
            <div>
                <select value="en">
                    <option value="en">ENGLISH</option>
                    <option value="ar">العربية</option>
                </select>
            </div>
        </div>
    </header>
  );
}
