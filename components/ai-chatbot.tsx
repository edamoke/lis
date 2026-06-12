'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, Sparkles, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: Date
}

const LIS_KNOWLEDGE = {
  welcome: "Hello! I am your AI School Assistant. I can help you with details about our campuses, admissions, Cambridge curriculum, or school fees. What would you like to know?",
  campuses: "Light International School has 5 premier campuses in Kenya:\n• **Nairobi Karen**: Offers Kindergarten to A-Levels (KG - Year 13).\n• **Nairobi Lavington**: Focuses on Year 4 to Year 10.\n• **Nairobi Kindergarten**: Serves Reception to Year 3.\n• **Mombasa**: Offers Kindergarten to A-Levels.\n• **Malindi**: Offers Kindergarten to A-Levels.",
  curriculum: "We offer the **Cambridge Assessment International Education (CAIE)** curriculum. This is a globally recognized, rigorous framework that prepares students for top global universities. We offer Primary, Lower Secondary, IGCSE, and Advanced Levels (A-Levels).",
  admissions: "Admissions are currently open for the 2026/2027 academic year! The process is simple:\n1. Submit an **Inquiry Form** on our Admissions Page.\n2. Schedule a **placement evaluation** for your child.\n3. Complete the enrollment form and submit required documents (Passport/ID copy, previous report cards, vaccination records).\n4. Pay the registration fees to secure placement.",
  fees: "Our fee structure varies by campus and grade level. Generally, it includes registration fees, tuition, and optional charges for school meals and transport. You can download the full fee schedules in our **Parent Portal** or request them through the **Admissions Inquiry Form**.",
  lanyard: "The **Lanyard System** is our custom, secure campus entry and tracking system. It utilizes high-tech RFID cards issued to students and parents, enhancing safety, tracking attendance, and streamlining campus security across all campuses.",
  general: "Light International School (LIS) is a co-educational day and boarding school offering a world-class Cambridge education in Kenya. We are committed to fostering academic excellence, character building, and innovative leadership.",
}

const QUICK_REPLIES = [
  { label: 'Explore Campuses', value: 'campuses' },
  { label: 'Admissions Process', value: 'admissions' },
  { label: 'Cambridge Curriculum', value: 'curriculum' },
  { label: 'Lanyard System', value: 'lanyard' },
]

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showNotification, setShowNotification] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: LIS_KNOWLEDGE.welcome,
        timestamp: new Date()
      }
    ])
  }, [])

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Automatically dismiss notification badge after 10s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setShowNotification(false)

    // Simulate smart LIS response
    setTimeout(() => {
      let replyText = LIS_KNOWLEDGE.general
      const normalized = textToSend.toLowerCase()

      if (normalized.includes('campus') || normalized.includes('karen') || normalized.includes('lavington') || normalized.includes('mombasa') || normalized.includes('malindi')) {
        replyText = LIS_KNOWLEDGE.campuses
      } else if (normalized.includes('admission') || normalized.includes('apply') || normalized.includes('enroll') || normalized.includes('join')) {
        replyText = LIS_KNOWLEDGE.admissions
      } else if (normalized.includes('curriculum') || normalized.includes('cambridge') || normalized.includes('igcse') || normalized.includes('a levels') || normalized.includes('study')) {
        replyText = LIS_KNOWLEDGE.curriculum
      } else if (normalized.includes('fee') || normalized.includes('cost') || normalized.includes('pay') || normalized.includes('money')) {
        replyText = LIS_KNOWLEDGE.fees
      } else if (normalized.includes('lanyard') || normalized.includes('rfid') || normalized.includes('security') || normalized.includes('card')) {
        replyText = LIS_KNOWLEDGE.lanyard
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        sender: 'bot',
        text: replyText,
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickReply = (key: keyof typeof LIS_KNOWLEDGE) => {
    // Add user message with selection
    const selectedLabel = QUICK_REPLIES.find(r => r.value === key)?.label || key.toString()
    
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: selectedLabel,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    // Simulate reply
    setTimeout(() => {
      const botMsg: Message = {
        id: Math.random().toString(),
        sender: 'bot',
        text: LIS_KNOWLEDGE[key] || LIS_KNOWLEDGE.general,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 900)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Welcome Notification Badge */}
      {showNotification && !isOpen && (
        <div className="mb-3 mr-1 flex items-center gap-3 bg-blue-600 text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-xl border border-blue-500 max-w-xs animate-bounce cursor-pointer" onClick={() => { setIsOpen(true); setShowNotification(false); }}>
          <Sparkles className="size-4 shrink-0" />
          <span>Need help? Chat with our AI School Assistant!</span>
          <button onClick={(e) => { e.stopPropagation(); setShowNotification(false); }} className="hover:text-blue-100 p-0.5 rounded-full" aria-label="Dismiss notification">
            <X className="size-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="size-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-red-500 hover:from-blue-700 hover:to-red-600 text-white flex items-center justify-center border-none transition-transform hover:scale-105 active:scale-95"
        aria-label="Toggle AI School Assistant"
      >
        {isOpen ? (
          <X className="size-6 transition-all rotate-0 scale-100" />
        ) : (
          <MessageSquare className="size-6 transition-all" />
        )}
      </Button>

      {/* Chat Window Container */}
      {isOpen && (
        <div className="absolute bottom-18 right-0 w-[360px] h-[500px] sm:w-[400px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-red-500 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Bot className="size-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight">AI School Assistant</h3>
                <span className="text-[10px] text-white/80 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Powered by LIS Brain
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors" aria-label="Close chatbot">
              <X className="size-4" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-card border border-border text-foreground rounded-tl-none'}`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card border border-border text-foreground rounded-2xl rounded-tl-none p-3 text-sm flex items-center gap-1">
                  <Loader2 className="size-3.5 animate-spin text-blue-600" />
                  <span className="text-muted-foreground text-xs font-mono">Assistant is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Options */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-2 bg-muted/30 border-t border-border flex flex-wrap gap-1.5 justify-center">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply.value}
                  onClick={() => handleQuickReply(reply.value as keyof typeof LIS_KNOWLEDGE)}
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-2.5 py-1.5 rounded-full border border-blue-500/20 transition-all hover:scale-102 flex items-center gap-1"
                >
                  {reply.label}
                  <ArrowRight className="size-2.5" />
                </button>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(input)
            }}
            className="p-3 border-t border-border bg-card flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-muted/50 border border-input rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground"
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-xl shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!input.trim() || isTyping}
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
