"use server";

import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function createCheckoutSession(formData: FormData) {
  const amount = Number(formData.get("amount"));
  const frequency = formData.get("frequency") as string;
  const donorName = formData.get("donorName") as string;
  const donorEmail = formData.get("donorEmail") as string;

  if (!amount || amount < 1 || amount > 999999) {
    throw new Error("Invalid donation amount");
  }

  const stripe = getStripe();
  const mode = frequency === "monthly" ? "subscription" : "payment";

  const session = await stripe.checkout.sessions.create({
    mode,
    customer_email: donorEmail || undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(amount * 100),
          product_data: {
            name: "Donation to Beacon of Blessings",
            description: `${frequency === "monthly" ? "Monthly" : "One-time"} donation`,
          },
          ...(mode === "subscription"
            ? { recurring: { interval: "month" } }
            : {}),
        },
        quantity: 1,
      },
    ],
    metadata: {
      donorName: donorName || "Anonymous",
      donorEmail: donorEmail || "",
      frequency: frequency || "one-time",
    },
    success_url: `${BASE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${BASE_URL}/donate/cancel`,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  redirect(session.url);
}
