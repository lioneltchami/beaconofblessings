// Contentful Content Types for Beacon of Blessings Charity Initiative

export interface ContentfulAsset {
  sys: {
    id: string
  }
  fields: {
    title: string
    file: {
      url: string
      details: {
        size: number
        image?: {
          width: number
          height: number
        }
      }
      fileName: string
      contentType: string
    }
  }
}

// Homepage Hero Section
export interface HeroSection {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'heroSection'
      }
    }
  }
  fields: {
    title: string
    subtitle: string
    description: string
    primaryButtonText: string
    primaryButtonLink: string
    secondaryButtonText: string
    secondaryButtonLink: string
    backgroundImage?: ContentfulAsset
    bibleVerse: string
    bibleVerseReference: string
  }
}

// Organization Information
export interface OrganizationInfo {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'organizationInfo'
      }
    }
  }
  fields: {
    organizationName: string
    tagline: string
    mission: string
    vision: string
    foundedDate: string
    location: string
    registrationNumber?: string
    email: string
    phone: string
    address: string
    socialMediaLinks: {
      facebook?: string
      twitter?: string
      instagram?: string
      youtube?: string
      linkedin?: string
    }
    logo?: ContentfulAsset
  }
}

// Founder Profile
export interface FounderProfile {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'founderProfile'
      }
    }
  }
  fields: {
    name: string
    role: string
    title: string
    bio: string
    background: string
    personalVision: string
    photo?: ContentfulAsset
    achievements: string[]
    email?: string
    linkedIn?: string
    order: number
  }
}

// Project
export interface Project {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'project'
      }
    }
  }
  fields: {
    title: string
    slug: string
    shortDescription: string
    fullDescription: string
    status: 'completed' | 'in-progress' | 'planned' | 'concept'
    startDate?: string
    endDate?: string
    expectedLaunchDate?: string
    location: string
    budget: string
    estimatedBudget?: string
    targetBeneficiaries: number
    actualBeneficiaries?: number
    featuredImage?: ContentfulAsset
    galleryImages?: ContentfulAsset[]
    objectives: string[]
    outcomes?: string[]
    partners: string[]
    testimonials?: Testimonial[]
    impactMetrics: {
      [key: string]: number | string
    }
    category: string[]
    featured: boolean
    order: number
  }
}

// Testimonial
export interface Testimonial {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'testimonial'
      }
    }
  }
  fields: {
    name: string
    role: string
    organization?: string
    quote: string
    photo?: ContentfulAsset
    projectRelated?: string
    featured: boolean
    order: number
  }
}

// Gallery Item
export interface GalleryItem {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'galleryItem'
      }
    }
  }
  fields: {
    title: string
    description: string
    image: ContentfulAsset
    category: 'projects' | 'community' | 'beneficiaries' | 'team' | 'ceremonies' | 'other'
    date: string
    location: string
    photographer?: string
    participants?: number
    projectRelated?: string
    featured: boolean
    order: number
  }
}

// Impact Statistics
export interface ImpactStatistic {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'impactStatistic'
      }
    }
  }
  fields: {
    title: string
    value: string
    description: string
    icon: string // Icon name from lucide-react
    category: 'students' | 'projects' | 'communities' | 'financial' | 'other'
    featured: boolean
    order: number
  }
}

// Blog Post / News Article
export interface BlogPost {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'blogPost'
      }
    }
  }
  fields: {
    title: string
    slug: string
    excerpt: string
    content: string
    publishDate: string
    author: string
    featuredImage?: ContentfulAsset
    category: string[]
    tags: string[]
    featured: boolean
    seoTitle?: string
    seoDescription?: string
  }
}

// FAQ Item
export interface FAQItem {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'faqItem'
      }
    }
  }
  fields: {
    question: string
    answer: string
    category: 'general' | 'donations' | 'volunteering' | 'projects' | 'technical'
    featured: boolean
    order: number
  }
}

// Core Values
export interface CoreValue {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'coreValue'
      }
    }
  }
  fields: {
    title: string
    description: string
    bibleVerse: string
    bibleVerseReference: string
    icon: string // Icon name from lucide-react
    order: number
  }
}

// Bible Verses
export interface BibleVerse {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'bibleVerse'
      }
    }
  }
  fields: {
    verse: string
    reference: string
    context: string
    category: 'mission' | 'service' | 'love' | 'hope' | 'justice' | 'other'
    featured: boolean
    order: number
  }
}

// Page Content (for flexible page content management)
export interface PageContent {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'pageContent'
      }
    }
  }
  fields: {
    pageName: string
    pageSlug: string
    sections: Array<Record<string, unknown>> // Flexible content sections
    seoTitle?: string
    seoDescription?: string
    lastUpdated: string
  }
}

// Contact Information
export interface ContactInfo {
  sys: {
    id: string
    contentType: {
      sys: {
        id: 'contactInfo'
      }
    }
  }
  fields: {
    type: 'email' | 'phone' | 'address' | 'office-hours' | 'social'
    title: string
    details: string
    description: string
    icon: string
    action?: string
    order: number
  }
}

// Union type for all content types
export type ContentfulEntry = 
  | HeroSection 
  | OrganizationInfo 
  | FounderProfile 
  | Project 
  | Testimonial 
  | GalleryItem 
  | ImpactStatistic 
  | BlogPost 
  | FAQItem 
  | CoreValue 
  | BibleVerse 
  | PageContent 
  | ContactInfo