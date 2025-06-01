"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

interface PersonalityConfig {
  name: string
  style: "professional" | "friendly" | "casual" | "enthusiastic"
  tone: "formal" | "informal" | "helpful" | "empathetic"
  verbosity: "brief" | "medium" | "detailed"
  useEmojis: boolean
  proactiveHelp: boolean
  responseDelay: number
  greeting: string
  fallbackMessage: string
  escalationThreshold: number
  confidenceThreshold: number
}

interface ChatbotContextProps {
  messages: { text: string; sender: "user" | "bot" }[]
  addMessage: (text: string, sender: "user" | "bot") => void
  personality: PersonalityConfig
  updatePersonality: (config: Partial<PersonalityConfig>) => void
  isTyping: boolean
  processMessage: (message: string) => Promise<{
    text: string
    intent: string
    confidence: number
    requiresHuman: boolean
    suggestedActions?: string[]
    followUpQuestions?: string[]
  }>
  resetConversation: () => void
}

// Default personality configuration
const defaultPersonality: PersonalityConfig = {
  name: "DriveBot",
  style: "friendly",
  tone: "helpful",
  verbosity: "medium",
  useEmojis: true,
  proactiveHelp: true,
  responseDelay: 1500,
  greeting: "Hi! I'm DriveBot, your AI assistant. How can I help you with car rentals today?",
  fallbackMessage:
    "I'm sorry, I don't have information about that. Would you like me to connect you with a human agent?",
  escalationThreshold: 3,
  confidenceThreshold: 0.7,
}

const ChatbotContext = createContext<ChatbotContextProps | undefined>(undefined)

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])
  const [personality, setPersonality] = useState<PersonalityConfig>(defaultPersonality)
  const [isTyping, setIsTyping] = useState(false)

  // Load personality from localStorage on mount
  useEffect(() => {
    const savedPersonality = localStorage.getItem("chatbot-personality")
    if (savedPersonality) {
      try {
        const parsed = JSON.parse(savedPersonality)
        setPersonality({ ...defaultPersonality, ...parsed })
      } catch (error) {
        console.error("Failed to parse saved personality:", error)
      }
    }
  }, [])

  const addMessage = (text: string, sender: "user" | "bot") => {
    setMessages([...messages, { text, sender }])
  }

  const updatePersonality = (config: Partial<PersonalityConfig>) => {
    const newPersonality = { ...personality, ...config }
    setPersonality(newPersonality)

    // Save to localStorage
    localStorage.setItem("chatbot-personality", JSON.stringify(newPersonality))
  }

  // Enhanced message processing with personality
  const processMessage = async (message: string) => {
    setIsTyping(true)

    // Use configured response delay
    await new Promise((resolve) => setTimeout(resolve, personality.responseDelay))

    // Simple keyword matching from knowledge base
    let bestMatch = {
      text: personality.fallbackMessage,
      intent: "unknown",
      confidence: 0.3,
      requiresHuman: true,
      suggestedActions: ["Connect to human agent", "Ask another question"],
      followUpQuestions: ["What cars do you offer?", "How does the booking process work?"],
    }

    // Find best match in knowledge base
    let highestConfidence = 0

    for (const entry of knowledgeBase) {
      const query = entry.query.toLowerCase()
      const userMessage = message.toLowerCase()

      // Simple matching algorithm
      if (userMessage.includes(query) || query.includes(userMessage)) {
        const confidence = userMessage.includes(query) ? 0.9 : 0.7

        if (confidence > highestConfidence) {
          highestConfidence = confidence

          // Apply personality to response
          let response = entry.response

          // Add emojis if enabled
          if (personality.useEmojis) {
            if (entry.query.includes("price") || entry.query.includes("rate")) {
              response += " 💰"
            } else if (entry.query.includes("car") || entry.query.includes("vehicle")) {
              response += " 🚗"
            } else if (entry.query.includes("help") || entry.query.includes("support")) {
              response += " 🤝"
            }
          }

          // Adjust verbosity
          if (personality.verbosity === "brief") {
            response = response.split(".")[0] + "."
          } else if (personality.verbosity === "detailed") {
            response += " Would you like me to provide more specific information about this?"
          }

          // Apply style
          if (personality.style === "enthusiastic") {
            response = response.replace(/\./g, "!")
          } else if (personality.style === "professional") {
            response = "I'd be happy to assist you. " + response
          }

          bestMatch = {
            text: response,
            intent: query,
            confidence: confidence,
            requiresHuman: confidence < personality.confidenceThreshold,
            suggestedActions: personality.proactiveHelp ? ["Check pricing", "Browse cars", "Book now"] : [],
            followUpQuestions: personality.proactiveHelp
              ? ["What documents do I need?", "Do you offer insurance?", "What are your business hours?"]
              : [],
          }
        }
      }
    }

    setIsTyping(false)
    return bestMatch
  }

  // Reset conversation with personalized greeting
  const resetConversation = () => {
    setMessages([{ text: personality.greeting, sender: "bot" }])
  }

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        addMessage,
        personality,
        updatePersonality,
        isTyping,
        processMessage,
        resetConversation,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  )
}

export const useChatbot = () => {
  const context = useContext(ChatbotContext)
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider")
  }
  return context
}

// Knowledge Base
export const knowledgeBase = [
  {
    query: "What types of cars do you offer?",
    response: "We offer a wide range of cars including economy, luxury, and sports cars.",
  },
  {
    query: "What are your rental rates?",
    response: "Our rental rates start from ₹4,999/day. The exact price depends on the car type and rental duration.",
  },
  {
    query: "How old do I have to be to rent a car?",
    response: "You must be at least 21 years old to rent a car from us.",
  },
  {
    query: "What documents do I need to rent a car?",
    response:
      "You will need a valid driver's license, a passport or Aadhar card, and a credit or debit card for the security deposit.",
  },
  {
    query: "Do you offer insurance?",
    response: "Yes, we offer comprehensive insurance options. Please inquire about the details when booking.",
  },
  {
    query: "What is your cancellation policy?",
    response:
      "You can cancel your booking up to 48 hours before the rental start time for a full refund. Cancellations within 48 hours may incur a fee.",
  },
  {
    query: "Can I return the car to a different location?",
    response: "Yes, we offer one-way rentals to select locations. Additional fees may apply.",
  },
  {
    query: "What are your hours of operation?",
    response: "We are open from 9 AM to 6 PM, Monday to Saturday.",
  },
  {
    query: "How can I contact you?",
    response: "You can reach us by phone at 080-1234-5678 or by email at support@rentease.com.",
  },
  {
    query: "Where are you located?",
    response: "We have several locations across the city. Please check our website for the nearest branch.",
  },
  {
    query: "Economy car prices?",
    response: "Economy cars: ₹4,999-6,799/day",
  },
  {
    query: "Luxury car prices?",
    response: "Luxury cars: ₹8,499-9,999/day",
  },
  {
    query: "Sports car prices?",
    response: "Sports cars: ₹7,499-9,199/day",
  },
  {
    query: "Do you accept international driver's licenses?",
    response: "Yes, we accept valid international driver's licenses.",
  },
  {
    query: "Are there mileage restrictions?",
    response:
      "Our rentals typically include unlimited mileage. Please check the specific terms for your chosen vehicle.",
  },
  {
    query: "What payment methods do you accept?",
    response: "We accept credit cards, debit cards, UPI, and net banking.",
  },
  {
    query: "Can I extend my rental?",
    response:
      "Yes, you can extend your rental, subject to availability. Please contact us as soon as possible to arrange an extension.",
  },
  {
    query: "What happens if the car breaks down?",
    response: "We provide 24/7 roadside assistance. Please call our emergency hotline for immediate support.",
  },
  {
    query: "Do you offer discounts?",
    response:
      "We offer various discounts and promotions throughout the year. Check our website or contact us for current offers.",
  },
  {
    query: "Are child seats available?",
    response: "Yes, child seats are available upon request. Please reserve in advance to ensure availability.",
  },
  {
    query: "Tell me about pricing assistance",
    response:
      "We offer various car options to fit your budget. Economy cars start at ₹4,999/day, while luxury and sports cars are priced higher. We accept various Indian payment methods like UPI, net banking, and credit/debit cards.",
  },
]
