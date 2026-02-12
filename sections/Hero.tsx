import HeroHeading from '@/components/customer/HeroHeading'
import { dancing, playFair } from '@/lib/fonts'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute bottom-0 md:top-0 left-0 w-full h-[50%] md:h-full object-cover"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

     <HeroHeading />

      <video
        className="absolute top-0 left-0 w-full h-[50%] object-cover md:hidden"
        src="/cake2.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </section>
  )
}

export default Hero
