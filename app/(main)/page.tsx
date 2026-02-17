import Language from '@/components/customer/Language'
import AboutUs from '@/sections/AboutUs'
import CanDo from '@/sections/CanDo'
import Categories from '@/sections/Categories'
import Hero from '@/sections/Hero'
import Review from '@/sections/Review'
import React from 'react'

const Home = () => {
  return (
    <main>
      <Language />
      <Hero />
      <CanDo />
      <AboutUs />
      <Categories />
      <Review />
    </main>
  )
}

export default Home
