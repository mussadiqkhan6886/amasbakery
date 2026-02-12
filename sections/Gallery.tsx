import CanDoHeader from '@/components/customer/CanDoHeader';
import Image from 'next/image';
import React from 'react';

const Gallery = () => {
  return (
    <section className="my-20 max-w-6xl mx-auto px-4">
      <CanDoHeader en="Gallery" ar="معرض" />

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">

        {/* First big video (2 cols) */}
        <div className="relative rounded-xl overflow-hidden sm:col-span-2 aspect-[16/9]">
          <video
            src="/hero.mp4"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>

        {/* Side tall video (1 col, 2 rows) */}
        <div className="relative rounded-xl overflow-hidden sm:row-span-2 sm:col-span-1 aspect-[9/16]">
          <video
            src="/menu.mp4"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>

        {/* Small cake image */}
        <div className="relative rounded-xl overflow-hidden aspect-square">
          <Image
            src="/cake.jpg"
            width={300}
            height={300}
            alt="cake"
            className="object-cover"
          />
        </div>

        {/* Small brownie image */}
        <div className="relative rounded-xl overflow-hidden aspect-square">
          <Image
            src="/brownie.jpg"
            width={300}
            height={300}
            alt="brownie"
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default Gallery;
