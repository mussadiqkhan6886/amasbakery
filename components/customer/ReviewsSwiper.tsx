'use client';

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useLanguage } from '@/context/LanguageContext';

const ReviewsSwiper = ({data}: {data:any}) => {
    const {t, lang} = useLanguage()
  return (
    <Swiper
        slidesPerView={1}
        spaceBetween={20}
        className="w-full mt-10 max-w-6xl mx-auto"
        breakpoints={
            {
                680: {slidesPerView: 1},
                880: {slidesPerView: 2}

            }
        }
      >
        {data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className="bg-main/80 text-light p-10 rounded-2xl text-center h-62">
              <p className="text-lg italic leading-relaxed mb-6">
                “{t(item.review.en, item.review.ar, lang)}”
              </p>
              <h4 className="text-xl font-semibold tracking-wide">
                — {t(item.name.en, item.name.ar, lang)}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  )
}

export default ReviewsSwiper
