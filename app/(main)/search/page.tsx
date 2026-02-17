import type { Metadata } from 'next';
import React from "react";
import axios from "axios";
import Card from '@/components/customer/Card';
import { ProductType } from '@/type';
import { useLanguage } from '@/context/LanguageContext';
import MayLikeHeading from '@/components/customer/MayLikeHeading';

async function getData(query: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${query}`);
  return res.data.products;
}

export const generateMetadata = async ({searchParams}: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> => { 
  const query = (await searchParams).q || "";

  return {
    title: `Search Result for ${query}`,
    description: `Search Result for ${query}, Discover Cakes, dates, cupcake, pastry, cupcake, And also customize your cake`
} };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q || "";
  const products = query ? await getData(query) : [];
  return (
    <main className="max-w-7xl mx-auto px-4 py-30">
      <MayLikeHeading en={`Search Result for "${query}"`} ar= {`نتائج البحث عن "${query}"`} />

      {products.length > 0 ? (
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
          {products.map((product: ProductType) => (
            <Card key={product._id} item={product} />
          ))}
        </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20">
          <MayLikeHeading en={`No products found matching "${query}"`} ar={`لم يتم العثور على منتجات مطابقة "${query}"`} />
        </p>
      )}
    </main>
  );
}
