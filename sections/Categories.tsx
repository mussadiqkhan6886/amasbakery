import CategoriesSwiper from '@/components/customer/CategoriesSwiper'
import ScrollFloat from '@/components/ui/HeadingScroll'
import React from 'react'

const Categories = () => {
  return (
    <section className='my-20 max-w-8xl mx-auto'>
       <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
        >
        Categories
        </ScrollFloat>
        <CategoriesSwiper />
    </section>
  )
}

export default Categories
