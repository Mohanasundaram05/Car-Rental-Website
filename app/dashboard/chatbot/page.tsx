"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  Settings,
  Save,
  RefreshCw,
  MessageSquare,
  Zap,
  Brain,
  BarChart3,
  Plus,
  Trash2,
  Edit,
  TestTube,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Sparkles,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

interface KnowledgeEntry {
  id: string
  query: string
  response: string
  category: string
  keywords: string[]
  confidence: number
  enabled: boolean
}

export default function ChatbotSettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personality")

  // Personality Configuration
  const [personality, setPersonality] = useState<PersonalityConfig>({
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
  })

  // Knowledge Base
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeEntry[]>([
    {
      id: "1",
      query: "What types of cars do you offer?",
      response: "We offer a wide range of cars including economy, luxury, and sports cars.",
      category: "General",
      keywords: ["cars", "types", "vehicles", "offer"],
      confidence: 0.9,
      enabled: true,
    },
    {
      id: "2",
      query: "What are your rental rates?",
      response: "Our rental rates start from ₹4,999/day. The exact price depends on the car type and rental duration.",
      category: "Pricing",
      keywords: ["rates", "price", "cost", "rental"],
      confidence: 0.9,
      enabled: true,
    },
    {
      id: "3",
      query: "What documents do I need?",
      response:
        "You will need a valid driver's license, a passport or Aadhar card, and a credit or debit card for the security deposit.",
      category: "Requirements",
      keywords: ["documents", "requirements", "license", "id"],
      confidence: 0.8,
      enabled: true,
    },
  ])

  // New Knowledge Entry
  const [newEntry, setNewEntry] = useState({
    query: "",
    response: "",
    category: "General",
    keywords: "",
  })

  // Analytics Data
  const [analytics, setAnalytics] = useState({
    totalConversations: 1247,
    resolvedByBot: 892,
    escalatedToHuman: 355,
    averageConfidence: 0.78,
    topIntents: [
      { intent: "pricing", count: 324 },
      { intent: "requirements", count: 298 },
      { intent: "availability", count: 267 },
      { intent: "booking", count: 189 },
      { intent: "support", count: 169 },
    ],
  })

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Access Denied</h2>
        <p className="text-gray-600 dark:text-gray-400">You need admin privileges to access chatbot settings.</p>
      </div>
    )
  }

  const handleSavePersonality = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Personality Updated",
        description: "Chatbot personality settings have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save personality settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddKnowledgeEntry = () => {
    if (newEntry.query && newEntry.response) {
      const entry: KnowledgeEntry = {
        id: Date.now().toString(),
        query: newEntry.query,
        response: newEntry.response,
        category: newEntry.category,
        keywords: newEntry.keywords.split(",").map((k) => k.trim()),
        confidence: 0.8,
        enabled: true,
      }

      setKnowledgeBase([...knowledgeBase, entry])
      setNewEntry({ query: "", response: "", category: "General", keywords: "" })

      toast({
        title: "Entry Added",
        description: "New knowledge base entry has been added successfully.",
      })
    }
  }

  const handleDeleteEntry = (id: string) => {
    setKnowledgeBase(knowledgeBase.filter((entry) => entry.id !== id))
    toast({
      title: "Entry Deleted",
      description: "Knowledge base entry has been removed.",
    })
  }

  const handleToggleEntry = (id: string) => {
    setKnowledgeBase(knowledgeBase.map((entry) => (entry.id === id ? { ...entry, enabled: !entry.enabled } : entry)))
  }

  const getStyleDescription = (style: string) => {
    switch (style) {
      case "professional":
        return "Formal, business-like communication"
      case "friendly":
        return "Warm and approachable tone"
      case "casual":
        return "Relaxed and conversational"
      case "enthusiastic":
        return "Energetic and excited responses"
      default:
        return ""
    }
  }

  const getResolutionRate = () => {
    return Math.round((analytics.resolvedByBot / analytics.totalConversations) * 100)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Bot className="h-8 w-8 mr-3 text-yellow-500" />
            AI Chatbot Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure your AI assistant's personality and knowledge base
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
          <Badge variant="secondary">{getResolutionRate()}% Resolution Rate</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personality">
            <Sparkles className="h-4 w-4 mr-2" />
            Personality
          </TabsTrigger>
          <TabsTrigger value="knowledge">
            <Brain className="h-4 w-4 mr-2" />
            Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="testing">
            <TestTube className="h-4 w-4 mr-2" />
            Testing
          </TabsTrigger>
        </TabsList>

        {/* Personality Configuration */}
        <TabsContent value="personality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Basic Settings
                </CardTitle>
                <CardDescription>Configure the fundamental personality traits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bot-name">Bot Name</Label>
                  <Input
                    id="bot-name"
                    value={personality.name}
                    onChange={(e) => setPersonality({ ...personality, name: e.target.value })}
                    placeholder="Enter bot name"
                  />
                </div>

                <div>
                  <Label htmlFor="communication-style">Communication Style</Label>
                  <Select
                    value={personality.style}
                    onValueChange={(value: any) => setPersonality({ ...personality, style: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {getStyleDescription(personality.style)}
                  </p>
                </div>

                <div>
                  <Label htmlFor="tone">Tone</Label>
                  <Select
                    value={personality.tone}
                    onValueChange={(value: any) => setPersonality({ ...personality, tone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="informal">Informal</SelectItem>
                      <SelectItem value="helpful">Helpful</SelectItem>
                      <SelectItem value="empathetic">Empathetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="verbosity">Response Length</Label>
                  <Select
                    value={personality.verbosity}
                    onValueChange={(value: any) => setPersonality({ ...personality, verbosity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brief">Brief</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Behavior Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Behavior Settings
                </CardTitle>
                <CardDescription>Configure how the bot interacts with users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Use Emojis</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Include emojis in responses for friendlier communication
                    </p>
                  </div>
                  <Switch
                    checked={personality.useEmojis}
                    onCheckedChange={(checked) => setPersonality({ ...personality, useEmojis: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Proactive Help</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Offer suggestions and follow-up questions
                    </p>
                  </div>
                  <Switch
                    checked={personality.proactiveHelp}
                    onCheckedChange={(checked) => setPersonality({ ...personality, proactiveHelp: checked })}
                  />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="response-delay">Response Delay (ms)</Label>
                  <Input
                    id="response-delay"
                    type="number"
                    value={personality.responseDelay}
                    onChange={(e) => setPersonality({ ...personality, responseDelay: Number.parseInt(e.target.value) })}
                    min="500"
                    max="5000"
                    step="100"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Simulates thinking time for more natural conversation
                  </p>
                </div>

                <div>
                  <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                  <Input
                    id="confidence-threshold"
                    type="number"
                    value={personality.confidenceThreshold}
                    onChange={(e) =>
                      setPersonality({ ...personality, confidenceThreshold: Number.parseFloat(e.target.value) })
                    }
                    min="0.1"
                    max="1.0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Minimum confidence required before escalating to human
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Message Templates
              </CardTitle>
              <CardDescription>Customize default messages and responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="greeting">Greeting Message</Label>
                <Textarea
                  id="greeting"
                  value={personality.greeting}
                  onChange={(e) => setPersonality({ ...personality, greeting: e.target.value })}
                  rows={2}
                  placeholder="Enter the initial greeting message"
                />
              </div>

              <div>
                <Label htmlFor="fallback">Fallback Message</Label>
                <Textarea
                  id="fallback"
                  value={personality.fallbackMessage}
                  onChange={(e) => setPersonality({ ...personality, fallbackMessage: e.target.value })}
                  rows={2}
                  placeholder="Message when bot doesn't understand"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() =>
                setPersonality({
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
                })
              }
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
            <Button onClick={handleSavePersonality} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </TabsContent>

        {/* Knowledge Base */}
        <TabsContent value="knowledge" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add New Entry */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Entry
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="new-query">Query</Label>
                  <Input
                    id="new-query"
                    value={newEntry.query}
                    onChange={(e) => setNewEntry({ ...newEntry, query: e.target.value })}
                    placeholder="What question triggers this response?"
                  />
                </div>

                <div>
                  <Label htmlFor="new-response">Response</Label>
                  <Textarea
                    id="new-response"
                    value={newEntry.response}
                    onChange={(e) => setNewEntry({ ...newEntry, response: e.target.value })}
                    rows={3}
                    placeholder="How should the bot respond?"
                  />
                </div>

                <div>
                  <Label htmlFor="new-category">Category</Label>
                  <Select
                    value={newEntry.category}
                    onValueChange={(value) => setNewEntry({ ...newEntry, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Pricing">Pricing</SelectItem>
                      <SelectItem value="Requirements">Requirements</SelectItem>
                      <SelectItem value="Booking">Booking</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="new-keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="new-keywords"
                    value={newEntry.keywords}
                    onChange={(e) => setNewEntry({ ...newEntry, keywords: e.target.value })}
                    placeholder="price, cost, rate, rental"
                  />
                </div>

                <Button onClick={handleAddKnowledgeEntry} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
              </CardContent>
            </Card>

            {/* Knowledge Base Entries */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    Knowledge Base ({knowledgeBase.length} entries)
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {knowledgeBase.map((entry) => (
                      <div key={entry.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{entry.category}</Badge>
                            <Badge variant={entry.enabled ? "default" : "secondary"}>
                              {entry.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                            <Badge variant="outline">{Math.round(entry.confidence * 100)}% confidence</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={entry.enabled}
                              onCheckedChange={() => handleToggleEntry(entry.id)}
                              size="sm"
                            />
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteEntry(entry.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{entry.query}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{entry.response}</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {entry.keywords.map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Conversations</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {analytics.totalConversations.toLocaleString()}
                    </p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bot Resolution Rate</p>
                    <p className="text-2xl font-bold text-green-600">{getResolutionRate()}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Confidence</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {Math.round(analytics.averageConfidence * 100)}%
                    </p>
                  </div>
                  <Brain className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Human Escalations</p>
                    <p className="text-2xl font-bold text-red-600">{analytics.escalatedToHuman}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Intents</CardTitle>
              <CardDescription>Most common user queries and their frequency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topIntents.map((intent, index) => (
                  <div key={intent.intent} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="font-medium capitalize">{intent.intent}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${(intent.count / analytics.topIntents[0].count) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{intent.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testing */}
        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TestTube className="h-5 w-5 mr-2" />
                Chatbot Testing
              </CardTitle>
              <CardDescription>Test your chatbot configuration before deploying</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Testing functionality will be available in the next update. You can currently test the chatbot using
                  the widget in the bottom-right corner.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
