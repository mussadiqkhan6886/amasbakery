'use client';

import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { playFair } from '@/lib/fonts';

interface SwiperCardProps {
  data: { id: number; name: string; image: string; price: number }[];
  delay: number
}

const SwiperCard: React.FC<SwiperCardProps> = ({ data , delay}) => {
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
      className='bg-main p-2 shadow-inner'
    >
      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="flex flex-col items-center p-4">
            <div className="w-32 h-32 relative mb-2">
              <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg" />
            </div>
            <h5 className={`${playFair.className} text-lg`}>{item.name}</h5>
            <h6 className="">{item.price} SAR</h6>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCard;
