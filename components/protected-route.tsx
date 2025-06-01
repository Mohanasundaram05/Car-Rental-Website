"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "premium" | "user"
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredRole = "user", redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectTo)
    } else if (!isLoading && user && requiredRole) {
      const roleHierarchy = { user: 1, premium: 2, admin: 3 }
      const userLevel = roleHierarchy[user.role]
      const requiredLevel = roleHierarchy[requiredRole]

      if (userLevel < requiredLevel) {
        router.push("/dashboard") // Redirect to regular dashboard if insufficient permissions
      }
    }
  }, [user, isLoading, requiredRole, router, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const roleHierarchy = { user: 1, premium: 2, admin: 3 }
  const userLevel = roleHierarchy[user.role]
  const requiredLevel = roleHierarchy[requiredRole]

  if (userLevel < requiredLevel) {
    return null
  }

  return <>{children}</>
}
