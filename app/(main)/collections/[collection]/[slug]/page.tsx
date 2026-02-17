import MayLike from '@/components/customer/MayLike';
import ProductDetails from '@/components/customer/ProductDetails';
import { connectDB } from '@/lib/config/db';
import { playFair } from '@/lib/fonts';
import { Product } from '@/lib/models/ProductSchema';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const singleProduct = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  await connectDB()

  const res = await Product.findOne({slug:slug})

  const product = JSON.parse(JSON.stringify(res))


  if (!product) {
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
    <main className="max-w-6xl mx-auto px-3 py-12">
      <section className="flex flex-col gap-10 lg:flex-row justify-between">
        {/* Product Image */}

        {/* Product Details */}
        <ProductDetails product={product} />
      </section>
      <MayLike type={product.type} excludeIds={product._id} />
    </main>
  );
};

export default singleProduct;
