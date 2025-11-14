/**
 * Sample Blog Posts Data
 * In production, this would come from Contentful CMS or a database
 */

import { BlogPost } from '@/types/blog'

export const blogPosts: BlogPost[] = [
  {
    slug: 'transforming-lives-through-education',
    title: 'Transforming Lives Through Education in Rural Nigeria',
    excerpt: 'Discover how our educational initiatives are empowering children in underserved communities across Nigeria.',
    content: `
# Transforming Lives Through Education

At Beacon of Blessings, we believe that education is the key to breaking the cycle of poverty and creating lasting change in communities. Over the past year, we've witnessed incredible transformations in the lives of children across rural Nigeria.

## Our Impact

- 500+ students provided with school supplies
- 15 schools supported with educational materials
- 50+ scholarships awarded to vulnerable children

## Moving Forward

As we continue to expand our reach, we remain committed to our mission of sharing the love of Jesus Christ through practical action. Every child deserves access to quality education, and together, we can make that a reality.
    `,
    author: 'Lionel Tchami',
    date: '2024-11-01',
    category: 'Impact Stories',
    tags: ['education', 'impact', 'nigeria'],
    readTime: '5 min read',
  },
  {
    slug: 'faith-in-action-community-outreach',
    title: 'Faith in Action: Our Community Outreach Programs',
    excerpt: 'Learn about how we translate our Christian values into tangible support for vulnerable communities.',
    content: `
# Faith in Action

Our faith calls us to serve those in need, and at Beacon of Blessings, we take this calling seriously. Through our community outreach programs, we're not just providing material support—we're sharing the love and hope of Jesus Christ.

## Programs That Make a Difference

1. **Educational Support**: School supplies, scholarships, and mentorship
2. **Food Assistance**: Regular food distributions to families in need
3. **Health Initiatives**: Basic healthcare and hygiene education

## The Power of Community

None of this would be possible without our incredible community of supporters, volunteers, and partners. Together, we are making a real difference in people's lives.
    `,
    author: 'Grace Kure',
    date: '2024-10-15',
    category: 'Ministry Updates',
    tags: ['faith', 'community', 'outreach'],
    readTime: '4 min read',
  },
  {
    slug: 'year-end-report-2024',
    title: '2024 Year-End Report: A Year of Blessings',
    excerpt: 'Reflecting on a transformative year and looking ahead to 2025 with hope and renewed commitment.',
    content: `
# 2024: A Year of Blessings

As we approach the end of 2024, we want to share with you the incredible work that God has accomplished through Beacon of Blessings this year.

## By the Numbers

- **Students Impacted**: 750+
- **Communities Reached**: 25
- **Volunteers Engaged**: 150+
- **Total Donations**: $125,000+

## Looking Ahead to 2025

With your continued support, we plan to:
- Expand our scholarship program
- Launch new community centers
- Increase our outreach to remote villages
- Develop sustainable agriculture programs

Thank you for being part of our mission to bring hope and opportunity to Nigeria's most vulnerable communities.
    `,
    author: 'Lionel Tchami & Grace Kure',
    date: '2024-12-01',
    category: 'Annual Reports',
    tags: ['annual-report', 'impact', '2024'],
    readTime: '7 min read',
  },
]

export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRecentPosts(limit: number = 3): BlogPost[] {
  return getBlogPosts().slice(0, limit)
}
