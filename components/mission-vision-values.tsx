"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart } from "lucide-react"

export function MissionVisionValues() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To revolutionize car rental services in India by providing premium vehicles, exceptional customer service, and seamless booking experiences that exceed expectations.",
      color: "text-blue-500",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To become India's most trusted and innovative car rental platform, connecting travelers with their perfect vehicle while promoting sustainable and responsible mobility solutions.",
      color: "text-green-500",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Integrity, Excellence, Innovation, and Customer-centricity drive everything we do. We believe in building lasting relationships through trust, transparency, and exceptional service quality.",
      color: "text-red-500",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">What Drives Us</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our commitment to excellence and innovation shapes every aspect of our service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-6 mx-auto">
                <value.icon className={`h-8 w-8 ${value.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
