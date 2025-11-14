import { createClient } from 'contentful'
import {
  ContentfulAsset,
  HeroSection,
  OrganizationInfo,
  FounderProfile,
  Project,
  Testimonial,
  GalleryItem,
  ImpactStatistic,
  BlogPost,
  FAQItem,
  CoreValue,
  BibleVerse,
  ContactInfo
} from '@/types/contentful'

// Contentful client configuration
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
})

// Preview client for draft content
const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  host: 'preview.contentful.com',
})

// Helper function to get client based on preview mode
const getClient = (preview = false) => (preview ? previewClient : client)

// Generic function to fetch entries
async function fetchEntries<T>(
  contentType: string,
  options: {
    preview?: boolean
    limit?: number
    skip?: number
    order?: string
    query?: Record<string, string | boolean | number>
  } = {}
): Promise<T[]> {
  const { preview = false, limit = 100, skip = 0, order, query = {} } = options
  
  try {
    const queryParams: Record<string, unknown> = {
      content_type: contentType,
      limit,
      skip,
      ...query,
    }
    
    if (order) {
      queryParams.order = order
    }
    
    const response = await getClient(preview).getEntries(queryParams)
    
    return response.items as T[]
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error)
    return []
  }
}

// Generic function to fetch a single entry by ID
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchEntry<T>(
  entryId: string,
  options: { preview?: boolean } = {}
): Promise<T | null> {
  const { preview = false } = options
  
  try {
    const entry = await getClient(preview).getEntry(entryId)
    return entry as T
  } catch (error) {
    console.error(`Error fetching entry ${entryId}:`, error)
    return null
  }
}

// Specific API functions for each content type

// Hero Section
export async function getHeroSection(preview = false): Promise<HeroSection | null> {
  const entries = await fetchEntries<HeroSection>('heroSection', { 
    preview, 
    limit: 1 
  })
  return entries[0] || null
}

// Organization Info
export async function getOrganizationInfo(preview = false): Promise<OrganizationInfo | null> {
  const entries = await fetchEntries<OrganizationInfo>('organizationInfo', { 
    preview, 
    limit: 1 
  })
  return entries[0] || null
}

// Founders
export async function getFounders(preview = false): Promise<FounderProfile[]> {
  return await fetchEntries<FounderProfile>('founderProfile', {
    preview,
    order: 'fields.order'
  })
}

export async function getFounderBySlug(slug: string, preview = false): Promise<FounderProfile | null> {
  const entries = await fetchEntries<FounderProfile>('founderProfile', {
    preview,
    limit: 1,
    query: { 'fields.slug': slug }
  })
  return entries[0] || null
}

// Projects
export async function getProjects(preview = false): Promise<Project[]> {
  return await fetchEntries<Project>('project', {
    preview,
    order: '-fields.order'
  })
}

export async function getFeaturedProjects(preview = false): Promise<Project[]> {
  return await fetchEntries<Project>('project', {
    preview,
    query: { 'fields.featured': true },
    order: '-fields.order'
  })
}

export async function getCompletedProjects(preview = false): Promise<Project[]> {
  return await fetchEntries<Project>('project', {
    preview,
    query: { 'fields.status': 'completed' },
    order: '-fields.endDate'
  })
}

export async function getUpcomingProjects(preview = false): Promise<Project[]> {
  return await fetchEntries<Project>('project', {
    preview,
    query: { 'fields.status[in]': 'planned,in-progress,concept' },
    order: 'fields.expectedLaunchDate'
  })
}

export async function getProjectBySlug(slug: string, preview = false): Promise<Project | null> {
  const entries = await fetchEntries<Project>('project', {
    preview,
    limit: 1,
    query: { 'fields.slug': slug }
  })
  return entries[0] || null
}

// Testimonials
export async function getTestimonials(preview = false): Promise<Testimonial[]> {
  return await fetchEntries<Testimonial>('testimonial', {
    preview,
    order: '-fields.order'
  })
}

export async function getFeaturedTestimonials(preview = false): Promise<Testimonial[]> {
  return await fetchEntries<Testimonial>('testimonial', {
    preview,
    query: { 'fields.featured': true },
    order: '-fields.order'
  })
}

// Gallery
export async function getGalleryItems(preview = false): Promise<GalleryItem[]> {
  return await fetchEntries<GalleryItem>('galleryItem', {
    preview,
    order: '-fields.date'
  })
}

export async function getGalleryByCategory(category: string, preview = false): Promise<GalleryItem[]> {
  return await fetchEntries<GalleryItem>('galleryItem', {
    preview,
    query: { 'fields.category': category },
    order: '-fields.date'
  })
}

export async function getFeaturedGalleryItems(preview = false): Promise<GalleryItem[]> {
  return await fetchEntries<GalleryItem>('galleryItem', {
    preview,
    query: { 'fields.featured': true },
    order: '-fields.order'
  })
}

// Impact Statistics
export async function getImpactStatistics(preview = false): Promise<ImpactStatistic[]> {
  return await fetchEntries<ImpactStatistic>('impactStatistic', {
    preview,
    order: 'fields.order'
  })
}

export async function getFeaturedImpactStats(preview = false): Promise<ImpactStatistic[]> {
  return await fetchEntries<ImpactStatistic>('impactStatistic', {
    preview,
    query: { 'fields.featured': true },
    order: 'fields.order'
  })
}

// Blog Posts
export async function getBlogPosts(preview = false): Promise<BlogPost[]> {
  return await fetchEntries<BlogPost>('blogPost', {
    preview,
    order: '-fields.publishDate'
  })
}

export async function getFeaturedBlogPosts(preview = false): Promise<BlogPost[]> {
  return await fetchEntries<BlogPost>('blogPost', {
    preview,
    query: { 'fields.featured': true },
    order: '-fields.publishDate'
  })
}

export async function getBlogPostBySlug(slug: string, preview = false): Promise<BlogPost | null> {
  const entries = await fetchEntries<BlogPost>('blogPost', {
    preview,
    limit: 1,
    query: { 'fields.slug': slug }
  })
  return entries[0] || null
}

// FAQs
export async function getFAQItems(preview = false): Promise<FAQItem[]> {
  return await fetchEntries<FAQItem>('faqItem', {
    preview,
    order: 'fields.order'
  })
}

export async function getFAQByCategory(category: string, preview = false): Promise<FAQItem[]> {
  return await fetchEntries<FAQItem>('faqItem', {
    preview,
    query: { 'fields.category': category },
    order: 'fields.order'
  })
}

// Core Values
export async function getCoreValues(preview = false): Promise<CoreValue[]> {
  return await fetchEntries<CoreValue>('coreValue', {
    preview,
    order: 'fields.order'
  })
}

// Bible Verses
export async function getBibleVerses(preview = false): Promise<BibleVerse[]> {
  return await fetchEntries<BibleVerse>('bibleVerse', {
    preview,
    order: 'fields.order'
  })
}

export async function getFeaturedBibleVerses(preview = false): Promise<BibleVerse[]> {
  return await fetchEntries<BibleVerse>('bibleVerse', {
    preview,
    query: { 'fields.featured': true },
    order: 'fields.order'
  })
}

export async function getBibleVersesByCategory(category: string, preview = false): Promise<BibleVerse[]> {
  return await fetchEntries<BibleVerse>('bibleVerse', {
    preview,
    query: { 'fields.category': category },
    order: 'fields.order'
  })
}

// Contact Info
export async function getContactInfo(preview = false): Promise<ContactInfo[]> {
  return await fetchEntries<ContactInfo>('contactInfo', {
    preview,
    order: 'fields.order'
  })
}

// Utility functions
export function getAssetUrl(asset: ContentfulAsset | null | undefined, width?: number, quality?: number): string {
  if (!asset?.fields?.file?.url) return ''
  
  let url = asset.fields.file.url
  if (url.startsWith('//')) {
    url = `https:${url}`
  }
  
  // Add image optimization parameters if needed
  const params = new URLSearchParams()
  if (width) params.append('w', width.toString())
  if (quality) params.append('q', quality.toString())
  
  return params.toString() ? `${url}?${params}` : url
}

export function formatContentfulDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Cache utilities for better performance
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  return null
}

export function setCachedData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}

// Wrapper function that adds caching
export async function getCachedEntries<T>(
  key: string,
  fetchFunction: () => Promise<T>
): Promise<T> {
  const cached = getCachedData<T>(key)
  if (cached) return cached
  
  const data = await fetchFunction()
  setCachedData(key, data)
  return data
}