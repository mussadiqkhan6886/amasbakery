"use client";

import { useLanguage } from "@/context/LanguageContext";
import { playFair } from "@/lib/fonts";
import { ProductType } from "@/type";
import React, { useMemo, useState } from "react";
import CurrenncyT from "./CurrenncyT";
import AddToCart from "./AddToCart";
import Image from "next/image";

const ProductDetails = ({ product }: { product: ProductType }) => {
  const { t, lang } = useLanguage();
  // ---------------- STATE ----------------
  const [selectedSize, setSelectedSize] = useState(
    product.varieties[0]
  );

  const [selectedFlavor, setSelectedFlavor] = useState(
    "-"
  );

  const [quantity, setQuantity] = useState(1);

  const [messageOn, setMessageOn] = useState("noMessage");
  const [message, setMessage] = useState("");
  const [specialInstruction, setSpecialInstruction] = useState("");

  // ---------------- DYNAMIC PRICE ----------------
  const totalPrice = useMemo(() => {
    return selectedSize.price * quantity;
  }, [selectedSize, quantity]); // flavor price extra

  const [currentImage, setCurrentImage] = useState(product.image[0])

  return (
    <>
      <div className="flex-1">
        <div className="rounded-xl overflow-hidden">
          <Image
            src={currentImage}
            alt={product.name.en}
            width={600}
            height={600}
            className="w-full h-[70vh] lg:h-[80vh] object-cover object-center"
          />
        </div>
        <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
          {product.image.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentImage(item)}
              className={`cursor-pointer rounded-md overflow-hidden border-2 transition ${
                currentImage === item ? "border-black" : "border-transparent"
              }`}
            >
              <Image src={item} alt="thumbnail" width={80} height={80} className="object-cover w-20 h-20" />
            </div>
          ))}
        </div>
      </div>
        <div className="flex-1 flex flex-col gap-4">
      <h1
        className={`${playFair.className} text-3xl sm:text-4xl md:text-5xl ${
          lang === "en" ? "text-left" : "text-right"
        } mt-4`}
      >
        {t(product.name.en, product.name.ar, lang)}
      </h1>

      <p className="text-xl mb-2 text-gray-800">
        {totalPrice.toFixed(2)} <CurrenncyT />
      </p>

      <p className="text-sm leading-6 tracking-wide">
        {t(product.description.en, product.description.ar, lang)}
      </p>

      <div className="flex flex-col w-full gap-2">
        <label className="font-medium">
          {t("Size", "الحجم", lang)}
        </label>

        <select
          value={selectedSize.size}
          onChange={(e) => {
            const found = product.varieties.find(
              (v) => v.size === e.target.value
            );
            if (found) setSelectedSize(found);
          }}
          className="border w-full border-gray-300 rounded px-3 py-2"
          dir="ltr"
        >
          {product.varieties.map((item) => (
            <option key={item.size} value={item.size}>
              {item.size} - {item.price} <CurrenncyT />
            </option>
          ))}
        </select>
      </div>

        <div className="flex flex-col w-full gap-2">
          <label className="font-medium">
            {t("Flavor", "النكهة", lang)}
          </label>

          <select
            dir="ltr"
            value={selectedFlavor}
            onChange={(e) => setSelectedFlavor(e.target.value)}
            className="border w-full border-gray-300 rounded px-3 py-2"
          >
            <option value="-">-</option>
            {product.flavors && product.flavors.length > 0 && (
            product.flavors.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))
            )}
          </select>
        </div>
      

      <div className="flex flex-col gap-2">
       {product.category.en.toLowerCase() === "cake" && <> <label className="font-medium">
          {t("Add Personalized Message", "إضافة رسالة شخصية", lang)}
        </label>

        <select
          value={messageOn}
          onChange={(e) => setMessageOn(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="onBoard">
            {t("On Board", "على اللوحة", lang)}
          </option>
          <option value="onCake">
            {t("On Cake", "على الكعكة", lang)}
          </option>
          <option value="noMessage">
            {t("No Message", "بدون رسالة", lang)}
          </option>
        </select>
        </>}

        {messageOn !== "noMessage" && (
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t(
              "Your message here",
              "اكتب رسالتك هنا",
              lang
            )}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        )}

        <input
          type="text"
          value={specialInstruction}
          onChange={(e) => setSpecialInstruction(e.target.value)}
          placeholder={t(
            "Special instruction",
            "تعليمات خاصة",
            lang
          )}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* QUANTITY */}
      <div className="flex items-center gap-4 mt-4">
        <span className="font-medium">
          {t("Quantity", "الكمية", lang)}
        </span>

        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-3 py-1"
          >
            -
          </button>

          <div className="px-4 py-1">{quantity}</div>

          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="px-3 py-1"
          >
            +
          </button>
        </div>
      </div>

      {/* ADD TO CART */}
      <AddToCart
        id={product._id}
        type={product.type.toUpperCase()}
        titleEn={product.name.en}
        titleAr={product.name.ar}
        image={product.image[0]}
        flavor={selectedFlavor}
        size={selectedSize.size}
        price={selectedSize.price}
        quantity={quantity}
        messageOn={messageOn}
        message={message}
        specialInstruction={specialInstruction}
      />
    </div>
    </>
    
  );
};

export default ProductDetails;
