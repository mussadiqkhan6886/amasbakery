import Card from '@/components/customer/Card';
import MenuHeading from '@/components/customer/MenuHeading';
import { connectDB } from '@/lib/config/db';
import { Product } from '@/lib/models/ProductSchema';
import React from 'react';

const Category = async ({ params }: { params: Promise<{ collection: string }> }) => {
  const { collection } = await params;

  await connectDB()

  const res = await Product.find({type: collection})

  const products = JSON.parse(JSON.stringify(res))

  return (
    <main className="min-h-screen max-w-8xl mx-auto px-4 py-8 bg-white text-black">
     <MenuHeading collection={collection} />
      <section className='max-w-6xl mx-auto'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products
            .map((item: ProductType, i: number) => (
              <Card key={i} item={item} />
            ))}
        </div>
      </section>
    </main>
  );
};

export default Category;
