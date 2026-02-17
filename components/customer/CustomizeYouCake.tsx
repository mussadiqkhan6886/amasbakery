"use client";

import Image from "next/image";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { useLanguage } from "@/context/LanguageContext";
import { playFair } from "@/lib/fonts";
import axios from "axios";

interface Details {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  cakeSize: string;
  tierCakeSize: string;
  cakeFlavorTopTier: string;
  cakeFlavorBottomTier: string;
  messageOn: string;
  message: string;
  specialInstruction: string;
  deliveryDate: string;
  deliveryTime: string;
  totalPrice: number;
  deliveryCharges: number;
  totalAmount: number;
}

export default function CustomizeYourCake() {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { t, lang } = useLanguage();
  const [dailyLimit, setDailyLimit] = useState("")
  const [totalLimit, setTotalLimit] = useState("")
  const [details, setDetails] = useState<Details>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    cakeSize: "",
    tierCakeSize: "",
    cakeFlavorTopTier: "",
    cakeFlavorBottomTier: "",
    messageOn: "",
    message: "",
    specialInstruction: "",
    deliveryDate: "",
    deliveryTime: "",
    totalPrice: 0,
    deliveryCharges: 0,
    totalAmount: 0,
  });

  const [images, setImages] = useState<File[]>([]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  useEffect(() => {
  const calculatePrice = () => {
    // 1. Define your price lists here
    const sizePrices: Record<string, number> = {
      "6 inch (6-8 servings)": 150,
      "8 inch (12-14 servings)": 200,
      "10 inch (16-20 servings)": 250,
      "12 inch (20-24 servings)": 300,
      "Two Tier Cake": 400,
      "Three Tier Cake": 600,
    };

    const tierPrices: Record<string, number> = {
      "Two Tier (6 & 8 inch)": 50,
      "Two Tier (8 & 10 inch)": 70,
      "Two Tier (10 & 12 inch)": 70,
      "Three Tier (6, 8 & 10 inch)": 100,
      "Three Tier (4, 6 & 8 inch)": 150,
      "bottom dummy tier": 0
    };

    let basePrice = 0;
    let deliveryPrice = 0;

    // 2. Apply specific pricing for Size and Tiers
    if (details.cakeSize) {
      basePrice += sizePrices[details.cakeSize] || 0;
    }
    
    if (details.tierCakeSize) {
      basePrice += tierPrices[details.tierCakeSize] || 0;
    }

    // 3. Apply flat rate (1) for everything else as requested
    if (details.cakeFlavorTopTier) basePrice += 1;
    if (details.cakeFlavorBottomTier) basePrice += 1;
    if (details.messageOn && details.messageOn !== "no") basePrice += 1;

    // 4. Delivery Charges
    if (details.city === "al-khobar") {
      deliveryPrice = 25;
    } else if (details.city === "damam") {
      deliveryPrice = 35;
    }

    setDetails((prev) => ({
      ...prev,
      totalPrice: basePrice,
      deliveryCharges: deliveryPrice,
      totalAmount: basePrice + deliveryPrice,
    }));
  };

  calculatePrice();
}, [
  details.cakeSize,
  details.tierCakeSize,
  details.cakeFlavorTopTier,
  details.cakeFlavorBottomTier,
  details.messageOn,
  details.city,
]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const customer = {
        fullName: details.fullName,
        email: details.email,
        phone: details.phone,
        city: details.city,
      };

      const cakeDetails = {
        cakeSize: details.cakeSize,
        tierCakeSize: details.tierCakeSize,
        cakeFlavorTopTier: details.cakeFlavorTopTier,
        cakeFlavorBottomTier: details.cakeFlavorBottomTier,
        messageOn: details.messageOn,
        message: details.message,
        specialInstruction: details.specialInstruction,
      };

      const delivery = {
        deliveryDate: details.deliveryDate,
        deliveryTime: details.deliveryTime,
      };

      const pricing = {
        totalPrice: details.totalPrice,
        deliveryCharges: details.deliveryCharges,
        totalAmount: details.totalAmount,
      };

      const formData = new FormData();
      formData.append("customer", JSON.stringify(customer));
      formData.append("cakeDetails", JSON.stringify(cakeDetails));
      formData.append("delivery", JSON.stringify(delivery));
      formData.append("pricing", JSON.stringify(pricing));

      for (const file of images) {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
        formData.append("image", compressed);
      }

      const res = await fetch("/api/customize-order", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setImages([]);
      } else {
        alert(data.error || "Failed to submit order");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchOrderControl = async () => {
    try {
      const res = await axios.get("/api/orderControl");
      const data = res.data.data;

      setDailyLimit(data.dailyLimits.customLimit.toString());
      setTotalLimit(data.todayOrders.customCount.toString());

    } catch (error) {
      console.error("Failed to fetch order control:", error);
    }
  };

  fetchOrderControl();
}, []);

  return (
    <main
      className={`min-h-screen pt-30 pb-20 px-4 ${
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
            <h1
              className={`${playFair.className} text-4xl font-semibold text-main`}
            >
              {t("Customize Your Cake", "صمّم كيكك الخاص", lang)}
            </h1>

            <p className="text-black text-sm leading-relaxed">
              {t(
                "Whether it's a birthday, wedding, celebration or surprise Amas Bakery will craft your dream cake with precision and elegance.",
                "سواء كان عيد ميلاد أو زفاف أو مناسبة خاصة — تقوم أماس بيكري بصناعة كيك أحلامك بدقة وأناقة.",
                lang
              )}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className=" text-[13px] p-5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block mb-2">
                  {t("Full Name", "الاسم الكامل", lang)} *
                </label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={details.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2">
                  {t("Email", "البريد الإلكتروني", lang)} *
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  value={details.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2">
                  {t("Contact Number", "رقم التواصل", lang)} *
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={details.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
                />
              </div>

              {/* Cake Size */}
              <div>
                <label className="block mb-2">
                  {t("Cake Size", "حجم الكيك", lang)} *
                </label>
                <select
                  required
                  name="cakeSize"
                  value={details.cakeSize}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
                >
                  <option value="">
                    {t("Select size", "اختر الحجم", lang)}
                  </option>
                  <option>6 inch (6-8 servings)</option>
                  <option>8 inch (12-14 servings)</option>
                  <option>10 inch (16-20 servings)</option>
                  <option>12 inch (20-24 servings)</option>
                  <option>Two Tier Cake</option>
                  <option>Three Tier Cake</option>
                </select>
              </div>

              {/* Tier Cake Size */}
              <div>
                <label className="block mb-2">
                  {t("Tier Cake Size", "حجم الكيك متعدد الطبقات", lang)} *
                </label>
                <select
                  required
                  name="tierCakeSize"
                  value={details.tierCakeSize}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
                >
                  <option value="">
                    {t("Select tier size", "اختر حجم الطبقات", lang)}
                  </option>
                  <option>Two Tier (6 & 8 inch)</option>
                  <option>Two Tier (8 & 10 inch)</option>
                  <option>Two Tier (10 & 12 inch)</option>
                  <option>Three Tier (4, 6 & 8 inch)</option>
                  <option>Three Tier (6, 8 & 10 inch)</option>
                  <option>bottom dummy tier</option>
                </select>
              </div>

              {/* Cake Flavor Top Tier */}
              <div>
                <label className="block mb-2">
                  {t("Cake Flavor (Top Tier)", "نكهة الطبقة العلوية", lang)} *
                </label>
                <select
                  required
                  name="cakeFlavorTopTier"
                  value={details.cakeFlavorTopTier}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
                >
                  <option value="">
                    {t("Select flavor", "اختر النكهة", lang)}
                  </option>
                  <option>Vanilla Cake with Mix berries</option>
                    <option>Vanilla cake with Raspberry</option>
                    <option>Vanilla cake with Strawberry</option>
                    <option>Vanilla cake with caramel</option>
                    <option>Vanilla Cloud Cake</option>
                    <option>Speculoos Cake (Lotus)</option>
                    <option>Classic Chocolate Cake</option>
                    <option>Super Moist Chocolate cake</option>
                    <option>Chocolate Raspberry mousse cake</option>
                    <option>Pistachio cake</option>
                </select>
              </div>

              {/* Cake Flavor Bottom Tier */}
              <div>
                <label className="block mb-2">
                  {t("Cake Flavor (Bottom Tier)", "نكهة الطبقة السفلية", lang)}
                </label>
                <select
                  name="cakeFlavorBottomTier"
                  value={details.cakeFlavorBottomTier}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
                >
                  <option value="">
                    {t("Select flavor", "اختر النكهة", lang)}
                  </option>
                  <option>Vanilla Cake with Mix berries</option>
                  <option>Vanilla cake with Raspberry</option>
                  <option>Vanilla cake with Strawberry</option>
                  <option>Vanilla cake with caramel</option>
                  <option>Vanilla Cloud Cake</option>
                  <option>Speculoos Cake (Lotus)</option>
                  <option>Classic Chocolate Cake</option>
                  <option>Super Moist Chocolate cake</option>
                  <option>Chocolate Raspberry mousse cake</option>
                  <option>Pistachio cake</option>
                </select>
              </div>

              {/* Add Personalized Message */}
              <div>
                <label className="block mb-2">
                  {t("Add Personalized Message", "إضافة رسالة مخصصة", lang)} *
                </label>
                <select
                  required
                  name="messageOn"
                  value={details.messageOn}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
                >
                  <option value="">{t("Select option", "اختر خيار", lang)}</option>
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
              {(details.messageOn === "board" || details.messageOn === "plaque") && (<div>
                <label className="block mb-2">
                  {t("Message", "الرسالة", lang)}
                </label>
                <input
                  type="text"
                  name="message"
                  value={details.message}
                  onChange={handleChange}
                  placeholder={t(
                    "Please type your message",
                    "يرجى كتابة رسالتك",
                    lang
                  )}
                  maxLength={40}
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
                />
              </div>)}

              {/* Special Instructions */}
              <div>
                <label className="block mb-2">
                  {t("Special Instructions", "تعليمات خاصة", lang)}
                </label>
                <textarea
                  rows={4}
                  name="specialInstruction"
                  value={details.specialInstruction}
                  onChange={handleChange}
                  placeholder={t(
                    "Any additional details about design, theme, allergies, etc.",
                    "أي تفاصيل إضافية حول التصميم أو المناسبة أو الحساسية وغيرها",
                    lang
                  )}
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main resize-none"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block mb-2">
                  {t("Delivery Date", "تاريخ التسليم", lang)} *
                </label>
                <input
                  type="date"
                  required
                  min={minDate}
                  name="deliveryDate"
                  value={details.deliveryDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
                />
              </div>

              {/* Delivery Time */}
          <div>
            <label className="block mb-2">
              {t("Delivery Time", "وقت التسليم", lang)} *
            </label>
            <select
              name="deliveryTime"
              value={details.deliveryTime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
            >
              <option value="">{t("Select Time", "اختر الوقت", lang)}</option>
              {/* Generating 24 hours options */}
              {Array.from({ length: 24 }).map((_, i) => {
                const hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
                const ampm = i >= 12 ? "PM" : "AM";
                const timeString = `${hour}:00 ${ampm}`;
                return (
                  <option key={i} value={timeString}>
                    {timeString}
                  </option>
                );
              })}
            </select>
          </div>

              <div>
                <label className="block mb-2">
                  {t("City", "المدينة", lang)} *
                </label>
                <select 
                  name="city" 
                  value={details.city} 
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-main"
                >
                  <option value="">{t("Select City", "اختر المدينة", lang)}</option>
                  <option value="al-khobar">Al Khobar</option>
                  <option value="damam">Dammam</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="block mb-2">
                  {t(
                    "Upload Design (Optional)",
                    "رفع صورة التصميم (اختياري)",
                    lang
                  )}
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full border border-zinc-300 rounded-sm p-3 "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading ||  Number(totalLimit) >= Number(dailyLimit)}
                className="w-full bg-main text-white py-3 rounded-sm hover:opacity-90 transition disabled:bg-gray-400"
              >
                {loading
                  ? t("Submitting...", "جاري الإرسال...", lang)
                  : t("Submit Order", "إرسال الطلب", lang)}
              </button>

              <p className="text-xs text-gray-500 mt-4">
                {Number(totalLimit) >= Number(dailyLimit) ? <span className="text-base text-red-500 text-center">{ t("Customize Cake Booking is done for today please try tomorrow","تم إغلاق حجز الكيك المخصص لهذا اليوم، يرجى المحاولة غداً." ,lang) }</span> : t(
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