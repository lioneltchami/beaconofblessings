'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Globe, HandHeart, Star, Target, Eye, Shield } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  const founders = [
    {
      name: 'Lionel Tchami',
      role: 'Co-Founder & Director',
      description: 'A passionate advocate for education and community development, Lionel brings years of experience in nonprofit leadership. His heart for serving vulnerable communities was ignited through personal experiences and a deep commitment to living out Christ&apos;s love through practical action.',
      background: 'Based internationally with extensive experience in community outreach and organizational development.',
      vision: 'To see every child in Nigeria have access to quality education and the opportunity to reach their God-given potential.',
    },
    {
      name: 'Grace Kure',
      role: 'Co-Founder & Nigeria Operations Lead',
      description: 'Grace is our boots-on-the-ground leader in Nigeria, bringing intimate knowledge of local communities and their specific needs. Her compassionate heart and practical approach ensure our initiatives reach those who need them most.',
      background: 'A lifelong resident of Nigeria with deep community connections and understanding of local challenges.',
      vision: 'To be a beacon of hope in Nigerian communities, demonstrating God&apos;s love through sustainable, impactful programs.',
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Love in Action',
      description: 'We believe love is demonstrated through practical service to others, especially those in need.',
      scripture: 'Dear children, let us not love with words or speech but with actions and in truth. (1 John 3:18)'
    },
    {
      icon: Shield,
      title: 'Integrity & Transparency',
      description: 'We maintain the highest standards of accountability in all our operations and communications.',
      scripture: 'The integrity of the upright guides them. (Proverbs 11:3)'
    },
    {
      icon: HandHeart,
      title: 'Compassionate Service',
      description: 'We serve with genuine compassion, treating every beneficiary with dignity and respect.',
      scripture: 'Be kind and compassionate to one another. (Ephesians 4:32)'
    },
    {
      icon: Globe,
      title: 'Community Focus',
      description: 'We work within communities to understand their needs and develop sustainable solutions.',
      scripture: 'As we have opportunity, let us do good to all people. (Galatians 6:10)'
    }
  ]

  const milestones = [
    {
      year: '2024',
      title: 'Organization Founded',
      description: 'Lionel Tchami and Grace Kure officially established Beacon of Blessings Charity Initiative with a vision to transform lives through education.',
    },
    {
      year: '2024',
      title: 'First Project Launch',
      description: 'Successfully completed our inaugural School Supplies Drive, providing educational materials to over 500 students across Lagos communities.',
    },
    {
      year: 'Ongoing',
      title: 'Expanding Impact',
      description: 'Developing new programs and partnerships to reach more vulnerable communities across Nigeria.',
    }
  ]

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
              About <span className="text-gradient">Our Mission</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover the heart behind Beacon of Blessings Charity Initiative and our commitment 
              to sharing God&apos;s love through practical service to vulnerable communities in Nigeria.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-200 shadow-lg">
                <blockquote className="text-xl text-gray-800 italic leading-relaxed mb-6">
                  &ldquo;The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. 
                  He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, 
                  to set the oppressed free.&rdquo;
                </blockquote>
                <cite className="text-primary-600 font-semibold text-lg">Luke 4:18</cite>
              </div>
              
              <div className="mt-12 text-lg text-gray-700 leading-relaxed space-y-6">
                <p>
                  Beacon of Blessings Charity Initiative was born from a divine calling to be the hands and feet 
                  of Jesus in our world. Founded in 2024 by Lionel Tchami and Grace Kure, our organization emerged 
                  from a shared burden for the educational needs of vulnerable children and families across Nigeria.
                </p>
                <p>
                  The inspiration came through witnessing firsthand the challenges faced by students who lacked 
                  basic school supplies - a seemingly small barrier that created enormous obstacles to their educational 
                  journey. We realized that sometimes the difference between a child staying in school or dropping out 
                  could be as simple as having a backpack, notebooks, and pencils.
                </p>
                <p>
                  Our name, &ldquo;Beacon of Blessings,&rdquo; reflects our commitment to being a light in dark places, 
                  pointing others toward hope, opportunity, and the transformative love of Christ. We believe that 
                  every act of service, no matter how small, can become a beacon that illuminates the path to a 
                  brighter future.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Vision & Mission</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-primary-200"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                To be a transformative beacon of hope across Nigeria, illuminating pathways to education, 
                opportunity, and spiritual growth for vulnerable communities. We envision a Nigeria where 
                every child has access to quality education and where the love of Christ is demonstrated 
                through practical, sustainable community development.
              </p>
              <div className="bg-primary-50 rounded-lg p-4">
                <blockquote className="text-primary-800 italic">
                  &ldquo;Where there is no vision, the people perish.&rdquo;
                </blockquote>
                <cite className="text-primary-600 font-medium">Proverbs 29:18</cite>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-primary-200"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                To share the love of Jesus Christ through practical, compassionate service to vulnerable 
                communities in Nigeria, with a primary focus on educational support, school supplies, 
                and programs that empower children and families to break cycles of poverty through education 
                and spiritual growth.
              </p>
              <div className="bg-primary-50 rounded-lg p-4">
                <blockquote className="text-primary-800 italic">
                  &ldquo;Let us not love with words or speech but with actions and in truth.&rdquo;
                </blockquote>
                <cite className="text-primary-600 font-medium">1 John 3:18</cite>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Founders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              United by faith and a shared vision for transformation, our founders bring diverse experiences 
              and unwavering commitment to serving vulnerable communities.
            </p>
          </motion.div>

          <div className="space-y-16">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-200 shadow-lg">
                    <h3 className="text-2xl font-bold text-primary-600 mb-2">{founder.name}</h3>
                    <p className="text-primary-500 font-semibold mb-4">{founder.role}</p>
                    <p className="text-gray-700 mb-6 leading-relaxed">{founder.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Background</h4>
                        <p className="text-gray-600 text-sm">{founder.background}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Personal Vision</h4>
                        <p className="text-gray-600 text-sm italic">{founder.vision}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative">
                    <div className="w-full aspect-square bg-gradient-to-br from-primary-200 to-primary-300 rounded-2xl flex items-center justify-center text-white text-8xl font-bold shadow-xl">
                      {founder.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 gradient-primary rounded-full flex items-center justify-center shadow-lg">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These biblical principles guide every aspect of our work and define who we are as an organization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-primary-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{value.description}</p>
                  </div>
                </div>
                
                <div className="bg-primary-50 rounded-lg p-4">
                  <blockquote className="text-primary-800 italic text-sm">
                    {value.scripture}
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From vision to reality - key milestones in our mission to transform lives through education.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full gradient-primary"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-gradient-to-br from-white to-primary-50 rounded-2xl p-6 shadow-lg border border-primary-200">
                      <div className="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}