'use client'

import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Heart, Bot, User, Minimize2, Maximize2, Trash2, Download } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatResponse {
  response: string
  suggestions?: string[]
}

const STORAGE_KEY = 'beacon_chat_history'

// Knowledge base for the chatbot (static data)
const knowledgeBase = {
    founders: {
      keywords: ['founder', 'lionel', 'tchami', 'grace', 'kure', 'who founded', 'who started', 'leadership', 'team'],
      response: "Beacon of Blessings was founded by Lionel Tchami and Grace Kure. Lionel is the Co-Founder & Director, passionate about education and community development with extensive experience in nonprofit leadership. Grace Kure is the Co-Founder & Nigeria Operations Lead, based in Nigeria and leading our on-ground operations with intimate knowledge of local communities. Together, they share a vision to transform lives through education and serve vulnerable communities across Nigeria."
    },
    mission: {
      keywords: ['mission', 'vision', 'purpose', 'goal', 'what do you do', 'about', 'why'],
      response: "Our mission is to share the love of Jesus Christ through practical, compassionate service to vulnerable communities in Nigeria, with a primary focus on educational support, school supplies, and programs that empower children and families. Our vision is to be a transformative beacon of hope across Nigeria, illuminating pathways to education, opportunity, and spiritual growth for vulnerable communities."
    },
    projects: {
      keywords: ['project', 'school supplies', 'what have you done', 'impact', 'work', 'activities', 'helped'],
      response: "Our flagship project was the School Supplies Drive 2024, where we provided school bags, books, and educational materials to over 500 students across Lagos communities. This inaugural project equipped students who couldn't afford basic school supplies, helping them continue their education. We have exciting future projects planned including a Digital Learning Initiative, Girls' Education Scholarship Program, and Community Library Project."
    },
    donation: {
      keywords: ['donate', 'donation', 'give', 'contribute', 'support', 'help', 'money', 'fund'],
      response: "You can support our work by making a donation through our secure donation page. We accept one-time and monthly donations of any amount. Every dollar directly supports educational opportunities for vulnerable children in Nigeria. Please note that as we're registered in Nigeria, donations may not be tax-deductible in the US, Canada, or other countries. You'll receive a PDF receipt for all donations."
    },
    volunteer: {
      keywords: ['volunteer', 'get involved', 'participate', 'join', 'help out', 'contribute time'],
      response: "There are many ways to get involved with our work! You can volunteer your time, partner with us for corporate collaborations, spread the word about our mission, or support us financially. Please visit our contact page or reach out to us directly at info@beaconofblessings.org to learn more about specific volunteer opportunities."
    },
    location: {
      keywords: ['where', 'location', 'nigeria', 'lagos', 'based', 'office'],
      response: "We are based in Lagos, Nigeria, with our operations centered there and community outreach extending across Nigeria. Our founders Grace Kure leads our Nigeria operations on the ground, while Lionel Tchami provides international leadership and support."
    },
    contact: {
      keywords: ['contact', 'reach', 'email', 'phone', 'address', 'get in touch'],
      response: "You can reach us at info@beaconofblessings.org or call us at +234 (0) 123 456 7890. Our office hours are Monday through Friday, 9AM to 6PM West Africa Time. You can also use our contact form on the website to send us a message, and we'll respond within 24 hours."
    },
    beliefs: {
      keywords: ['christian', 'faith', 'jesus', 'bible', 'belief', 'religion', 'spiritual'],
      response: "Beacon of Blessings is a Christian charity founded on biblical principles. We believe in sharing the love of Jesus Christ through practical action and service. Our core values include love in action (1 John 3:18), integrity and transparency (Proverbs 11:3), compassionate service (Ephesians 4:32), and community focus (Galatians 6:10). We serve all people regardless of their faith background."
    },
    impact: {
      keywords: ['impact', 'results', 'achievement', 'success', 'difference', 'change'],
      response: "So far, we've helped over 500 students through our School Supplies Drive, providing school bags, notebooks, textbooks, and writing materials. We've served 5 communities in Lagos and invested ₦2.5M in educational resources. Our project achieved zero dropouts among beneficiary students and improved academic performance in participating schools."
    }
}

// Quick suggestion options (static data)
const quickSuggestions = [
  "Tell me about your founders",
  "What projects have you completed?",
  "How can I donate?",
  "How can I get involved?",
  "What is your mission?",
  "Where are you located?"
]

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  // Lazy initialization of messages from localStorage (browser only)
  const [messages, setMessages] = useState<Message[]>(() => {
    // Check if we're in the browser (not SSR)
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          return parsed.map((msg: Message) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }
      } catch (error) {
        console.error('Failed to load chat history:', error)
      }
    }

    // Default welcome message
    return [{
      id: '1',
      text: "Hello! I'm here to help you learn more about Beacon of Blessings Charity Initiative. You can ask me about our founders, projects, mission, or how to get involved. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }]
  })

  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize messageIdRef from loaded messages
  const messageIdRef = useRef(
    messages.length > 0
      ? Math.max(...messages.map(m => parseInt(m.id)))
      : 1
  )

  const generateMessageId = (): string => {
    messageIdRef.current += 1
    return messageIdRef.current.toString()
  }

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Save chat history to localStorage whenever messages change (browser only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
      } catch (error) {
        console.error('Failed to save chat history:', error)
      }
    }
  }, [messages])

  // Focus input when chat opens or maximizes
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen, isMinimized])

  // Handle Escape key to close chat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isMinimized) {
          setIsMinimized(false)
        } else {
          setIsOpen(false)
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, isMinimized])

  // Find appropriate response based on user input
  const findResponse = useCallback((text: string): ChatResponse => {
    // Helper function for related suggestions
    const getRelatedSuggestions = (category: string): string[] => {
      const suggestions: { [key: string]: string[] } = {
        founders: ["What is your mission?", "How can I contact the founders?", "What projects have you completed?"],
        mission: ["Tell me about your founders", "How can I get involved?", "What is your impact?"],
        projects: ["How can I donate?", "What is your mission?", "How can I volunteer?"],
        donation: ["What projects have you completed?", "How can I get involved?", "What is your impact?"],
        volunteer: ["How can I donate?", "Tell me about your founders", "What is your mission?"],
        location: ["How can I contact you?", "Tell me about your founders", "What projects do you do?"],
        contact: ["How can I donate?", "How can I volunteer?", "What is your mission?"],
        beliefs: ["What is your mission?", "Tell me about your founders", "What projects do you do?"],
        impact: ["How can I donate?", "What projects have you completed?", "How can I get involved?"]
      }

      return suggestions[category] || quickSuggestions.slice(0, 3)
    }

    const lowerText = text.toLowerCase()

    // Check each category in the knowledge base
    for (const [category, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerText.includes(keyword))) {
        return {
          response: data.response,
          suggestions: getRelatedSuggestions(category)
        }
      }
    }

    // Greetings
    if (['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'].some(greeting => lowerText.includes(greeting))) {
      return {
        response: "Hello! Welcome to Beacon of Blessings Charity Initiative. I'm here to help you learn about our mission to transform lives through education in Nigeria. What would you like to know?",
        suggestions: ["Tell me about your founders", "What is your mission?", "How can I help?"]
      }
    }

    // Gratitude
    if (['thank', 'thanks', 'appreciate', 'grateful'].some(word => lowerText.includes(word))) {
      return {
        response: "You're very welcome! It's our joy to share information about our work. Is there anything else you'd like to know about Beacon of Blessings?",
        suggestions: ["View our projects", "How to donate", "Contact information"]
      }
    }

    // Default response
    return {
      response: "I'm sorry, I didn't quite understand that. I can help you with information about our founders (Lionel Tchami and Grace Kure), our projects, mission, donation process, volunteer opportunities, and contact information. What would you like to know?",
      suggestions: quickSuggestions.slice(0, 3)
    }
  }, [])

  const sendMessage = useCallback(async () => {
    if (!inputText.trim() || isTyping) return

    const currentInput = inputText.trim()
    const userMessage: Message = {
      id: generateMessageId(),
      text: currentInput,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate realistic typing delay based on response length
    const response = findResponse(currentInput)
    const typingDelay = Math.min(Math.max(response.response.length * 10, 800), 2000)

    setTimeout(() => {
      const botMessage: Message = {
        id: generateMessageId(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, typingDelay)
  }, [inputText, isTyping, findResponse])

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputText(suggestion)
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }, [])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }, [sendMessage])

  const clearChatHistory = useCallback(() => {
    const confirmClear = window.confirm('Are you sure you want to clear all chat history?')
    if (confirmClear) {
      const welcomeMessage: Message = {
        id: '1',
        text: "Hello! I'm here to help you learn more about Beacon of Blessings Charity Initiative. You can ask me about our founders, projects, mission, or how to get involved. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
      messageIdRef.current = 1
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const exportChatTranscript = useCallback(() => {
    const transcript = messages.map(msg =>
      `[${msg.timestamp.toLocaleString()}] ${msg.sender === 'user' ? 'You' : 'Beacon Assistant'}: ${msg.text}`
    ).join('\n\n')

    const blob = new Blob([transcript], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `beacon-chat-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [messages])

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open chat assistant"
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 gradient-primary rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300"
          >
            <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />
            <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-secondary-500 rounded-full animate-pulse" aria-hidden="true"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-label="Chat assistant"
            aria-modal="true"
            className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-white rounded-2xl shadow-2xl border border-primary-200 ${
              isMinimized ? 'w-72 md:w-80 h-16' : 'w-[calc(100vw-2rem)] md:w-96 h-[calc(100vh-2rem)] md:h-[600px]'
            } transition-all duration-300 overflow-hidden flex flex-col`}
          >
            {/* Header */}
            <div className="gradient-primary p-4 text-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Beacon Assistant</h3>
                  <p className="text-xs text-white/80">Ask me anything!</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!isMinimized && messages.length > 1 && (
                  <>
                    <button
                      onClick={exportChatTranscript}
                      aria-label="Export chat transcript"
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      title="Export chat"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={clearChatHistory}
                      aria-label="Clear chat history"
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      title="Clear chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                  aria-expanded={!isMinimized}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col flex-1 min-h-0"
                >
                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto" role="log" aria-live="polite" aria-atomic="false">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start space-x-3 ${
                          message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'user'
                              ? 'bg-primary-100 text-primary-600'
                              : 'gradient-primary text-white'
                          }`}
                          aria-hidden="true"
                        >
                          {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>

                        <div className={`max-w-[75%] md:max-w-[70%] p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start space-x-3"
                        aria-label="Beacon Assistant is typing"
                      >
                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Suggestions */}
                  {messages.length === 1 && (
                    <div className="p-4 border-t border-gray-100 flex-shrink-0">
                      <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-primary-50 text-primary-600 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-gray-100 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask me anything..."
                        aria-label="Type your message"
                        disabled={isTyping}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!inputText.trim() || isTyping}
                        aria-label="Send message"
                        className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      Press Enter to send • ESC to close
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Export memoized component for performance
export default memo(Chatbot)
Chatbot.displayName = 'Chatbot'
