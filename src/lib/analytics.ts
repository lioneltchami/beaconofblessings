/**
 * Google Analytics Event Tracking Utilities
 * Provides type-safe event tracking functions for GA4
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

/**
 * Track page view event
 */
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    })
  }
}

/**
 * Track donation event
 */
export const trackDonation = (params: {
  amount: number
  currency: string
  frequency: 'one-time' | 'monthly'
  donorName?: string
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'donation', {
      event_category: 'Donations',
      event_label: params.frequency,
      value: params.amount / 100, // Convert cents to dollars
      currency: params.currency,
      donor_name: params.donorName,
    })
  }
}

/**
 * Track donation initiation
 */
export const trackDonationStart = (params: {
  amount: number
  frequency: 'one-time' | 'monthly'
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      event_category: 'Donations',
      event_label: params.frequency,
      value: params.amount / 100,
      currency: 'USD',
    })
  }
}

/**
 * Track form submission
 */
export const trackFormSubmission = (formName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submission', {
      event_category: 'Forms',
      event_label: formName,
    })
  }
}

/**
 * Track outbound link click
 */
export const trackOutboundLink = (url: string, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Outbound Links',
      event_label: label || url,
      transport_type: 'beacon',
    })
  }
}

/**
 * Track social media click
 */
export const trackSocialClick = (platform: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_click', {
      event_category: 'Social Media',
      event_label: platform,
    })
  }
}

/**
 * Track video play
 */
export const trackVideoPlay = (videoTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_start', {
      event_category: 'Video',
      event_label: videoTitle,
    })
  }
}

/**
 * Track custom event
 */
export const trackCustomEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}
