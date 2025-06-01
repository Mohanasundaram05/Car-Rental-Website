import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ParallaxNavbar } from "@/components/parallax-navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { ChatProvider } from "@/lib/chat-context"
import { ChatbotProvider } from "@/lib/chatbot-context"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { Toaster } from "@/components/ui/toaster"
import { PageTransition } from "@/components/page-transition"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cruvix - Car Rental Service",
  description: "Drive your dream car today with our premium car rental service",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <AuthProvider>
            <ChatProvider>
              <ChatbotProvider>
                <ParallaxNavbar />
                <PageTransition>
                  <main>{children}</main>
                </PageTransition>
                <Footer />
                <AIChatWidget />
                <Toaster />
              </ChatbotProvider>
            </ChatProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
