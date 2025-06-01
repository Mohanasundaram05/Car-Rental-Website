"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail } from "lucide-react"
import Image from "next/image"

export function TeamSection() {
  const teamMembers = [
    {
      name: "MOHANASUNDARAM",
      role: "Founder & CEO",
      image: "/tm1.png?height=300&width=300",
      bio: "15+ years in automotive industry with a passion for innovation and customer service excellence.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mohan@Cruvix.com",
      },
    },
    {
      name: "RAJESH KUMAR",
      role: "Co-Founder",
      image: "/tm2.png?height=300&width=300",
      bio: "Expert in fleet management and operational efficiency with a focus on sustainable mobility solutions.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "rajesh@Cruvix.com",
      },
    },
    {
      name: "MUTHUMANIKANDAN",
      role: "Technology Director",
      image: "/tm3.png?height=300&width=300",
      bio: "Tech visionary driving digital transformation in the car rental industry through innovative solutions.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "muthu@Cruvix.com",
      },
    },
    {
      name: "ARUN KUMAR",
      role: "Customer Experience Lead",
      image: "/tm4.png?height=300&width=300",
      bio: "Dedicated to creating exceptional customer journeys and building lasting relationships with our clients.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "arun@Cruvix.com",
      },
    },
    {
      name: "SANJAI VAASAN",
      role: "Head of Operations",
      image: "/tm5.png?height=300&width=300",
      bio: "15+ years in automotive industry with a passion for innovation and customer service excellence.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "vasan@Cruvix.com",
      },
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The passionate professionals behind Cruvix's success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.image || "/ts2.png"}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
              <p className="text-yellow-500 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{member.bio}</p>
              <div className="flex justify-center space-x-3">
                <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${member.social.email}`}
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
