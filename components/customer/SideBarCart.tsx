"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import CurrenncyT from "./CurrenncyT";
import Image from "next/image";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
};

const SideBarCart = ({ open, onClose }: Props) => {
  const { cart, removeFromCart, updateQuantity, totalAmount } = useCart();
  const { lang, t } = useLanguage();

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const minDate = tomorrow.toISOString().split("T")[0];

    useEffect(() => {
      const savedDate = localStorage.getItem("deliveryDate");
      const savedTime = localStorage.getItem("deliveryTime");

      if (savedDate) setDeliveryDate(savedDate);
      if (savedTime) setDeliveryTime(savedTime);
    }, []);



  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 h-screen bg-black/10 z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-screen text-black w-full sm:w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {t("Your Cart", "سلة المشتريات", lang)}
          </h2>

          <button onClick={onClose}>
            <FiX size={22} />
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="flex flex-col gap-2 p-2 px-3 overflow-y-auto thin-scrollbar h-[50%]">
          {cart.length === 0 && (
            <p className="text-gray-500 text-center">
              {t("Cart is empty", "السلة فارغة", lang)}
            </p>
          )}

          {cart.map((item) => (
            <div
              key={item.cartKey}
              className="flex gap-3 border rounded-lg p-3"
            >
              <Image
                width={100}
                height={100}
                src={item.image}
                alt={item.titleEn}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1 flex flex-col items-start gap-1">
                <h3 className="font-medium text-sm">
                  {lang === "en" ? item.titleEn : item.titleAr}
                </h3>

                <p className="text-xs text-gray-500">
                  {item.size} {item.flavor && `• ${item.flavor}`}
                </p>

                <p className="text-sm font-semibold">
                  {item.price} <CurrenncyT />
                </p>

                {/* Quantity */}
                <div className="flex border items-center gap-2 mt-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.cartKey!, item.quantity - 1)
                    }
                    className="px-2 border-r"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.cartKey!, item.quantity + 1)
                    }
                    className="px-2 border-l"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartKey!)}
                  className="text-xs text-red-500 mt-1"
                >
                  {t("Remove", "إزالة", lang)}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DELIVERY SECTION */}
        <div className="border-t p-3 overflow-y-auto thin-scrollbar flex flex-col gap-2">
         {cart.length > 0 ? ( <> <div>
            <label className="text-sm font-medium">
              {t("Delivery Date", "تاريخ التوصيل", lang)}
            </label>
            <input
                type="date"
                value={deliveryDate}
                min={minDate} // 👈 prevents selecting today or past
                 onChange={(e) => {
                  const date = e.target.value;
                  setDeliveryDate(date);
                  localStorage.setItem("deliveryDate", date); // ✅ store in localStorage
                }}
                className="w-full border rounded px-3 text-sm py-1 mt-1"
                />
          </div>

          <div>
              <label className="text-sm font-medium">
              {t("Delivery Time", "وقت التوصيل", lang)}
            </label>
            <select
              value={deliveryTime}
              onChange={(e) => {
                const time = e.target.value;
                setDeliveryTime(time);
                localStorage.setItem("deliveryTime", time); // ✅ store in localStorage
              }}
              className="w-full border rounded px-3 text-sm py-1 mt-1"
            >
              <option value="">
                {t("Select time", "اختر الوقت", lang)}
              </option>
              <option value="10-12">10 AM - 12 PM</option>
              <option value="12-3">12 PM - 3 PM</option>
              <option value="3-6">3 PM - 6 PM</option>
              <option value="6-9">6 PM - 9 PM</option>
            </select>
          </div>

          <div className="flex justify-between font-semibold text-lg">
            <span>{t("Total", "الإجمالي", lang)}</span>
            <span>
              {totalAmount.toFixed(2)} <CurrenncyT />
            </span>
          </div>

          <div className="flex gap-2 w-full">
            <button
            onClick={onClose}
            disabled={!deliveryDate || !deliveryTime || cart.length === 0}
            className={`py-3 rounded font-medium transition w-full
              ${
                deliveryDate && deliveryTime && cart.length > 0
                  ? "bg-main text-white hover:bg-main/90"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }
            `}
          >
            <Link href="/checkout">{t("Proceed to Checkout", "المتابعة للدفع", lang)}</Link>
          </button>
          <button
            disabled={!deliveryDate || !deliveryTime || cart.length === 0}
            onClick={onClose}
            className={`py-3 rounded font-medium transition w-full
              ${
                deliveryDate && deliveryTime && cart.length > 0
                  ? "border border-main text-main hover:bg-main hover:text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }
            `}
          >
            <Link href="/cart">{t("Proceed to Cart", " انتقل إلى سلة التسوق", lang)}</Link>
          </button>
          </div>
          </>) : (
            <Link className="border text-center py-2" href="/collections/menu">{t("Continue to Menu", "المتابعة إلى القائمة", lang)}</Link>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBarCart;
