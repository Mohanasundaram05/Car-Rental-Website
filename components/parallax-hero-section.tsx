"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useEffect, useRef } from "react"

export function ParallaxHeroSection() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? resolvedTheme || theme : "light"

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.9])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  // Floating elements
  const float1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"])
  const float2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"])
  const float3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"])

  const backgroundImage =
    currentTheme === "dark"
      ? "url(/bg2.png?height=1080&width=1920&text=Parallax+Hero+Dark&bg=1a1a1a&color=ffffff)"
      : "url(/bg1.png?height=1080&width=1920&text=Parallax+Hero+Light)"

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer with Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage,
          y: backgroundY,
          scale,
        }}
      />

      {/* Animated Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30 dark:from-black/50 dark:via-black/30 dark:to-black/50"
        style={{ opacity: overlayOpacity }}
      />

      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-xl"
        style={{ y: float1Y }}
        animate={{
          x: [0, 30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-yellow-500/15 rounded-full blur-lg"
        style={{ y: float2Y }}
        animate={{
          x: [0, -20, 0],
          rotate: [0, -180, -360],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div
        className="absolute bottom-40 left-1/4 w-16 h-16 bg-yellow-500/20 rounded-full blur-md"
        style={{ y: float3Y }}
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Content with Parallax */}
      <motion.div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4" style={{ y: textY }}>
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="inline-block"
          >
            Drive Your
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="inline-block text-yellow-400"
          >
            Dream Car
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="inline-block"
          >
            Today
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-200 dark:text-gray-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          Experience luxury and comfort with our premium car rental service
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Button
              asChild
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
            >
              <Link href="/cars">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.7 }}
                >
                  Book Now
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator with Parallax */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        style={{
          y: useTransform(scrollYProgress, [0, 0.3], [0, 50]),
          opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center relative overflow-hidden">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
