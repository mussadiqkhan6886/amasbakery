'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playFair } from '@/lib/fonts'
import { useLanguage } from '@/context/LanguageContext'

const HeroHeading = () => {
  const [showFirst, setShowFirst] = useState(true)
  const { lang, t } = useLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst(prev => !prev)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const charVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 }
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  }

  const splitText = (text: string) => text.split('')

  const firstHeading =
    lang === "en"
      ? ["Amas", "Bakery"]
      : ["مخبز", "أماس"]

  const secondHeading =
    lang === "en"
      ? ["Flavor", "Haven"]
      : ["ملاذ", "النكهات"]

  const renderHeading = (words: string[]) => (
  <motion.h1
    dir={lang === "ar" ? "rtl" : "ltr"}
    className={`${playFair.className} text-7xl md:text-9xl font-bold text-white px-4`}
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {words.map((word, wi) => (
      <div key={wi}>
        {lang === "en" ? (
          // 🔥 English → animate per character
          <span className="inline-block mx-2">
            {splitText(word).map((char, i) => (
              <motion.span
                key={i}
                variants={charVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ) : (
          // 🔥 Arabic → animate full word
          <motion.span
            variants={charVariants}
            className="inline-block mx-2"
          >
            {word}
          </motion.span>
        )}
      </div>
    ))}
  </motion.h1>
)


  return (
    <div className="absolute top-1/2 left-1/2 transform w-full -translate-x-1/2 -translate-y-1/2 text-center z-40">
      <AnimatePresence mode="wait">
        {showFirst ? (
          <motion.div key="amas">
            {renderHeading(firstHeading)}
          </motion.div>
        ) : (
          <motion.div key="flavor">
            {renderHeading(secondHeading)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeroHeading
