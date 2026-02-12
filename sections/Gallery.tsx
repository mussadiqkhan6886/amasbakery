import ScrollFloat from '@/components/ui/HeadingScroll'
import Image from 'next/image'
import React from 'react'

const Gallery = () => {
  return (
    <section className='my-20 max-w-6xl mx-auto px-4'>
      <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
      >
        Gallery
      </ScrollFloat>

      <div className='grid grid-cols-4 grid-rows-3 gap-4 h-[670px] mt-10'>
        
        {/* Big Hero Video */}
        <div className='col-span-2 row-span-2 relative rounded-xl overflow-hidden'>
          <video
            src="/hero.mp4"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>

        {/* Side Tall Video */}
        <div className='col-span-2 row-span-3 relative rounded-xl overflow-hidden'>
          <video
            src="/menu.mp4"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>

        {/* Small Cake Image */}
        <div className='relative rounded-xl overflow-hidden'>
          <Image
            src="/cake.jpg"
            fill
            alt="cake"
            className="object-cover"
          />
        </div>

        {/* Small Brownie Image */}
        <div className='relative rounded-xl overflow-hidden'>
          <Image
            src="/brownie.jpg"
            fill
            alt="brownie"
            className="object-cover"
          />
        </div>

      </div>
    </section>
  )
}


export default Gallery
