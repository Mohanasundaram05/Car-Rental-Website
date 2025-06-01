"use client"

import { useChat } from "@/lib/chat-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from "lucide-react"

export function ChatSupportButton() {
  const { user } = useAuth()
  const { openChat, unreadCount } = useChat()

  if (!user) return null

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={openChat}
      className="relative text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400"
    >
      <MessageCircle className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
          {unreadCount}
        </Badge>
      )}
    </Button>
  )
}
