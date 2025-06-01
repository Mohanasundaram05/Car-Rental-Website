"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useRef } from "react"

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/ft1.png?height=600&width=1200&text=CTA+Parallax+Background)",
          y: backgroundY,
          scale,
          filter: "brightness(0.6)",
        }}
      />

      {/* Animated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 dark:from-black/70 dark:to-black/50" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-yellow-500/20 rounded-full blur-xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-500/15 rounded-full blur-2xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
      />

      {/* Content with Parallax */}
      <motion.div className="relative z-10 max-w-4xl mx-auto text-center px-4" style={{ y: textY }}>
        <ScrollReveal>
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Hit the Road?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-200 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Start your journey today with our premium car rental service
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-lg px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25"
              >
                <Link href="/cars">Find Your Car</Link>
              </Button>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </motion.div>
    </section>
  )
}
