"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ThemeImageGallery } from "@/components/theme-image-gallery";
import Link from "next/link";
import { Star, Fuel, Users, Settings, MapPin, Shield, Wifi } from "lucide-react";
import { carsData } from "@/lib/car-data";
import { useParams } from "next/navigation"; // ✅ import useParams

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>(); // ✅ get id from params
  const carId = Number.parseInt(id);
  const car = carsData.find((c) => c.id === carId) || carsData[0];

  const features = [
    { icon: Fuel, name: "Fuel Type", value: car.fuel },
    { icon: Settings, name: "Transmission", value: car.transmission },
    { icon: Users, name: "Seats", value: `${car.seats} Passengers` },
    { icon: MapPin, name: "GPS", value: "Included" },
    { icon: Shield, name: "Insurance", value: "Full Coverage" },
    { icon: Wifi, name: "WiFi", value: "Available" },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ScrollReveal>
            {car.gallery ? (
              <ThemeImageGallery lightImages={car.gallery.light} darkImages={car.gallery.dark} alt={car.name} />
            ) : (
              <div className="space-y-4">
                <motion.div
                  className="relative overflow-hidden rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={car.lightImage || "/placeholder.svg"} alt={car.name} className="w-full h-96 object-cover" />
                </motion.div>
              </div>
            )}
          </ScrollReveal>

          {/* Car Details */}
          <ScrollReveal delay={0.2}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-gray-900/20">
              <div className="flex gap-2 mb-4">
                {car.tags.map((tag) => (
                  <Badge key={tag} className="bg-yellow-500 text-gray-900">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{car.name}</h1>

              {car.rating && car.reviews && (
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(car.rating!)
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {car.rating} ({car.reviews} reviews)
                  </span>
                </div>
              )}

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ₹{car.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xl text-gray-600 dark:text-gray-400">/day</span>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feature.name}</p>
                      <p className="font-medium text-gray-900 dark:text-white">{feature.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {car.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{car.description}</p>
                </div>
              )}

              <Button
                asChild
                size="lg"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-lg py-4 rounded-xl hover:scale-105 transition-all duration-300"
              >
                <Link href={`/booking?car=${car.id}`}>Book This Car</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile Sticky CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 z-50">
          <Button asChild size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900">
            <Link href={`/booking?car=${car.id}`}>Book This Car - ₹{car.price.toLocaleString("en-IN")}/day</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
