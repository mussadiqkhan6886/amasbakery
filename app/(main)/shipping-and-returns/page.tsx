"use client";

import React from 'react';
import { useLanguage } from "@/context/LanguageContext";

const ShippingAndReturns = () => {
  const { t, lang } = useLanguage();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800 pt-40">
      <h1 className={`text-4xl font-bold mb-12 border-b pb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
        {t("Delivery, Order & Cancellation Policy", "سياسة التوصيل والطلب والإلغاء", lang)}
      </h1>

      {/* 1. FULL ADVANCE PAYMENT */}
      <section className="mb-12">
        <h2 className={`text-2xl font-semibold mb-4 text-main border-main ${lang === "ar" ? "border-r-4 pr-3 text-right" : "border-l-4 pl-3 text-left"}`}>
          {t("1. Full Advance Payment Policy", "١. سياسة الدفع المسبق الكامل", lang)}
        </h2>
        <div className={`space-y-4 leading-relaxed ${lang === "ar" ? "text-right" : "text-left"}`}>
          <p>
            {t(
              "All orders require 100% advance payment to confirm booking. Production slots are reserved only after payment is received on a first-paid, first-reserved basis.",
              "تتطلب جميع الطلبات دفع كامل المبلغ مقدماً بنسبة ١٠٠٪ لتأكيد الحجز. يتم حجز مواعيد الإنتاج فقط بعد استلام المبلغ بناءً على أسبقية الدفع.",
              lang
            )}
          </p>
          <ul className={`list-disc space-y-2 ${lang === "ar" ? "mr-6 ml-0" : "ml-6 mr-0"}`}>
            <li>
                <strong>{t("Order Notice Requirements:", "متطلبات وقت الطلب:", lang)}</strong> 
                <ul className="mt-2 space-y-1 opacity-90">
                    <li>{t("Signature / Standard Cakes: Minimum 24 hours advance booking", "الكيك الكلاسيكي / المعياري: ٢٤ ساعة كحد أدنى للطلب مسبقاً", lang)}</li>
                    <li>{t("Custom / Tier / Event Cakes: 48–72 hours (depending on complexity)", "كيك التصميم الخاص / الطبقات / المناسبات: ٤٨-٧٢ ساعة (حسب تعقيد التصميم)", lang)}</li>
                </ul>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. CANCELLATION & REFUNDS */}
      <section className="mb-12">
        <h2 className={`text-2xl font-semibold mb-4 text-main border-main ${lang === "ar" ? "border-r-4 pr-3 text-right" : "border-l-4 pl-3 text-left"}`}>
          {t("2. Cancellation & Refunds", "٢. الإلغاء والاسترداد", lang)}
        </h2>
        <div className={`space-y-4 leading-relaxed ${lang === "ar" ? "text-right" : "text-left"}`}>
          <div className="bg-red-50 p-4 border-l-4 border-red-500 rounded">
            <p className="font-bold">
              {t(
                "Due to customized preparation and ingredient sourcing, all confirmed orders are non-refundable. In special cases, order value may be converted into store credit at management discretion.",
                "نظراً للتجهيز المخصص وتوفير المكونات، فإن جميع الطلبات المؤكدة غير قابلة للاسترداد. في حالات خاصة، قد يتم تحويل قيمة الطلب إلى رصيد متجر وفقاً لتقدير الإدارة.",
                lang
              )}
            </p>
          </div>
          <p>
            {t(
              "Changes must be requested before production starts. Once production begins, changes may not be possible, and additional charges may apply for design or flavor upgrades.",
              "يجب طلب التغييرات قبل بدء الإنتاج. بمجرد بدء الإنتاج، قد لا تكون التغييرات ممكنة، وقد تُطبق رسوم إضافية لترقيات التصميم أو النكهة.",
              lang
            )}
          </p>
        </div>
      </section>

      {/* 3. PICKUP & DELIVERY */}
      <section className="mb-12">
        <h2 className={`text-2xl font-semibold mb-4 text-main border-main ${lang === "ar" ? "border-r-4 pr-3 text-right" : "border-l-4 pl-3 text-left"}`}>
          {t("3. Pickup & Delivery", "٣. الاستلام والتوصيل", lang)}
        </h2>
        <div className={`space-y-4 leading-relaxed ${lang === "ar" ? "text-right" : "text-left"}`}>
          <p>
            {t(
              "Orders must be collected at the agreed time. Delivery timing is estimated and may vary due to traffic or weather conditions.",
              "يجب استلام الطلبات في الوقت المتفق عليه. توقيت التوصيل تقديري وقد يختلف بسبب ظروف حركة المرور أو الطقس.",
              lang
            )}
          </p>
          <ul className={`list-disc space-y-2 ${lang === "ar" ? "mr-6 ml-0" : "ml-6 mr-0"}`}>
             <li>
                {t("Ama’s Bakery is not responsible for damage after handover.", "مخبز أما غير مسؤول عن التلف بعد تسليم الطلب.", lang)}
            </li>
            <li>
                <strong>{t("Storage Responsibility:", "مسؤولية التخزين:", lang)}</strong> 
                {t(" Cakes must be stored in refrigeration unless advised otherwise. We are not responsible for quality issues due to improper storage after collection.", " يجب حفظ الكيك في الثلاجة ما لم يُنصح بخلاف ذلك. مخبز أما غير مسؤول عن مشاكل الجودة الناتجة عن التخزين غير السليم بعد الاستلام.", lang)}
            </li>
            <li>
                <strong>{t("Handmade Nature:", "الطبيعة اليدوية:", lang)}</strong> 
                {t(" Slight artistic variation may occur, reflecting the artisanal nature of premium custom baking.", " قد يحدث اختلاف فني طفيف، مما يعكس الطبيعة الحرفية للمخبوزات المخصصة الفاخرة.", lang)}
            </li>
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <div className="mt-16 p-8 bg-pink-50 rounded-2xl text-center border border-pink-100">
        <p className="font-bold text-lg">
            {t("All confirmations and changes must be via official channels", "يجب أن تكون جميع التأكيدات والتغييرات عبر القنوات الرسمية", lang)}
        </p>
        <p className="text-pink-600 font-bold text-xl mt-2" dir="ltr">+966 56 181 2342</p>
        <p className="text-sm text-gray-500 mt-2">Ama's Bakery - Al-Khobar & Dammam</p>
      </div>
    </main>
  );
};

export default ShippingAndReturns;