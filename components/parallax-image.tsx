"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ThemeImage } from "@/components/theme-image"

interface ParallaxImageProps {
  lightSrc: string
  darkSrc: string
  alt: string
  width?: number
  height?: number
  className?: string
  parallaxSpeed?: number
  scaleOnScroll?: boolean
  overlayOpacity?: number
}

export function ParallaxImage({
  lightSrc,
  darkSrc,
  alt,
  width = 600,
  height = 400,
  className = "",
  parallaxSpeed = 0.5,
  scaleOnScroll = false,
  overlayOpacity = 0.3,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [-50 * parallaxSpeed, 50 * parallaxSpeed])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, scale, opacity }}
        className="relative w-full h-full"
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        <ThemeImage
          lightSrc={lightSrc}
          darkSrc={darkSrc}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full"
          transitionType="scale"
          duration={0.8}
        />

        {/* Parallax Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [overlayOpacity, 0, overlayOpacity]),
          }}
        />
      </motion.div>
    </div>
  )
}
