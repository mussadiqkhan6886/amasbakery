'use client';

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import {FiMenu, FiPhoneCall, FiSearch, FiShoppingCart} from "react-icons/fi"
import SIdeBar from "./SIdeBar";
import { usePathname } from "next/navigation";
import SideBarCart from "./SideBarCart";
import { useCart } from "@/context/CartContext";
import Search from "./Search";

export default function Header() {
  const { lang, switchLang } = useLanguage();
    const [showSideBar, setShowSideBar] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const {totalItems} = useCart()
    const headerLinks = [
    { name: lang === 'en' ? 'About' : 'من نحن', link: '/about' },
    { name: lang === 'en' ? 'Menu' : 'قائمة الطعام', link: '/collections/menu' },
    { name: lang === 'en' ? 'Customize Your Cake' : 'خصص كعكتك', link: '/customize-your-cake' },
    { name: lang === 'en' ? 'Occasion Cakes' : 'كعكات المناسبات', link: '/collections/occasion-cakes' },
    { name: lang === 'en' ? 'Wedding Cake' : 'كعكة الزفاف ', link: '/wedding-cake' },
    { name: lang === 'en' ? 'Table Setup' : ' إعداد الجدول ', link: '/table-setup' },
    { name: lang === 'en' ? 'Gifts' : 'الهدايا  ', link: '/collections/gifts' }
  ];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    switchLang(e.target.value)
  }

  const isCollectionPage =
  pathname.includes("/collections/menu") ||
  pathname.includes("/collections/gifts") ||
  pathname.includes("/collections/occasion-cakes") ||
  pathname.includes("/customize-your-cake") || 
  pathname.includes("/cart") ||
  pathname.includes("/wedding-cake") ||
  pathname.includes("/table-setup");

  return (
    <header
  className={`
    ${lang === "ar" ? "rtl" : "ltr"}
   ${isCollectionPage && !open ? "relative w-full mx-auto" : "fixed left-1/2 -translate-x-1/2 w-[95%]"} top-4
     max-w-7xl
    px-6 py-1
    flex items-center justify-between
    rounded-full
    backdrop-blur-md
    bg-white/10
    border border-white/20
  ${pathname.includes("/about") || pathname.includes("/table-setup") || pathname.includes("/collections") || pathname.includes("/collections/gifts") || pathname.includes("/customize-your-cake") || pathname.includes("/add-review") || pathname.includes("/cart") || pathname.includes("/search") || pathname.includes("/privacy-policy") || pathname.includes("/terms-and-condition") || pathname.includes("/wedding-cake") || pathname.includes("/shipping-and-returns") || pathname.includes("/thank-you/") ? "text-black" : "text-zinc-100"}
    z-50
  `}
>
  <Link href="/" className={`flex justify-center`}>
    <Image
      src="/logo.webp"
      alt="header logo image"
      width={90}
      height={90}
      className="object-contain rounded-3xl"
      priority
    />
  </Link>
  
  <nav className="hidden lg:flex gap-6 text-sm">
    {headerLinks.map((link, i) => (
      <Link
        key={i}
        href={link.link}
        className={`${pathname.includes("/about") || pathname.includes("/table-setup") || pathname.includes("/collections/gifts") || pathname.includes("/collections") || pathname.includes("/customize-your-cake") || pathname.includes("/privacy-policy") || pathname.includes("/terms-and-condition") || pathname.includes("/shipping-and-returns") || pathname.includes("/wedding-cake") || pathname.includes("/thank-you/") ? "hover:text-main" : "hover:text-white"} transition duration-300 hover:scale-110 border-b border-transparent hover:border-normal tracking-wider `}
      >
        {link.name}
      </Link>
    ))}
  </nav>

  

  {/* Right Side */}
  <div className="flex items-center gap-4">
    
    <Link aria-label="whatsapp link" target="_blank" href={"https://api.whatsapp.com/send/?phone=966561812342&text&type=phone_number&app_absent=0"} className="bg-green-500/80 hidden lg:block hover:bg-green-500 hover:scale-110 transition p-3 rounded-full backdrop-blur-md">
      <FiPhoneCall name="phonecall whatsapp icon" size={16} />
    </Link>

    <div className="flex items-center gap-3 text-lg">
      <div className="relative">
        <FiShoppingCart
          onClick={() => setOpen(true)}
          className="cursor-pointer hover:scale-110 transition"
          size={20}
        />

        {totalItems > 0 && (
          <span className="absolute -top-3 -right-2 bg-main text-white text-[9px] px-1 py-0.5 rounded-full">
            {totalItems}
          </span>
        )}
      </div>
      <FiSearch onClick={() => setSearchOpen(true)} className="cursor-pointer hover:scale-110 transition" />
        {searchOpen && <Search setSearchOpen={setSearchOpen} />}
    </div>
<nav className="block lg:hidden">
    <FiMenu size={23} onClick={() => setShowSideBar(true)} />
    {showSideBar && <SIdeBar setShowSideBar={setShowSideBar} headerLinks={headerLinks} />}
  </nav>
    
  </div>
      {open && <SideBarCart open={open} onClose={() => setOpen(false)} />}
</header>
  );
}
