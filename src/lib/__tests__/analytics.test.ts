/**
 * Unit tests for Analytics Utility Functions
 */

import {
  trackPageView,
  trackDonation,
  trackDonationStart,
  trackFormSubmission,
  trackOutboundLink,
  trackSocialClick,
  trackVideoPlay,
  trackCustomEvent,
} from '../analytics'

describe('Analytics Utility Functions', () => {
  let mockGtag: jest.Mock

  beforeEach(() => {
    mockGtag = jest.fn()
    global.window.gtag = mockGtag
    process.env.NEXT_PUBLIC_GA_ID = 'G-TEST123'
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('trackPageView', () => {
    it('should track page view with correct parameters', () => {
      trackPageView('/about')

      expect(mockGtag).toHaveBeenCalledWith('config', 'G-TEST123', {
        page_path: '/about',
      })
    })

    it('should not throw error if gtag is undefined', () => {
      delete (global.window as {gtag?: unknown}).gtag

      expect(() => trackPageView('/contact')).not.toThrow()
    })
  })

  describe('trackDonation', () => {
    it('should track one-time donation with all parameters', () => {
      trackDonation({
        amount: 5000,
        currency: 'USD',
        frequency: 'one-time',
        donorName: 'John Doe',
      })

      expect(mockGtag).toHaveBeenCalledWith('event', 'donation', {
        event_category: 'Donations',
        event_label: 'one-time',
        value: 50, // 5000 cents = $50
        currency: 'USD',
        donor_name: 'John Doe',
      })
    })

    it('should track monthly donation', () => {
      trackDonation({
        amount: 2500,
        currency: 'USD',
        frequency: 'monthly',
      })

      expect(mockGtag).toHaveBeenCalledWith('event', 'donation', {
        event_category: 'Donations',
        event_label: 'monthly',
        value: 25,
        currency: 'USD',
        donor_name: undefined,
      })
    })

    it('should convert cents to dollars correctly', () => {
      trackDonation({
        amount: 10050,
        currency: 'USD',
        frequency: 'one-time',
      })

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        'donation',
        expect.objectContaining({
          value: 100.5,
        })
      )
    })
  })

  describe('trackDonationStart', () => {
    it('should track donation initiation', () => {
      trackDonationStart({
        amount: 5000,
        frequency: 'one-time',
      })

      expect(mockGtag).toHaveBeenCalledWith('event', 'begin_checkout', {
        event_category: 'Donations',
        event_label: 'one-time',
        value: 50,
        currency: 'USD',
      })
    })

    it('should track monthly donation start', () => {
      trackDonationStart({
        amount: 10000,
        frequency: 'monthly',
      })

      expect(mockGtag).toHaveBeenCalledWith('event', 'begin_checkout', {
        event_category: 'Donations',
        event_label: 'monthly',
        value: 100,
        currency: 'USD',
      })
    })
  })

  describe('trackFormSubmission', () => {
    it('should track form submission with form name', () => {
      trackFormSubmission('Contact Form')

      expect(mockGtag).toHaveBeenCalledWith('event', 'form_submission', {
        event_category: 'Forms',
        event_label: 'Contact Form',
      })
    })

    it('should track different form types', () => {
      trackFormSubmission('Newsletter Signup')

      expect(mockGtag).toHaveBeenCalledWith('event', 'form_submission', {
        event_category: 'Forms',
        event_label: 'Newsletter Signup',
      })
    })
  })

  describe('trackOutboundLink', () => {
    it('should track outbound link with URL and label', () => {
      trackOutboundLink('https://example.com', 'External Link')

      expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
        event_category: 'Outbound Links',
        event_label: 'External Link',
        transport_type: 'beacon',
      })
    })

    it('should use URL as label if label not provided', () => {
      trackOutboundLink('https://example.com')

      expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
        event_category: 'Outbound Links',
        event_label: 'https://example.com',
        transport_type: 'beacon',
      })
    })
  })

  describe('trackSocialClick', () => {
    it('should track social media clicks', () => {
      trackSocialClick('Facebook')

      expect(mockGtag).toHaveBeenCalledWith('event', 'social_click', {
        event_category: 'Social Media',
        event_label: 'Facebook',
      })
    })

    it('should track different platforms', () => {
      const platforms = ['Twitter', 'Instagram', 'YouTube']

      platforms.forEach((platform) => {
        trackSocialClick(platform)
      })

      expect(mockGtag).toHaveBeenCalledTimes(3)
    })
  })

  describe('trackVideoPlay', () => {
    it('should track video play events', () => {
      trackVideoPlay('Mission Video 2024')

      expect(mockGtag).toHaveBeenCalledWith('event', 'video_start', {
        event_category: 'Video',
        event_label: 'Mission Video 2024',
      })
    })
  })

  describe('trackCustomEvent', () => {
    it('should track custom event with parameters', () => {
      trackCustomEvent('custom_action', {
        custom_param: 'value',
        count: 5,
      })

      expect(mockGtag).toHaveBeenCalledWith('event', 'custom_action', {
        custom_param: 'value',
        count: 5,
      })
    })

    it('should track custom event without parameters', () => {
      trackCustomEvent('simple_event')

      expect(mockGtag).toHaveBeenCalledWith('event', 'simple_event', undefined)
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing window.gtag gracefully', () => {
      delete (global.window as {gtag?: unknown}).gtag

      expect(() => {
        trackDonation({ amount: 1000, currency: 'USD', frequency: 'one-time' })
        trackFormSubmission('Test Form')
        trackSocialClick('Facebook')
      }).not.toThrow()
    })

    it('should handle zero amount donations', () => {
      trackDonation({
        amount: 0,
        currency: 'USD',
        frequency: 'one-time',
      })

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        'donation',
        expect.objectContaining({
          value: 0,
        })
      )
    })

    it('should handle large donation amounts', () => {
      trackDonation({
        amount: 99999900, // $999,999
        currency: 'USD',
        frequency: 'one-time',
      })

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        'donation',
        expect.objectContaining({
          value: 999999,
        })
      )
    })
  })
})
