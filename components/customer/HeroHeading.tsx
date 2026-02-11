'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playFair } from '@/lib/fonts'

const HeroHeading = () => {
  const [showFirst, setShowFirst] = useState(true)

  // toggle headings every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst(prev => !prev)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // animation for each character
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  }

  // animation for the container to stagger children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  }

  // split string into array of characters
  const splitText = (text: string) => text.split('')

  const firstHeading = ["Amas", "Bakery"]
  const secondHeading = ["Flavor", "Haven"]

  const renderHeading = (words: string[]) => (
    <motion.h1
      className={`${playFair.className} text-8xl w-full md:text-9xl uppercase font-bold text-white px-4`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {words.map((word, wi) => (
        <div key={wi}>
        <span  className="inline-block mr-2">
          {splitText(word).map((char, i) => (
            <motion.span key={i} variants={charVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
        </span>
        <br />
        </div>
      ))}
    </motion.h1>
  )

  return (
    <div className="absolute top-1/2 left-1/2 transform w-full -translate-x-1/2 -translate-y-1/2 text-center z-40">
      <AnimatePresence mode="wait">
        {showFirst ? (
          <motion.div key="amas">{renderHeading(firstHeading)}</motion.div>
        ) : (
          <motion.div key="flavor">{renderHeading(secondHeading)}</motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeroHeading
