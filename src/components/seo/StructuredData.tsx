/**
 * JSON-LD Structured Data Components
 * Provides rich structured data for search engines
 * Follows schema.org standards
 */

interface OrganizationDataProps {
  url?: string
}

/**
 * Organization Structured Data
 * Provides detailed organization information to search engines
 */
export function OrganizationStructuredData({ url }: OrganizationDataProps) {
  const baseUrl = url || process.env.NEXT_PUBLIC_SITE_URL || 'https://beaconofblessings.org'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Beacon of Blessings Charity Initiative',
    alternateName: 'Beacon of Blessings',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: 'A Christian nonprofit organization based in Nigeria, sharing the love of Jesus Christ through educational support, school supplies, and compassionate care for vulnerable communities.',
    foundingDate: '2024',
    founders: [
      {
        '@type': 'Person',
        name: 'Lionel Tchami',
        jobTitle: 'Co-Founder & Director',
      },
      {
        '@type': 'Person',
        name: 'Grace Kure',
        jobTitle: 'Co-Founder & Director',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressCountry: 'NG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-123-456-7890',
      contactType: 'Customer Service',
      email: 'info@beaconofblessings.org',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://facebook.com/beaconofblessings',
      'https://twitter.com/beaconofblessings',
      'https://instagram.com/beaconofblessings',
      'https://youtube.com/@beaconofblessings',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    nonprofitStatus: 'NonprofitType',
    missionCoverageTier: 'National',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

/**
 * Donation Action Structured Data
 * Helps search engines understand donation functionality
 */
export function DonationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beaconofblessings.org'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    agent: {
      '@type': 'NGO',
      name: 'Beacon of Blessings Charity Initiative',
    },
    recipient: {
      '@type': 'NGO',
      name: 'Beacon of Blessings Charity Initiative',
    },
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/donate`,
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    },
    description: 'Support our mission to provide educational support and compassionate care for vulnerable communities in Nigeria',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

/**
 * Breadcrumb Structured Data
 * Helps search engines understand page hierarchy
 */
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beaconofblessings.org'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
