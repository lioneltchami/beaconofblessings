import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

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

// Subscription Request Interface
interface SubscriptionRequest {
  amount: number
  currency?: string
  donorName: string
  email: string
  paymentMethodId?: string
  metadata?: {
    donorName: string
    email: string
    dedication?: string
    dedicationType?: string
  }
}

// Validation function
function validateSubscriptionRequest(data: SubscriptionRequest): { valid: boolean; error?: string } {
  // Validate amount (minimum $5, maximum $999,999)
  if (!data.amount || data.amount < 500 || data.amount > 99999900) {
    return { valid: false, error: 'Invalid amount. Monthly donations must be between $5 and $999,999' }
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
    // Initialize Stripe client
    const stripe = getStripeClient()

    // Parse request body
    const body: SubscriptionRequest = await request.json()

    // Validate input
    const validation = validateSubscriptionRequest(body)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Create or retrieve customer
    let customer: Stripe.Customer

    // Check if customer already exists
    const existingCustomers = await stripe.customers.list({
      email: body.email,
      limit: 1,
    })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      // Create new customer
      customer = await stripe.customers.create({
        email: body.email,
        name: body.donorName,
        metadata: {
          donorName: body.donorName,
          ...body.metadata,
        },
      })
    }

    // Create price for this donation amount
    // In production, you might want to reuse prices or create them in the dashboard
    const price = await stripe.prices.create({
      unit_amount: body.amount,
      currency: body.currency || 'usd',
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: `Monthly Donation to Beacon of Blessings`,
      },
    })

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: price.id,
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        donorName: body.donorName,
        email: body.email,
        ...body.metadata,
      },
    })

    // Get the payment intent client secret
    // The latest_invoice includes the payment_intent when expanded
    const latestInvoice = subscription.latest_invoice

    if (typeof latestInvoice === 'string') {
      return NextResponse.json(
        { error: 'Invoice not expanded. Please contact support.' },
        { status: 500 }
      )
    }

    const invoice = latestInvoice as Stripe.Invoice & { payment_intent?: string | Stripe.PaymentIntent }
    const paymentIntentId = invoice.payment_intent

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'No payment intent found for subscription' },
        { status: 500 }
      )
    }

    if (typeof paymentIntentId === 'string') {
      // Payment intent was not expanded, need to retrieve it
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
      return NextResponse.json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
        customerId: customer.id,
      })
    }

    const paymentIntent = paymentIntentId as Stripe.PaymentIntent

    if (!paymentIntent.client_secret) {
      return NextResponse.json(
        { error: 'Failed to create payment intent for subscription' },
        { status: 500 }
      )
    }

    // Return client secret to frontend
    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
    })
  } catch (error) {
    console.error('Error creating subscription:', error)

    // Handle Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'An error occurred while setting up your monthly donation. Please try again.' },
      { status: 500 }
    )
  }
}

// Prevent caching of API routes
export const dynamic = 'force-dynamic'
