"use client"

import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Car, DollarSign, TrendingUp, Clock, Heart, Award, Users } from "lucide-react"
import Link from "next/link"
import { carsData } from "@/lib/car-data"

export default function DashboardPage() {
  const { user, bookings, favorites } = useAuth()

  if (!user) return null

  const upcomingBookings = bookings.filter((booking) => booking.status === "upcoming")
  const activeBookings = bookings.filter((booking) => booking.status === "active")
  const recentBookings = bookings.slice(0, 3)
  const favoritesCars = carsData.filter((car) => favorites.includes(car.id))

  const stats = [
    {
      title: "Total Bookings",
      value: user.stats.totalBookings,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Total Spent",
      value: `$${user.stats.totalSpent.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Favorite Cars",
      value: favorites.length,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      change: "+2",
      changeType: "positive" as const,
    },
    {
      title: "Membership Level",
      value: user.stats.membershipLevel,
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      change: "Gold",
      changeType: "neutral" as const,
    },
  ]

  const membershipProgress = {
    Bronze: 25,
    Silver: 50,
    Gold: 75,
    Platinum: 100,
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-6 text-gray-900"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
            <p className="text-gray-800">
              You have {upcomingBookings.length} upcoming booking{upcomingBookings.length !== 1 ? "s" : ""}
              {activeBookings.length > 0 &&
                ` and ${activeBookings.length} active rental${activeBookings.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-800">Member since</p>
            <p className="font-semibold">{new Date(user.dateJoined).toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span
                        className={`text-sm ${
                          stat.changeType === "positive"
                            ? "text-green-600"
                            : stat.changeType === "negative"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      {stat.changeType === "positive" && <TrendingUp className="h-4 w-4 text-green-600 ml-1" />}
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Bookings
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/bookings">View All</Link>
                </Button>
              </CardTitle>
              <CardDescription>Your latest car rental activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <img
                      src={booking.carImage || "/placeholder.svg"}
                      alt={booking.carName}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{booking.carName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(booking.startDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {booking.totalDays} days
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          booking.status === "completed"
                            ? "default"
                            : booking.status === "upcoming"
                              ? "secondary"
                              : booking.status === "active"
                                ? "default"
                                : "destructive"
                        }
                      >
                        {booking.status}
                      </Badge>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">${booking.totalCost}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No bookings yet</p>
                  <Button asChild className="mt-4">
                    <Link href="/cars">Browse Cars</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Membership Progress & Favorites */}
        <div className="space-y-6">
          {/* Membership Progress */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  Membership Progress
                </CardTitle>
                <CardDescription>Current level: {user.stats.membershipLevel}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={membershipProgress[user.stats.membershipLevel]} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Bronze</span>
                    <span>Silver</span>
                    <span>Gold</span>
                    <span>Platinum</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.stats.membershipLevel === "Platinum"
                        ? "You've reached the highest membership level! Enjoy all premium benefits."
                        : `Complete ${5 - (user.stats.totalBookings % 5)} more bookings to reach the next level.`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start">
                  <Link href="/cars">
                    <Car className="h-4 w-4 mr-2" />
                    Browse Cars
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/favorites">
                    <Heart className="h-4 w-4 mr-2" />
                    View Favorites ({favorites.length})
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/settings">
                    <Users className="h-4 w-4 mr-2" />
                    Account Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Favorite Cars Preview */}
      {favoritesCars.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Favorite Cars
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/favorites">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoritesCars.slice(0, 3).map((car) => (
                  <div
                    key={car.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={car.lightImage || "/placeholder.svg"}
                      alt={car.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{car.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">${car.price}/day</p>
                    <Button asChild size="sm" className="w-full">
                      <Link href={`/cars/${car.id}`}>View Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
