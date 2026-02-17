"use client";

import CurrenncyT from "@/components/customer/CurrenncyT";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalAmount } = useCart();
  const { lang, t } = useLanguage();

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const isDisabled =
    cart.length === 0 || !deliveryDate || !deliveryTime;

    // get tomorrow's date in YYYY-MM-DD format
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 2);

const minDate = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    const savedDate = localStorage.getItem("deliveryDate");
    const savedTime = localStorage.getItem("deliveryTime");

    if (savedDate) setDeliveryDate(savedDate);
    if (savedTime) setDeliveryTime(savedTime);
  }, []);



  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold mb-10">
        {t("Your Cart", "سلة المشتريات", lang)}
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-6">
            {t("Your cart is empty", "السلة فارغة", lang)}
          </p>

          <Link
            href="/collections/menu"
            className="bg-main text-white px-6 py-3 rounded-md hover:bg-main/90 transition"
          >
            {t("Continue Shopping", "متابعة التسوق", lang)}
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT - CART ITEMS */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.cartKey}
                className="flex gap-6 border rounded-xl p-5"
              >
                <Image
                  src={item.image}
                  alt="product"
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold text-lg">
                      {lang === "en"
                        ? item.titleEn
                        : item.titleAr}
                    </h2>

                    <p dir="ltr" className="text-sm text-gray-500">
                      {item.size}{" "}
                      {item.flavor && `• ${item.flavor}`}
                    </p>

                    {item.message && (
                      <p className="text-xs text-gray-400 mt-1">
                        {t("Message:", "الرسالة:", lang)}{" "}
                        {item.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.cartKey!,
                            item.quantity - 1
                          )
                        }
                        className="px-3 py-1"
                      >
                        -
                      </button>

                      <span className="px-4">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.cartKey!,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-1"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-semibold">
                      {(item.price * item.quantity).toFixed(2)}{" "}
                      <CurrenncyT />
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item.cartKey!)
                    }
                    className="text-red-500 text-sm mt-2"
                  >
                    {t("Remove", "إزالة", lang)}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="border rounded-xl p-6 h-fit flex flex-col gap-5">
            <h3 className="font-semibold text-xl">
              {t("Order Summary", "ملخص الطلب", lang)}
            </h3>

            {/* Delivery Date */}
            <div>
              <label className="text-sm">
                {t("Delivery Date", "تاريخ التوصيل", lang)}
              </label>
              <input
                type="date"
                min={minDate}
                value={deliveryDate}
                onChange={(e) =>
                  setDeliveryDate(e.target.value)
                }
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            {/* Delivery Time */}
            <div>
              <label className="text-sm">
                {t("Delivery Time", "وقت التوصيل", lang)}
              </label>
              <select
              dir="ltr"
                value={deliveryTime}
                onChange={(e) =>
                  setDeliveryTime(e.target.value)
                }
                className="w-full border rounded px-3 py-2 mt-1"
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

            {/* TOTAL */}
            <div className="flex justify-between text-lg font-semibold pt-4 border-t">
              <span>{t("Total", "الإجمالي", lang)}</span>
              <span>
                {totalAmount.toFixed(2)} <CurrenncyT />
              </span>
            </div>

            <button
              disabled={isDisabled}
              className={`py-3 rounded-md font-medium transition
                ${
                  isDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-main text-white hover:bg-main/90"
                }
              `}
            >
              <Link href="/checkout">{t("Proceed to Checkout", "المتابعة للدفع", lang)}</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
