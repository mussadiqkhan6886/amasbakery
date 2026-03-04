"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { CartItem } from "@/type";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AddToCart = ({
  id,
  type,
  titleEn,
  titleAr,
  image,
  flavor,
  size,
  price,
  quantity,
  messageOn,
  message,
  specialInstruction,
  cupcakeImage
}: CartItem) => {
  const { t, lang } = useLanguage();
  const { addToCart, cart } = useCart();
  
  // Initialize as numbers
  // const [currentCount, setCurrentCount] = useState(0);
  // const [maxLimit, setMaxLimit] = useState(0);
  // const [isSoldOut, setIsSoldOut] = useState(false);
  
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchOrderControl = async () => {
  //     try {
  //       const res = await axios.get("/api/orderControl");
  //       const data = res.data.data;

  //       if (type === "MENU") {
  //         setCurrentCount(data.todayOrders.menuCount);
  //         setMaxLimit(data.dailyLimits.menuLimit);
  //         if (data.todayOrders.menuCount >= data.dailyLimits.menuLimit) setIsSoldOut(true);
  //       } else {
  //         setCurrentCount(data.todayOrders.occasionCount);
  //         setMaxLimit(data.dailyLimits.occasionLimit);
  //         if (data.todayOrders.occasionCount >= data.dailyLimits.occasionLimit) setIsSoldOut(true);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch order control:", error);
  //     }
  //   };

  //   fetchOrderControl();
  // }, [type]);

  const handleAddToCart = () => {
    // if (loading || isSoldOut) return;
    if (loading) return;

    setLoading(true);

    addToCart({
      id,
      type,
      titleEn,
      titleAr,
      image,
      flavor,
      size,
      price,
      quantity,
      messageOn,
      message,
      specialInstruction,
      cupcakeImage
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
      setLoading(false);
    }, 1200);
  };

  // ---------------- BUTTON TEXT ----------------
  const buttonText =  added
    ? t("Added Successfully ✓", "تمت الإضافة ✓", lang)
    : loading
    ? t("Adding...", "جاري الإضافة...", lang)
    : t("Add To Cart", "أضف إلى السلة", lang);

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`mt-6 px-6 py-3 w-full transition font-medium rounded-lg
        ${
           added
            ? "bg-green-600 text-white"
            : "bg-main text-white hover:scale-[1.02] active:scale-95"
        }
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
      `}
    >
      {buttonText}
    </button>
  );
};

export default AddToCart;