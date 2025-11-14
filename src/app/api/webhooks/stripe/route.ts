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

/**
 * Handle successful payment intent
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment Intent Succeeded:', paymentIntent.id)

    // Extract donation data from metadata
    const metadata = paymentIntent.metadata

    // Generate PDF receipt (if email provided)
    if (paymentIntent.receipt_email && metadata.donorName) {
      const donationData = {
        donorName: metadata.donorName,
        email: paymentIntent.receipt_email,
        amount: (paymentIntent.amount / 100).toFixed(2),
        frequency: 'one-time' as const,
        date: new Date(paymentIntent.created * 1000).toLocaleDateString(),
        transactionId: paymentIntent.id,
        dedication: metadata.dedication ? {
          type: (metadata.dedicationType || 'honor') as 'honor' | 'memory',
          name: metadata.dedication,
        } : undefined,
      }

      // Note: In a real implementation, you would send the PDF via email
      // For now, we just log that we would generate it
      console.log('Would generate receipt for:', donationData)

      // You can integrate with an email service here
      // Example: await sendReceiptEmail(donationData)
    }

    // Here you could also:
    // - Save donation to database
    // - Send thank you email
    // - Update analytics
    // - Notify admins

  } catch (error) {
    console.error('Error handling payment intent succeeded:', error)
  }
}

/**
 * Handle successful subscription creation or payment
 */
async function handleSubscriptionSucceeded(stripe: Stripe, subscription: Stripe.Subscription) {
  try {
    console.log('Subscription Succeeded:', subscription.id)

    // Get customer details
    const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer

    // Extract donation data
    const amount = subscription.items.data[0].price.unit_amount || 0

    if (customer.email) {
      const donationData = {
        donorName: customer.name || 'Valued Donor',
        email: customer.email,
        amount: (amount / 100).toFixed(2),
        frequency: 'monthly' as const,
        date: new Date(subscription.created * 1000).toLocaleDateString(),
        transactionId: subscription.id,
        dedication: subscription.metadata.dedication ? {
          type: (subscription.metadata.dedicationType || 'honor') as 'honor' | 'memory',
          name: subscription.metadata.dedication,
        } : undefined,
      }

      console.log('Would generate subscription receipt for:', donationData)

      // Here you would:
      // - Send welcome email for recurring donation
      // - Save subscription to database
      // - Set up recurring receipt emails
    }

  } catch (error) {
    console.error('Error handling subscription succeeded:', error)
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment Failed:', paymentIntent.id)

    // Here you would:
    // - Notify the donor of the failed payment
    // - Log the failure for admin review
    // - Potentially retry or suggest alternative payment methods

  } catch (error) {
    console.error('Error handling payment failed:', error)
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    console.log('Subscription Cancelled:', subscription.id)

    // Here you would:
    // - Update database to mark subscription as cancelled
    // - Send cancellation confirmation email
    // - Update any recurring payment schedules

  } catch (error) {
    console.error('Error handling subscription deleted:', error)
  }
}

/**
 * Main webhook handler
 */
export async function POST(request: NextRequest) {
  try {
    // Initialize Stripe client
    const stripe = getStripeClient()

    // Get webhook secret
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'STRIPE_WEBHOOK_SECRET is not configured' },
        { status: 500 }
      )
    }

    // Get the raw body as text (required for signature verification)
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionSucceeded(stripe, event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_succeeded':
        console.log('Invoice payment succeeded:', event.data.object.id)
        // Handle recurring payment success
        break

      case 'invoice.payment_failed':
        console.log('Invoice payment failed:', event.data.object.id)
        // Handle recurring payment failure
        break

      default:
        console.log('Unhandled event type:', event.type)
    }

    // Return success response
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Configure the route to accept raw body
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
