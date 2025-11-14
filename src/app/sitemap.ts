import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap Generation
 * Automatically generates sitemap.xml for all static pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beaconofblessings.org'

  // Static pages with their priorities and change frequencies
  const staticPages = [
    {
      url: '',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: '/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: '/projects',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: '/gallery',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: '/donate',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: '/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/privacy',
      lastModified: new Date('2025-11-14'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: '/terms',
      lastModified: new Date('2025-11-14'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  return staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
