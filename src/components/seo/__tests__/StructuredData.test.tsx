/**
 * Unit tests for Structured Data Components
 */

import { render } from '@testing-library/react'
import {
  OrganizationStructuredData,
  DonationStructuredData,
  BreadcrumbStructuredData,
} from '../StructuredData'

describe('Structured Data Components', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://test.beaconofblessings.org'
  })

  describe('OrganizationStructuredData', () => {
    it('should render JSON-LD script tag', () => {
      const { container } = render(<OrganizationStructuredData />)
      const script = container.querySelector('script[type="application/ld+json"]')
      expect(script).toBeInTheDocument()
    })

    it('should include organization schema with correct @type', () => {
      const { container } = render(<OrganizationStructuredData />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content['@context']).toBe('https://schema.org')
      expect(content['@type']).toBe('NGO')
    })

    it('should include organization details', () => {
      const { container } = render(<OrganizationStructuredData />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content.name).toBe('Beacon of Blessings Charity Initiative')
      expect(content.alternateName).toBe('Beacon of Blessings')
      expect(content.foundingDate).toBe('2024')
    })

    it('should include founder information', () => {
      const { container } = render(<OrganizationStructuredData />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content.founders).toHaveLength(2)
      expect(content.founders[0].name).toBe('Lionel Tchami')
      expect(content.founders[1].name).toBe('Grace Kure')
    })

    it('should include contact information', () => {
      const { container } = render(<OrganizationStructuredData />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content.contactPoint).toBeDefined()
      expect(content.contactPoint.telephone).toBe('+234-123-456-7890')
      expect(content.contactPoint.email).toBe('info@beaconofblessings.org')
    })

    it('should include social media profiles', () => {
      const { container } = render(<OrganizationStructuredData />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content.sameAs).toHaveLength(4)
      expect(content.sameAs).toContain('https://facebook.com/beaconofblessings')
      expect(content.sameAs).toContain('https://twitter.com/beaconofblessings')
    })

    it('should use custom URL when provided', () => {
      const customUrl = 'https://custom.example.com'
      const { container } = render(<OrganizationStructuredData url={customUrl} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content.url).toBe(customUrl)
    })
  })

  describe('DonationStructuredData', () => {
    it('should render JSON-LD script tag', () => {
      const { container } = render(<DonationStructuredData />)
      const script = container.querySelector('script[type="application/ld+json"]')
      expect(script).toBeInTheDocument()
    })

    it('should include DonateAction schema', () => {
      const { container } = render(<DonationStructuredData />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content['@context']).toBe('https://schema.org')
      expect(content['@type']).toBe('DonateAction')
    })

    it('should include donation target URL', () => {
      const { container } = render(<DonationStructuredData />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content.target.urlTemplate).toContain('/donate')
    })

    it('should support multiple platforms', () => {
      const { container } = render(<DonationStructuredData />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content.target.actionPlatform).toContain('http://schema.org/DesktopWebPlatform')
      expect(content.target.actionPlatform).toContain('http://schema.org/MobileWebPlatform')
    })
  })

  describe('BreadcrumbStructuredData', () => {
    const mockBreadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Projects', url: '/projects' },
    ]

    it('should render JSON-LD script tag', () => {
      const { container } = render(<BreadcrumbStructuredData items={mockBreadcrumbs} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      expect(script).toBeInTheDocument()
    })

    it('should include BreadcrumbList schema', () => {
      const { container } = render(<BreadcrumbStructuredData items={mockBreadcrumbs} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content['@type']).toBe('BreadcrumbList')
    })

    it('should include all breadcrumb items', () => {
      const { container } = render(<BreadcrumbStructuredData items={mockBreadcrumbs} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content.itemListElement).toHaveLength(2)
      expect(content.itemListElement[0].name).toBe('Home')
      expect(content.itemListElement[1].name).toBe('Projects')
    })

    it('should set correct positions', () => {
      const { container } = render(<BreadcrumbStructuredData items={mockBreadcrumbs} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content.itemListElement[0].position).toBe(1)
      expect(content.itemListElement[1].position).toBe(2)
    })

    it('should construct full URLs', () => {
      const { container } = render(<BreadcrumbStructuredData items={mockBreadcrumbs} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = JSON.parse(script?.textContent || '{}')

      expect(content.itemListElement[0].item).toContain('test.beaconofblessings.org/')
      expect(content.itemListElement[1].item).toContain('/projects')
    })
  })
})
