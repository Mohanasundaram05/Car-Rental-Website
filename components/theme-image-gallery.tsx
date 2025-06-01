"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeImage } from "@/components/theme-image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThemeImageGalleryProps {
  lightImages: string[]
  darkImages: string[]
  alt: string
}

export function ThemeImageGallery({ lightImages, darkImages, alt }: ThemeImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % lightImages.length)
  }

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + lightImages.length) % lightImages.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image with Navigation */}
      <div className="relative group">
        <motion.div
          className="relative overflow-hidden rounded-xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <ThemeImage
                lightSrc={lightImages[selectedIndex]}
                darkSrc={darkImages[selectedIndex]}
                alt={`${alt} - Image ${selectedIndex + 1}`}
                width={600}
                height={400}
                className="w-full h-96"
                priority
                transitionType="scale"
                duration={0.6}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {lightImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {lightImages.length}
          </div>
        </motion.div>
      </div>

      {/* Thumbnail Grid with Staggered Animation */}
      <div className="grid grid-cols-3 gap-4">
        {lightImages.slice(0, 3).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-xl cursor-pointer border-2 transition-all duration-300 ${
              selectedIndex === index
                ? "border-yellow-500 ring-2 ring-yellow-500/20 shadow-lg"
                : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedIndex(index)}
          >
            <ThemeImage
              lightSrc={lightImages[index]}
              darkSrc={darkImages[index]}
              alt={`${alt} - Thumbnail ${index + 1}`}
              width={200}
              height={150}
              className="w-full h-32"
              transitionType="flip"
              duration={0.4}
            />

            {/* Selection Indicator */}
            <AnimatePresence>
              {selectedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-gray-900 rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Dots Indicator */}
      {lightImages.length > 3 && (
        <div className="flex justify-center space-x-2 pt-4">
          {lightImages.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index ? "bg-yellow-500 w-6" : "bg-gray-300 dark:bg-gray-600"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
