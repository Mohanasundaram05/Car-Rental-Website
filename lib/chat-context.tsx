"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"

export type MessageType = "text" | "image" | "file" | "system"
export type ChatStatus = "open" | "assigned" | "resolved" | "closed"
export type UserType = "user" | "agent" | "system"

export interface ChatMessage {
  id: string
  chatId: string
  content: string
  type: MessageType
  sender: UserType
  senderName: string
  senderAvatar?: string
  timestamp: string
  fileUrl?: string
  fileName?: string
  isRead: boolean
}

export interface ChatSession {
  id: string
  userId: string
  userName: string
  userEmail: string
  userAvatar?: string
  agentId?: string
  agentName?: string
  agentAvatar?: string
  status: ChatStatus
  subject: string
  priority: "low" | "medium" | "high"
  department: "general" | "technical" | "billing" | "bookings"
  createdAt: string
  updatedAt: string
  lastMessage?: ChatMessage
  rating?: number
  feedback?: string
  tags: string[]
}

export interface Agent {
  id: string
  name: string
  email: string
  avatar?: string
  status: "online" | "away" | "busy" | "offline"
  department: string[]
  activeChats: number
  maxChats: number
  rating: number
  totalChats: number
}

interface ChatContextType {
  // Chat state
  isOpen: boolean
  currentChat: ChatSession | null
  messages: ChatMessage[]
  isTyping: boolean
  agentTyping: boolean

  // Chat actions
  openChat: () => void
  closeChat: () => void
  sendMessage: (content: string, type?: MessageType, fileUrl?: string, fileName?: string) => void
  startNewChat: (subject: string, department: string, priority: string) => void
  endChat: () => void
  rateChat: (rating: number, feedback?: string) => void

  // Agent features (for admin/agent roles)
  allChats: ChatSession[]
  assignChat: (chatId: string, agentId: string) => void
  updateChatStatus: (chatId: string, status: ChatStatus) => void

  // Utility
  unreadCount: number
  isLoading: boolean
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

// Mock data
const mockAgents: Agent[] = [
  {
    id: "agent1",
    name: "Sarah Johnson",
    email: "sarah@Cruvix.com",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    status: "online",
    department: ["general", "bookings"],
    activeChats: 2,
    maxChats: 5,
    rating: 4.8,
    totalChats: 156,
  },
  {
    id: "agent2",
    name: "Mike Chen",
    email: "mike@Cruvix.com",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    status: "online",
    department: ["technical", "billing"],
    activeChats: 1,
    maxChats: 4,
    rating: 4.9,
    totalChats: 203,
  },
  {
    id: "agent3",
    name: "Emily Davis",
    email: "emily@Cruvix.com",
    avatar: "/placeholder.svg?height=40&width=40&text=ED",
    status: "away",
    department: ["general", "technical"],
    activeChats: 0,
    maxChats: 3,
    rating: 4.7,
    totalChats: 89,
  },
]

const mockChatSessions: ChatSession[] = [
  {
    id: "chat1",
    userId: "1",
    userName: "Admin User",
    userEmail: "admin@Cruvix.com",
    userAvatar: "/placeholder.svg?height=40&width=40&text=AU",
    agentId: "agent1",
    agentName: "Sarah Johnson",
    agentAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
    status: "assigned",
    subject: "Booking Issue",
    priority: "high",
    department: "bookings",
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T11:15:00Z",
    tags: ["booking", "urgent"],
  },
  {
    id: "chat2",
    userId: "2",
    userName: "Premium User",
    userEmail: "premium@Cruvix.com",
    userAvatar: "/placeholder.svg?height=40&width=40&text=PU",
    agentId: "agent2",
    agentName: "Mike Chen",
    agentAvatar: "/placeholder.svg?height=40&width=40&text=MC",
    status: "resolved",
    subject: "Payment Question",
    priority: "medium",
    department: "billing",
    createdAt: "2024-01-19T14:20:00Z",
    updatedAt: "2024-01-19T15:45:00Z",
    rating: 5,
    feedback: "Very helpful and quick response!",
    tags: ["payment", "resolved"],
  },
]

const mockMessages: ChatMessage[] = [
  {
    id: "msg1",
    chatId: "chat1",
    content: "Hello! I'm having trouble with my booking. Can you help?",
    type: "text",
    sender: "user",
    senderName: "Admin User",
    timestamp: "2024-01-20T10:30:00Z",
    isRead: true,
  },
  {
    id: "msg2",
    chatId: "chat1",
    content:
      "Hi there! I'd be happy to help you with your booking issue. Can you please provide me with your booking ID?",
    type: "text",
    sender: "agent",
    senderName: "Sarah Johnson",
    senderAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
    timestamp: "2024-01-20T10:32:00Z",
    isRead: true,
  },
  {
    id: "msg3",
    chatId: "chat1",
    content: "My booking ID is BK-2024-001",
    type: "text",
    sender: "user",
    senderName: "Admin User",
    timestamp: "2024-01-20T10:33:00Z",
    isRead: true,
  },
  {
    id: "msg4",
    chatId: "chat1",
    content: "Thank you! I can see your booking here. Let me check the details for you.",
    type: "text",
    sender: "agent",
    senderName: "Sarah Johnson",
    senderAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
    timestamp: "2024-01-20T10:35:00Z",
    isRead: false,
  },
]

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [currentChat, setCurrentChat] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [allChats, setAllChats] = useState<ChatSession[]>(mockChatSessions)
  const [isTyping, setIsTyping] = useState(false)
  const [agentTyping, setAgentTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load user's chat history
  useEffect(() => {
    if (user) {
      const userChats = mockChatSessions.filter((chat) => chat.userId === user.id)
      if (userChats.length > 0) {
        const latestChat = userChats[0]
        setCurrentChat(latestChat)
        setMessages(mockMessages.filter((msg) => msg.chatId === latestChat.id))
      }
    }
  }, [user])

  // Simulate agent typing
  useEffect(() => {
    if (currentChat && currentChat.status === "assigned") {
      const interval = setInterval(() => {
        if (Math.random() > 0.8) {
          setAgentTyping(true)
          setTimeout(() => setAgentTyping(false), 2000)
        }
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [currentChat])

  const openChat = () => {
    setIsOpen(true)
  }

  const closeChat = () => {
    setIsOpen(false)
  }

  const sendMessage = async (content: string, type: MessageType = "text", fileUrl?: string, fileName?: string) => {
    if (!user || !currentChat) return

    setIsTyping(true)

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      chatId: currentChat.id,
      content,
      type,
      sender: "user",
      senderName: user.name,
      senderAvatar: user.avatar,
      timestamp: new Date().toISOString(),
      fileUrl,
      fileName,
      isRead: false,
    }

    setMessages((prev) => [...prev, newMessage])

    // Simulate agent response
    setTimeout(
      () => {
        const agentResponses = [
          "I understand your concern. Let me look into this for you.",
          "Thank you for providing that information. I'm checking our system now.",
          "I can help you with that. Give me just a moment to review your account.",
          "That's a great question! Let me get you the most accurate information.",
          "I see what you mean. Let me connect you with the right department.",
        ]

        const agentMessage: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          chatId: currentChat.id,
          content: agentResponses[Math.floor(Math.random() * agentResponses.length)],
          type: "text",
          sender: "agent",
          senderName: currentChat.agentName || "Support Agent",
          senderAvatar: currentChat.agentAvatar,
          timestamp: new Date().toISOString(),
          isRead: false,
        }

        setMessages((prev) => [...prev, agentMessage])
        setIsTyping(false)
      },
      2000 + Math.random() * 3000,
    )
  }

  const startNewChat = async (subject: string, department: string, priority: string) => {
    if (!user) return

    setIsLoading(true)

    // Find available agent
    const availableAgent = mockAgents.find(
      (agent) =>
        agent.status === "online" && agent.department.includes(department) && agent.activeChats < agent.maxChats,
    )

    const newChat: ChatSession = {
      id: `chat_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userAvatar: user.avatar,
      agentId: availableAgent?.id,
      agentName: availableAgent?.name,
      agentAvatar: availableAgent?.avatar,
      status: availableAgent ? "assigned" : "open",
      subject,
      priority: priority as any,
      department: department as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [department],
    }

    setCurrentChat(newChat)
    setAllChats((prev) => [newChat, ...prev])
    setMessages([])

    // Welcome message
    const welcomeMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      chatId: newChat.id,
      content: availableAgent
        ? `Hi ${user.name}! I'm ${availableAgent.name} and I'll be helping you today. How can I assist you?`
        : "Thank you for contacting us! All our agents are currently busy, but we'll be with you shortly.",
      type: "text",
      sender: availableAgent ? "agent" : "system",
      senderName: availableAgent?.name || "System",
      senderAvatar: availableAgent?.avatar,
      timestamp: new Date().toISOString(),
      isRead: false,
    }

    setMessages([welcomeMessage])
    setIsLoading(false)
  }

  const endChat = () => {
    if (currentChat) {
      const updatedChat = { ...currentChat, status: "resolved" as ChatStatus }
      setCurrentChat(updatedChat)
      setAllChats((prev) => prev.map((chat) => (chat.id === currentChat.id ? updatedChat : chat)))
    }
  }

  const rateChat = (rating: number, feedback?: string) => {
    if (currentChat) {
      const updatedChat = { ...currentChat, rating, feedback }
      setCurrentChat(updatedChat)
      setAllChats((prev) => prev.map((chat) => (chat.id === currentChat.id ? updatedChat : chat)))
    }
  }

  const assignChat = (chatId: string, agentId: string) => {
    const agent = mockAgents.find((a) => a.id === agentId)
    if (agent) {
      setAllChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? { ...chat, agentId, agentName: agent.name, agentAvatar: agent.avatar, status: "assigned" as ChatStatus }
            : chat,
        ),
      )
    }
  }

  const updateChatStatus = (chatId: string, status: ChatStatus) => {
    setAllChats((prev) => prev.map((chat) => (chat.id === chatId ? { ...chat, status } : chat)))
  }

  const unreadCount = messages.filter((msg) => !msg.isRead && msg.sender === "agent").length

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        currentChat,
        messages,
        isTyping,
        agentTyping,
        openChat,
        closeChat,
        sendMessage,
        startNewChat,
        endChat,
        rateChat,
        allChats,
        assignChat,
        updateChatStatus,
        unreadCount,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
