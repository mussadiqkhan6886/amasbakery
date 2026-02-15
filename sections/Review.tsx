import React from 'react'
import CanDoHeader from '@/components/customer/CanDoHeader'
import ReviewsSwiper from '@/components/customer/ReviewsSwiper'
import Link from 'next/link';
import { ReviewSchema } from '@/lib/models/ReviewSchema';

const Review = async () => {

  const res = await ReviewSchema.find({}).lean()
  const reviews = JSON.parse(JSON.stringify(res))

  return (
    <section id='reviews' className="my-24 bg-main py-10 text-light px-6">
      <CanDoHeader en='Reviews' ar="ما يقوله عملاؤنا" />
      <ReviewsSwiper data={reviews} />
    </section>
  )
}

export default Review
