"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { CartItem } from "@/type";
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
}: CartItem) => {
  const { t, lang } = useLanguage();
  const { addToCart, cart } = useCart();

  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
  if (loading) return; // prevent spam

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
  });

  console.log(cart)
  setAdded(true);

  setTimeout(() => {
    setAdded(false);
    setLoading(false);
  }, 1200);
};


  // ---------------- BUTTON TEXT ----------------
  const buttonText = added
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
