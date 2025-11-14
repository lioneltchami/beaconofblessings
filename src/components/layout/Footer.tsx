'use client'

import Link from 'next/link'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const navigation = {
    main: [
      { name: 'About', href: '/about' },
      { name: 'Projects', href: '/projects' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Contact', href: '/contact' },
      { name: 'Donate', href: '/donate' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialMedia = [
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      name: 'YouTube',
      href: '#',
      icon: Youtube,
    },
  ]

  const contactInfo = [
    {
      icon: Mail,
      text: 'info@beaconofblessings.org',
      href: 'mailto:info@beaconofblessings.org',
    },
    {
      icon: Phone,
      text: '+234 (0) 123 456 7890',
      href: 'tel:+2341234567890',
    },
    {
      icon: MapPin,
      text: 'Lagos, Nigeria',
      href: '#',
    },
  ]

  return (
    <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Organization Info */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">
                  Beacon of Blessings
                </span>
                <span className="text-primary-300 font-medium text-sm">
                  Charity Initiative
                </span>
              </div>
            </Link>

            <p className="text-primary-100 mb-3 text-sm leading-relaxed">
              Sharing the love of Jesus Christ through educational support and compassionate care 
              for the vulnerable communities across Nigeria. Together, we shine light in dark places 
              and bring hope where it&apos;s needed most.
            </p>

            {/* Social Media */}
            <div className="flex space-x-3">
              {socialMedia.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-primary-300 hover:text-white hover:bg-white/20 transition-all duration-300"
                  aria-label={item.name}
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-primary-200 hover:text-white transition-colors duration-300 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Contact Us</h3>
            <ul className="space-y-2">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-2 text-primary-200 hover:text-white transition-colors duration-300 group"
                  >
                    <item.icon className="w-4 h-4 text-primary-400 group-hover:text-primary-300 transition-colors" />
                    <span className="text-sm">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-200 text-sm">
              &copy; {currentYear} Beacon of Blessings Charity Initiative. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-primary-200 hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="text-primary-300 text-sm flex items-center space-x-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>for Nigeria</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer