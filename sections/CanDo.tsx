import ScrollFloat from '@/components/ui/HeadingScroll'
import { playFair } from '@/lib/fonts'
import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

const CanDo = () => {
  return (
    <section className='my-20 max-w-8xl mx-auto'>
       <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
        >
        What can we do for you
        </ScrollFloat>

        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2'>
            <div className='relative'>
                <div className='absolute inset-0 w-full h-full bg-black/20' />
                <video className='h-[88vh] w-full object-cover object-center'  src={"/menu.mp4"} muted playsInline autoPlay loop />
                <h3 className={`${playFair.className} flex gap-3  items-center text-3xl text-center bottom-1 left-1 absolute text-white z-40 `}>Menu <FiArrowUpRight /></h3>
            </div>
            <div className='relative'>
                <div className='absolute inset-0 w-full h-full bg-black/20' />
                <video className='h-[88vh] w-full object-cover object-center'  src={"/occasion.mp4"} muted playsInline autoPlay loop />
                <h3 className={`${playFair.className} flex gap-3  items-center text-3xl text-center bottom-1 left-1 absolute text-white z-40 `}>Occasion Cakes <FiArrowUpRight /></h3>
            </div>
            <div className='relative'>
                <div className='absolute inset-0 w-full h-full bg-black/20' />
                <video className='h-[88vh] w-full object-cover object-center'  src={"/customize.mp4"} muted playsInline autoPlay loop />
                <h3 className={`${playFair.className} flex gap-3  items-center text-3xl bottom-0 text-cente1 left-1 absolute text-white z-40 `}>Customize Your Cake <FiArrowUpRight /></h3>
            </div>
        </section>
    </section>
  )
}

export default CanDo
