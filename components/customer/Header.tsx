'use client';

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import {FiMenu, FiPhoneCall, FiSearch, FiShoppingCart} from "react-icons/fi"
import SIdeBar from "./SIdeBar";
import { usePathname } from "next/navigation";

export default function Header() {
  const { lang, switchLang } = useLanguage();
    const [showSideBar, setShowSideBar] = useState(false)
    const pathname = usePathname()

    const headerLinks = [
    { name: lang === 'en' ? 'About' : 'من نحن', link: '/about' },
    { name: lang === 'en' ? 'Menu' : 'قائمة الطعام', link: '/collections/menu' },
    { name: lang === 'en' ? 'Customize Your Cake' : 'خصص كعكتك', link: '/customize-your-cake' },
    { name: lang === 'en' ? 'Occasion Cakes' : 'كعكات المناسبات', link: '/collections/occasion-cakes' }
  ];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    switchLang(e.target.value)
  }

  return (
    <header
  className={`
    ${lang === "ar" ? "rtl" : "ltr"}
  ${pathname.includes("/collections/all") || pathname.includes("/collections/occasion-cakes") ? "relative" : "fixed"} top-4 left-1/2 -translate-x-1/2
    w-[95%] max-w-7xl
    px-6 py-1
    flex items-center justify-between
    rounded-full
    backdrop-blur-md
    bg-white/10
    border border-white/20
  ${pathname.includes("/about") || pathname.includes("/collections") || pathname.includes("/customize-your-cake") ? "text-black" : "text-zinc-100"}
    z-50
  `}
>
  <nav className="hidden lg:flex gap-6 text-sm font-medium">
    {headerLinks.map((link, i) => (
      <Link
        key={i}
        href={link.link}
        className={`${pathname.includes("/about") || pathname.includes("/collections") || pathname.includes("/customize-your-cake") ? "hover:text-main" : "hover:text-white"} transition duration-300 hover:scale-110 border-b border-transparent hover:border-normal font-light tracking-wider`}
      >
        {link.name}
      </Link>
    ))}
  </nav>

  <nav className="block lg:hidden">
    <FiMenu size={23} onClick={() => setShowSideBar(true)} />
    {showSideBar && <SIdeBar setShowSideBar={setShowSideBar} headerLinks={headerLinks} />}
  </nav>

  {/* Logo */}
  <div className={`${lang === "en" ? "lg:mr-35" : "lg:ml-50"} flex justify-center`}>
    <Image
      src="/logo.png"
      alt="header logo image"
      width={90}
      height={90}
      className="object-contain rounded-lg"
    />
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-4">
    <button className="bg-green-500/80 hidden lg:block hover:bg-green-500 hover:scale-110 transition p-3 rounded-full backdrop-blur-md">
      <FiPhoneCall size={16} />
    </button>

    <div className="flex items-center gap-3 text-lg">
      <FiShoppingCart className="cursor-pointer hover:scale-110 transition" />
      <FiSearch className="cursor-pointer hover:scale-110 transition" />
    </div>

    <select
      onChange={handleChange}
      value={lang}
      className="bg-transparent hidden lg:block border border-white/20 rounded-md px-2 py-1 text-sm focus:outline-none"
    >
      <option value="en" className="text-black">EN</option>
      <option value="ar" className="text-black">AR</option>
    </select>
  </div>
</header>
  );
}
