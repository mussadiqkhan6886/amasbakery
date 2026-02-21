"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";
import { FiCheckCircle, FiClock, FiSmartphone } from 'react-icons/fi';

const ThankYou = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { t, lang } = useLanguage();

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <FiCheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("Thank You for Your Order!", "شكراً لطلبك!", lang)}
        </h1>
        
        <p className="text-lg text-gray-600 mb-2">
          {t("Your order has been received and is being processed.", "تم استلام طلبك وجاري معالجته الآن.", lang)}
        </p>

        <div className="inline-block bg-pink-50 px-6 py-2 rounded-full border border-pink-100 mb-12">
          <p className="text-pink-700 font-medium">
            {t("Order ID:", "رقم الطلب:", lang)} <span className="font-bold">#{id.slice(-8).toUpperCase()}</span>
          </p>
        </div>

        {/* Next Steps Grid */}
        <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
          <div className={`p-6 border border-gray-100 rounded-2xl shadow-sm ${lang === "ar" ? "text-right" : "text-left"}`}>
            <div className="flex items-center gap-3 mb-3">
              <FiClock className="w-5 h-5 text-main" />
              <h3 className="font-bold text-gray-800">{t("Production Slot", "موعد الإنتاج", lang)}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t(
                "Your slot is now reserved. We will verify your payment proof shortly to begin handcrafting your cake.",
                "تم حجز موعدك الآن. سنتحقق من إثبات الدفع قريباً للبدء في تجهيز كيكتك يدوياً.",
                lang
              )}
            </p>
          </div>

          <div className={`p-6 border border-gray-100 rounded-2xl shadow-sm ${lang === "ar" ? "text-right" : "text-left"}`}>
            <div className="flex items-center gap-3 mb-3">
              <FiSmartphone className="w-5 h-5 text-main" />
              <h3 className="font-bold text-gray-800">{t("Stay Connected", "ابقَ على تواصل", lang)}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t(
                "We will contact you via WhatsApp if we need to discuss design details or confirm delivery timing.",
                "سنتواصل معك عبر الواتساب في حال حاجتنا لمناقشة تفاصيل التصميم أو تأكيد توقيت التوصيل.",
                lang
              )}
            </p>
          </div>
        </div>

        {/* Important Reminder Section */}
        <div className="bg-zinc-50 rounded-2xl p-8 mb-12 border border-zinc-200">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
            {t("Important Reminders", "تنبيهات هامة", lang)}
          </h3>
          <ul className={`space-y-3 text-sm text-gray-700 ${lang === "ar" ? "text-right" : "text-left"}`}>
            <li className="flex items-start gap-2">
              <span className="text-main">•</span>
              {t("Cakes must be refrigerated immediately upon arrival.", "يجب حفظ الكيك في الثلاجة فور استلامه.", lang)}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-main">•</span>
              {t("All sales are final as items are custom-made for you.", "جميع المبيعات نهائية حيث أن المنتجات تصنع خصيصاً لك.", lang)}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-main">•</span>
              {t("Delivery times are estimated based on traffic/weather.", "أوقات التوصيل تقديرية بناءً على حركة المرور والطقس.", lang)}
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition"
          >
            {t("Return Home", "العودة للرئيسية", lang)}
          </Link>
          <Link
            href="https://wa.me/966561812342" 
            target="_blank"
            className="px-8 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition"
          >
            {t("Contact Support", "تواصل مع الدعم", lang)}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;