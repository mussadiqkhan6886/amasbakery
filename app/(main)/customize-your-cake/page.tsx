'use client';

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { playFair } from "@/lib/fonts";

export default function CustomizeCakePage() {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  return (
    <main
      className={`min-h-screen pt-50 pb-20 px-4 ${
        lang === "ar" ? "rtl text-right" : "ltr text-left"
      }`}
    >
      <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE - IMAGE + INFO */}
        <div className="space-y-6">
          <div className="relative">
            <Image
              src="/customizePage.webp"
              alt="Customize Cake"
              width={500}
              height={500}
              className="object-cover object-center h-full rounded-full"
            />
          </div>

          <div className="space-y-4">
            <h1 className={`${playFair.className} text-4xl font-semibold text-main`}>
              {t("Customize Your Cake", "صمّم كيكك الخاص", lang)}
            </h1>

            <p className="text-black text-sm leading-relaxed">
              {t(
                "Whether it's a birthday, wedding, celebration or surprise — Amas Bakery will craft your dream cake with precision and elegance.",
                "سواء كان عيد ميلاد أو زفاف أو مناسبة خاصة — تقوم أماس بيكري بصناعة كيك أحلامك بدقة وأناقة.",
                lang
              )}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className=" p-5">
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >

              {/* Full Name */}
              <div>
                <label className="block mb-2 text-sm">
                  {t("Full Name", "الاسم الكامل", lang)} *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-main"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm">
                  {t("Email", "البريد الإلكتروني", lang)} *
                </label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-main"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm">
                  {t("Contact Number", "رقم التواصل", lang)} *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-main"
                />
              </div>

              {/* Cake Size */}
              <div>
                <label className="block mb-2 text-sm">
                  {t("Cake Size", "حجم الكيك", lang)} *
                </label>
                <select
                  required
                  className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-main"
                >
                  <option value="">{t("Select size", "اختر الحجم", lang)}</option>
                  <option>6 inch (6-8 servings)</option>
                  <option>8 inch (12-14 servings)</option>
                  <option>10 inch (16-20 servings)</option>
                  <option>Two Tier Cake</option>
                  <option>Three Tier Cake</option>
                </select>
              </div>

              {/* Tier Cake Size */}
<div>
  <label className="block mb-2 text-sm">
    {t("Tier Cake Size", "حجم الكيك متعدد الطبقات", lang)} *
  </label>
  <select
    required
    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-main"
  >
    <option value="">
      {t("Select tier size", "اختر حجم الطبقات", lang)}
    </option>
    <option>Two Tier (6 + 8 inch)</option>
    <option>Two Tier (8 + 10 inch)</option>
    <option>Three Tier (6 + 8 + 10 inch)</option>
    <option>Custom Tier Size</option>
  </select>
</div>

{/* Cake Flavor Top Tier */}
<div>
  <label className="block mb-2 text-sm">
    {t("Cake Flavor (Top Tier)", "نكهة الطبقة العلوية", lang)} *
  </label>
  <select
    required
    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-main"
  >
    <option value="">
      {t("Select flavor", "اختر النكهة", lang)}
    </option>
    <option>Vanilla</option>
    <option>Chocolate</option>
    <option>Red Velvet</option>
    <option>Lotus</option>
    <option>Pistachio</option>
  </select>
</div>

{/* Cake Flavor Bottom Tier */}
<div>
  <label className="block mb-2 text-sm">
    {t("Cake Flavor (Bottom Tier)", "نكهة الطبقة السفلية", lang)}
  </label>
  <select
    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-main"
  >
    <option value="">
      {t("Select flavor", "اختر النكهة", lang)}
    </option>
    <option>Vanilla</option>
    <option>Chocolate</option>
    <option>Red Velvet</option>
    <option>Lotus</option>
    <option>Pistachio</option>
  </select>
</div>

{/* Add Personalized Message */}
<div>
  <label className="block mb-2 text-sm">
    {t("Add Personalized Message", "إضافة رسالة مخصصة", lang)} *
  </label>
  <select
    required
    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-main"
  >
    <option value="">
    {t("Select option", "اختر خيار", lang)}
    </option>
    <option value="board">
    {t("On the Board", "على اللوحة", lang)}
    </option>
    <option value="plaque">
    {t("On the Plaque", "على اللوحة التذكارية", lang)}
    </option>
    <option value="no">
    {t("No Message", "بدون رسالة", lang)}
    </option>
  </select>
</div>

{/* Message Field */}
<div>
  <label className="block mb-2 text-sm">
    {t("Message", "الرسالة", lang)}
  </label>
  <input
    type="text"
    placeholder={t(
      "Please type your message",
      "يرجى كتابة رسالتك",
      lang
    )}
    maxLength={40}
    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-main"
  />
</div>

{/* Special Instructions */}
<div>
  <label className="block mb-2 text-sm">
    {t("Special Instructions", "تعليمات خاصة", lang)}
  </label>
  <textarea
    rows={4}
    placeholder={t(
      "Any additional details about design, theme, allergies, etc.",
      "أي تفاصيل إضافية حول التصميم أو المناسبة أو الحساسية وغيرها",
      lang
    )}
    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-main resize-none"
  />
</div>

              {/* Date */}
              <div>
                <label className="block mb-2 text-sm">
                  {t("Delivery Date", "تاريخ التسليم", lang)} *
                </label>
                <input
                  type="datetime-local"
                  required
                  className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-main"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block mb-2 text-sm">
                  {t("Upload Design (Optional)", "رفع صورة التصميم (اختياري)", lang)}
                </label>
                <input type="file" className="w-full text-sm border border-zinc-300 rounded-xl p-3 " />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-main text-white py-3 rounded-xl hover:opacity-90 transition"
              >
                {t("Submit Order", "إرسال الطلب", lang)}
              </button>

              <p className="text-xs text-gray-500 mt-4">
                {t(
                  "Our team will contact you within 24 hours to confirm details and pricing.",
                  "سيتواصل فريقنا معك خلال 24 ساعة لتأكيد التفاصيل والسعر.",
                  lang
                )}
              </p>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-semibold text-main">
                {t("Thank You!", "شكراً لك!", lang)}
              </h3>
              <p className="text-gray-600">
                {t(
                  "Your request has been received. Our team will contact you shortly.",
                  "تم استلام طلبك. سيتواصل فريقنا معك قريباً.",
                  lang
                )}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
