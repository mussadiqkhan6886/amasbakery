import Language from '@/components/customer/Language'
import AboutUs from '@/sections/AboutUs'
import CanDo from '@/sections/CanDo'
import Categories from '@/sections/Categories'
import Gallery from '@/sections/Gallery'
import Hero from '@/sections/Hero'
import Review from '@/sections/Review'
import React from 'react'

const Home = () => {
  return (
    <main>
      <Language />
      <Hero />
      <AboutUs />
      <CanDo />
      <Categories />
      <Gallery />
      <Review />
    </main>
  )
}

export default Home
