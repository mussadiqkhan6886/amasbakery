'use client';

import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { playFair } from '@/lib/fonts';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

interface SwiperCardProps {
  data: { id: number; name: {en: string, ar: string}; image: string; price: {[key: string]: number}, basePrice: {[key:string]: number}, slug:string }[];
  delay: number
}

const SwiperCard: React.FC<SwiperCardProps> = ({ data , delay}) => {
  const {t, lang} = useLanguage()
  
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={2}
      autoplay={{
        delay: delay,           // no pause
        disableOnInteraction: false,
      }}
      speed={2500}          // controls smoothness
      loop={true}
      className="z-50 w-full"
    >
      {data.map((item) => {
        const priceObj = item.price || item.basePrice; 
        const firstKey = priceObj ? Object.keys(priceObj)[0] : null;
        const firstValue = firstKey && priceObj ? priceObj[firstKey] : null;

        return (
          <SwiperSlide key={item.id}>
            <Link href={`/collections/menu/${item.slug}`} className="flex flex-col z-40  items-center p-4">
              <div className="w-32 h-34 relative mb-2">
                <Image src={item.image} alt={item.name.en} fill className="object-cover rounded-lg" />
              </div>
              <h5 className={`${playFair.className} text-nowrap text-lg`}>{t(item.name.en, item.name.ar, lang)}</h5>
              <h6 className="text-sm">
                {firstKey && firstValue !== null ? `${firstValue} ${t("SAR", " ر.س", lang)}` : ""}
              </h6>
            </Link>
          </SwiperSlide>
        )})}
      </Swiper>
  );
};

export default SwiperCard;
