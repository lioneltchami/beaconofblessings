import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

// Lazy Stripe initialization helper
function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-10-29.clover',
    typescript: true,
  })
}

// Payment Intent Request Interface
interface PaymentIntentRequest {
  amount: number
  currency?: string
  donorName: string
  email: string
  metadata?: {
    donorName: string
    email: string
    dedication?: string
    dedicationType?: string
  }
}

// Validation function
function validatePaymentRequest(data: PaymentIntentRequest): { valid: boolean; error?: string } {
  // Validate amount (minimum $1, maximum $999,999)
  if (!data.amount || data.amount < 100 || data.amount > 99999900) {
    return { valid: false, error: 'Invalid amount. Must be between $1 and $999,999' }
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    return { valid: false, error: 'Invalid email address' }
  }

  // Validate donor name
  if (!data.donorName || data.donorName.trim().length < 2) {
    return { valid: false, error: 'Invalid donor name' }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (5 payment attempts per minute per IP)
    const clientIp = getClientIp(request.headers)
    const rateLimitResult = rateLimit(clientIp, { maxRequests: 5, windowMs: 60000 })

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      )
    }

    // Initialize Stripe client
    const stripe = getStripeClient()

    // Parse request body
    const body: PaymentIntentRequest = await request.json()

    // Validate input
    const validation = validatePaymentRequest(body)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount, // Amount in cents
      currency: body.currency || 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        donorName: body.donorName,
        email: body.email,
        ...body.metadata,
      },
      description: `Donation to Beacon of Blessings from ${body.donorName}`,
      receipt_email: body.email,
    })

    // Return client secret to frontend
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)

    // Handle Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'An error occurred while processing your donation. Please try again.' },
      { status: 500 }
    )
  }
}

// Prevent caching of API routes
export const dynamic = 'force-dynamic'
