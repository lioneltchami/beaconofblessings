import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The Stripe constructor is invoked with `new`, so the mock must be a proper
// constructor function (not an arrow function).
vi.mock("stripe", () => {
  const MockStripe = vi.fn(function MockStripe(this: unknown) {
    Object.assign(this as object, {
      checkout: { sessions: { create: vi.fn() } },
      webhooks: { constructEvent: vi.fn() },
    });
  });
  return { default: MockStripe };
});

describe("getStripe()", () => {
  // Reset modules before each test so the singleton cache is cleared.
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("throws when STRIPE_SECRET_KEY is missing", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "");

    const { getStripe } = await import("@/lib/stripe");
    expect(() => getStripe()).toThrowError(
      "STRIPE_SECRET_KEY is not set. Add it to your .env.local file.",
    );
  });

  it("returns a Stripe instance when STRIPE_SECRET_KEY is set", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_fake_key");

    const { getStripe } = await import("@/lib/stripe");
    const instance = getStripe();
    expect(instance).toBeDefined();
    expect(instance).toHaveProperty("checkout");
  });

  it("returns the same cached instance on subsequent calls", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_fake_key");

    const { getStripe } = await import("@/lib/stripe");
    const first = getStripe();
    const second = getStripe();
    expect(first).toBe(second);
  });
});
