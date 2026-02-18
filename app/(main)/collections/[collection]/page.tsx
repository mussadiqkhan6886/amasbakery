import { Metadata } from 'next';
import Card from '@/components/customer/Card';
import MenuHeading from '@/components/customer/MenuHeading';
import { connectDB } from '@/lib/config/db';
import { Product } from '@/lib/models/ProductSchema';
import { ProductType } from '@/type';
import React from 'react';

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = ["menu", "occasion-cakes"]
  
  return categories.map((collection: string) => ({
    collection: collection,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const { collection } = await params;
  
  const title = collection.charAt(0).toUpperCase() + collection.slice(1);

  return {
    title: `${title} | Amas Bakery`,
    description: `Explore our delicious selection of ${collection} at Amas Bakery. Handcrafted treats available for delivery in Al Khobar and Dammam.`,
    openGraph: {
      title: `${title} Collection | Amas Bakery`,
      description: `Browse our ${collection} and find the perfect treat for your celebration.`,
    }
  };
}

// 3. The Main Component
const Category = async ({ params }: { params: Promise<{ collection: string }> }) => {
  const { collection } = await params;

  await connectDB();
  const res = await Product.find({ type: collection });
  const products = JSON.parse(JSON.stringify(res));

  return (
    <main className="min-h-screen max-w-8xl mx-auto px-4 py-8 bg-white text-black">
      <MenuHeading collection={collection} />
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((item: ProductType, i: number) => (
            <Card key={i} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Category;