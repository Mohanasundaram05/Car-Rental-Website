"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login, register, user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(loginData.email, loginData.password)
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        })
        router.push("/dashboard")
      } else {
        setError("Invalid email or password. Try: admin@Cruvix.com / password")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setIsLoading(true)

    try {
      const success = await register(registerData.email, registerData.password, registerData.name)
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to Cruvix! Your account has been created successfully.",
        })
        router.push("/dashboard")
      } else {
        setError("Failed to create account")
      }
    } catch (err) {
      setError("An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  if (user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="min-h-screen flex">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(/login.png?height=800&width=600&text=Login+Background)",
              filter: "brightness(0.8)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-gray-900/40 dark:from-yellow-500/10 dark:to-gray-900/60" />
          <div className="relative z-10 flex items-center justify-center p-12">
            <div className="text-white text-center">
              <motion.h2
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Welcome to Cruvix
              </motion.h2>
              <motion.p
                className="text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Your premium car rental experience awaits
              </motion.p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-800">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Demo Accounts Info */}
              <Alert className="mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                <CheckCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  <strong>Demo Accounts:</strong>
                  <br />
                  Admin: admin@Cruvix.com
                  <br />
                  Premium: premium@Cruvix.com
                  <br />
                  User: user@Cruvix.com
                  <br />
                  Password: password
                </AlertDescription>
              </Alert>

              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="login-email" className="flex items-center space-x-2 mb-2">
                          <Mail className="h-4 w-4" />
                          <span>Email Address</span>
                        </Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginData.email}
                          onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="login-password" className="flex items-center space-x-2 mb-2">
                          <Lock className="h-4 w-4" />
                          <span>Password</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                            className="h-12 pr-12"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-lg py-4 rounded-xl transition-all duration-300"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>Join Cruvix and start your premium car rental journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <Label htmlFor="register-name" className="flex items-center space-x-2 mb-2">
                          <User className="h-4 w-4" />
                          <span>Full Name</span>
                        </Label>
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={registerData.name}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, name: e.target.value }))}
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="register-email" className="flex items-center space-x-2 mb-2">
                          <Mail className="h-4 w-4" />
                          <span>Email Address</span>
                        </Label>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="Enter your email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="register-password" className="flex items-center space-x-2 mb-2">
                          <Lock className="h-4 w-4" />
                          <span>Password</span>
                        </Label>
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Create a password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="register-confirm-password" className="flex items-center space-x-2 mb-2">
                          <Lock className="h-4 w-4" />
                          <span>Confirm Password</span>
                        </Label>
                        <Input
                          id="register-confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          className="h-12"
                          required
                        />
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-lg py-4 rounded-xl transition-all duration-300"
                          disabled={isLoading}
                        >
                          {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
