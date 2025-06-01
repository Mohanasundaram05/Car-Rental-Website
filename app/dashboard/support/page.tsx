"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { useChat } from "@/lib/chat-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  Users,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Star,
  TrendingUp,
  Phone,
  Video,
  Mail,
} from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

// Mock data for agents and analytics
const mockAgents = [
  {
    id: "agent1",
    name: "Sarah Johnson",
    email: "sarah@Cruvix.com",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    status: "online",
    department: ["general", "bookings"],
    activeChats: 3,
    maxChats: 5,
    rating: 4.8,
    totalChats: 156,
    avgResponseTime: "2m 15s",
    resolutionRate: 94,
  },
  {
    id: "agent2",
    name: "Mike Chen",
    email: "mike@Cruvix.com",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    status: "online",
    department: ["technical", "billing"],
    activeChats: 2,
    maxChats: 4,
    rating: 4.9,
    totalChats: 203,
    avgResponseTime: "1m 45s",
    resolutionRate: 97,
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
    avgResponseTime: "3m 20s",
    resolutionRate: 91,
  },
]

export default function SupportDashboard() {
  const { user } = useAuth()
  const { allChats, assignChat, updateChatStatus } = useChat()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedChat, setSelectedChat] = useState<any>(null)

  const filteredChats = allChats.filter((chat) => {
    const matchesSearch =
      chat.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || chat.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const chatStats = {
    total: allChats.length,
    open: allChats.filter((c) => c.status === "open").length,
    assigned: allChats.filter((c) => c.status === "assigned").length,
    resolved: allChats.filter((c) => c.status === "resolved").length,
    avgRating:
      allChats.filter((c) => c.rating).reduce((sum, c) => sum + (c.rating || 0), 0) /
        allChats.filter((c) => c.rating).length || 0,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "assigned":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getAgentStatusColor = (status: string) => {
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

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Support Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage customer support chats and agents</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: "Total Chats", value: chatStats.total, icon: MessageCircle, color: "text-blue-600" },
            { title: "Open", value: chatStats.open, icon: AlertCircle, color: "text-yellow-600" },
            { title: "Assigned", value: chatStats.assigned, icon: Users, color: "text-blue-600" },
            { title: "Resolved", value: chatStats.resolved, icon: CheckCircle, color: "text-green-600" },
            { title: "Avg Rating", value: chatStats.avgRating.toFixed(1), icon: Star, color: "text-yellow-600" },
          ].map((stat, index) => (
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
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="chats" className="space-y-6">
          <TabsList>
            <TabsTrigger value="chats">Active Chats</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search chats..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Chats List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chat Queue</CardTitle>
                  <CardDescription>{filteredChats.length} conversations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      {filteredChats.map((chat) => (
                        <div
                          key={chat.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                            selectedChat?.id === chat.id ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" : ""
                          }`}
                          onClick={() => setSelectedChat(chat)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={chat.userAvatar || "/placeholder.svg"} alt={chat.userName} />
                                <AvatarFallback>{chat.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-sm">{chat.userName}</h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{chat.userEmail}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(chat.priority)}>{chat.priority}</Badge>
                              <Badge className={getStatusColor(chat.status)}>{chat.status}</Badge>
                            </div>
                          </div>
                          <h5 className="font-medium text-sm mb-1">{chat.subject}</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Department: {chat.department}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{new Date(chat.createdAt).toLocaleDateString()}</span>
                            {chat.agentName && <span>Agent: {chat.agentName}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Chat Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Chat Details</CardTitle>
                  {selectedChat && <CardDescription>Conversation with {selectedChat.userName}</CardDescription>}
                </CardHeader>
                <CardContent>
                  {selectedChat ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={selectedChat.userAvatar || "/placeholder.svg"}
                              alt={selectedChat.userName}
                            />
                            <AvatarFallback>{selectedChat.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{selectedChat.userName}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedChat.userEmail}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Subject</label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedChat.subject}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Department</label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedChat.department}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Priority</label>
                          <Badge className={getPriorityColor(selectedChat.priority)}>{selectedChat.priority}</Badge>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Status</label>
                          <Badge className={getStatusColor(selectedChat.status)}>{selectedChat.status}</Badge>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Assign Agent</label>
                        <Select
                          value={selectedChat.agentId || ""}
                          onValueChange={(agentId) => assignChat(selectedChat.id, agentId)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an agent" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockAgents.map((agent) => (
                              <SelectItem key={agent.id} value={agent.id}>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-2 h-2 rounded-full ${getAgentStatusColor(agent.status)}`} />
                                  <span>{agent.name}</span>
                                  <span className="text-xs text-gray-500">
                                    ({agent.activeChats}/{agent.maxChats})
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Update Status</label>
                        <Select
                          value={selectedChat.status}
                          onValueChange={(status) => updateChatStatus(selectedChat.id, status as any)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="assigned">Assigned</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedChat.rating && (
                        <div>
                          <label className="text-sm font-medium mb-2 block">Customer Rating</label>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= selectedChat.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{selectedChat.rating}/5</span>
                          </div>
                          {selectedChat.feedback && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">"{selectedChat.feedback}"</p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">Select a chat to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAgents.map((agent) => (
                <Card key={agent.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                          <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getAgentStatusColor(agent.status)}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{agent.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{agent.email}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {agent.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Active Chats</span>
                        <span className="text-sm font-medium">
                          {agent.activeChats}/{agent.maxChats}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{agent.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Chats</span>
                        <span className="text-sm font-medium">{agent.totalChats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Avg Response</span>
                        <span className="text-sm font-medium">{agent.avgResponseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Resolution Rate</span>
                        <span className="text-sm font-medium">{agent.resolutionRate}%</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Departments</p>
                      <div className="flex flex-wrap gap-1">
                        {agent.department.map((dept) => (
                          <Badge key={dept} variant="secondary" className="text-xs">
                            {dept}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Avg Response Time", value: "2m 30s", change: "-15%", trend: "down" },
                { title: "Resolution Rate", value: "94%", change: "+3%", trend: "up" },
                { title: "Customer Satisfaction", value: "4.8/5", change: "+0.2", trend: "up" },
                { title: "Active Agents", value: "8/12", change: "0", trend: "neutral" },
              ].map((metric, index) => (
                <Card key={metric.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                        <div className="flex items-center mt-1">
                          <TrendingUp
                            className={`h-4 w-4 mr-1 ${
                              metric.trend === "up"
                                ? "text-green-600"
                                : metric.trend === "down"
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              metric.trend === "up"
                                ? "text-green-600"
                                : metric.trend === "down"
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Support Metrics</CardTitle>
                <CardDescription>Key performance indicators for customer support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Detailed analytics charts would be implemented here with a charting library like Chart.js or
                    Recharts
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
