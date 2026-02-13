import HeroHeading from '@/components/customer/HeroHeading'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute bottom-0 md:top-0 left-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
     <HeroHeading />
    </section>
  )
}

export default Hero
