import CanDoHeader from '@/components/customer/CanDoHeader';
import CategoryCard from '@/components/customer/CategoryCard'
import { connectDB } from '@/lib/config/db';
import { Product } from '@/lib/models/ProductSchema';
import { ProductType } from '@/type';
import React from 'react'

const Categories = async () => {

  await connectDB()
  const res = await Product.find({type: "menu"}).lean()

  const products = JSON.parse(JSON.stringify(res))

  const cake = products.filter((item: ProductType) => item.category.en.toLowerCase() === "cake")
  const cupcake = products.filter((item: ProductType) => item.category.en.toLowerCase() === "cupcake")
  const dates = products.filter((item: ProductType) => item.category.en.toLowerCase() === "dates")
  const cookies = products.filter((item: ProductType) =>item.category.en.toLowerCase() === "cookies")

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
