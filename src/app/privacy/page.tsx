'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, UserCheck, FileText, Globe } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: [
        'We collect information you provide directly to us when you:',
        '• Make a donation through our website',
        '• Fill out our contact form',
        '• Subscribe to our newsletter',
        '• Interact with our website',
        '',
        'This information may include:',
        '• Name and contact information (email address, phone number)',
        '• Billing information for donations',
        '• Communication preferences',
        '• Any other information you choose to provide'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'We use the information we collect to:',
        '• Process your donations securely',
        '• Send donation receipts and confirmations',
        '• Respond to your inquiries and requests',
        '• Send you updates about our projects and impact',
        '• Improve our website and services',
        '• Comply with legal obligations'
      ]
    },
    {
      icon: Shield,
      title: 'Information Security',
      content: [
        'We take the security of your personal information seriously:',
        '• All payment processing is handled through Stripe, a PCI-compliant payment processor',
        '• We use SSL encryption for all data transmission',
        '• We do not store credit card information on our servers',
        '• Access to personal information is restricted to authorized personnel only',
        '• We regularly review and update our security practices'
      ]
    },
    {
      icon: Globe,
      title: 'Information Sharing',
      content: [
        'We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:',
        '• With service providers who assist us in operating our website and processing donations (e.g., Stripe for payment processing)',
        '• When required by law or to respond to legal processes',
        '• To protect our rights, property, or safety, or that of our users or the public',
        '',
        'All third-party service providers are required to maintain the confidentiality of your information and use it only for the purposes for which we disclose it to them.'
      ]
    },
    {
      icon: Eye,
      title: 'Cookies and Tracking',
      content: [
        'We use cookies and similar tracking technologies to:',
        '• Remember your preferences',
        '• Understand how you use our website',
        '• Improve your experience on our site',
        '',
        'You can control cookies through your browser settings. Please note that disabling cookies may affect the functionality of our website.'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights and Choices',
      content: [
        'You have the right to:',
        '• Access the personal information we hold about you',
        '• Request correction of inaccurate information',
        '• Request deletion of your personal information',
        '• Opt-out of marketing communications',
        '• Withdraw consent where we rely on it',
        '',
        'To exercise these rights, please contact us at info@beaconofblessings.org'
      ]
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
            <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Last Updated: November 14, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-gray-700 text-lg leading-relaxed">
              Beacon of Blessings Charity Initiative (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
              our website beaconofblessings.org or make a donation to our organization.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              By using our website, you agree to the collection and use of information in accordance with this policy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg border border-primary-200 p-8"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <div className="space-y-2">
                      {section.content.map((paragraph, idx) => (
                        <p key={idx} className="text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Children's Privacy */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has provided
                us with personal information, please contact us immediately.
              </p>
            </div>

            {/* International Users */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
              <p className="text-gray-700 leading-relaxed">
                Beacon of Blessings is based in Nigeria. If you are accessing our website from outside Nigeria,
                please be aware that your information may be transferred to, stored, and processed in Nigeria where
                our servers are located. By using our website, you consent to the transfer of your information to
                Nigeria and the use of your information in accordance with this Privacy Policy.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                the new Privacy Policy on this page and updating the &ldquo;Last Updated&rdquo; date. You are advised to review
                this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-primary rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4 text-white/90">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-2 text-white/90">
                <p><strong>Email:</strong> info@beaconofblessings.org</p>
                <p><strong>Address:</strong> Lagos, Nigeria</p>
                <p><strong>Website:</strong> www.beaconofblessings.org</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
