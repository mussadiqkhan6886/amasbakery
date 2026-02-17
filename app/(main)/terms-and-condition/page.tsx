"use client";

import React from 'react';
import { useLanguage } from "@/context/LanguageContext";

const TermsAndConditions = () => {
  const { t, lang } = useLanguage();

  const sections = [
    {
      title: t("1. Agreement to Terms", "١. الموافقة على الشروط", lang),
      content: t(
        "By accessing our website and placing an order with Ama's Bakery, you agree to be bound by these Terms and Conditions. Please read them carefully before making a purchase.",
        "من خلال الدخول إلى موقعنا وتقديم طلب من مخبز أما (Ama's Bakery)، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل إتمام عملية الشراء.",
        lang
      )
    },
    {
      title: t("2. Product Representation", "٢. عرض المنتجات", lang),
      content: t(
        "All our products are handmade. While we strive for consistency, slight variations in color, design, and decoration may occur. Images on the website are for representation purposes.",
        "جميع منتجاتنا مصنوعة يدويًا. بينما نسعى جاهدين للاتساق، قد تحدث اختلافات طفيفة في اللون والتصميم والزخرفة. الصور الموجودة على الموقع هي لأغراض العرض فقط.",
        lang
      )
    },
    {
      title: t("3. Allergies & Dietary Requirements", "٣. الحساسية والمتطلبات الغذائية", lang),
      content: t(
        "Our products may contain or come into contact with milk, wheat, nuts, or other allergens. It is the customer's responsibility to notify us of any allergies. Ama's Bakery is not liable for allergic reactions.",
        "قد تحتوي منتجاتنا أو تلامس الحليب أو القمح أو المكسرات أو مسببات الحساسية الأخرى. تقع على عاتق العميل مسؤولية إبلاغنا بأي نوع من الحساسية. مخبز أما ليس مسؤولاً عن أي ردود فعل تحسسية.",
        lang
      )
    },
    {
      title: t("4. Pricing & Payment", "٤. التسعير والدفع", lang),
      content: t(
        "Prices are subject to change without notice. Full payment is required via our online payment gateway to confirm your booking. Orders are only processed once payment is verified.",
        "الأسعار قابلة للتغيير دون إشعار مسبق. يلزم دفع المبلغ بالكامل عبر بوابة الدفع الإلكترونية الخاصة بنا لتأكيد حجزك. يتم معالجة الطلبات فقط بمجرد التحقق من الدفع.",
        lang
      )
    },
    {
      title: t("5. Lead Times & Availability", "٥. مهلة الطلب والتوافر", lang),
      content: t(
        "Orders must follow our lead time policy: 24h for Menu, 2 days for Custom/Occasion, and 5 days for Wedding cakes. We reserve the right to decline orders if our daily capacity is reached.",
        "يجب أن تتبع الطلبات سياسة مهلة الطلب الخاصة بنا: ٢٤ ساعة للمنيو، يومين للكيك المخصص/المناسبات، و٥ أيام لكيك الزفاف. نحتفظ بالحق في رفض الطلبات إذا تم الوصول إلى طاقتنا الاستيعابية اليومية.",
        lang
      )
    },
    {
      title: t("6. Liability", "٦. المسؤولية", lang),
      content: t(
        "Once an order is delivered or picked up, Ama's Bakery is no longer responsible for any damage caused by improper handling, storage, or high temperatures.",
        "بمجرد توصيل الطلب أو استلامه، لم يعد مخبز أما مسؤولاً عن أي ضرر ناتج عن سوء المناولة أو التخزين أو درجات الحرارة المرتفعة.",
        lang
      )
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-white bg-main pt-30">
      <h1 className={`text-4xl font-bold mb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
        {t("Terms & Conditions", "الشروط والأحكام", lang)}
      </h1>
      <p className={`mb-12  ${lang === "ar" ? "text-right" : "text-left"}`}>
        {t("Last Updated: February 2026", "آخر تحديث: فبراير ٢٠٢٦", lang)}
      </p>

      <div className="space-y-10">
        {sections.map((section, index) => (
          <div key={index} className={lang === "ar" ? "text-right" : "text-left"}>
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">
              {section.title}
            </h2>
            <p className="leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t pt-8 text-sm  text-center">
        <p>
          {t(
            "These terms are governed by the laws of the Kingdom of Saudi Arabia.",
            "تخضع هذه الشروط لقوانين المملكة العربية السعودية.",
            lang
          )}
        </p>
      </div>
    </main>
  );
};

export default TermsAndConditions;