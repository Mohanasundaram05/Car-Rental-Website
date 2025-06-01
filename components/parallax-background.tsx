"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface ParallaxBackgroundProps {
  children: ReactNode
  backgroundImage?: string
  speed?: number
  overlay?: boolean
  className?: string
}

export function ParallaxBackground({
  children,
  backgroundImage,
  speed = 0.5,
  overlay = true,
  className = "",
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            y,
            opacity,
          }}
        />
      )}

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 dark:from-black/40 dark:via-black/20 dark:to-black/40" />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
