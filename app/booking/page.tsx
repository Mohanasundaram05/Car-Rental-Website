"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useToast } from "@/hooks/use-toast"
import { Calendar, MapPin, User, Mail, Phone } from "lucide-react"

export default function BookingPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    car: "",
    pickupDate: "",
    dropoffDate: "",
    pickupLocation: "",
    name: "",
    email: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.car || !formData.pickupDate || !formData.dropoffDate || !formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Show success message
    toast({
      title: "Booking Successful!",
      description: "Your car rental booking has been confirmed. We'll contact you shortly.",
    })

    // Reset form
    setFormData({
      car: "",
      pickupDate: "",
      dropoffDate: "",
      pickupLocation: "",
      name: "",
      email: "",
      phone: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Book Your Car</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Complete your booking in just a few steps</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.div
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-gray-900/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Car Selection */}
              <div>
                <Label htmlFor="car" className="flex items-center space-x-2 mb-2 text-gray-700 dark:text-gray-300">
                  <Calendar className="h-4 w-4" />
                  <span>Select Car *</span>
                </Label>
                <Select value={formData.car} onValueChange={(value) => handleInputChange("car", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder="Choose your car" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bmw-x5">Rolls-Royce Phantom - ₹9,999/day</SelectItem>
                    <SelectItem value="mercedes-c-class">Mercedes S-Class - ₹8,499/day</SelectItem>
                    <SelectItem value="audi-a4">Audi RS 7 Mansory - ₹7,499/day</SelectItem>
                    <SelectItem value="toyota-camry">Lamborghini Urus SE - ₹5,999/day</SelectItem>
                    <SelectItem value="honda-crv">Bentley Continental GT - ₹6,799/day</SelectItem>
                    <SelectItem value="tesla-model3">Porsche 911 GT3 RS - ₹9,199/day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="pickupDate"
                    className="flex items-center space-x-2 mb-2 text-gray-700 dark:text-gray-300"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Pickup Date *</span>
                  </Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="dropoffDate"
                    className="flex items-center space-x-2 mb-2 text-gray-700 dark:text-gray-300"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Drop-off Date *</span>
                  </Label>
                  <Input
                    id="dropoffDate"
                    type="date"
                    value={formData.dropoffDate}
                    onChange={(e) => handleInputChange("dropoffDate", e.target.value)}
                    min={formData.pickupDate || new Date().toISOString().split("T")[0]}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {/* Pickup Location */}
              <div>
                <Label
                  htmlFor="pickupLocation"
                  className="flex items-center space-x-2 mb-2 text-gray-700 dark:text-gray-300"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Pickup Location *</span>
                </Label>
                <Select
                  value={formData.pickupLocation}
                  onValueChange={(value) => handleInputChange("pickupLocation", value)}
                >
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="downtown">Downtown Office</SelectItem>
                    <SelectItem value="airport">Airport Terminal</SelectItem>
                    <SelectItem value="north-branch">North Branch</SelectItem>
                    <SelectItem value="south-branch">South Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Personal Information */}
              <div className="border-t dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="flex items-center space-x-2 mb-2 text-gray-700 dark:text-gray-300">
                      <User className="h-4 w-4" />
                      <span>Full Name *</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="flex items-center space-x-2 mb-2 text-gray-700 dark:text-gray-300"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email Address *</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Label htmlFor="phone" className="flex items-center space-x-2 mb-2 text-gray-700 dark:text-gray-300">
                    <Phone className="h-4 w-4" />
                    <span>Phone Number</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.div className="pt-6" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-lg py-4 rounded-xl transition-all duration-300"
                >
                  Complete Booking
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  )
}
