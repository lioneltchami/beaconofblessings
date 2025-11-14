'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, ImageIcon, X, Calendar, MapPin, Users, Heart } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<{
    id: number
    title: string
    description: string
    date: string
    location: string
    participants: number
    photographer: string
  } | null>(null)

  // Placeholder gallery structure - ready for real photos
  const galleryCategories = [
    { id: 'all', name: 'All Photos', count: 0 },
    { id: 'projects', name: 'Project Activities', count: 0 },
    { id: 'community', name: 'Community Events', count: 0 },
    { id: 'beneficiaries', name: 'Our Beneficiaries', count: 0 },
    { id: 'team', name: 'Team & Volunteers', count: 0 },
    { id: 'ceremonies', name: 'Ceremonies & Celebrations', count: 0 }
  ]

  // Placeholder images structure for future content
  const placeholderGallery = [
    {
      id: 1,
      title: 'School Supplies Distribution - Lagos Community',
      description: 'Students receiving their new school bags and educational materials during our inaugural project.',
      category: 'projects',
      date: 'September 2024',
      location: 'Lagos, Nigeria',
      participants: 150,
      photographer: 'Project Team',
      image: '/images/gallery/placeholder-1.jpg'
    },
    {
      id: 2,
      title: 'Community Leaders Meeting',
      description: 'Meeting with local community leaders to plan future initiatives and understand community needs.',
      category: 'community',
      date: 'August 2024',
      location: 'Lagos, Nigeria',
      participants: 25,
      photographer: 'Grace Kure',
      image: '/images/gallery/placeholder-2.jpg'
    },
    {
      id: 3,
      title: 'Beneficiary Students with New Supplies',
      description: 'Joyful moments as students show off their new school supplies and express their gratitude.',
      category: 'beneficiaries',
      date: 'September 2024',
      location: 'Community School, Lagos',
      participants: 200,
      photographer: 'Lionel Tchami',
      image: '/images/gallery/placeholder-3.jpg'
    },
    {
      id: 4,
      title: 'Volunteer Team Preparation',
      description: 'Our dedicated volunteer team preparing school supply packages for distribution.',
      category: 'team',
      date: 'August 2024',
      location: 'Preparation Center, Lagos',
      participants: 15,
      photographer: 'Project Team',
      image: '/images/gallery/placeholder-4.jpg'
    },
    {
      id: 5,
      title: 'Project Launch Ceremony',
      description: 'Official launch ceremony of our School Supplies Drive with community members and stakeholders.',
      category: 'ceremonies',
      date: 'June 2024',
      location: 'Community Center, Lagos',
      participants: 100,
      photographer: 'Community Member',
      image: '/images/gallery/placeholder-5.jpg'
    },
    {
      id: 6,
      title: 'Educational Workshop',
      description: 'Workshop with teachers on how to best support students with new educational materials.',
      category: 'projects',
      date: 'September 2024',
      location: 'Local School, Lagos',
      participants: 30,
      photographer: 'Grace Kure',
      image: '/images/gallery/placeholder-6.jpg'
    }
  ]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredGallery = selectedCategory === 'all' 
    ? placeholderGallery 
    : placeholderGallery.filter(item => item.category === selectedCategory)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars  
  const openImageModal = (image: {
    id: number
    title: string
    description: string
    date: string
    location: string
    participants: number
    photographer: string
  }) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
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
              Our <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Witness the transformative moments from our projects and the joy we bring to communities across Nigeria.
            </p>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-primary-200 shadow-lg">
              <blockquote className="text-lg text-gray-800 italic mb-3">
                &ldquo;A picture is worth a thousand words, but the smile of a child receiving help is priceless.&rdquo;
              </blockquote>
              <cite className="text-primary-600 font-semibold">Beacon of Blessings Team</cite>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-primary-200 p-8 max-w-3xl mx-auto">
              <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery Coming Soon</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We&apos;re currently building our photo gallery to showcase the amazing work happening in our communities. 
                Soon you&apos;ll see beautiful moments from our projects, the joy of our beneficiaries, and the 
                dedicated work of our volunteers.
              </p>
              
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-primary-800 mb-3">What you&apos;ll find here:</h3>
                <ul className="text-left text-primary-700 space-y-2">
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 mr-2 flex-shrink-0" />
                    Photos from our School Supplies Drive project
                  </li>
                  <li className="flex items-center">
                    <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                    Community engagement activities
                  </li>
                  <li className="flex items-center">
                    <Camera className="w-4 h-4 mr-2 flex-shrink-0" />
                    Behind-the-scenes moments with our team
                  </li>
                  <li className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    Community events and ceremonies
                  </li>
                </ul>
              </div>

              <Button href="/projects" variant="primary" size="lg">
                View Our Completed Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Structure Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery Categories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our gallery will be organized into these categories to help you find the stories that matter most to you.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'gradient-primary text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border border-primary-200 hover:bg-primary-50'
                }`}
              >
                {category.name}
                {category.count > 0 && (
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Gallery Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-lg border border-primary-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Placeholder Image */}
                <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-white/70" />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                      {galleryCategories[index + 1]?.name.split(' ')[0] || 'Project'}
                    </span>
                    <span className="text-sm text-gray-500">Coming Soon</span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2">
                    Photo Collection {index + 1}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Beautiful moments from our community work will be featured here.
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      2024
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      Nigeria
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Image Modal (for future use) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeImageModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Date:</span><br />
                    {selectedImage.date}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span><br />
                    {selectedImage.location}
                  </div>
                  <div>
                    <span className="font-medium">Participants:</span><br />
                    {selectedImage.participants}
                  </div>
                  <div>
                    <span className="font-medium">Photographer:</span><br />
                    {selectedImage.photographer}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}