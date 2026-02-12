import { playFair } from '@/lib/fonts'
import Link from 'next/link'
import React from 'react'
import { FiInstagram } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className='pt-7 flex flex-col'>
      <div className="text-center flex items-center justify-center p-2">
        <FiInstagram />
      </div>
      <div className='flex justify-between py-5 items-center'>
        <div className='flex flex-col gap-2 text-sm'>
          <Link href={"/"}>Shipping & Returns</Link>
          <Link href={"/"}>Terms & Condition</Link>
          <Link href={"/"}>Privacy Policy</Link>
        </div>
        <h6 className={`${playFair.className} text-7xl text-center `}>Amas bakery</h6>
        <div className="text-sm">
          <p>Based in Al Khobar</p>
          <p>Amas Bakery Est. 2023</p>
        </div>
      </div>
      <p className='text-center border-t border-main py-2'>&copy; All rights reserved {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
