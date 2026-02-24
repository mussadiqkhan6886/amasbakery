"use client";

import React, { useEffect, useState } from 'react';
import { playFair } from "@/lib/fonts";
import { useLanguage } from "@/context/LanguageContext";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import axios from "axios";
import Image from "next/image";

interface GalleryImage {
  _id: string;
  imageUrl: string;
  title?: string;
}

const WeddingCakeOrder = () => {
  const { t, lang } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("/api/wedding");
        if (res.data.success) setImages(res.data.data);
      } catch (error) {
        console.error("Gallery fetch error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const whatsappNumber = "+966 56 181 2342"; // Replace with client number
  const instagramUser = "https://www.instagram.com/amassbakery/?__pwa=1"; // Replace with client insta

  return (
    <main className={`min-h-screen pt-30 pb-20 ${lang === 'ar' ? 'text-right' : 'text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 text-center mb-16">
        <h1 className={`${playFair.className} text-5xl md:text-7xl text-main mb-6`}>
          {t("Wedding Cakes", "كيكات الزفاف", lang)}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          {t(
            "Turning your dream wedding into a sweet reality. Each cake is a masterpiece handcrafted with love, elegance, and the finest ingredients.",
            "نحول زفاف أحلامك إلى حقيقة حلوة. كل كيكة هي تحفة فنية صنعت يدوياً بكل حب وأناقة وبأجود المكونات.",
            lang
          )}
        </p>
        
        {/* Contact Actions */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a 
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            className="flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:scale-105"
          >
            <FaWhatsapp size={24} />
            {t("Book via WhatsApp", "احجز عبر الواتساب", lang)}
          </a>
          <a 
            href={`https://instagram.com/${instagramUser}`}
            target="_blank"
            className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all shadow-lg hover:scale-105"
          >
            <FaInstagram size={24} />
            {t("View Instagram", "شاهد الإنستقرام", lang)}
          </a>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className={`${playFair.className} text-3xl text-center mb-10 text-gray-800 underline decoration-pink-200 underline-offset-8`}>
          {t("Our Wedding Gallery", "معرض حفلات الزفاف", lang)}
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img) => (
              <div key={img._id} className="relative group overflow-hidden rounded-2xl break-inside-avoid shadow-sm border border-gray-100">
                <img 
                  src={img.imageUrl} 
                  alt="Wedding Cake" 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-medium">{img.title || ""}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && images.length === 0 && (
          <p className="text-center text-gray-400 mt-20">{t("No images in gallery yet.", "لا يوجد صور في المعرض حالياً.", lang)}</p>
        )}
      </section>

      {/* Inquiry Note */}
      <section className="mt-20 bg-pink-50 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className={`${playFair.className} text-2xl text-main mb-4`}>
            {t("Consultation & Tasting", "الاستشارة والتذوق", lang)}
          </h3>
          <p className="text-gray-600">
            {t(
              "For wedding cakes, we recommend booking at least 5 days in advance. Contact us to schedule a design consultation.",
              "بالنسبة لكيكات الزفاف، ننصح بالحجز قبل شهر على الأقل. تواصلوا معنا لتحديد موعد لاستشارة التصميم.",
              lang
            )}
          </p>
        </div>
      </section>
    </main>
  );
};

export default WeddingCakeOrder;