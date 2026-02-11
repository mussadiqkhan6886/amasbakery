import ScrollReveal from '@/components/ui/AboutScroll'
import ScrollFloat from '@/components/ui/HeadingScroll'
import React from 'react'

const AboutUs = () => {
  return (
    <section className='h-full my-20 max-w-7xl mx-auto flex items-center justify-center flex-col gap-3'>
        <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
        >
        About Us
        </ScrollFloat>

        <ScrollReveal
        baseOpacity={1}
        enableBlur
        baseRotation={3}
        blurStrength={5}
        >
        At Ama’s Bakery, every creation is baked with love and passion.
        We craft delightful pastries, cakes, and treats that bring joy to every bite.
        Using only the finest ingredients, we blend tradition with a touch of modern artistry.
        
        Our mission is simple: to make every moment sweeter and every celebration memorable.
        Step in, indulge, and let your taste buds experience a little piece of happiness.
        </ScrollReveal>
    </section>
  )
}

export default AboutUs
