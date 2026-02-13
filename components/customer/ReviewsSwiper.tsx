'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const ReviewsSlider = ({ data }: { data: any }) => {
  const { t, lang } = useLanguage();

  if (!data || data.length === 0) return null;

  return (
    <section className="w-full mt-10 max-w-6xl mx-auto overflow-x-auto scroll-smooth snap-x flex gap-6 py-4">
      {data.map((item: any) => (
        <div
          key={item.id}
          className="snap-start flex-shrink-0 w-[300px] md:w-[370px] bg-main/80 text-light p-8 rounded-2xl flex flex-col justify-between h-72"
        >
          <p className="text-lg italic text-center leading-relaxed mb-6">
            “{t(item.review.en, item.review.ar, lang)}”
          </p>
          <h4 className="text-xl font-semibold tracking-wide mt-auto">
            — {t(item.name.en, item.name.ar, lang)}
          </h4>
        </div>
      ))}
    </section>
  );
};

export default ReviewsSlider;
