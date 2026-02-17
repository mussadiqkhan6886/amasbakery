"use client";

import React from 'react';
import { useLanguage } from "@/context/LanguageContext";

const ShippingAndReturns = () => {
  const { t, lang } = useLanguage();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800 pt-40">
      <h1 className={`text-4xl font-bold mb-12 border-b pb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
        {t("Shipping & Returns", "الشحن والاسترجاع", lang)}
      </h1>

      {/* 1. DELIVERY & PICKUP */}
      <section className="mb-12">
        <h2 className={`text-2xl font-semibold mb-4 text-main border-main ${lang === "ar" ? "border-r-4 pr-3 text-right" : "border-l-4 pl-3 text-left"}`}>
          {t("1. Delivery & Pickup", "١. التوصيل والاستلام", lang)}
        </h2>
        <div className={`space-y-4 leading-relaxed ${lang === "ar" ? "text-right" : "text-left"}`}>
          <p>
            {t(
              "We currently offer delivery services exclusively within Al-Khobar and Dammam. You can also choose to pick up your order directly from our bakery.",
              "نحن نقدم خدمات التوصيل حصرياً داخل منطقتي الخبر والدمام. يمكنك أيضاً اختيار استلام طلبك مباشرة من المخبز.",
              lang
            )}
          </p>
          <ul className={`list-disc space-y-2 ${lang === "ar" ? "mr-6 ml-0" : "ml-6 mr-0"}`}>
            <li>
                <strong>{t("Lead Times:", "مدة الطلب مسبقاً:", lang)}</strong> 
                <ul className="mt-2 space-y-1 opacity-90">
                    <li>{t("Menu Items: 24 Hours", "منتجات القائمة: ٢٤ ساعة", lang)}</li>
                    <li>{t("Customize Cakes: 3 Days", "كيكات المناسبات والكيك المخصص: يومين", lang)}</li>
                    <li>{t("Wedding Cakes: 5 Days", "كيكات الزفاف: ٥ أيام", lang)}</li>
                </ul>
            </li>
            <li className="mt-4">
                <strong>{t("Rescheduling:", "تغيير الموعد:", lang)}</strong> 
                {t(" You may request to change your delivery or pickup time. Please contact us as early as possible to accommodate your request.", " يمكنك طلب تغيير وقت التوصيل أو الاستلام. يرجى التواصل معنا في أقرب وقت ممكن لتلبية طلبك.", lang)}
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
                "No refunds will be issued once the preparation or design work for your order has started.",
                "لا يحق للعميل استرداد المبلغ بمجرد البدء في تجهيز الطلب أو العمل على التصميم الخاص به.",
                lang
              )}
            </p>
          </div>
          <p>
            {t(
              "Due to the perishable nature of our bakery products, we do not accept returns or exchanges after the order has been picked up or delivered.",
              "نظراً لأن منتجاتنا غذائية وقابلة للتلف، فنحن لا نقبل الاستبدال أو الاسترجاع بعد استلام الطلب أو توصيله.",
              lang
            )}
          </p>
        </div>
      </section>

      {/* 3. QUALITY ASSURANCE */}
      <section className="mb-12">
        <h2 className={`text-2xl font-semibold mb-4 text-main border-main ${lang === "ar" ? "border-r-4 pr-3 text-right" : "border-l-4 pl-3 text-left"}`}>
          {t("3. Quality Assurance", "٣. ضمان الجودة", lang)}
        </h2>
        <p className={`${lang === "ar" ? "text-right" : "text-left"}`}>
          {t(
            "Please inspect your order at the time of delivery or pickup. If there is any issue with the order, it must be reported immediately to our team to find a resolution.",
            "يرجى فحص الطلب وقت الاستلام أو التوصيل. في حال وجود أي مشكلة في الطلب، يجب إبلاغ فريقنا فوراً لإيجاد حل.",
            lang
          )}
        </p>
      </section>

      {/* CONTACT */}
      <div className="mt-16 p-8 bg-pink-50 rounded-2xl text-center">
        <p className="font-bold text-lg">
            {t("Questions? Contact us via WhatsApp", "لديك أسئلة؟ تواصل معنا عبر الواتساب", lang)}
        </p>
        <p className="text-pink-600 font-bold text-xl mt-2" dir="ltr">+966 58 352 2616</p>
        <p className="text-sm text-gray-500 mt-2">Ama's Bakery - Al-Khobar & Dammam</p>
      </div>
    </main>
  );
};

export default ShippingAndReturns;