"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Fuel, Users, Settings, Eye } from "lucide-react"
import { ThemeImage } from "@/components/theme-image"
import type { Car } from "@/lib/car-data"
import { useState } from "react"
import { formatIndianPrice } from "@/lib/currency-utils"

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/20 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/40 transition-all duration-300"
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      <div className="relative overflow-hidden group">
        <ThemeImage
          lightSrc={car.lightImage}
          darkSrc={car.darkImage}
          alt={car.name}
          width={400}
          height={300}
          className="w-full h-48"
          transitionType="slide"
          duration={0.6}
        />

        {/* Overlay on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full"
              >
                <Eye className="h-6 w-6 text-gray-900 dark:text-white" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tags with Staggered Animation */}
        <div className="absolute top-4 left-4 flex gap-2">
          {car.tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Badge className="bg-yellow-500 text-gray-900 shadow-lg">{tag}</Badge>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" layoutId={`car-title-${car.id}`}>
          {car.name}
        </motion.h3>

        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            {[
              { icon: Fuel, value: car.fuel },
              { icon: Settings, value: car.transmission },
              { icon: Users, value: car.seats.toString() },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div>
            <motion.span
              className="text-2xl font-bold text-gray-900 dark:text-white"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {formatIndianPrice(car.price)}
            </motion.span>
            <span className="text-gray-600 dark:text-gray-400">/day</span>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white"
            >
              <Link href={`/cars/${car.id}`}>View Details</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
