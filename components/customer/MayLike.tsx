import { connectDB } from '@/lib/config/db'
import { Product } from '@/lib/models/ProductSchema'
import React from 'react'
import Card from './Card'
import MayLikeHeading from './MayLikeHeading'
import mongoose from 'mongoose'

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

  const products = await Product.aggregate([
    { $match: matchStage },
    { $sample: { size: 4 } } // pick 4 random products
  ])

  if(products.length <= 0){
    return (
        <section>
        </section>
    )
  }

  return (
    <section>
      <MayLikeHeading en="You May Like" ar="قد ترغب" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map(item => (
          <Card item={item} key={item._id.toString()} />
        ))}
      </div>
    </section>
  )
}

export default MayLike
