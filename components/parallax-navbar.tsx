"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { Menu, X, Car, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChatSupportButton } from "@/components/chat-support-button"
import { useAuth } from "@/lib/auth-context"
import { usePathname } from "next/navigation"

export function ParallaxNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const { user } = useAuth()

  const { scrollY, scrollYProgress } = useScroll()

  // Parallax transforms
  const navbarY = useTransform(scrollY, [0, 100], [0, -10])
  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9])
  const logoRotate = useTransform(scrollY, [0, 500], [0, 360])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.95])
  const borderOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  // Track scroll direction and position
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up"
    setScrollDirection(direction)
    setLastScrollY(latest)
    setIsScrolled(latest > 50)
  })

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Cars",
      href: "/cars",
      submenu: [
        { name: "All Cars", href: "/cars" },
        { name: "Luxury", href: "/cars?type=luxury" },
        { name: "Electric", href: "/cars?type=electric" },
        { name: "Sports", href: "/cars?type=sports" },
      ],
    },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollDirection === "down" && isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ y: navbarY }}
    >
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${backgroundOpacity.get()})`,
        }}
      />

      <motion.div className="absolute inset-0 dark:bg-gray-900/95" style={{ opacity: backgroundOpacity }} />

      {/* Border with Parallax */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"
        style={{ opacity: borderOpacity }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Parallax */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              style={{ scale: logoScale, rotate: logoRotate }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Car className="h-8 w-8 text-yellow-500" />
            </motion.div>
            <motion.span
              className="text-xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Cruvix
            </motion.span>
          </Link>

          {/* Desktop Navigation with Parallax */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <NavItem
                key={item.name}
                item={item}
                index={index}
                isActive={pathname === item.href}
                scrollProgress={scrollYProgress}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <ChatSupportButton />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <ThemeToggle />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user ? (
                <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Controls */}
          <div className="md:hidden flex items-center space-x-2">
            <ChatSupportButton />
            <ThemeToggle />
            <motion.button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-900 dark:text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu with Parallax */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          navItems={navItems}
          onClose={() => setIsMobileMenuOpen(false)}
          pathname={pathname}
          user={user}
        />
      </div>
    </motion.nav>
  )
}

// Navigation Item Component with Parallax
function NavItem({
  item,
  index,
  isActive,
  scrollProgress,
}: {
  item: any
  index: number
  isActive: boolean
  scrollProgress: any
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [showSubmenu, setShowSubmenu] = useState(false)

  const itemY = useTransform(scrollProgress, [0, 0.1], [0, -index * 2])
  const itemOpacity = useTransform(scrollProgress, [0, 0.05], [1, 0.8])

  return (
    <motion.div
      className="relative"
      style={{ y: itemY, opacity: itemOpacity }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      onMouseEnter={() => {
        setIsHovered(true)
        if (item.submenu) setShowSubmenu(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        if (item.submenu) setShowSubmenu(false)
      }}
    >
      <Link
        href={item.href}
        className={`flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200 ${
          isActive ? "text-yellow-500 dark:text-yellow-400" : ""
        }`}
      >
        <span>{item.name}</span>
        {item.submenu && (
          <motion.div animate={{ rotate: showSubmenu ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        )}
      </Link>

      {/* Active Indicator */}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Submenu */}
      {item.submenu && (
        <motion.div
          className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{
            opacity: showSubmenu ? 1 : 0,
            y: showSubmenu ? 0 : -10,
            scale: showSubmenu ? 1 : 0.95,
          }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: showSubmenu ? "auto" : "none" }}
        >
          {item.submenu.map((subItem: any, subIndex: number) => (
            <motion.div
              key={subItem.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: showSubmenu ? 1 : 0, x: showSubmenu ? 0 : -10 }}
              transition={{ duration: 0.2, delay: subIndex * 0.05 }}
            >
              <Link
                href={subItem.href}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200"
              >
                {subItem.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

// Mobile Menu Component
function MobileMenu({
  isOpen,
  navItems,
  onClose,
  pathname,
  user,
}: {
  isOpen: boolean
  navItems: any[]
  onClose: () => void
  pathname: string
  user: any
}) {
  return (
    <motion.div
      className="md:hidden overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 mt-2 rounded-lg mx-4 overflow-hidden"
        initial={{ y: -20 }}
        animate={{ y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200 ${
                  pathname === item.href
                    ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500 dark:text-yellow-400"
                    : ""
                }`}
                onClick={onClose}
              >
                {item.name}
              </Link>

              {/* Mobile Submenu */}
              {item.submenu && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.submenu.map((subItem: any, subIndex: number) => (
                    <motion.div
                      key={subItem.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + subIndex * 0.05 }}
                    >
                      <Link
                        href={subItem.href}
                        className="block px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200"
                        onClick={onClose}
                      >
                        {subItem.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          <motion.div
            className="pt-4 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {user ? (
              <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                <Link href="/dashboard" onClick={onClose}>
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                <Link href="/login" onClick={onClose}>
                  Login
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
