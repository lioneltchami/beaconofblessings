'use client'

import { useState, memo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header role="banner" className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" aria-label="Beacon of Blessings Charity Initiative - Home">
            <div className="relative">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -inset-1 gradient-primary rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                Beacon of Blessings
              </span>
              <span className="text-sm text-primary-600 font-medium -mt-1">
                Charity Initiative
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-primary-600 font-medium py-2 px-1 transition-colors group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Donate Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/donate"
              className="gradient-primary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Heart className="w-4 h-4" />
              <span>Donate Now</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-primary-100 shadow-lg"
          >
            <nav className="px-4 py-6 space-y-4" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2 px-3 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-primary-100">
                <Link
                  href="/donate"
                  onClick={() => setIsMenuOpen(false)}
                  className="gradient-primary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 w-full"
                >
                  <Heart className="w-4 h-4" />
                  <span>Donate Now</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
})

Header.displayName = 'Header'

export default Header