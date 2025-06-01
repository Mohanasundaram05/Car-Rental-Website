"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface ParallaxContainerProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  offset?: number
}

export function ParallaxContainer({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  offset = 0,
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const range = [-100 * speed, 100 * speed]
  const transformX = useTransform(scrollYProgress, [0, 1], [range[1], range[0]])
  const transformY = useTransform(scrollYProgress, [0, 1], range)

  const getMotionStyle = () => {
    switch (direction) {
      case "left":
      case "right":
        return { x: transformX }
      case "up":
      case "down":
      default:
        return { y: transformY }
    }
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={getMotionStyle()}>{children}</motion.div>
    </div>
  )
}
