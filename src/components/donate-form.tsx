"use client";

import { Loader2, Lock, Shield } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createCheckoutSession } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const presets = [
  { amount: 25, impact: "Supplies for 1 student" },
  { amount: 50, impact: "Textbooks for 5 students" },
  { amount: 100, impact: "A full school kit for 10 students" },
  { amount: 250, impact: "Sponsor a classroom for a term" },
  { amount: 500, impact: "Fund a community learning centre" },
] as const;

function getImpactText(amount: number): string {
  if (amount <= 0) return "";
  if (amount < 25) return `Your $${amount} helps provide basic school supplies`;
  if (amount < 50)
    return `Your $${amount} provides supplies for ${Math.floor(amount / 25)} student${Math.floor(amount / 25) > 1 ? "s" : ""}`;
  if (amount < 100)
    return `Your $${amount} provides textbooks for ${Math.floor(amount / 10)} students`;
  if (amount < 250)
    return `Your $${amount} provides full school kits for ${Math.floor(amount / 10)} students`;
  if (amount < 500)
    return `Your $${amount} sponsors ${Math.floor(amount / 250)} classroom${Math.floor(amount / 250) > 1 ? "s" : ""} for a term`;
  return `Your $${amount} funds ${Math.floor(amount / 500)} community learning centre${Math.floor(amount / 500) > 1 ? "s" : ""}`;
}

function SubmitButton({ amount }: { amount: number }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || amount <= 0}
      className="h-12 w-full gap-2 rounded-full bg-[#EAB308] text-base font-semibold text-gray-900 hover:bg-[#FDE047] hover:shadow-[0_0_12px_rgba(234,179,8,0.4)]"
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Redirecting to Stripe...
        </>
      ) : (
        <>
          <Lock className="h-4 w-4" />
          {amount > 0 ? `Give $${amount} Securely` : "Select an Amount"}
        </>
      )}
    </Button>
  );
}

export function DonateForm() {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">(
    "one-time",
  );

  const finalAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  return (
    <form action={createCheckoutSession}>
      {/* Hidden fields for the server action */}
      <input type="hidden" name="amount" value={finalAmount} />
      <input type="hidden" name="frequency" value={frequency} />

      <Card>
        <CardContent className="space-y-8 pt-2">
          {/* Frequency Toggle */}
          <div>
            <Label className="mb-3 text-base font-semibold">
              Donation Frequency
            </Label>
            <div className="flex rounded-lg border p-1">
              <button
                type="button"
                onClick={() => setFrequency("one-time")}
                className={cn(
                  "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  frequency === "one-time"
                    ? "bg-[#0F766E] text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                One-time
              </button>
              <button
                type="button"
                onClick={() => setFrequency("monthly")}
                className={cn(
                  "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  frequency === "monthly"
                    ? "bg-[#0F766E] text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Amount Selection */}
          <div>
            <Label className="mb-3 text-base font-semibold">
              Select Amount
            </Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {presets.map(({ amount, impact }) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amount);
                    setIsCustom(false);
                    setCustomAmount("");
                  }}
                  className={cn(
                    "rounded-lg border-2 p-4 text-left transition-all",
                    !isCustom && selectedAmount === amount
                      ? "border-[#0F766E] bg-[#0F766E]/5 ring-2 ring-[#EAB308]/30"
                      : "border-border hover:border-muted-foreground/30",
                  )}
                >
                  <span
                    className={cn(
                      "text-xl font-bold",
                      !isCustom && selectedAmount === amount
                        ? "text-[#0F766E]"
                        : undefined,
                    )}
                  >
                    ${amount}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {impact}
                  </span>
                </button>
              ))}

              {/* Custom amount button */}
              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={cn(
                  "rounded-lg border-2 p-4 text-left transition-all",
                  isCustom
                    ? "border-[#0F766E] bg-[#0F766E]/5 ring-2 ring-[#EAB308]/30"
                    : "border-border hover:border-muted-foreground/30",
                )}
              >
                <span
                  className={cn(
                    "text-xl font-bold",
                    isCustom ? "text-[#0F766E]" : undefined,
                  )}
                >
                  Custom
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  Enter your own amount
                </span>
              </button>
            </div>

            {/* Custom amount input */}
            {isCustom && (
              <div className="mt-4">
                <Label htmlFor="custom-amount" className="mb-1.5">
                  Amount (USD)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="custom-amount"
                    type="number"
                    min="1"
                    max="999999"
                    step="1"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="h-10 pl-7 text-base"
                    required={isCustom}
                    autoFocus
                  />
                </div>
              </div>
            )}
          </div>

          {/* Impact preview */}
          {finalAmount > 0 && (
            <div className="rounded-lg border border-[#0F766E]/20 bg-[#0F766E]/5 px-4 py-3 text-center text-sm font-medium text-[#0F766E]">
              {getImpactText(finalAmount)}
            </div>
          )}

          {/* Donor Info (Optional) */}
          <div>
            <Label className="mb-3 text-base font-semibold">
              Your Information{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="donorName" className="mb-1.5">
                  Name
                </Label>
                <Input
                  id="donorName"
                  name="donorName"
                  type="text"
                  placeholder="Your name"
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor="donorEmail" className="mb-1.5">
                  Email
                </Label>
                <Input
                  id="donorEmail"
                  name="donorEmail"
                  type="email"
                  placeholder="your@email.com"
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="space-y-4">
            <SubmitButton amount={finalAmount} />

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#0F766E]" />
                Secure payment
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#0F766E]" />
                Powered by Stripe
              </span>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Donations may not be tax-deductible outside Nigeria. Beacon of
              Blessings Charity Initiative is registered in Nigeria.
            </p>

            <blockquote className="text-center text-sm italic text-muted-foreground">
              &ldquo;Give, and it will be given to you. A good measure, pressed
              down, shaken together and running over, will be poured into your
              lap.&rdquo;
              <cite className="mt-1 block text-xs font-medium not-italic text-[#0F766E]">
                &mdash; Luke 6:38
              </cite>
            </blockquote>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
