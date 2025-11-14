'use client'

import { motion } from 'framer-motion'
import { FileText, AlertCircle, CheckCircle, XCircle, Scale, Heart } from 'lucide-react'

export default function TermsOfServicePage() {
  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using the Beacon of Blessings website (beaconofblessings.org), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use our website.',
        '',
        'These terms apply to all visitors, users, and others who access or use our website and services.'
      ]
    },
    {
      icon: Heart,
      title: 'Donations and Payments',
      content: [
        'Donations to Beacon of Blessings:',
        '• Are voluntary contributions to support our charitable work',
        '• Are processed securely through Stripe, a third-party payment processor',
        '• Are generally non-refundable (see refund policy below)',
        '• May be tax-deductible in Nigeria (consult your tax advisor)',
        '',
        'By making a donation, you represent that:',
        '• You are authorized to use the payment method provided',
        '• All information you provide is accurate and complete',
        '• You understand that your donation will be used to support our charitable activities',
        '',
        'We reserve the right to refuse or return any donation at our sole discretion.'
      ]
    },
    {
      icon: Scale,
      title: 'Refund Policy',
      content: [
        'Donations are generally non-refundable. However, we will consider refund requests in the following circumstances:',
        '• Technical errors that resulted in duplicate charges',
        '• Unauthorized transactions (subject to verification)',
        '• Charges made in error',
        '',
        'To request a refund, contact us at info@beaconofblessings.org within 30 days of the donation with:',
        '• Your transaction ID',
        '• The date and amount of the donation',
        '• The reason for your refund request',
        '',
        'Refunds, if approved, will be processed within 14 business days to the original payment method.'
      ]
    },
    {
      icon: FileText,
      title: 'Use of Website',
      content: [
        'You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:',
        '• Use the website in any way that violates any applicable law or regulation',
        '• Attempt to interfere with the proper functioning of the website',
        '• Use any robot, spider, or other automatic device to access the website',
        '• Attempt to gain unauthorized access to any portion of the website',
        '• Transmit any viruses, malware, or other malicious code',
        '• Collect or store personal data about other users'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Intellectual Property',
      content: [
        'All content on this website, including text, graphics, logos, images, and software, is the property of Beacon of Blessings or its content suppliers and is protected by international copyright laws.',
        '',
        'You may:',
        '• View and print pages from the website for personal, non-commercial use',
        '• Share our content on social media with proper attribution',
        '',
        'You may not:',
        '• Modify, reproduce, or distribute content without our written permission',
        '• Use our content for commercial purposes',
        '• Remove any copyright or proprietary notices'
      ]
    },
    {
      icon: XCircle,
      title: 'Disclaimer of Warranties',
      content: [
        'Our website and services are provided "as is" and "as available" without any warranties of any kind, either express or implied.',
        '',
        'We do not warrant that:',
        '• The website will be uninterrupted or error-free',
        '• Defects will be corrected',
        '• The website or servers are free of viruses or harmful components',
        '• The results of using the website will meet your requirements',
        '',
        'You use the website at your own risk.'
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
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our website and making donations to our organization.
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
              Welcome to Beacon of Blessings Charity Initiative. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of
              our website located at beaconofblessings.org and your relationship with our organization. Please read
              these Terms carefully before using our website or making a donation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
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

      {/* Additional Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Limitation of Liability */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                To the fullest extent permitted by law, Beacon of Blessings shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
                incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our total liability to you for any claim arising out of or relating to these Terms or our services
                shall not exceed the amount you have paid to us in the past six months.
              </p>
            </div>

            {/* Indemnification */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify and hold harmless Beacon of Blessings, its directors, officers, employees,
                and agents from any claims, damages, losses, liabilities, and expenses (including legal fees)
                arising out of or relating to your use of our website, violation of these Terms, or infringement
                of any third party rights.
              </p>
            </div>

            {/* Governing Law */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Jurisdiction</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Nigeria. Any disputes
                arising out of or relating to these Terms or our services shall be subject to the exclusive
                jurisdiction of the courts in Lagos, Nigeria.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to These Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by
                posting the new Terms on this page and updating the &ldquo;Last Updated&rdquo; date. Your continued use of
                our website after such changes constitutes your acceptance of the new Terms.
              </p>
            </div>

            {/* Severability */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be
                limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain
                in full force and effect.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-primary rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
              <p className="mb-4 text-white/90">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-white/90">
                <p><strong>Email:</strong> info@beaconofblessings.org</p>
                <p><strong>Address:</strong> Lagos, Nigeria</p>
                <p><strong>Website:</strong> www.beaconofblessings.org</p>
              </div>
              <p className="mt-6 text-white/80 text-sm">
                By using our website and services, you acknowledge that you have read, understood, and agree to be
                bound by these Terms of Service.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
