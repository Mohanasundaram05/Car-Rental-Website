"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const testimonials = [
  {
    id: 1,
    name: "VAISHNAVI",
    avatar: "/ts1.png?height=60&width=60",
    rating: 5,
    review:
      "Amazing service! The car was in perfect condition and the booking process was seamless. Highly recommended!",
  },
  {
    id: 2,
    name: "BHUVI",
    avatar: "ts2.png?height=60&width=60",
    rating: 5,
    review:
      "Great selection of cars and excellent customer service. Will definitely use Cruvix again for my next trip.",
  },
  {
    id: 3,
    name: "ARCHANA",
    avatar: "/ts3.png?height=60&width=60",
    rating: 5,
    review: "Professional and reliable. The pickup was smooth and the car exceeded my expectations. Five stars!",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 0.2}>
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-900/20"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.review}"</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
