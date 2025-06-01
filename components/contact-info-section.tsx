"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactInfoSection() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our customer service team",
      details: ["+91 98765 43210", "+91 98765 43211", "Toll Free: 1800-123-4567"],
      color: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a message and we'll respond quickly",
      details: ["info@Cruvix.com", "support@Cruvix.com", "bookings@Cruvix.com"],
      color: "bg-green-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come to our office for in-person assistance",
      details: ["123 Business District", "Mumbai, Maharashtra 400001", "India"],
      color: "bg-purple-500",
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "We're here when you need us",
      details: ["Mon-Fri: 9:00 AM - 8:00 PM", "Saturday: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
      color: "bg-orange-500",
    },
  ]

  const officeLocations = [
    {
      city: "Mumbai",
      address: "123 Business District, Mumbai 400001",
      phone: "+91 98765 43210",
      type: "Headquarters",
    },
    {
      city: "Delhi",
      address: "456 Connaught Place, New Delhi 110001",
      phone: "+91 98765 43211",
      type: "Branch Office",
    },
    {
      city: "Bangalore",
      address: "789 MG Road, Bangalore 560001",
      phone: "+91 98765 43212",
      type: "Branch Office",
    },
    {
      city: "Chennai",
      address: "321 Anna Salai, Chennai 600002",
      phone: "+91 98765 43213",
      type: "Branch Office",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Multiple Ways to <span className="text-yellow-500">Connect</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose the most convenient way to reach out to us. We're committed to providing excellent customer service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${method.color} rounded-lg mb-4`}>
                <method.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{method.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
              <div className="space-y-1">
                {method.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Office Locations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Office Locations</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Visit us at any of our convenient locations across India for personalized service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {officeLocations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-yellow-200 dark:border-gray-600"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{location.city}</h4>
                <span className="text-xs bg-yellow-500 text-gray-900 px-2 py-1 rounded-full font-medium">
                  {location.type}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">{location.address}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">{location.phone}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
