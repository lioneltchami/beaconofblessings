/**
 * Unit tests for SkipToContent Component
 */

import { render, screen } from '@testing-library/react'
import SkipToContent from '../SkipToContent'

describe('SkipToContent Component', () => {
  it('should render skip to content link', () => {
    render(<SkipToContent />)

    const link = screen.getByText('Skip to main content')
    expect(link).toBeInTheDocument()
  })

  it('should have correct href attribute', () => {
    render(<SkipToContent />)

    const link = screen.getByText('Skip to main content')
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('should have sr-only class for screen readers', () => {
    render(<SkipToContent />)

    const link = screen.getByText('Skip to main content')
    expect(link).toHaveClass('sr-only')
  })

  it('should have focus-visible styling classes', () => {
    render(<SkipToContent />)

    const link = screen.getByText('Skip to main content')
    expect(link.className).toContain('focus:not-sr-only')
    expect(link.className).toContain('focus:absolute')
    expect(link.className).toContain('focus:z-50')
  })

  it('should be accessible via keyboard', () => {
    render(<SkipToContent />)

    const link = screen.getByText('Skip to main content')
    expect(link.tagName).toBe('A')
    expect(link).toBeVisible()
  })

  it('should have proper positioning styles', () => {
    render(<SkipToContent />)

    const link = screen.getByText('Skip to main content')
    expect(link.className).toContain('focus:top-4')
    expect(link.className).toContain('focus:left-4')
  })

  it('should have proper visual styles on focus', () => {
    render(<SkipToContent />)

    const link = screen.getByText('Skip to main content')
    expect(link.className).toContain('focus:bg-blue-600')
    expect(link.className).toContain('focus:text-white')
    expect(link.className).toContain('focus:rounded-lg')
    expect(link.className).toContain('focus:shadow-lg')
  })
})
