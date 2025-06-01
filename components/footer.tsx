import Link from "next/link"
import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold">Cruvix</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 mb-4">
              Your trusted partner for premium car rental services. Drive your dream car today with our wide selection
              of vehicles.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cars"
                  className="text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                >
                  Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-400 dark:text-gray-500">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-400 dark:text-gray-500">info@Cruvix.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-400 dark:text-gray-500">123 Main St, City, State</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500">© 2024 Cruvix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
