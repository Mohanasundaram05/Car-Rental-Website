"use client"

import { motion } from "framer-motion"
import { Car, Users, Award, Shield } from "lucide-react"
import { ParallaxBackground } from "@/components/parallax-background"

export function AboutHeroSection() {
  const stats = [
    { icon: Car, label: "Cars Available", value: "500+" },
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Shield, label: "Safety Rating", value: "5 Star" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParallaxBackground imageUrl="/placeholder.svg?height=1080&width=1920" className="absolute inset-0" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About <span className="text-yellow-500">Cruvix</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in premium car rental services across India. We're committed to providing exceptional
            vehicles and outstanding customer experiences.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/20"
            >
              <stat.icon className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
