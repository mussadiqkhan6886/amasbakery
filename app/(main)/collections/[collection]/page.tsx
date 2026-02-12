import Card from '@/components/customer/Card';
import MenuHeading from '@/components/customer/MenuHeading';
import { cakes } from '@/lib/constant';
import { playFair } from '@/lib/fonts';
import Image from 'next/image';
import React from 'react';

const Category = async ({ params }: { params: Promise<{ collection: string }> }) => {
  const { collection } = await params;

  return (
    <main className="min-h-screen px-4 py-8 bg-white text-black">
     <MenuHeading collection={collection} />
      <section className='max-w-6xl mx-auto'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cakes
            .filter(cake => cake.type === collection)
            .map((item, i) => (
              <Card key={i} item={item} />
            ))}
        </div>
      </section>
    </main>
  );
};

export default Category;
