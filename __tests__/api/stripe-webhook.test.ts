import { beforeEach, describe, expect, it, vi } from "vitest";

const constructEvent = vi.fn();
const sendDonationReceipt = vi.fn();
const sendDonationNotification = vi.fn();

vi.mock("@/lib/stripe", () => ({
  getStripe: () => ({
    webhooks: {
      constructEvent,
    },
  }),
}));

vi.mock("@/app/actions/emails", () => ({
  sendDonationReceipt,
  sendDonationNotification,
}));

function makeRequest() {
  return new Request("http://localhost/api/webhooks/stripe", {
    method: "POST",
    headers: {
      "stripe-signature": "sig_test",
    },
    body: "{}",
  });
}

describe("Stripe webhook", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_test");
    constructEvent.mockReset();
    sendDonationReceipt.mockReset();
    sendDonationNotification.mockReset();
    sendDonationReceipt.mockResolvedValue({ success: true });
    sendDonationNotification.mockResolvedValue({ success: true });
  });

  it("falls back to customer_details.email for one-time donation emails", async () => {
    constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_123",
          mode: "payment",
          payment_status: "paid",
          amount_total: 5000,
          currency: "usd",
          metadata: {
            donorName: "Fallback Donor",
            donorEmail: "",
            programName: "School Readiness Kits",
          },
          customer_details: {
            email: "fallback@example.com",
          },
        },
      },
    });
    const { POST } = await import("@/app/api/webhooks/stripe/route");

    const response = await POST(makeRequest());

    expect(response.status).toBe(200);
    expect(sendDonationReceipt).toHaveBeenCalledWith(
      expect.objectContaining({
        donorEmail: "fallback@example.com",
        donorName: "Fallback Donor",
        amount: 50,
        frequency: "one-time",
        programName: "School Readiness Kits",
      }),
    );
    expect(sendDonationNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        donorEmail: "fallback@example.com",
        frequency: "one-time",
        programName: "School Readiness Kits",
      }),
    );
  });

  it("prefers Stripe customer_details.email over stale checkout metadata email", async () => {
    constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_456",
          mode: "payment",
          payment_status: "paid",
          amount_total: 10000,
          currency: "usd",
          metadata: {
            donorName: "Verified Donor",
            donorEmail: "stale@example.com",
          },
          customer_details: {
            email: "verified@example.com",
          },
        },
      },
    });
    const { POST } = await import("@/app/api/webhooks/stripe/route");

    await POST(makeRequest());

    expect(sendDonationReceipt).toHaveBeenCalledWith(
      expect.objectContaining({
        donorEmail: "verified@example.com",
      }),
    );
  });

  it("sends recurring receipt and notification emails for donation invoice.paid events", async () => {
    constructEvent.mockReturnValue({
      type: "invoice.paid",
      data: {
        object: {
          id: "in_test_123",
          number: "INV-123",
          amount_paid: 2500,
          currency: "usd",
          created: 1779321600,
          customer_email: "invoice@example.com",
          customer_name: "Invoice Donor",
          parent: {
            subscription_details: {
              subscription: "sub_123",
              metadata: {
                donationType: "donation",
                donorName: "Monthly Donor",
                donorEmail: "monthly@example.com",
                programName: "Girls' Education Support",
              },
            },
          },
        },
      },
    });
    const { POST } = await import("@/app/api/webhooks/stripe/route");

    const response = await POST(makeRequest());

    expect(response.status).toBe(200);
    expect(sendDonationReceipt).toHaveBeenCalledWith(
      expect.objectContaining({
        donorEmail: "invoice@example.com",
        donorName: "Monthly Donor",
        amount: 25,
        donationId: "INV-123",
        frequency: "monthly",
        programName: "Girls' Education Support",
      }),
    );
    expect(sendDonationNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        donorEmail: "invoice@example.com",
        frequency: "monthly",
        programName: "Girls' Education Support",
      }),
    );
  });
});
