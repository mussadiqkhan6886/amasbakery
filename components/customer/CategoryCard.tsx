import React from 'react'
import SwiperCard from './SwiperCard'
import Link from 'next/link'
import { playFair } from '@/lib/fonts'

interface Props {
    header: string
    link: string
    data: any
    delay: number
}

const CategoryCard = ({header, link, data, delay}: Props) => {
  return (
    <div className='rounded-md max-w-[500px] flex flex-col items-center justify-center bg-main/80 text-light'>
        <h4 className={`${playFair.className} p-1 ml-4 text-3xl`}>{header}</h4>
        <SwiperCard data={data} delay={delay} />
        <Link className='text-center underline italic block' href={"/"}>View All</Link>
    </div>
  )
}

export default CategoryCard
