import '@testing-library/jest-dom'

// Mock environment variables for testing
process.env.NEXT_PUBLIC_GA_ID = 'G-TEST123'
process.env.NEXT_PUBLIC_SITE_URL = 'https://test.beaconofblessings.org'
process.env.STRIPE_SECRET_KEY = 'sk_test_mock'
process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_mock'
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_mock'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver

// Mock window.gtag for analytics tests
global.window.gtag = jest.fn()
