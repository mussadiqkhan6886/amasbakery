'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { ReviewType } from '@/type';

const ReviewsSlider = ({ data }: { data: ReviewType[] }) => {
  const { t, lang } = useLanguage();

  if (!data || data.length === 0) return (<section>
    <h4>{t("No Reviews yet", "لا توجد تعليقات حتى الآن", lang)}</h4>
  </section>)

  return (
    <>
    <section className="w-full thin-scrollbar mt-10 max-w-6xl mx-auto overflow-x-auto scroll-smooth snap-x flex gap-6 py-4">
      {data.map((item: ReviewType) => (
        <div
          key={item._id}
          className="snap-start flex-shrink-0 w-[300px] md:w-[370px] bg-main/80 text-light p-8 rounded-2xl flex flex-col justify-between h-72"
        >
          <p className="text-lg italic text-center leading-relaxed mb-6">
            “{t(item.message.en, item.message.ar, lang)}”
          </p>
          <h4 className="text-xl font-semibold tracking-wide mt-auto">
            — {t(item.name.en, item.name.ar, lang)}
          </h4>
        </div>
      ))}
    </section>
    <Link className="mt-7 text-sm border border-light px-2 py-1.5 text-center block" href="/add-review">{t("Add Review","أضف مراجعة" ,lang)}</Link>
    </>
    
  );
};

export default ReviewsSlider;
