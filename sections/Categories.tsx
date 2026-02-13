import CanDoHeader from '@/components/customer/CanDoHeader';
import CategoryCard from '@/components/customer/CategoryCard'
import { cakes } from '@/lib/constant';
import React from 'react'

const Categories = () => {

  const cake = cakes.filter(item => item.category.en === "cake")
  const cupcake = cakes.filter(item => item.category.en === "cupcake")
  const dates = cakes.filter(item => item.category.en === "dates")
  const cookies = cakes.filter(item =>item.category.en === "cookies")
  return (
    <section className='my-20 max-w-8xl mx-auto'>
        <CanDoHeader en="Menu" ar='قائمة طعام' />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-7xl mx-auto place-items-center'>
            <CategoryCard delay={2000} header={{en: cake[0].category.en, ar: cake[0].category.ar}} link='/collections/menu' data={cake} />
            <CategoryCard delay={2000} header={{en: cupcake[0].category.en, ar: cupcake[0].category.ar}} link='/collections/menu' data={cupcake} />
            <CategoryCard delay={2100} header={{en: dates[0].category.en, ar: dates[0].category.ar}} link='/collections/menu' data={dates} />
            <CategoryCard delay={2100} header={{en: cookies[0].category.en, ar: cookies[0].category.ar}} link='/collections/menu' data={cookies} />
        </div>
    </section>
  )
}

export default Categories
