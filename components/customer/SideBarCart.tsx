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

  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);


    useEffect(() => {
      const savedTime = localStorage.getItem("deliveryTime");
      const savedDate = localStorage.getItem("deliveryDate");

      if (savedTime) setDeliveryTime(savedTime);
      if (savedDate) setDeliveryDate(savedDate);
    }, []);

    // Inside your SideBarCart component
const [bookedDates, setBookedDates] = useState<string[]>([]);

// 1. Fetch orders and count delivery dates
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/order"); 
      const result = await response.json();
      const orders = result.data || [];
      const dateCounts: { [key: string]: number } = {};

      orders.forEach((order: any) => {
        // Access the nested delivery object
        const rawDate = order.delivery?.deliveryDateSlot; 
        
        if (rawDate) {
          // Normalize to YYYY-MM-DD to ignore time zones/hours
          const d = new Date(rawDate).toISOString().split("T")[0];
          dateCounts[d] = (dateCounts[d] || 0) + 1;
        }
      });

      // Filter dates that appear 4 or more times
      const fullDates = Object.keys(dateCounts).filter(date => dateCounts[date] >= 4);
      setBookedDates(fullDates);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  fetchOrders();
}, []);

// 2. Logic for "Must have 1 day gap"
const today = new Date();
const tomorrowDate = new Date(today);
tomorrowDate.setDate(today.getDate() + 1);
const minDateString = tomorrowDate.toISOString().split("T")[0];

// 3. Handle Date Change with validation
const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selected = e.target.value;
  
  if (bookedDates.includes(selected)) {
    alert(t("This date is fully booked", "هذا التاريخ محجوز بالكامل", lang));
    setDeliveryDate("");
    localStorage.removeItem("deliveryDate");
  } else {
    setDeliveryDate(selected);
    localStorage.setItem("deliveryDate", selected);
  }
};

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 h-screen scale-120 bg-black/10 z-40"
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

                <p dir="ltr" className="text-xs text-gray-500">
                  {item.size} {item.flavor !== "-" && `• ${item.flavor}`}
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
         {cart.length > 0 ? ( <>
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
              <option value="4-6">4 PM - 6 PM</option>
              <option value="6-10">6 PM - 10 PM</option>
            </select>
            <label className="text-sm" htmlFor="date">Delivery Date:</label>
           <input
  type="date"
  id="date"
  min={minDateString}
  value={deliveryDate}
  onChange={handleDateChange}
  className={`w-full border rounded px-3 text-sm py-1 mt-1 ${
    bookedDates.includes(deliveryDate) ? "border-red-500 bg-red-50" : ""
  }`}
/>
{bookedDates.includes(deliveryDate) && (
  <p className="text-xs text-red-500 font-bold mt-1">
    {t("Date fully booked", "هذا التاريخ محجوز بالكامل", lang)}
  </p>
)}

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
            disabled={!deliveryTime || !deliveryDate || cart.length === 0}
            className={`py-3 rounded font-medium transition w-full
              ${
                deliveryTime && deliveryDate && cart.length > 0
                  ? "bg-main text-white hover:bg-main/90"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }
            `}
          >
            <Link href="/checkout">{t("Proceed to Checkout", "المتابعة للدفع", lang)}</Link>
          </button>
          <button
            disabled={!deliveryTime || !deliveryDate || cart.length === 0}
            onClick={onClose}
            className={`py-3 rounded font-medium transition w-full
              ${
                 deliveryTime && deliveryDate && cart.length > 0
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
