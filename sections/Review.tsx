'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import ScrollFloat from '@/components/ui/HeadingScroll'

const reviews = [
  {
    id: 1,
    review:
      "The chocolate cake was absolutely divine. Soft, rich, and perfectly balanced sweetness. Highly recommended!",
    name: "Ayesha Khan",
  },
  {
    id: 2,
    review:
      "Best bakery experience in town. The ambiance and pastries both feel luxurious and fresh.",
    name: "Omar Hassan",
  },
  {
    id: 3,
    review:
      "Their brownies melt in your mouth. I ordered once and now I’m a regular customer.",
    name: "Fatima Ali",
  },
  {
    id: 4,
    review:
      "Beautiful presentation and amazing taste. Perfect for special occasions.",
    name: "Zain Ahmed",
  },
  {
    id: 5,
    review:
      "The freshness is unmatched. You can taste the quality ingredients.",
    name: "Sara Malik",
  },
]

const Review = () => {
  return (
    <section className="my-24 bg-main py-10 text-light px-6">
      <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
        textClassName='text-light'
        >
        What Our Customer Says
        </ScrollFloat>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={20}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        className="w-full mt-10 max-w-6xl mx-auto"
      >
        {reviews.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-main/80 text-light p-10 rounded-2xl text-center h-62">
              <p className="text-lg italic leading-relaxed mb-6">
                “{item.review}”
              </p>
              <h4 className="text-xl font-semibold tracking-wide">
                — {item.name}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Review
