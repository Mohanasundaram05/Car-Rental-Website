"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ParallaxImage } from "@/components/parallax-image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ShowcaseCarProps {
  id: number
  name: string
  lightImage: string
  darkImage: string
  price: number
  description: string
  tags: string[]
  reverse?: boolean
}

function ShowcaseCar({ id, name, lightImage, darkImage, price, description, tags, reverse = false }: ShowcaseCarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const imageX = useTransform(scrollYProgress, [0, 1], reverse ? [100, -100] : [-100, 100])
  const textX = useTransform(scrollYProgress, [0, 1], reverse ? [-50, 50] : [50, -50])
  const rotate = useTransform(scrollYProgress, [0, 1], reverse ? [-5, 5] : [5, -5])

  return (
    <div ref={ref} className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:grid-flow-col-dense" : ""}`}
        >
          {/* Image Section */}
          <motion.div className={`relative ${reverse ? "lg:col-start-2" : ""}`} style={{ x: imageX, rotate }}>
            <div className="relative">
              <ParallaxImage
                lightSrc={lightImage}
                darkSrc={darkImage}
                alt={name}
                width={600}
                height={400}
                className="w-full h-96 rounded-2xl shadow-2xl"
                parallaxSpeed={0.3}
                scaleOnScroll={true}
              />

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-yellow-500/15 rounded-full blur-lg"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div className={`space-y-6 ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`} style={{ x: textX }}>
            <ScrollReveal>
              <div className="flex gap-2 mb-4">
                {tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Badge className="bg-yellow-500 text-gray-900">{tag}</Badge>
                  </motion.div>
                ))}
              </div>

              <motion.h2
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {name}
              </motion.h2>

              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {description}
              </motion.p>

              <motion.div
                className="flex items-center justify-between pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/day</span>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-xl"
                  >
                    <Link href={`/cars/${id}`}>View Details</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export function ParallaxCarShowcase() {
  const showcaseCars = [
    {
      id: 1,
      name: "Rolls-Royce Phantom Luxury",
      lightImage: "/sh1.png?height=400&width=600&text=BMW+X5+Showcase+Light",
      darkImage: "/sh1.png?height=400&width=600&text=BMW+X5+Showcase+Dark&bg=1a1a1a&color=ffffff",
      price: 9999,
      description:
        "Experience the pinnacle of luxury with the Rolls-Royce Phantom. This premium SUV combines cutting-edge technology with unmatched comfort, making every journey an extraordinary experience.",
      tags: ["Luxury", "SUV", "Premium"],
    },
    {
      id: 6,
      name: "Porsche 911 GT3 RS",
      lightImage: "/sh2.png?height=400&width=600&text=Tesla+Model+3+Showcase+Light",
      darkImage: "/sh2.png?height=400&width=600&text=Tesla+Model+3+Showcase+Dark&bg=1a1a1a&color=ffffff",
      price: 9199,
      description:
        "Step into the future with the Porsche 911 GT3 RS. Revolutionary electric technology meets sleek design in this groundbreaking sedan that redefines sustainable luxury.",
      tags: ["Electric", "Innovation", "Eco-Friendly"],
    },
    {
      id: 7,
      name: "Ford Mustang GT",
      lightImage: "/sh3.png?height=400&width=600&text=Ford+Mustang+Showcase+Light",
      darkImage: "/sh3.png?height=400&width=600&text=Ford+Mustang+Showcase+Dark&bg=1a1a1a&color=ffffff",
      price: 7999,
      description:
        "Unleash your passion with the iconic Ford Mustang GT. Pure American muscle meets modern performance in this legendary sports car that turns every drive into an adventure.",
      tags: ["Sports", "Performance", "Iconic"],
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Featured Collection</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our handpicked selection of premium vehicles
            </p>
          </div>
        </ScrollReveal>
      </div>

      {showcaseCars.map((car, index) => (
        <ShowcaseCar key={car.id} {...car} reverse={index % 2 === 1} />
      ))}
    </section>
  )
}
