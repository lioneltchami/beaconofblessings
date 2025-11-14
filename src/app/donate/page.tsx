'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Heart, DollarSign, Gift, Users, BookOpen, CreditCard, Shield, Download, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { generateDonationReceipt } from '@/lib/pdfGenerator'

interface DonationFormData {
  amount: string
  customAmount?: string
  frequency: 'one-time' | 'monthly'
  firstName: string
  lastName: string
  email: string
  phone?: string
  country: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  anonymous: boolean
  updates: boolean
  dedication?: string
  dedicationType?: 'honor' | 'memory' | ''
  dedicatedTo?: string
  comments?: string
}

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [donationComplete, setDonationComplete] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  const [completedDonation, setCompletedDonation] = useState<{
    donorName: string
    email: string
    amount: string
    frequency: 'one-time' | 'monthly'
    date: string
    transactionId: string
    address?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
    dedication?: {
      type: 'honor' | 'memory'
      name: string
    }
  } | null>(null)
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<DonationFormData>({
    defaultValues: {
      frequency: 'one-time',
      anonymous: false,
      updates: true,
      dedicationType: ''
    }
  })

  const watchedFrequency = watch('frequency')
  const watchedDedicationType = watch('dedicationType')

  const suggestedAmounts = [
    { amount: '25', description: 'Provides school supplies for 1 student', impact: '1 student equipped' },
    { amount: '50', description: 'Provides complete school kit for 2 students', impact: '2 students helped' },
    { amount: '100', description: 'Supports school supplies for 4 students', impact: '4 lives changed' },
    { amount: '250', description: 'Sponsors education materials for 10 students', impact: '10 futures secured' },
    { amount: '500', description: 'Transforms an entire classroom', impact: '25+ students impacted' },
    { amount: 'custom', description: 'Choose your own amount', impact: 'Every dollar counts' }
  ]

  const impactStats = [
    { icon: Users, number: '500+', label: 'Students Helped' },
    { icon: BookOpen, number: '2,000+', label: 'School Items Donated' },
    { icon: Gift, number: '1', label: 'Project Completed' },
    { icon: Heart, number: '100%', label: 'Community Focused' },
  ]

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount)
    setValue('amount', amount)
    if (amount !== 'custom') {
      setCustomAmount('')
      setValue('customAmount', '')
    }
  }

  const onSubmit = async (data: DonationFormData) => {
    setIsProcessing(true)
    
    try {
      // In a real implementation, this would integrate with Stripe
      console.log('Processing donation:', data)
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate transaction ID
      const transactionId = 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9).toUpperCase()
      
      // Prepare donation data for receipt
      const finalAmount = data.amount === 'custom' ? data.customAmount || '0' : data.amount
      
      const donationData = {
        donorName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        amount: finalAmount,
        frequency: data.frequency,
        date: new Date().toLocaleDateString(),
        transactionId: transactionId,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        dedication: data.dedicationType && data.dedicatedTo ? {
          type: data.dedicationType as 'honor' | 'memory',
          name: data.dedicatedTo
        } : undefined
      }
      
      setCompletedDonation(donationData)
      setDonationComplete(true)
    } catch (error) {
      console.error('Donation failed:', error)
      // Handle error appropriately
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadReceipt = () => {
    if (completedDonation) {
      generateDonationReceipt(completedDonation)
    }
  }

  if (donationComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-primary-200 p-12">
            <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Your generous donation will make a real difference in the lives of students across Nigeria. 
              We&apos;ll send you a receipt shortly and keep you updated on the impact of your gift.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button icon={Download} onClick={downloadReceipt}>
                Download Receipt
              </Button>
              <Button variant="outline" href="/">
                Return to Homepage
              </Button>
            </div>
            
            {completedDonation && (
              <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
                <p className="text-primary-800 text-sm text-center">
                  <strong>Transaction ID:</strong> {completedDonation.transactionId}
                </p>
                <p className="text-primary-700 text-xs text-center mt-2">
                  Keep this ID for your records. Your receipt has been emailed to {completedDonation.email}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Make a <span className="text-gradient">Difference</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your donation directly supports educational opportunities for vulnerable children in Nigeria. 
              Together, we can transform lives through the power of education.
            </p>
          </motion.div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-primary-200 shadow-lg"
              >
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary-600 mb-1">{stat.number}</h3>
                <p className="text-gray-700 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl border border-primary-200 overflow-hidden"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Donation Amount Section */}
              <div className="p-8 border-b border-primary-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Choose Your Gift Amount</h2>
                
                {/* Frequency Toggle */}
                <div className="flex justify-center mb-8">
                  <div className="bg-primary-50 rounded-full p-1 flex">
                    <button
                      type="button"
                      onClick={() => setValue('frequency', 'one-time')}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        watchedFrequency === 'one-time'
                          ? 'gradient-primary text-white shadow-md'
                          : 'text-primary-600 hover:bg-primary-100'
                      }`}
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue('frequency', 'monthly')}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        watchedFrequency === 'monthly'
                          ? 'gradient-primary text-white shadow-md'
                          : 'text-primary-600 hover:bg-primary-100'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>
                
                {/* Amount Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {suggestedAmounts.map((suggestion, index) => (
                    <motion.button
                      key={suggestion.amount}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      onClick={() => handleAmountSelect(suggestion.amount)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedAmount === suggestion.amount
                          ? 'border-primary-500 bg-primary-50 shadow-lg transform scale-105'
                          : 'border-primary-200 hover:border-primary-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-primary-600">
                          {suggestion.amount === 'custom' ? '...' : `$${suggestion.amount}`}
                        </span>
                        {watchedFrequency === 'monthly' && suggestion.amount !== 'custom' && (
                          <span className="text-sm text-gray-500">/month</span>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{suggestion.description}</p>
                      <p className="text-primary-600 font-semibold text-sm">{suggestion.impact}</p>
                    </motion.button>
                  ))}
                </div>
                
                {/* Custom Amount Input */}
                {selectedAmount === 'custom' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Custom Amount ($)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        {...register('customAmount', {
                          required: selectedAmount === 'custom',
                          min: { value: 1, message: 'Minimum donation is $1' },
                          onChange: (e) => setCustomAmount(e.target.value)
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 text-lg"
                        placeholder="Enter amount"
                      />
                    </div>
                    {errors.customAmount && (
                      <p className="mt-2 text-sm text-red-600">{errors.customAmount.message}</p>
                    )}
                  </motion.div>
                )}
                
                <input type="hidden" {...register('amount', { required: true })} />
              </div>

              {/* Donor Information */}
              <div className="p-8 border-b border-primary-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'First name is required' })}
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Last name is required' })}
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
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
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      {...register('country', { required: 'Country is required' })}
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500"
                    >
                      <option value="">Select your country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="NG">Nigeria</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.country && (
                      <p className="mt-2 text-sm text-red-600">{errors.country.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Checkboxes */}
                <div className="mt-6 space-y-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      {...register('anonymous')}
                      className="mt-1 w-5 h-5 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      Make this donation anonymous
                    </span>
                  </label>
                  
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      {...register('updates')}
                      className="mt-1 w-5 h-5 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      I would like to receive updates about Beacon of Blessings&apos; work and impact
                    </span>
                  </label>
                </div>
              </div>

              {/* Dedication Section */}
              <div className="p-8 border-b border-primary-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Dedication (Optional)</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dedication Type
                  </label>
                  <select
                    {...register('dedicationType')}
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500"
                  >
                    <option value="">No dedication</option>
                    <option value="honor">In honor of someone</option>
                    <option value="memory">In memory of someone</option>
                  </select>
                </div>
                
                {watchedDedicationType && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {watchedDedicationType === 'honor' ? 'In Honor Of' : 'In Memory Of'}
                    </label>
                    <input
                      type="text"
                      {...register('dedicatedTo')}
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500"
                      placeholder="Enter name"
                    />
                  </motion.div>
                )}
              </div>

              {/* Tax Information Notice */}
              <div className="p-8 border-b border-primary-100">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-2">Tax Deductibility Information</h4>
                      <p className="text-amber-700 text-sm leading-relaxed">
                        Beacon of Blessings Charity Initiative is registered in Nigeria. Donations made to our organization 
                        may not be tax-deductible in the United States, Canada, or other countries outside of Nigeria. 
                        Please consult with your tax advisor regarding the tax treatment of international charitable donations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3" />
                  Secure Payment
                </h3>
                
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-6 h-6 text-primary-600" />
                    <span className="font-semibold text-primary-800">Your donation is secure</span>
                  </div>
                  <p className="text-primary-700 text-sm">
                    We use industry-standard encryption to protect your personal and payment information. 
                    Your data is safe and will never be shared with third parties.
                  </p>
                </div>
                
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    icon={Heart}
                    className="text-lg px-12 py-4"
                    disabled={isProcessing || !selectedAmount}
                  >
                    {isProcessing ? 'Processing...' : `Donate Now`}
                  </Button>
                  
                  {selectedAmount && (
                    <p className="mt-4 text-gray-600">
                      You are donating{' '}
                      <span className="font-bold text-primary-600">
                        ${selectedAmount === 'custom' ? customAmount : selectedAmount}
                        {watchedFrequency === 'monthly' ? '/month' : ''}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
          
          {/* Bible Verse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-primary-200 shadow-lg">
              <blockquote className="text-lg text-gray-800 italic mb-3">
                &ldquo;Give, and it will be given to you. A good measure, pressed down, shaken together and 
                running over, will be poured into your lap.&rdquo;
              </blockquote>
              <cite className="text-primary-600 font-semibold">Luke 6:38</cite>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}