"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "admin" | "premium" | "user"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  phone?: string
  address?: string
  dateJoined: string
  lastLogin: string
  preferences: {
    theme: "light" | "dark" | "system"
    notifications: boolean
    newsletter: boolean
  }
  stats: {
    totalBookings: number
    totalSpent: number
    favoriteCarType: string
    membershipLevel: "Bronze" | "Silver" | "Gold" | "Platinum"
  }
}

export interface Booking {
  id: string
  carId: number
  carName: string
  carImage: string
  startDate: string
  endDate: string
  totalDays: number
  totalCost: number
  status: "upcoming" | "active" | "completed" | "cancelled"
  pickupLocation: string
  dropoffLocation: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<boolean>
  isLoading: boolean
  bookings: Booking[]
  favorites: number[]
  addToFavorites: (carId: number) => void
  removeFromFavorites: (carId: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@Cruvix.com",
    name: "Admin User",
    role: "admin",
    avatar: "/placeholder.svg?height=100&width=100&text=Admin",
    phone: "+1 (555) 123-4567",
    address: "123 Admin St, City, State 12345",
    dateJoined: "2023-01-15",
    lastLogin: "2024-01-20T10:30:00Z",
    preferences: {
      theme: "dark",
      notifications: true,
      newsletter: true,
    },
    stats: {
      totalBookings: 25,
      totalSpent: 3500,
      favoriteCarType: "Luxury",
      membershipLevel: "Platinum",
    },
  },
  {
    id: "2",
    email: "premium@Cruvix.com",
    name: "Premium User",
    role: "premium",
    avatar: "/placeholder.svg?height=100&width=100&text=Premium",
    phone: "+1 (555) 987-6543",
    address: "456 Premium Ave, City, State 12345",
    dateJoined: "2023-03-20",
    lastLogin: "2024-01-19T15:45:00Z",
    preferences: {
      theme: "light",
      notifications: true,
      newsletter: true,
    },
    stats: {
      totalBookings: 15,
      totalSpent: 2200,
      favoriteCarType: "Electric",
      membershipLevel: "Gold",
    },
  },
  {
    id: "3",
    email: "user@Cruvix.com",
    name: "Regular User",
    role: "user",
    avatar: "/placeholder.svg?height=100&width=100&text=User",
    phone: "+1 (555) 456-7890",
    address: "789 User Blvd, City, State 12345",
    dateJoined: "2023-06-10",
    lastLogin: "2024-01-18T09:20:00Z",
    preferences: {
      theme: "system",
      notifications: false,
      newsletter: true,
    },
    stats: {
      totalBookings: 5,
      totalSpent: 650,
      favoriteCarType: "Economy",
      membershipLevel: "Bronze",
    },
  },
]

const mockBookings: Booking[] = [
  {
    id: "1",
    carId: 1,
    carName: "Rolls-Royce Phantom",
    carImage: "/placeholder.svg?height=200&width=300&text=BMW+X5",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    totalDays: 4,
    totalCost: 480,
    status: "upcoming",
    pickupLocation: "Downtown Office",
    dropoffLocation: "Airport Terminal",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    carId: 6,
    carName: "Porsche 911 GT3 RS",
    carImage: "/placeholder.svg?height=200&width=300&text=Tesla+Model+3",
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    totalDays: 5,
    totalCost: 550,
    status: "completed",
    pickupLocation: "North Branch",
    dropoffLocation: "Downtown Office",
    createdAt: "2024-01-05T14:20:00Z",
  },
  {
    id: "3",
    carId: 2,
    carName: "Mercedes S-Class",
    carImage: "/placeholder.svg?height=200&width=300&text=Mercedes+C-Class",
    startDate: "2023-12-20",
    endDate: "2023-12-25",
    totalDays: 5,
    totalCost: 500,
    status: "completed",
    pickupLocation: "Airport Terminal",
    dropoffLocation: "South Branch",
    createdAt: "2023-12-15T16:45:00Z",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [favorites, setFavorites] = useState<number[]>([1, 6])
  const router = useRouter()

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("Cruvix_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setBookings(mockBookings.filter((booking) => userData.id === "1" || Math.random() > 0.5))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "password") {
      const updatedUser = { ...foundUser, lastLogin: new Date().toISOString() }
      setUser(updatedUser)
      localStorage.setItem("Cruvix_user", JSON.stringify(updatedUser))
      setBookings(mockBookings.filter((booking) => foundUser.id === "1" || Math.random() > 0.5))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: "user",
      dateJoined: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString(),
      preferences: {
        theme: "system",
        notifications: true,
        newsletter: false,
      },
      stats: {
        totalBookings: 0,
        totalSpent: 0,
        favoriteCarType: "Economy",
        membershipLevel: "Bronze",
      },
    }

    setUser(newUser)
    localStorage.setItem("Cruvix_user", JSON.stringify(newUser))
    setBookings([])
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    setBookings([])
    setFavorites([])
    localStorage.removeItem("Cruvix_user")
    router.push("/")
  }

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem("Cruvix_user", JSON.stringify(updatedUser))
    setIsLoading(false)
    return true
  }

  const addToFavorites = (carId: number) => {
    setFavorites((prev) => [...prev, carId])
  }

  const removeFromFavorites = (carId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== carId))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isLoading,
        bookings,
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
