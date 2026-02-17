"use client";

import React from 'react';
import { useLanguage } from "@/context/LanguageContext";

const PrivacyPolicy = () => {
  const { t, lang } = useLanguage();

  const sections = [
    {
      title: t("1. Information We Collect", "١. المعلومات التي نجمعها", lang),
      content: t(
        "We collect personal information that you provide to us, including your name, phone number, email address, and delivery address. We also collect payment proof images uploaded during the checkout process.",
        "نحن نجمع المعلومات الشخصية التي تقدمها لنا، بما في ذلك اسمك ورقم هاتفك وعنوان بريدك الإلكتروني وعنوان التوصيل. كما نجمع صور إثبات الدفع التي يتم رفعها أثناء عملية الدفع.",
        lang
      )
    },
    {
      title: t("2. How We Use Your Information", "٢. كيف نستخدم معلوماتك", lang),
      content: t(
        "Your information is used specifically to process orders, verify payments, organize deliveries in Al-Khobar and Dammam, and communicate with you regarding your cake designs.",
        "تُستخدم معلوماتك خصيصاً لمعالجة الطلبات، والتحقق من الدفع، وتنظيم التوصيل في الخبر والدمام، والتواصل معك بخصوص تصاميم الكيك الخاصة بك.",
        lang
      )
    },
    {
      title: t("3. Data Storage & Security", "٣. تخزين البيانات وأمنها", lang),
      content: t(
        "We use secure services like Cloudinary to store payment images and MongoDB for order data. We do not store your credit card details directly on our servers.",
        "نحن نستخدم خدمات آمنة مثل (Cloudinary) لتخزين صور الدفع و (MongoDB) لبيانات الطلبات. نحن لا نقوم بتخزين تفاصيل بطاقتك الائتمانية مباشرة على خوادمنا.",
        lang
      )
    },
    {
      title: t("4. Sharing Your Data", "٤. مشاركة بياناتك", lang),
      content: t(
        "Ama's Bakery does not sell or lease your personal data to third parties. Your address and phone number are only shared with our internal delivery team to complete your order.",
        "مخبز أما لا يقوم ببيع أو تأجير بياناتك الشخصية لأطراف ثالثة. يتم مشاركة عنوانك ورقم هاتفك فقط مع فريق التوصيل الداخلي لدينا لإتمام طلبك.",
        lang
      )
    },
    {
      title: t("5. Your Rights", "٥. حقوقك", lang),
      content: t(
        "You have the right to request access to the personal data we hold about you or ask for it to be deleted. To do so, please contact us via our official WhatsApp support.",
        "لديك الحق في طلب الوصول إلى البيانات الشخصية التي نحتفظ بها عنك أو طلب حذفها. للقيام بذلك، يرجى التواصل معنا عبر الدعم الرسمي على الواتساب.",
        lang
      )
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 pt-40 text-gray-800">
      <h1 className={`text-4xl font-bold mb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
        {t("Privacy Policy", "سياسة الخصوصية", lang)}
      </h1>
      <p className={`mb-12 text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
        {t("Last Updated: February 2026", "آخر تحديث: فبراير ٢٠٢٦", lang)}
      </p>

      <div className="space-y-10">
        {sections.map((section, index) => (
          <div key={index} className={lang === "ar" ? "text-right" : "text-left"}>
            <h2 className="text-xl font-bold text-main mb-3 uppercase tracking-tight">
              {section.title}
            </h2>
            <p className="leading-relaxed text-gray-600">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 p-6 rounded-lg text-sm text-gray-500 text-center">
        <p>
          {t(
            "By using our website, you consent to our Privacy Policy in accordance with the laws of Saudi Arabia.",
            "باستخدامك لموقعنا، فإنك توافق على سياسة الخصوصية الخاصة بنا وفقاً لقوانين المملكة العربية السعودية.",
            lang
          )}
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicy;