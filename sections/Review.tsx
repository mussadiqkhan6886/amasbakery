import React from 'react'
import CanDoHeader from '@/components/customer/CanDoHeader'
import ReviewsSwiper from '@/components/customer/ReviewsSwiper'
import Link from 'next/link';

export const reviews = [
  {
    id: 1,
    review: {
      en: "The chocolate cake was absolutely divine. Soft, rich, and perfectly balanced sweetness. Highly recommended!",
      ar: "كيك الشوكولاتة كان رائعًا للغاية. طري وغني ومتوازن الحلاوة بشكل مثالي. أنصح به بشدة!",
    },
    name: {
      en: "Ayesha Khan",
      ar: "عائشة خان",
    },
  },
  {
    id: 2,
    review: {
      en: "Best bakery experience in town. The ambiance and pastries both feel luxurious and fresh.",
      ar: "أفضل تجربة مخبز في المدينة. الأجواء والمعجنات كلاهما فاخر وطازج.",
    },
    name: {
      en: "Omar Hassan",
      ar: "عمر حسن",
    },
  },
  {
    id: 3,
    review: {
      en: "Their brownies melt in your mouth. I ordered once and now I’m a regular customer.",
      ar: "البراوني لديهم يذوب في الفم. طلبت مرة واحدة وأصبحت الآن زبونًا دائمًا.",
    },
    name: {
      en: "Fatima Ali",
      ar: "فاطمة علي",
    },
  },
  {
    id: 4,
    review: {
      en: "Beautiful presentation and amazing taste. Perfect for special occasions.",
      ar: "تقديم جميل وطعم رائع. مثالي للمناسبات الخاصة.",
    },
    name: {
      en: "Zain Ahmed",
      ar: "زين أحمد",
    },
  },
  {
    id: 5,
    review: {
      en: "The freshness is unmatched. You can taste the quality ingredients.",
      ar: "الطزاجة لا مثيل لها. يمكنك تذوق جودة المكونات في كل قطعة.",
    },
    name: {
      en: "Sara Malik",
      ar: "سارة مالك",
    },
  },
];


const Review = () => {
  return (
    <section id='reviews' className="my-24 bg-main py-10 text-light px-6">
      <CanDoHeader en='Reviews' ar="ما يقوله عملاؤنا" />
      <ReviewsSwiper data={reviews} />
      <Link className="mt-7 text-sm border border-light px-2 py-1.5 text-center block" href="/add-review">Add Review</Link>
    </section>
  )
}

export default Review
