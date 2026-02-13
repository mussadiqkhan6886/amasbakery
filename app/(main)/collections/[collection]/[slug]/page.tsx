import ProductDescription from '@/components/customer/ProductDescription';
import ProductHeading from '@/components/customer/ProductHeading';
import { cakes } from '@/lib/constant';
import { playFair } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type CakePrice = {
  "6inch"?: number;
  "8inch"?: number;
  "10inch"?: number;
  box?: number;
  box6?: number;
  box12?: number;
};

interface Cake {
  name: { en: string; ar: string };
  slug: string;
  type: "menu" | "occasion";
  category: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
  price?: CakePrice;
  basePrice?: CakePrice;
  [key: string]: any;
}


const Product = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const data = cakes.find(cake => cake.slug === slug);

  if (!data) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <Link
          href="/collections/menu"
          className={`${playFair.className} px-6 py-3 bg-main/90 text-white rounded hover:bg-main transition`}
        >
          Have a look at Menu
        </Link>
      </main>
    );
  }

 const defaultSize = data.price
  ? Object.keys(data.price)[0] as keyof typeof data.price
  : Object.keys(data.basePrice)[0] as keyof typeof data.basePrice;

const price = data.price
  ? data.price[defaultSize]
  : data.basePrice[defaultSize];


  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <section className="flex flex-col gap-10 lg:flex-row justify-between">
        {/* Product Image */}
        <div className="flex-1">
          <Image
            src={data.image}
            alt={data.name.en}
            width={600}
            height={600}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-6">
          <ProductHeading en={data.name.en} ar={data.name.ar} />

          <p className="text-2xl font-bold text-gray-800">{price.toFixed(2)} SAR</p>

          <ProductDescription en={data.description.en} ar={data.description.ar} />

          {/* Size Selector */}
          <div className="flex flex-col w-full gap-2">
            <label className="font-medium">Size</label>
            <select className="border w-full border-gray-300 rounded px-3 py-2">
              {data.price
                ? Object.keys(data.price).map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))
                : Object.keys(data.basePrice).map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
            </select>
          </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Add Personalized Message</label>
              <input
                type="text"
                placeholder="Your message here"
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <div className="px-3 py-1">-</div>
              <div className="px-4 py-1">1</div>
              <div className="px-3 py-1">+</div>
            </div>
          </div>

          {/* Add to Cart */}
          <button className="mt-6 px-6 py-3 bg-main/90 text-white hover:bg-main transition w-full">
            Add To Cart
          </button>
        </div>
      </section>
    </main>
  );
};

export default Product;
