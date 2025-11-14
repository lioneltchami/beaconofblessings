'use client'

import { motion } from 'framer-motion'
import { Users, Gift, Calendar, MapPin, Star, Heart, Target, CheckCircle, Clock, Award } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ProjectsPage() {
  const completedProjects = [
    {
      id: 1,
      title: 'School Supplies Drive 2024',
      description: 'Our inaugural project that launched Beacon of Blessings into action. We identified vulnerable students across Lagos communities who lacked basic school supplies, creating barriers to their education.',
      longDescription: 'This transformative initiative was our first step in making a tangible difference in Nigerian communities. Working closely with local schools and community leaders, we identified students from low-income families who were at risk of dropping out due to lack of basic educational materials. The project spanned several months of careful planning, fundraising, and community engagement.',
      impact: {
        students: 500,
        schoolBags: 500,
        notebooks: 2000,
        textbooks: 1000,
        writingMaterials: 1500,
        communities: 5
      },
      location: 'Lagos Communities, Nigeria',
      duration: '3 months',
      startDate: 'June 2024',
      endDate: 'September 2024',
      status: 'completed',
      budget: '₦2,500,000',
      partners: ['Local Schools', 'Community Leaders', 'Parent Associations'],
      testimonials: [
        {
          name: 'Mrs. Adebayo',
          role: 'Teacher, Community Primary School',
          quote: 'The joy on my students\' faces when they received their school bags was indescribable. Many of them had been carrying their books in plastic bags or their hands. This project didn\'t just give them supplies; it gave them dignity and hope.'
        },
        {
          name: 'Chief Emeka',
          role: 'Community Leader',
          quote: 'Beacon of Blessings has shown what true charity looks like. They didn\'t just drop supplies and leave; they took time to understand our community\'s needs and worked with us as partners.'
        }
      ],
      outcomes: [
        'Zero dropouts among beneficiary students during the academic year',
        'Improved academic performance in participating schools',
        'Increased parent engagement in education',
        'Strengthened community partnerships',
        'Model framework developed for future projects'
      ],
      gallery: [
        '/images/projects/school-supplies-1.jpg',
        '/images/projects/school-supplies-2.jpg',
        '/images/projects/school-supplies-3.jpg',
        '/images/projects/school-supplies-4.jpg'
      ]
    }
  ]

  const upcomingProjects = [
    {
      id: 2,
      title: 'Digital Learning Initiative 2025',
      description: 'Bridging the digital divide by providing tablets and digital learning resources to underserved schools.',
      status: 'planned',
      expectedLaunch: 'Q2 2025',
      targetBeneficiaries: 300,
      estimatedBudget: '₦5,000,000',
      objectives: [
        'Provide 300 tablets to students in rural communities',
        'Install solar-powered charging stations in 10 schools',
        'Train 50 teachers on digital learning tools',
        'Develop offline educational content in local languages'
      ]
    },
    {
      id: 3,
      title: 'Girls\' Education Scholarship Program',
      description: 'Supporting young girls from vulnerable families to complete their secondary education.',
      status: 'development',
      expectedLaunch: 'Q3 2025',
      targetBeneficiaries: 100,
      estimatedBudget: '₦8,000,000',
      objectives: [
        'Provide full scholarships to 100 girls',
        'Include mentorship and life skills training',
        'Partner with local businesses for internship opportunities',
        'Create a support network for scholarship recipients'
      ]
    },
    {
      id: 4,
      title: 'Community Library Project',
      description: 'Establishing well-equipped libraries in underserved communities to promote literacy and learning.',
      status: 'concept',
      expectedLaunch: '2026',
      targetBeneficiaries: 2000,
      estimatedBudget: '₦15,000,000',
      objectives: [
        'Build 5 community libraries across Nigeria',
        'Stock libraries with age-appropriate books',
        'Create reading programs for children and adults',
        'Train local librarians and volunteers'
      ]
    }
  ]

  const projectStats = [
    { number: '500+', label: 'Lives Impacted', icon: Users },
    { number: '₦2.5M', label: 'Invested in Communities', icon: Gift },
    { number: '5', label: 'Communities Served', icon: MapPin },
    { number: '100%', label: 'Project Success Rate', icon: Award },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'planned': return 'bg-blue-100 text-blue-800'
      case 'development': return 'bg-yellow-100 text-yellow-800'
      case 'concept': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'planned': return Target
      case 'development': return Clock
      case 'concept': return Star
      default: return Clock
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
              Our <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover the tangible ways we&apos;re transforming lives and communities through 
              education-focused initiatives across Nigeria.
            </p>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-primary-200 shadow-lg">
              <blockquote className="text-lg text-gray-800 italic mb-3">
                &ldquo;Faith by itself, if it is not accompanied by action, is dead.&rdquo;
              </blockquote>
              <cite className="text-primary-600 font-semibold">James 2:17</cite>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Impact by the Numbers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Measuring our progress in creating lasting change in Nigerian communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</h3>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Projects */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Completed Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrating the successful initiatives that have already made a difference
            </p>
          </motion.div>

          {completedProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl border border-primary-200 overflow-hidden mb-12"
            >
              {/* Project Header */}
              <div className="gradient-primary p-8 text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-8 h-8 mr-3" />
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        Completed
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-xl text-white/90 mb-6">{project.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {project.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {project.startDate} - {project.endDate}
                      </div>
                      <div className="flex items-center">
                        <Gift className="w-4 h-4 mr-2" />
                        {project.budget}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8">
                {/* Project Description */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">{project.longDescription}</p>
                </div>

                {/* Impact Metrics */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Impact Achieved</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="bg-primary-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary-600">{project.impact.students}</div>
                      <div className="text-sm text-gray-700">Students Helped</div>
                    </div>
                    <div className="bg-primary-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary-600">{project.impact.schoolBags}</div>
                      <div className="text-sm text-gray-700">School Bags</div>
                    </div>
                    <div className="bg-primary-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary-600">{project.impact.notebooks}</div>
                      <div className="text-sm text-gray-700">Notebooks</div>
                    </div>
                    <div className="bg-primary-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary-600">{project.impact.textbooks}</div>
                      <div className="text-sm text-gray-700">Textbooks</div>
                    </div>
                    <div className="bg-primary-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary-600">{project.impact.writingMaterials}</div>
                      <div className="text-sm text-gray-700">Writing Materials</div>
                    </div>
                    <div className="bg-primary-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary-600">{project.impact.communities}</div>
                      <div className="text-sm text-gray-700">Communities</div>
                    </div>
                  </div>
                </div>

                {/* Key Outcomes */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Key Outcomes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Community Voices</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.testimonials.map((testimonial, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-primary-50 to-white rounded-xl p-6 border border-primary-100">
                        <blockquote className="text-gray-700 italic mb-4">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center">
                          <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{testimonial.name}</div>
                            <div className="text-sm text-primary-600">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partners */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Project Partners</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.partners.map((partner, idx) => (
                      <span key={idx} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Future Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Exciting initiatives in development that will expand our impact across Nigeria
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingProjects.map((project, index) => {
              const StatusIcon = getStatusIcon(project.status)
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-lg border border-primary-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <StatusIcon className="w-8 h-8 text-primary-500" />
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Expected Launch:</span>
                        <span className="font-medium text-gray-900">{project.expectedLaunch}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Target Beneficiaries:</span>
                        <span className="font-medium text-gray-900">{project.targetBeneficiaries}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Estimated Budget:</span>
                        <span className="font-medium text-gray-900">{project.estimatedBudget}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Objectives:</h4>
                      <ul className="space-y-1">
                        {project.objectives.slice(0, 2).map((objective, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <CheckCircle className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                        {project.objectives.length > 2 && (
                          <li className="text-sm text-primary-600 font-medium">
                            +{project.objectives.length - 2} more objectives
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}