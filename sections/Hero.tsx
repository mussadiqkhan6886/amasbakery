import HeroHeading from '@/components/customer/HeroHeading'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className='absolute inset-0 h-screen w-full bg-black/10 z-20' />
      <div className="bg-red-600 text-white absolute top-30 text-sm px-5 right-10 z-40 p-3 rounded-full"><span>Orders are closed</span></div>
      <Image alt='hero image amass bakery' priority fetchPriority='high' src="/hero.webp" fill className="object-cover object-center" />
     <HeroHeading />
    </section>
  )
}

export default Hero
