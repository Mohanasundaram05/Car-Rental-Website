"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface ThemeImageProps {
  lightSrc: string
  darkSrc: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  transitionType?: "fade" | "slide" | "scale" | "flip"
  duration?: number
}

export function ThemeImage({
  lightSrc,
  darkSrc,
  alt,
  width = 400,
  height = 300,
  className = "",
  priority = false,
  transitionType = "fade",
  duration = 0.5,
}: ThemeImageProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [imageKey, setImageKey] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      // Force re-render with new key when theme changes
      setImageKey((prev) => prev + 1)
    }
  }, [resolvedTheme, theme, mounted])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg ${className}`} style={{ width, height }} />
    )
  }

  const currentTheme = resolvedTheme || theme
  const imageSrc = currentTheme === "dark" ? darkSrc : lightSrc

  // Animation variants for different transition types
  const getAnimationVariants = () => {
    switch (transitionType) {
      case "slide":
        return {
          initial: { x: 100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -100, opacity: 0 },
        }
      case "scale":
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 1.2, opacity: 0 },
        }
      case "flip":
        return {
          initial: { rotateY: 90, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 },
        }
      case "fade":
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }
    }
  }

  const variants = getAnimationVariants()

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${imageKey}-${currentTheme}`}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{
            duration,
            ease: "easeInOut",
            type: "tween",
          }}
          className="w-full h-full"
        >
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
