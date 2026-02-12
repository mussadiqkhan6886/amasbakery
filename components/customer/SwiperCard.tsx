'use client';

import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { playFair } from '@/lib/fonts';
import { useLanguage } from '@/context/LanguageContext';

interface SwiperCardProps {
  data: { id: number; name: {en: string, ar: string}; image: string; price: number }[];
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
      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="flex flex-col z-40  items-center p-4">
            <div className="w-32 h-32 relative mb-2">
              <Image src={item.image} alt={item.name.en} fill className="object-cover rounded-lg" />
            </div>
            <h5 className={`${playFair.className} text-nowrap text-lg`}>{t(item.name.en, item.name.ar, lang)}</h5>
            <h6 className="text-sm">{item.price} {t("SAR", " ر.س", lang)}</h6>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCard;
