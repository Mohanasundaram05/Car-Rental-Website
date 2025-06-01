"use client"
import { CarCard } from "@/components/car-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { carsData } from "@/lib/car-data"

// Get first 6 cars for popular section
const popularCars = carsData.slice(0, 6)

export function PopularCarsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Popular Cars</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose from our wide selection of premium vehicles
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCars.map((car, index) => (
            <ScrollReveal key={car.id} delay={index * 0.1}>
              <CarCard car={car} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
