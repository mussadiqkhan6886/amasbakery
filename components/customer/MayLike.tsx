import { connectDB } from '@/lib/config/db'
import { Product } from '@/lib/models/ProductSchema'
import React from 'react'
import Card from './Card'
import MayLikeHeading from './MayLikeHeading'
import mongoose from 'mongoose'
import { ProductType } from '@/type'

interface MayLikeProps {
  type: string
  excludeIds?: string // single ID string
}

const MayLike = async ({ type, excludeIds }: MayLikeProps) => {
  await connectDB()

  const matchStage: any = { type: type }
  if (excludeIds) {
    // Convert string to ObjectId
    matchStage._id = { $ne: new mongoose.Types.ObjectId(excludeIds) }
  }

  const res = await Product.aggregate([
    { $match: matchStage },
    { $sample: { size: 8 } } // pick 4 random products
  ])

  const products = JSON.parse(JSON.stringify(res))
  

  if(products.length <= 0){
    return (
        <section>
        </section>
    )
  }

  return (
    <section>
      <MayLikeHeading en="You May Like" ar="قد ترغب" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item: ProductType) => (
          <Card item={item} key={item._id.toString()} />
        ))}
      </div>
    </section>
  )
}

export default MayLike
