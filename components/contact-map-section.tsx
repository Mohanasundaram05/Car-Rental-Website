"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation, Clock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactMapSection() {
  const locations = [
    {
      id: "Coimbatore",
      name: "Coimbatore Headquarters",
      address: "123 Business District, Mumbai, Maharashtra 400001",
      phone: "+91 98765 43210",
      hours: "Mon-Fri: 9 AM - 8 PM, Sat: 9 AM - 6 PM",
      coordinates: { lat: 19.076, lng: 72.8777 },
      isHeadquarters: true,
    },
    {
      id: "delhi",
      name: "Delhi Branch",
      address: "456 Connaught Place, New Delhi 110001",
      phone: "+91 98765 43211",
      hours: "Mon-Fri: 9 AM - 8 PM, Sat: 9 AM - 6 PM",
      coordinates: { lat: 28.6139, lng: 77.209 },
      isHeadquarters: false,
    },
    {
      id: "bangalore",
      name: "Bangalore Branch",
      address: "789 MG Road, Bangalore 560001",
      phone: "+91 98765 43212",
      hours: "Mon-Fri: 9 AM - 8 PM, Sat: 9 AM - 6 PM",
      coordinates: { lat: 12.9716, lng: 77.5946 },
      isHeadquarters: false,
    },
  ]

  const handleGetDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Find Us on the <span className="text-yellow-500">Map</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Visit any of our convenient locations across India for personalized service and support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-96 lg:h-full min-h-[400px]">
              {/* Embedded Google Map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.082502006147566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cruvix Office Locations"
                className="rounded-xl"
              ></iframe>

              {/* Map Overlay */}
              <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Our Locations</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {location.name}
                      {location.isHeadquarters && (
                        <span className="ml-2 text-xs bg-yellow-500 text-gray-900 px-2 py-1 rounded-full font-medium">
                          HQ
                        </span>
                      )}
                    </h3>
                  </div>
                  <Button
                    onClick={() => handleGetDirections(location.address)}
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Directions
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-400">{location.address}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-400">{location.phone}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-400">{location.hours}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Additional Information */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-yellow-200 dark:border-gray-600">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Planning a Visit?</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We recommend calling ahead to ensure our team is available to assist you with your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Visit
                </Button>
                <Button variant="outline" className="flex-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  View All Locations
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
