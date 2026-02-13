import AddToCart from '@/components/customer/AddToCart';
import CurrenncyT from '@/components/customer/CurrenncyT';
import Message from '@/components/customer/Message';
import ProductDescription from '@/components/customer/ProductDescription';
import ProductHeading from '@/components/customer/ProductHeading';
import Quantity from '@/components/customer/Quantity';
import { cakes } from '@/lib/constant';
import { playFair } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


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

          <p className="text-2xl font-bold text-gray-800">{data.varieties[0].price.toFixed(2)} <CurrenncyT /></p>

          <ProductDescription en={data.description.en} ar={data.description.ar} />

          {/* Size Selector */}
          <div className="flex flex-col w-full gap-2">
            <label className="font-medium">Size</label>
            <select className="border w-full border-gray-300 rounded px-3 py-2">
              {data.varieties.map((item, i) => (
                <option key={item.size} value={item.size}>
                    {item.size + " " +item.price} <CurrenncyT />
                  </option>
                ))
              }
            </select>
          </div>
          {data.tiers && <div className="flex flex-col w-full gap-2">
            <label className="font-medium">Tiers</label>
            <select className="border w-full border-gray-300 rounded px-3 py-2">
              {data.tiers.map((item, i) => (
                <option key={i} value={item}>
                    {item}
                  </option>
                ))
              }
            </select>
          </div>}
          {data.flavors && <div className="flex flex-col w-full gap-2">
            <label className="font-medium">Flavors</label>
            <select className="border w-full border-gray-300 rounded px-3 py-2">
              {data.flavors.map((item, i) => (
                <option key={i} value={item}>
                    {item}
                  </option>
                ))
              }
            </select>
          </div>}

            <Message />
          {/* Quantity Selector */}
         <Quantity />

          {/* Add to Cart */}
          <AddToCart />
        </div>
      </section>
    </main>
  );
};

export default Product;
