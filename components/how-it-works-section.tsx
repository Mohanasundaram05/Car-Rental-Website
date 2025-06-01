"use client"

import { Search, Calendar, Car } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const steps = [
  {
    icon: Search,
    title: "Choose a Car",
    description: "Browse our extensive collection of premium vehicles and find the perfect car for your needs.",
  },
  {
    icon: Calendar,
    title: "Book Online",
    description: "Select your dates, provide your details, and complete your booking in just a few clicks.",
  },
  {
    icon: Car,
    title: "Pick Up & Drive",
    description: "Collect your car from our convenient location and start your journey with confidence.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Rent a car in three simple steps
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 0.2}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6">
                  <step.icon className="h-8 w-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
