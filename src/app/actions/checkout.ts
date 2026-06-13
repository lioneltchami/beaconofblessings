"use server";

import { redirect } from "next/navigation";
import { getProgram } from "@/lib/sanity/queries";
import { getStripe } from "@/lib/stripe";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function createCheckoutSession(formData: FormData) {
  const amount = Number(formData.get("amount"));
  const frequencyValue = formData.get("frequency");
  const frequency =
    frequencyValue === "monthly" || frequencyValue === "one-time"
      ? frequencyValue
      : "one-time";
  const donorName = String(formData.get("donorName") ?? "").trim();
  const donorEmail = String(formData.get("donorEmail") ?? "").trim();
  const programSlug = String(formData.get("programSlug") ?? "");
  const program = programSlug ? await getProgram(programSlug) : null;

  if (!amount || amount < 1 || amount > 999999) {
    throw new Error("Invalid donation amount");
  }

  const stripe = getStripe();
  const mode = frequency === "monthly" ? "subscription" : "payment";
  const amountCents = Math.round(amount * 100);
  const metadata = {
    donationType: "donation",
    donorName: donorName || "Anonymous",
    donorEmail,
    frequency,
    amount: amount.toFixed(2),
    amountCents: String(amountCents),
    ...(program
      ? {
          programSlug: program.slug,
          programName: program.title,
        }
      : {}),
  };
  const productDescription = [
    frequency === "monthly" ? "Monthly donation" : "One-time donation",
    program ? `Designated for ${program.title}` : undefined,
  ]
    .filter(Boolean)
    .join(" - ");

  const session = await stripe.checkout.sessions.create({
    mode,
    customer_email: donorEmail || undefined,
    submit_type: "donate",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amountCents,
          product_data: {
            name: "Donation to Beacon of Blessings",
            description: productDescription,
          },
          ...(mode === "subscription"
            ? { recurring: { interval: "month" } }
            : {}),
        },
        quantity: 1,
      },
    ],
    metadata,
    ...(mode === "payment"
      ? {
          invoice_creation: {
            enabled: true,
            invoice_data: {
              description: "Donation to Beacon of Blessings Charity Initiative",
              footer:
                "Beacon of Blessings Charity Initiative is registered in Nigeria. Please consult your local tax adviser about deductibility.",
              metadata,
            },
          },
          payment_intent_data: {
            receipt_email: donorEmail || undefined,
            metadata,
          },
        }
      : {
          subscription_data: {
            description: "Monthly donation to Beacon of Blessings",
            metadata,
          },
        }),
    success_url: `${BASE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${BASE_URL}/donate/cancel`,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  redirect(session.url);
}
