/**
 * Blog Post Type Definitions
 */

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  tags: string[]
  image?: string
  readTime?: string
}

export interface BlogCategory {
  name: string
  slug: string
  description: string
}
