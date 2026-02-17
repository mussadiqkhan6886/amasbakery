import Language from '@/components/customer/Language'
import { getAndResetOrderControl } from '@/lib/helper'
import AboutUs from '@/sections/AboutUs'
import CanDo from '@/sections/CanDo'
import Categories from '@/sections/Categories'
import Hero from '@/sections/Hero'
import Review from '@/sections/Review'
import React from 'react'

export const revalidate = 0; // Forces the page to run the logic on every request

const Home = async () => {
  const orderControl = await getAndResetOrderControl();
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
