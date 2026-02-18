"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CartItem } from "../../../type";
import { useLanguage } from "@/context/LanguageContext";
import imageCompression from "browser-image-compression";
import CurrenncyT from "@/components/customer/CurrenncyT";

const Checkout = () => {
  const router = useRouter();
  const { cart: cartItems, clearCart, totalAmount } = useCart();
  const [deliveryTiming, setDeliveryTiming] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const {t, lang} = useLanguage()
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    notes: "",
    paymentMethod: "ONLINE",
    address: "",
    city: "",
  });

  const [deliveryCharges, setDeliveryCharges] = useState(0);

  // Load delivery date/time from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem("deliveryTime");

    if (savedTime) setDeliveryTiming(savedTime);
  }, []);

  // Update delivery charges based on city
  useEffect(() => {
  if (formData.city === "al-khobar") setDeliveryCharges(25);
  else if (formData.city === "damam") setDeliveryCharges(35);
  else setDeliveryCharges(0);
}, [formData.city]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPaymentProof(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!paymentProof) {
      alert(t("Please upload payment proof", "يرجى رفع إثبات الدفع", lang));
      return;
    }

    if (!deliveryTiming) {
      alert(t("Please select delivery  time", "يرجى اختيار تاريخ ووقت التوصيل", lang));
      return;
    }

    setLoading(true);
    setStatus("Placing order...");

    try {
      const orderData = {
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          address: formData.address,
        },
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.titleEn,
          size: item.size,
          flavor: item.flavor || "",
          quantity: item.quantity,
          messageOn: item.messageOn || "",
          message: item.message || "",
          specialInstructions: item.specialInstruction || "",
          orderType: item.type
        })),
        pricing: {
          subtotal: totalAmount,
          deliveryCharges,
          total: totalAmount + deliveryCharges,
        },
        delivery: {
          deliveryTimeSlot: deliveryTiming,
          deliveryType: "DELIVERY",
        },
        payment: {
          method: formData.paymentMethod,
        },
        notes: formData.notes || "No notes",
      };

      const fd = new FormData();
        const compressedFile = await imageCompression(paymentProof, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });

      fd.append("paymentProof", compressedFile);
      fd.append("orderData", JSON.stringify(orderData));

      const res = await axios.post("/api/order", fd);

      if (res.data.success) {
      clearCart();
      localStorage.removeItem("deliveryTime");
      
      // Ensure we access the ID correctly from the response
      const orderId = res.data.order?._id || res.data.data?._id; 
      router.push(`/thank-you/${orderId}`);
    } else {
      setStatus(res.data.message || "Order failed.");
    }
    } catch (err:any) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Order failed. Try again.";
      setStatus(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col md:flex-row justify-between">
      {/* LEFT: FORM */}
      <div className="w-full py-5 border-r lg:pl-20 pl-5 pr-5 border-gray-300 md:w-2/3">
        <h1 className="text-3xl text-center font-bold mb-6 border-b border-gray-300 pb-2">
          <Link href={"/"}>{t("Checkout", "الدفع", lang)}</Link>

        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
        >
          {/* Customer Info */}
          <div className="space-y-4">
            <input
              name="fullName"
              type="text"
              placeholder={t("Full Name", "الاسم الكامل", lang)}
              required
              value={formData.fullName}
              onChange={handleChange}
              className="border-gray-300 outline-none w-full p-3 border rounded-md"
            />
            <input
              name="phone"
              type="tel"
              placeholder={t("Phone Number", "رقم الهاتف", lang)}
              required
              value={formData.phone}
              onChange={handleChange}
              className="border-gray-300 outline-none w-full p-3 border rounded-md"
            />
            <input
              name="email"
              type="email"
              placeholder={t("Email", "البريد الإلكتروني", lang)}
              value={formData.email}
              onChange={handleChange}
              className="border-gray-300 outline-none w-full p-3 border rounded-md"
            />
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border w-full border-gray-300 p-2 rounded-md"
              required
            >
              <option value="">{t("City", "المدينة", lang)}</option>
              <option value="al-khobar">{t("Al Khobar", "الخبر", lang)}</option>
              <option value="damam">{t("Dammam", "الدمام", lang)}</option>
            </select>
            <input
              name="address"
              type="text"
              placeholder={t("Address", "العنوان", lang)}
              required
              value={formData.address}
              onChange={handleChange}
              className="border-gray-300 outline-none w-full p-3 border rounded-md"
            />
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <textarea
              name="notes"
              placeholder={t("Order Notes (optional)", "ملاحظات الطلب (اختياري)", lang)}
              value={formData.notes}
              onChange={handleChange}
              rows={7}
              className="w-full p-3 border-gray-300 outline-none border rounded-md"
            />
          </div>

          {/* Payment */}
          <div className="md:col-span-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-800">
              {t("Payment Method", "طريقة الدفع", lang)}
            </h3>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="online">{t("Bank Payment", "تحويل بنكي", lang)}</option>
            </select>
            <p className="mt-2 text-xs text-gray-500">
              {t("Secure bank transfer. Your payment details are safe.", "تحويل بنكي آمن. تفاصيل الدفع الخاصة بك آمنة.", lang)}
            </p>
            <div className="p-3 flex flex-col gap-2 px-5 bg-zinc-100 shadow-inner text-sm">
              <p className="font-semibold">STC BANK</p>
              <p><span className="font-semibold">IBAN:</span> SA9278000000001258715768</p>
              <p><span className="font-semibold">Account:</span> 561812342</p>
            </div>
            <label className="block text-sm font-medium mt-2">
             {t("Upload Payment Proof", "رفع إثبات الدفع", lang)}
            </label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-200 hover:file:bg-gray-300"
            />
            {preview && (
              <div className="mt-3">
                <Image
                  src={preview}
                  alt="Payment proof"
                  width={200}
                  height={200}
                  className="rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Delivery Date/Time */}
          <div className="md:col-span-2">
            
            <label className="block mt-2 mb-1">{t("Delivery Time", "وقت التوصيل", lang)}</label>
            <select
              value={deliveryTiming}
              onChange={(e) => {
                setDeliveryTiming(e.target.value);
                localStorage.setItem("deliveryTime", e.target.value);
              }}
              className="border w-full p-2 rounded-md"
            >
              <option value="">{t("Select time", "اختر الوقت", lang)}</option>
              <option value="4-6">4 PM - 6 PM</option>
              <option value="6-10">6 PM - 10 PM</option>

            </select>
          </div>

          <button
            type="submit"
            disabled={loading || cartItems.length === 0 || !paymentProof}
            className={`md:col-span-2 w-full cursor-pointer text-white py-3 rounded-md transition ${
              loading ? "bg-gray-600" : "bg-black hover:bg-gray-800"
            }`}
          >
           {loading
  ? t("Placing Order...", "جاري تنفيذ الطلب...", lang)
  : t("Place Order", "إتمام الطلب", lang)}
          </button>
        </form>

        {status && <p className="my-6 text-center text-black font-medium">{status}</p>}
      </div>

      {/* RIGHT: CART SUMMARY */}
      <div className="w-full md:w-1/3 bg-gray-100 py-6 px-6">
        <h3 className="text-xl font-semibold mb-4">{t("Your Cart", "سلة المشتريات", lang)}
</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">{t("Your cart is empty.", "سلة المشتريات فارغة.", lang)}</p>
        ) : (
          <>
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b py-2">
                <div className="flex gap-5">
                  {item.image ? (
                    <Image
                      width={100}
                      height={100}
                      className="w-[70px] h-[70px] object-cover rounded"
                      src={item.image}
                      alt={item.titleEn}
                    />
                  ) : (
                    <div className="w-[70px] h-[70px] bg-gray-200 flex items-center justify-center text-xs">
                      No Img
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{t(item.titleEn, item.titleAr,lang)}</p>
                    <p dir="ltr" className="text-sm">{item.flavor && item.flavor}</p>
                    <p dir="ltr" className="text-sm">{item.size}</p>
                    <p className="text-sm text-gray-600">{t("Qty", "الكمية", lang)}: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">{item.price * item.quantity} <CurrenncyT /> </p>
              </div>
            ))}
            <div className="flex justify-between mt-4 font-bold text-lg">
              <span>{t("Shipping", "الشحن", lang)}:</span>
              <span>{deliveryCharges} <CurrenncyT /> </span>
            </div>
            <div className="flex justify-between mt-4 font-bold text-lg">
              <span>{t("Total", "الإجمالي", lang)}:</span>
              <span>{totalAmount + deliveryCharges} <CurrenncyT /> </span>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Checkout;
