import HeroHeading from '@/components/customer/HeroHeading'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* <video
        className="absolute bottom-0 md:top-0 left-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      /> */}
      <div className='absolute inset-0 h-screen w-full bg-black/10 z-20' />
      <Image alt='hero image amass bakery' priority fetchPriority='high' src="/hero.webp" fill className="object-cover object-center" />
     <HeroHeading />
    </section>
  )
}

export default Hero
