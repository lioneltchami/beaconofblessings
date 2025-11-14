'use client'

/**
 * Skip to Content Link
 * Provides keyboard users a way to skip navigation and jump directly to main content
 * Follows WCAG 2.1 accessibility guidelines
 */
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  )
}
