'use client'

import Link from 'next/link'
import { FiPhoneCall, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'

const SideBar = ({
  setShowSideBar,
  headerLinks
}: {
  setShowSideBar: (s: boolean) => void
  headerLinks: { name: string; link: string }[]
}) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-transparent backdrop-blur-lg z-40 h-screen"
        onClick={() => setShowSideBar(false)}
      />

      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
        className="
        bg-white
          fixed top-0 right-0
          h-screen w-72
          text-black
          shadow-2xl
          z-50
          p-6
          flex flex-col
        "
      >
        {/* Close Button */}
        <FiX
          size={22}
          className="self-end cursor-pointer hover:rotate-90 transition duration-300"
          onClick={() => setShowSideBar(false)}
        />

        {/* Links */}
        <nav className="flex flex-col gap-6 mt-10 text-lg">
          {headerLinks.map((link, i) => (
            <Link
              key={i}
              href={link.link}
              onClick={() => setShowSideBar(false)}
              className="
              
                transition
                duration-300
                hover:translate-x-2
              "
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Call Button */}
        <button className="
          mt-auto
          bg-green-500
          hover:bg-green-600
          transition
          p-3
          rounded-full
          flex items-center justify-center
          active:scale-110
        ">
          <FiPhoneCall size={18} />
        </button>
      </motion.aside>
    </>
  )
}

export default SideBar
