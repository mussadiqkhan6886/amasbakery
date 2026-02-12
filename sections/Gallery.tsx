import CanDoHeader from '@/components/customer/CanDoHeader';
import Image from 'next/image';
import React from 'react';

const Gallery = () => {
  return (
    <section className="my-20 max-w-6xl mx-auto px-4">
      <CanDoHeader en="Gallery" ar="معرض" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">

        {/* Big Hero Video */}
        <div className="relative rounded-xl overflow-hidden sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2 aspect-[16/9]">
          <video
            src="/hero.mp4"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>

        {/* Side Tall Video */}
        <div className="relative rounded-xl overflow-hidden sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-3 aspect-[9/16]">
          <video
            src="/menu.mp4"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>

        {/* Small Cake Image */}
        <div className="relative rounded-xl overflow-hidden aspect-square">
          <Image
            src="/cake.jpg"
            fill
            alt="cake"
            className="object-cover"
          />
        </div>

        {/* Small Brownie Image */}
        <div className="relative rounded-xl overflow-hidden aspect-square">
          <Image
            src="/brownie.jpg"
            fill
            alt="brownie"
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default Gallery;
