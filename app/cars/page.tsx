"use client"

import React from "react"
import { useState } from "react"
import { CarCard } from "@/components/car-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ParallaxBreadcrumb } from "@/components/parallax-breadcrumb"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { carsData } from "@/lib/car-data"
import { formatPriceRange } from "@/lib/currency-utils"

export default function CarsPage() {
  const [filteredCars, setFilteredCars] = useState(carsData)
  const [carType, setCarType] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [priceRange, setPriceRange] = useState([0, 15000])

  const filterCars = () => {
    let filtered = carsData

    // Filter by car type
    if (carType !== "all") {
      filtered = filtered.filter((car) => car.type?.toLowerCase() === carType.toLowerCase())
    }

    // Filter by price range
    filtered = filtered.filter((car) => car.price >= priceRange[0] && car.price <= priceRange[1])

    // Sort cars
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredCars(filtered)
  }

  // Apply filters whenever filter values change
  React.useEffect(() => {
    filterCars()
  }, [carType, sortBy, priceRange])

  const breadcrumbItems = [{ name: "Cars", href: "/cars" }]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ParallaxBreadcrumb
        items={breadcrumbItems}
        title="Browse Our Cars"
        subtitle="Find the perfect vehicle for your journey from our extensive collection"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <ScrollReveal delay={0.2}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-900/20 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Car Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Car Type</label>
                <Select value={carType} onValueChange={setCarType}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range: {formatPriceRange(priceRange[0], priceRange[1])} per day
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={15000}
                  min={0}
                  step={500}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, index) => (
            <ScrollReveal key={car.id} delay={index * 0.1}>
              <CarCard car={car} />
            </ScrollReveal>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">No cars found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
