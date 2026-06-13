import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const createSession = vi.fn();
const redirect = vi.fn();

vi.mock("@/lib/stripe", () => ({
  getStripe: () => ({
    checkout: {
      sessions: {
        create: createSession,
      },
    },
  }),
}));

vi.mock("next/navigation", () => ({
  redirect,
}));

function makeFormData(fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }
  return formData;
}

describe("createCheckoutSession()", () => {
  beforeEach(() => {
    vi.resetModules();
    createSession.mockReset();
    redirect.mockReset();
    createSession.mockResolvedValue({ url: "https://checkout.stripe.test/pay" });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("creates a one-time Stripe Checkout Session with receipt and invoice metadata", async () => {
    const { createCheckoutSession } = await import("@/app/actions/checkout");

    await createCheckoutSession(
      makeFormData({
        amount: "75",
        frequency: "one-time",
        donorName: "Ada Donor",
        donorEmail: "ada@example.com",
        programSlug: "school-readiness-kits",
      }),
    );

    expect(createSession).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        customer_email: "ada@example.com",
        submit_type: "donate",
        metadata: expect.objectContaining({
          donationType: "donation",
          donorName: "Ada Donor",
          donorEmail: "ada@example.com",
          frequency: "one-time",
          amountCents: "7500",
          programSlug: "school-readiness-kits",
          programName: "School Readiness Kits",
        }),
        invoice_creation: expect.objectContaining({
          enabled: true,
          invoice_data: expect.objectContaining({
            metadata: expect.objectContaining({
              donationType: "donation",
              programName: "School Readiness Kits",
            }),
          }),
        }),
        payment_intent_data: expect.objectContaining({
          receipt_email: "ada@example.com",
          metadata: expect.objectContaining({
            frequency: "one-time",
            programSlug: "school-readiness-kits",
          }),
        }),
      }),
    );
    expect(redirect).toHaveBeenCalledWith("https://checkout.stripe.test/pay");
  });

  it("creates a monthly subscription Checkout Session with subscription metadata", async () => {
    const { createCheckoutSession } = await import("@/app/actions/checkout");

    await createCheckoutSession(
      makeFormData({
        amount: "25",
        frequency: "monthly",
        donorName: "",
        donorEmail: "",
        programSlug: "girls-education-support",
      }),
    );

    expect(createSession).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "subscription",
        customer_email: undefined,
        metadata: expect.objectContaining({
          donorName: "Anonymous",
          frequency: "monthly",
          amountCents: "2500",
          programSlug: "girls-education-support",
          programName: "Girls' Education Support",
        }),
        subscription_data: expect.objectContaining({
          description: "Monthly donation to Beacon of Blessings",
          metadata: expect.objectContaining({
            donationType: "donation",
            frequency: "monthly",
            programName: "Girls' Education Support",
          }),
        }),
      }),
    );
    expect(createSession.mock.calls[0][0].line_items[0].price_data.recurring).toEqual({
      interval: "month",
    });
  });

  it("rejects invalid donation amounts", async () => {
    const { createCheckoutSession } = await import("@/app/actions/checkout");

    await expect(
      createCheckoutSession(
        makeFormData({
          amount: "0",
          frequency: "one-time",
        }),
      ),
    ).rejects.toThrow("Invalid donation amount");
  });

  it("ignores unknown program slugs instead of trusting client-provided program names", async () => {
    const { createCheckoutSession } = await import("@/app/actions/checkout");

    await createCheckoutSession(
      makeFormData({
        amount: "40",
        frequency: "one-time",
        programSlug: "not-a-real-program",
        programName: "Fake Program",
      }),
    );

    expect(createSession.mock.calls[0][0].metadata).not.toHaveProperty(
      "programSlug",
    );
    expect(createSession.mock.calls[0][0].metadata).not.toHaveProperty(
      "programName",
    );
  });
});
