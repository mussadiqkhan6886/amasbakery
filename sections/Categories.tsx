'use client';

import CategoriesSwiper from '@/components/customer/CategoriesSwiper'
import CategoryCard from '@/components/customer/CategoryCard'
import ScrollFloat from '@/components/ui/HeadingScroll'
import { useLanguage } from '@/context/LanguageContext';
import { playFair } from '@/lib/fonts';
import React from 'react'

// Cakes
export const cakes = [
  { id: 1, name: { en: "Chocolate Cake", ar: "كيك الشوكولاتة" }, image: "/cake.jpg", price: 20 },
  { id: 2, name: { en: "Vanilla Cake", ar: "كيك الفانيليا" }, image: "/cake.jpg", price: 18 },
  { id: 3, name: { en: "Strawberry Cake", ar: "كيك الفراولة" }, image: "/cake.jpg", price: 22 },
  { id: 4, name: { en: "Red Velvet Cake", ar: "كيك ريد فيلفت" }, image: "/cake.jpg", price: 25 },
  { id: 5, name: { en: "Coffee Cake", ar: "كيك القهوة" }, image: "/cake.jpg", price: 19 },
];


// Pastry
export const pastries = [
  { id: 1, name: { en: "Croissant", ar: "كرواسون" }, image: "/pastry.jpg", price: 5 },
  { id: 2, name: { en: "Danish Pastry", ar: "معجنات دنماركية" }, image: "/pastry.jpg", price: 6 },
  { id: 3, name: { en: "Chocolate Pastry", ar: "معجنات الشوكولاتة" }, image: "/pastry.jpg", price: 7 },
  { id: 4, name: { en: "Almond Pastry", ar: "معجنات اللوز" }, image: "/pastry.jpg", price: 6 },
  { id: 5, name: { en: "Fruit Pastry", ar: "معجنات الفواكه" }, image: "/pastry.jpg", price: 6 },
];


// Dates
export const dates = [
  { id: 1, name: { en: "Medjool Dates", ar: "تمر مجدول" }, image: "/dates.jpg", price: 10 },
  { id: 2, name: { en: "Deglet Noor", ar: "تمر دقلة نور" }, image: "/dates.jpg", price: 8 },
  { id: 3, name: { en: "Ajwa Dates", ar: "تمر عجوة" }, image: "/dates.jpg", price: 12 },
  { id: 4, name: { en: "Khadrawy Dates", ar: "تمر خضراوي" }, image: "/dates.jpg", price: 9 },
  { id: 5, name: { en: "Zahidi Dates", ar: "تمر زهدي" }, image: "/dates.jpg", price: 7 },
];
;

// Cookies
export const cookies = [
  { id: 1, name: { en: "Chocolate Chip", ar: "كوكيز برقائق الشوكولاتة" }, image: "/cookies.jpg", price: 3 },
  { id: 2, name: { en: "Oatmeal Raisin", ar: "كوكيز الشوفان والزبيب" }, image: "/cookies.jpg", price: 3 },
  { id: 3, name: { en: "Peanut Butter", ar: "كوكيز زبدة الفول السوداني" }, image: "/cookies.jpg", price: 4 },
  { id: 4, name: { en: "Sugar Cookie", ar: "كوكيز السكر" }, image: "/cookies.jpg", price: 3 },
  { id: 5, name: { en: "Snickerdoodle", ar: "سنيكردودل" }, image: "/cookies.jpg", price: 4 },
];


// Brownies
export const brownies = [
  { id: 1, name: { en: "Fudge Brownie", ar: "براوني فادج" }, image: "/brownie.jpg", price: 5 },
  { id: 2, name: { en: "Walnut Brownie", ar: "براوني بالجوز" }, image: "/brownie.jpg", price: 6 },
  { id: 3, name: { en: "Caramel Brownie", ar: "براوني بالكراميل" }, image: "/brownie.jpg", price: 6 },
  { id: 4, name: { en: "Chocolate Chip Brownie", ar: "براوني برقائق الشوكولاتة" }, image: "/brownie.jpg", price: 5 },
  { id: 5, name: { en: "Mint Brownie", ar: "براوني بالنعناع" }, image: "/brownie.jpg", price: 6 },
];


export const pastries2 = [
  { id: 1, name: { en: "Cheese Danish", ar: "دانش بالجبن" }, image: "/cupcake.jpg", price: 6 },
  { id: 2, name: { en: "Apple Turnover", ar: "فطيرة التفاح" }, image: "/cupcake.jpg", price: 5 },
  { id: 3, name: { en: "Pecan Twist", ar: "لفائف البيكان" }, image: "/cupcake.jpg", price: 7 },
  { id: 4, name: { en: "Chocolate Croissant", ar: "كرواسون بالشوكولاتة" }, image: "/cupcake.jpg", price: 6 },
  { id: 5, name: { en: "Berry Danish", ar: "دانش بالتوت" }, image: "/cupcake.jpg", price: 6 },
];



const Categories = () => {
  const {t, lang} = useLanguage()
  return (
    <section className='my-20 max-w-8xl mx-auto'>
       {lang === "en" ? <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
        >
        Menu
        </ScrollFloat> : <h3 className={`${playFair.className} text-center mt-30 text-4xl md:text-5xl my-15`}>قائمة طعام</h3>
        }
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-7xl mx-auto place-items-center'>
            <CategoryCard delay={2000} header={t("Cake", "كعكة", lang)} link='/' data={cakes} />
            <CategoryCard delay={2000} header={t('Cupcake', "كب كيك", lang)} link='/' data={pastries2} />
            <CategoryCard delay={2200} header={t("Pastry", "معجنات", lang)} link='/' data={pastries} />
            <CategoryCard delay={2100} header={t("Dates","بلح" ,lang)} link='/' data={dates} />
            <CategoryCard delay={2400} header={t("Brownies", "الكعك" ,lang)} link='/' data={brownies} />
            <CategoryCard delay={2400} header={t("Cookies", "ملفات تعريف الارتباط" ,lang)} link='/' data={cookies} />
        </div>
    </section>
  )
}

export default Categories
