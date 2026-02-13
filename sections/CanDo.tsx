import CanDoHeader from '@/components/customer/CanDoHeader'
import CanDoVideoHeading from '@/components/customer/CanDoVideoHeading'
import Link from 'next/link'

const CanDo = () => {
  return (
    <section className='my-20 max-w-8xl mx-auto'>
       <CanDoHeader en=' What can we do for you' ar='ما الذي يمكننا تقديمه لكم؟' />
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2'>
            <Link href={"/collections/menu"} className='relative'>
                <div className='absolute inset-0 w-full h-full bg-black/20' />
                <video className=' md:h-[88vh] w-full object-cover object-center'  src={"/menu.mp4"} muted playsInline autoPlay loop />
                <CanDoVideoHeading header={`Menu`} ar="قائمة طعام " />
            </Link>
            <Link href={"/collections/occasion-cakes"} className='relative'>
                <div className='absolute inset-0 w-full h-full bg-black/20' />
                <video className='md:h-[88vh] w-full object-cover object-center'  src={"/occasion.mp4"} muted playsInline autoPlay loop />
                <CanDoVideoHeading header={`Occasion Cakes `} ar='كعك المناسبات ' />
            </Link>
            <Link href={"/customize-your-cake"} className='relative'>
                <div className='absolute inset-0 w-full h-full bg-black/20' />
                <video className='md:h-[88vh] w-full object-cover object-center'  src={"/customize.mp4"} muted playsInline autoPlay loop />
                <CanDoVideoHeading header={`Customize Your Cake`} ar='تخصيص الكعكة الخاصة بك ' />
            </Link>
        </section>
    </section>
  )
}

export default CanDo
