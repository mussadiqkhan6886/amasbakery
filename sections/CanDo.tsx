import CanDoHeader from '@/components/customer/CanDoHeader'
import CanDoVideoHeading from '@/components/customer/CanDoVideoHeading'
import Image from 'next/image'
import Link from 'next/link'

const CanDo = () => {
  return (
    <section className='my-20 max-w-8xl mx-auto'>
      <CanDoHeader en='What can we do for you' ar='ما الذي يمكننا تقديمه لكم؟' />
      
      <section className='grid grid-cols-1 md:grid-cols-6 mt-4 '>
        
        {/* Top 3 Videos: Each takes 2 columns out of 6 (Equates to 1/3) */}
        <Link href={"/collections/menu"} className='relative md:col-span-2 group overflow-hidden'>
          <div className='absolute inset-0 w-full h-full bg-black/20 z-10' />
          <video className='h-[60vh] md:h-[88vh] w-full object-cover transition-transform duration-700 group-hover:scale-105' src={"/menu.mp4"} muted playsInline autoPlay loop />
          <CanDoVideoHeading header={`Menu`} ar="قائمة طعام " />
        </Link>

        <Link href={"/collections/occasion-cakes"} className='relative md:col-span-2 group overflow-hidden'>
          <div className='absolute inset-0 w-full h-full bg-black/20 z-10' />
          <video className='h-[60vh] md:h-[88vh] w-full object-cover transition-transform duration-700 group-hover:scale-105' src={"/occasion.mp4"} muted playsInline autoPlay loop />
          <CanDoVideoHeading header={`Occasion Cakes `} ar='كعك المناسبات ' />
        </Link>

        <Link href={"/customize-your-cake"} className='relative md:col-span-2 group overflow-hidden'>
          <div className='absolute inset-0 w-full h-full bg-black/20 z-10' />
          <video className='h-[60vh] md:h-[88vh] w-full object-cover transition-transform duration-700 group-hover:scale-105' src={"/customize.mp4"} muted playsInline autoPlay loop />
          <CanDoVideoHeading header={`Customize Your Cake`} ar='تخصيص الكعكة الخاصة بك ' />
        </Link>

        {/* Bottom 2 Images: Each takes 3 columns out of 6 (Equates to 1.5/3 or 50% each) */}
        <Link className='relative md:col-span-3 group overflow-hidden' href={"/wedding-cake"}>
           <div className='absolute inset-0 w-full h-full bg-black/10 z-10' />
           <Image className='w-full h-[40vh] md:h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105' width={1200} height={800} src={"/weddin.webp"} alt='wedding cake' />
           <CanDoVideoHeading header={`Wedding Cakes`} ar='كعك الزفاف' />
        </Link>

        <Link className='relative md:col-span-3 group overflow-hidden' href={"/table-setup"}>
           <div className='absolute inset-0 w-full h-full bg-black/10 z-10' />
           <Image className='w-full h-[40vh] md:h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105' width={1200} height={800} src={"/setup.webp"} alt='table setup' />
           <CanDoVideoHeading header={`Table Setup`} ar='تنسيق الطاولات' />
        </Link>
        
      </section>
    </section>
  )
}

export default CanDo