"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "@/lib/chat-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  Star,
  Phone,
  Video,
  Minimize2,
  Maximize2,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ChatWidget() {
  const { user } = useAuth()
  const {
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
    unreadCount,
    isLoading,
  } = useChat()

  const [messageInput, setMessageInput] = useState("")
  const [showNewChatForm, setShowNewChatForm] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [newChatForm, setNewChatForm] = useState({
    subject: "",
    department: "",
    priority: "medium",
    message: "",
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (messageInput.trim() && currentChat) {
      sendMessage(messageInput.trim())
      setMessageInput("")
    }
  }

  const handleStartNewChat = () => {
    if (newChatForm.subject && newChatForm.department) {
      startNewChat(newChatForm.subject, newChatForm.department, newChatForm.priority)
      if (newChatForm.message) {
        setTimeout(() => {
          sendMessage(newChatForm.message)
        }, 1000)
      }
      setShowNewChatForm(false)
      setNewChatForm({ subject: "", department: "", priority: "medium", message: "" })
    }
  }

  const handleEndChat = () => {
    endChat()
    setShowRating(true)
  }

  const handleRating = () => {
    if (rating > 0) {
      rateChat(rating, feedback)
      setShowRating(false)
      setRating(0)
      setFeedback("")
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!user) return null

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={openChat}
              size="lg"
              className="h-14 w-14 rounded-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="h-6 w-6" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className={`w-96 shadow-2xl ${isMinimized ? "h-16" : "h-[600px]"} transition-all duration-300`}>
              {/* Header */}
              <CardHeader className="p-4 bg-yellow-500 text-gray-900 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {currentChat?.agentAvatar && (
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={currentChat.agentAvatar || "/placeholder.svg"}
                            alt={currentChat.agentName}
                          />
                          <AvatarFallback>{currentChat.agentName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor("online")}`}
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-sm">{currentChat?.agentName || "Cruvix Support"}</h3>
                      {currentChat?.agentName && (
                        <p className="text-xs opacity-80">{agentTyping ? "Typing..." : "Online"}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {currentChat && (
                      <>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-yellow-600">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-yellow-600">
                          <Video className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-yellow-600"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-yellow-600" onClick={closeChat}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-[536px]">
                  {/* New Chat Form */}
                  {showNewChatForm && (
                    <div className="p-4 border-b space-y-4">
                      <h4 className="font-semibold">Start New Conversation</h4>
                      <div className="space-y-3">
                        <Input
                          placeholder="Subject"
                          value={newChatForm.subject}
                          onChange={(e) => setNewChatForm((prev) => ({ ...prev, subject: e.target.value }))}
                        />
                        <Select
                          value={newChatForm.department}
                          onValueChange={(value) => setNewChatForm((prev) => ({ ...prev, department: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Support</SelectItem>
                            <SelectItem value="bookings">Bookings</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={newChatForm.priority}
                          onValueChange={(value) => setNewChatForm((prev) => ({ ...prev, priority: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low Priority</SelectItem>
                            <SelectItem value="medium">Medium Priority</SelectItem>
                            <SelectItem value="high">High Priority</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea
                          placeholder="Describe your issue (optional)"
                          value={newChatForm.message}
                          onChange={(e) => setNewChatForm((prev) => ({ ...prev, message: e.target.value }))}
                          rows={3}
                        />
                        <div className="flex space-x-2">
                          <Button onClick={handleStartNewChat} disabled={isLoading} className="flex-1">
                            {isLoading ? "Starting..." : "Start Chat"}
                          </Button>
                          <Button variant="outline" onClick={() => setShowNewChatForm(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rating Form */}
                  {showRating && (
                    <div className="p-4 border-b space-y-4">
                      <h4 className="font-semibold">Rate Your Experience</h4>
                      <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button key={star} variant="ghost" size="sm" className="p-1" onClick={() => setRating(star)}>
                            <Star
                              className={`h-6 w-6 ${star <= rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          </Button>
                        ))}
                      </div>
                      <Textarea
                        placeholder="Additional feedback (optional)"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleRating} disabled={rating === 0} className="flex-1">
                          Submit Rating
                        </Button>
                        <Button variant="outline" onClick={() => setShowRating(false)}>
                          Skip
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    {!currentChat && !showNewChatForm ? (
                      <div className="text-center py-8">
                        <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Welcome to Cruvix Support
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">How can we help you today?</p>
                        <Button onClick={() => setShowNewChatForm(true)}>Start New Conversation</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] ${
                                message.sender === "user"
                                  ? "bg-yellow-500 text-gray-900"
                                  : message.sender === "system"
                                    ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                              } rounded-lg p-3`}
                            >
                              {message.sender === "agent" && (
                                <div className="flex items-center space-x-2 mb-1">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage
                                      src={message.senderAvatar || "/placeholder.svg"}
                                      alt={message.senderName}
                                    />
                                    <AvatarFallback className="text-xs">{message.senderName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs font-medium">{message.senderName}</span>
                                </div>
                              )}
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</p>
                            </div>
                          </div>
                        ))}

                        {agentTyping && (
                          <div className="flex justify-start">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                />
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </ScrollArea>

                  {/* Input */}
                  {currentChat && currentChat.status !== "resolved" && !showNewChatForm && !showRating && (
                    <div className="p-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="p-2">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Type your message..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          className="flex-1"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!messageInput.trim() || isTyping}
                          size="sm"
                          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      {currentChat.status === "assigned" && (
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Helpful
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              Not Helpful
                            </Button>
                          </div>
                          <Button variant="outline" size="sm" onClick={handleEndChat}>
                            End Chat
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
