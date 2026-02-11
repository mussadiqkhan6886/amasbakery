import Link from 'next/link'
import React from 'react'
import { FiPhoneCall, FiX } from 'react-icons/fi'

const SIdeBar = ({setShowSideBar, headerLinks}: {setShowSideBar: (s: boolean) => void, headerLinks: {name: string, link:string}[]}) => {
  return (
    <aside className='backdrop-blur-md flex flex-col w-full h-full'>
        <FiX onClick={() => setShowSideBar(false)} />
      {headerLinks.map((link, i) => (
        <Link
            key={i}
            href={link.link}
            className="hover:text-white transition duration-300 hover:scale-110 border-b border-transparent hover:border-normal"
        >
            {link.name}
        </Link>
        ))}
        <button className="bg-green-500/80 hover:bg-green-500 hover:scale-110 transition p-3 rounded-full backdrop-blur-md">
            <FiPhoneCall size={16} />
        </button>
    </aside>
  )
}

export default SIdeBar
