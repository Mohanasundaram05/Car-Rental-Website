"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

interface Section {
  id: string
  name: string
}

interface ParallaxPageIndicatorProps {
  sections: Section[]
}

export function ParallaxPageIndicator({ sections }: ParallaxPageIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll()

  const indicatorY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block" style={{ opacity }}>
      <div className="flex flex-col space-y-3">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index
                ? "bg-yellow-500 scale-125"
                : "bg-gray-300 dark:bg-gray-600 hover:bg-yellow-400 dark:hover:bg-yellow-400"
            }`}
            onClick={() => scrollToSection(section.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* Tooltip */}
            <motion.div
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              initial={{ x: 10 }}
              whileHover={{ x: 0 }}
            >
              {section.name}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-100" />
            </motion.div>

            {/* Active Ring */}
            {activeSection === index && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-yellow-500"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Progress Line */}
      <motion.div
        className="absolute left-1/2 top-0 w-px bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"
        style={{ height: `${sections.length * 24}px` }}
      >
        <motion.div
          className="w-full bg-yellow-500 origin-top"
          style={{
            scaleY: useTransform(scrollYProgress, [0, 1], [0, 1]),
          }}
        />
      </motion.div>
    </motion.div>
  )
}
