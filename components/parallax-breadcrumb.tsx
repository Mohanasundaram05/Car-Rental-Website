"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

interface BreadcrumbItem {
  name: string
  href: string
}

interface ParallaxBreadcrumbProps {
  items: BreadcrumbItem[]
  title: string
  subtitle?: string
}

export function ParallaxBreadcrumb({ items, title, subtitle }: ParallaxBreadcrumbProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <motion.section
      ref={ref}
      className="relative pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      style={{ y, opacity, scale }}
    >
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          className="flex items-center space-x-2 text-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200"
          >
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>

          {items.map((item, index) => (
            <motion.div
              key={item.href}
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 mx-2" />
              <Link
                href={item.href}
                className="text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
          {subtitle && <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">{subtitle}</p>}
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-10 right-10 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-10 left-10 w-16 h-16 bg-yellow-500/15 rounded-full blur-lg"
          animate={{
            x: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />
      </div>
    </motion.section>
  )
}
