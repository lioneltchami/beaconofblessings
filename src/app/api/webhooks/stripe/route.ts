import { NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  sendDonationNotification,
  sendDonationReceipt,
} from "@/app/actions/emails";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const stripe = getStripe();

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe-webhook] Signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === "payment" && session.payment_status === "paid") {
          const donorName = session.metadata?.donorName ?? "Anonymous";
          const donorEmail = session.metadata?.donorEmail ?? "";
          const amount = (session.amount_total ?? 0) / 100;
          const currency = (session.currency ?? "usd").toUpperCase();
          const donationId = session.id;
          const date = new Date().toISOString().split("T")[0];

          if (donorEmail) {
            const [receiptResult, notificationResult] = await Promise.all([
              sendDonationReceipt({
                donorEmail,
                donorName,
                amount,
                currency,
                donationId,
                date,
              }),
              sendDonationNotification({
                donorName,
                donorEmail,
                amount,
                currency,
                donationId,
                date,
              }),
            ]);

            if (!receiptResult.success) {
              console.error(
                "[stripe-webhook] Failed to send donation receipt:",
                receiptResult.error,
              );
            }
            if (!notificationResult.success) {
              console.error(
                "[stripe-webhook] Failed to send donation notification:",
                notificationResult.error,
              );
            }
          } else {
            console.warn(
              "[stripe-webhook] No donor email in session metadata, skipping emails for session:",
              session.id,
            );
          }
        }
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionRef =
          invoice.parent?.subscription_details?.subscription ?? "none";
        console.log(
          "[stripe-webhook] Invoice paid:",
          invoice.id,
          "| Subscription:",
          typeof subscriptionRef === "string"
            ? subscriptionRef
            : subscriptionRef.id,
          "| Amount:",
          (invoice.amount_paid ?? 0) / 100,
          invoice.currency?.toUpperCase(),
        );
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(
          "[stripe-webhook] Subscription cancelled:",
          subscription.id,
          "| Customer:",
          subscription.customer,
          "| Status:",
          subscription.status,
        );
        break;
      }

      default: {
        console.log("[stripe-webhook] Unhandled event type:", event.type);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe-webhook] Handler error:", message);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
