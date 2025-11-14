'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Users, 
  Heart, 
  HandHeart,
  Globe,
  CheckCircle
} from 'lucide-react'
import Button from '@/components/ui/Button'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  interest: string
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>()

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@beaconofblessings.org',
      description: 'Send us a message and we\'ll respond within 24 hours',
      action: 'mailto:info@beaconofblessings.org'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+234 (0) 123 456 7890',
      description: 'Speak directly with our Nigeria operations team',
      action: 'tel:+2341234567890'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Lagos, Nigeria',
      description: 'Our operations are centered in Lagos with community outreach across Nigeria',
      action: '#'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: 'Mon - Fri: 9AM - 6PM WAT',
      description: 'West Africa Time (UTC+1)',
      action: '#'
    }
  ]

  const getInvolvedOptions = [
    {
      icon: Heart,
      title: 'Make a Donation',
      description: 'Support our educational initiatives with a financial contribution',
      action: '/donate',
      color: 'gradient-primary'
    },
    {
      icon: Users,
      title: 'Volunteer',
      description: 'Join our team of dedicated volunteers making a difference',
      action: '#volunteer',
      color: 'bg-blue-500'
    },
    {
      icon: HandHeart,
      title: 'Partner with Us',
      description: 'Corporate partnerships and collaboration opportunities',
      action: '#partner',
      color: 'bg-purple-500'
    },
    {
      icon: Globe,
      title: 'Spread the Word',
      description: 'Help us reach more communities by sharing our mission',
      action: '#share',
      color: 'bg-green-500'
    }
  ]

  const interestOptions = [
    'General Inquiry',
    'Donation Questions',
    'Volunteer Opportunities',
    'Partnership/Collaboration',
    'Media/Press Inquiry',
    'Project Information',
    'Other'
  ]

  // Suppress hydration warnings for browser extension attributes
  useEffect(() => {
    const originalError = console.error
    console.error = (...args) => {
      if (args[0]?.includes?.('data-np-intersection-state') || args[0]?.includes?.('hydration')) {
        return
      }
      originalError(...args)
    }
    return () => {
      console.error = originalError
    }
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // In a real implementation, this would send the form data to your backend
      console.log('Contact form submission:', data)
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Form submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              We&apos;d love to hear from you. Whether you have questions about our work, want to get involved, 
              or need support, we&apos;re here to help.
            </p>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-primary-200 shadow-lg">
              <blockquote className="text-lg text-gray-800 italic mb-3">
                &ldquo;Two are better than one, because they have a good return for their labor.&rdquo;
              </blockquote>
              <cite className="text-primary-600 font-semibold">Ecclesiastes 4:9</cite>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach us and connect with our team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-lg border border-primary-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-primary-600 font-semibold mb-3">{info.details}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
                
                {info.action !== '#' && (
                  <a
                    href={info.action}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm mt-3 transition-colors"
                  >
                    Connect
                    <Send className="w-4 h-4 ml-1" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Success Message */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-primary-200 p-12">
                <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Thank you for reaching out to us. We&apos;ve received your message and will get back to you 
                  within 24 hours. We appreciate your interest in Beacon of Blessings Charity Initiative.
                </p>
                
                <Button onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-primary-200 overflow-hidden">
                <div className="p-8 border-b border-primary-100">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
                  <p className="text-gray-600">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email address'
                          }
                        })}
                        className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        I&apos;m interested in *
                      </label>
                      <select
                        {...register('interest', { required: 'Please select your interest' })}
                        className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500"
                      >
                        <option value="">Select an option</option>
                        {interestOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                      {errors.interest && (
                        <p className="mt-2 text-sm text-red-600">{errors.interest.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500"
                      placeholder="Enter the subject of your message"
                    />
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={6}
                      {...register('message', { required: 'Message is required' })}
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      size="lg"
                      icon={Send}
                      disabled={isSubmitting}
                      className="px-12"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ways to Get Involved</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              There are many ways you can support our mission and make a difference in Nigerian communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getInvolvedOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <a
                  href={option.action}
                  className="block bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-lg border border-primary-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{option.title}</h3>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                  
                  <div className="mt-4 text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors">
                    Learn More →
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}