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
    <div className='rounded-md w-full max-w-[500px] flex flex-col items-center justify-center bg-main/80 text-light'>
        <h4 className={`${playFair.className} p-1 ml-4 text-3xl`}>{header}</h4>
        <div className='w-full'>
        <SwiperCard data={data} delay={delay} />
        </div>
        <Link className='text-center border border-light px-3 py-1 rounded-md italic block mb-2 text-sm' href={"/"}>View All</Link>
    </div>
  )
}

export default CategoryCard
