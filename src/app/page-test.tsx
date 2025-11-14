'use client'

import { motion } from 'framer-motion'
import { Heart, Users, BookOpen, Star, ArrowRight, Gift, HandHeart, Globe } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function TestHomepage() {
  const stats = [
    { number: '500+', label: 'Students Helped', icon: Users },
    { number: '50+', label: 'School Bags Donated', icon: BookOpen },
    { number: '1', label: 'Project Completed', icon: Star },
    { number: '100%', label: 'Community Focused', icon: Heart },
  ]

  const projects = [
    {
      title: 'School Supplies Drive 2024',
      description: 'Our inaugural project provided school bags, books, and supplies to over 500 students in need across Lagos communities.',
      impact: '500 students equipped for education',
      status: 'Completed',
      image: '/images/projects/school-supplies.jpg'
    }
  ]

  const founders = [
    {
      name: 'Lionel Tchami',
      role: 'Co-Founder & Director',
      description: 'Passionate about education and making a difference in vulnerable communities.',
    },
    {
      name: 'Grace Kure',
      role: 'Co-Founder & Nigeria Operations Lead',
      description: 'Based in Nigeria, Grace leads our on-ground operations and community engagement.',
    }
  ]

  return (
    <div className="min-h-screen" style={{
      '--test-primary-50': '#eff6ff',
      '--test-primary-100': '#dbeafe', 
      '--test-primary-200': '#bfdbfe',
      '--test-primary-300': '#93c5fd',
      '--test-primary-400': '#60a5fa',
      '--test-primary-500': '#3b82f6', // Main blue
      '--test-primary-600': '#2563eb', // Darker blue
      '--test-primary-700': '#1d4ed8',
      '--test-primary-800': '#1e40af',
      '--test-primary-900': '#1e3a8a',
      '--test-gold-400': '#fbbf24',
      '--test-gold-500': '#f59e0b', // Main gold
      '--test-gold-600': '#d97706', // Darker gold
      '--test-gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      '--test-gradient-hero': 'linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)',
      '--test-gradient-accent': 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)'
    } as React.CSSProperties}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #fef3c7 100%)'
      }}>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)',
          opacity: 0.1
        }}></div>
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Beacon of{' '}
              <span style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Blessings</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
              Sharing the love of Jesus Christ through educational support and compassionate care for vulnerable communities in Nigeria
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border shadow-lg" style={{
              borderColor: '#bfdbfe'
            }}>
              <blockquote className="text-lg text-gray-800 italic mb-3">
                &ldquo;For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink, I was a stranger and you invited me in.&rdquo;
              </blockquote>
              <cite style={{ color: '#2563eb' }} className="font-semibold">Matthew 25:35</cite>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button 
              className="text-lg px-8 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
              }}
            >
              <Heart className="w-5 h-5" />
              <span>Donate Now</span>
            </button>
            <button 
              className="text-lg px-8 py-4 font-semibold rounded-full border-2 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 hover:bg-blue-50"
              style={{
                borderColor: '#3b82f6',
                color: '#2563eb'
              }}
            >
              <span>See Our Impact</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl" style={{
          backgroundColor: '#60a5fa',
          opacity: 0.3
        }}></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full blur-xl" style={{
          backgroundColor: '#fbbf24',
          opacity: 0.3
        }}></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 rounded-full blur-xl" style={{
          backgroundColor: '#3b82f6',
          opacity: 0.3
        }}></div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Together, we&apos;re making a meaningful difference in communities across Nigeria
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
                  borderColor: '#bfdbfe'
                }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                  }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2" style={{ color: '#2563eb' }}>{stat.number}</h3>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20" style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #fef3c7 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded by Lionel Tchami and Grace Kure, Beacon of Blessings Charity Initiative was born from a heart to serve the less privileged and share God&apos;s love through practical action.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Founders</h3>
              <div className="space-y-6">
                {founders.map((founder, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg border" style={{ borderColor: '#bfdbfe' }}>
                    <h4 className="text-lg font-bold mb-1" style={{ color: '#2563eb' }}>{founder.name}</h4>
                    <p style={{ color: '#f59e0b' }} className="font-medium mb-3">{founder.role}</p>
                    <p className="text-gray-600">{founder.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border"
              style={{ borderColor: '#bfdbfe' }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision & Mission</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center" style={{ color: '#2563eb' }}>
                    <Globe className="w-5 h-5 mr-2" />
                    Vision
                  </h4>
                  <p className="text-gray-700">
                    To be a beacon of hope and transformation, illuminating the path to education and opportunity for vulnerable communities across Nigeria.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center" style={{ color: '#f59e0b' }}>
                    <HandHeart className="w-5 h-5 mr-2" />
                    Mission
                  </h4>
                  <p className="text-gray-700">
                    To share the love of Jesus Christ through practical support, focusing on educational resources, school supplies, and compassionate care for those in need.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how your support is making a real difference in communities across Nigeria
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl shadow-xl border overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)',
                  borderColor: '#bfdbfe'
                }}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: '#dbeafe',
                          color: '#1e40af'
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <Gift className="w-8 h-8" style={{ color: '#f59e0b' }} />
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#fef3c7' }}>
                    <p className="font-semibold flex items-center" style={{ color: '#92400e' }}>
                      <Star className="w-5 h-5 mr-2" />
                      Impact: {project.impact}
                    </p>
                  </div>

                  <button 
                    className="px-6 py-3 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                    }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-white" style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #3b82f6 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Join Us in Making a Difference</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Every donation, no matter the size, helps us reach more children and families in need. 
              Together, we can be the hands and feet of Jesus in our communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                className="px-8 py-4 text-lg font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#1e40af'
                }}
              >
                <Heart className="w-5 h-5" />
                <span>Make a Donation</span>
              </button>
              <button 
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-white text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Get Involved</span>
              </button>
            </div>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl max-w-2xl mx-auto border border-white/20">
              <blockquote className="text-lg italic mb-3">
                &ldquo;Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done.&rdquo;
              </blockquote>
              <cite className="text-blue-200 font-medium">Proverbs 19:17</cite>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}