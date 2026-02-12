import CanDoHeader from '@/components/customer/CanDoHeader'
import CanDoVideoHeading from '@/components/customer/CanDoVideoHeading'
import ScrollFloat from '@/components/ui/HeadingScroll'
import { playFair } from '@/lib/fonts'
import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

const CanDo = () => {
  return (
    <section className='my-20 max-w-8xl mx-auto'>
       <CanDoHeader />
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2'>
            <div className='relative'>
                <div className='absolute inset-0 w-full h-full bg-black/20' />
                <video className='h-[88vh] w-full object-cover object-center'  src={"/menu.mp4"} muted playsInline autoPlay loop />
                <CanDoVideoHeading header='Menu ↗' ar="قائمة طعام ↗" />
            </div>
            <div className='relative'>
                <div className='absolute inset-0 w-full h-full bg-black/20' />
                <video className='h-[88vh] w-full object-cover object-center'  src={"/occasion.mp4"} muted playsInline autoPlay loop />
                <CanDoVideoHeading header='Occasion Cakes ↗' ar='كعك المناسبات ↗' />
            </div>
            <div className='relative'>
                <div className='absolute inset-0 w-full h-full bg-black/20' />
                <video className='h-[88vh] w-full object-cover object-center'  src={"/customize.mp4"} muted playsInline autoPlay loop />
                <CanDoVideoHeading header='Menu ↗' ar='تخصيص الكعكة الخاصة بك ↗' />

            </div>
        </section>
    </section>
  )
}

export default CanDo
