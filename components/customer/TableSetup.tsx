'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import TabelForm from './TabelForm';
import Image from 'next/image';
import { playFair } from '@/lib/fonts';

type ImgType = {
    _id: string
    imageUrl: string
}
const TableSetup = () => {
  const { t, lang } = useLanguage();
  const [images, setImages] = useState<ImgType[]>([]);
  const isRtl = lang === 'ar';
  const [loadingImages, setLoadingImages] = useState(false)

  const fetchImages = async () => {
      try {
        const res = await fetch('/api/table-images');
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to fetch images");
      } finally {
        setLoadingImages(false);
      }
    };
  
    useEffect(() => {
      fetchImages();
    }, []);

  return (
    <section className={`max-w-6xl mx-auto px-6 ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <h1 className={`${playFair.className} text-3xl text-center mb-8 text-gray-800`}>
        {t("Table Setup", "تنسيق الطاولات", lang)}
      </h1>
      <p className="text-center text-zinc-700">{t("Elevate your special occasions with our bespoke table setup service. From intimate gatherings to grand celebrations, we blend elegant themes with our signature desserts to create unforgettable moments tailored to your vision.", "ارتقِ بمناسباتك الخاصة مع خدمة تنسيق الطاولات المخصصة لدينا. من التجمعات العائلية البسيطة إلى الاحتفالات الكبرى، نمزج بين التنسيقات الأنيقة وحلوياتنا المميزة لنخلق لك لحظات لا تُنسى مصممة خصيصاً لتناسب رؤيتك.", lang)}</p>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12">
        {images.map((img: ImgType) => (
          <div key={img._id} className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image src={img.imageUrl} alt="Setup Preview" fill className="object-cover hover:scale-105 transition" />
          </div>
        ))}
        {images.length <= 0 && <p className='h-20 bg-zinc-200 text-zinc-500 flex items-center justify-center font-semibold text-center w-full col-span-3'>No Images</p>}
      </div>

      <TabelForm />
    </section>
  );
};

export default TableSetup;