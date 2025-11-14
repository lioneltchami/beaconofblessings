'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Heart, Bot, User, Minimize2, Maximize2 } from 'lucide-react'

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

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to help you learn more about Beacon of Blessings Charity Initiative. You can ask me about our founders, projects, mission, or how to get involved. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messageIdRef = useRef(1)

  const generateMessageId = (): string => {
    messageIdRef.current += 1
    return messageIdRef.current.toString()
  }

  // Knowledge base for the chatbot
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

  const quickSuggestions = [
    "Tell me about your founders",
    "What projects have you completed?", 
    "How can I donate?",
    "How can I get involved?",
    "What is your mission?",
    "Where are you located?"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findResponse = (text: string): ChatResponse => {
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
  }

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

  const sendMessage = async () => {
    if (!inputText.trim()) return

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

    // Simulate typing delay
    setTimeout(() => {
      const response = findResponse(currentInput)
      
      const botMessage: Message = {
        id: generateMessageId(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500) // Fixed 1.5 second delay
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion)
    setTimeout(() => sendMessage(), 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

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
            className="fixed bottom-6 right-6 z-50 w-16 h-16 gradient-primary rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300"
          >
            <MessageSquare className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
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
            className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-primary-200 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
            } transition-all duration-300 overflow-hidden`}
          >
            {/* Header */}
            <div className="gradient-primary p-4 text-white flex items-center justify-between">
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
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
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
                  className="flex flex-col h-[436px]"
                >
                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start space-x-3 ${
                          message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'user' 
                            ? 'bg-primary-100 text-primary-600' 
                            : 'gradient-primary text-white'
                        }`}>
                          {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        
                        <div className={`max-w-[70%] p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-primary-500 text-white ml-auto'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.text}</p>
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
                    <div className="p-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-primary-50 text-primary-600 px-3 py-1 rounded-full hover:bg-primary-100 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!inputText.trim() || isTyping}
                        className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
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