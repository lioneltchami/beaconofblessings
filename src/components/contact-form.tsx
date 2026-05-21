"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const formData = new FormData(e.currentTarget);
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setErrorMessage(
          result.error ?? "Something went wrong. Please try again.",
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-[#C05A3C]/15 bg-white/80 p-8 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C05A3C]/10 ring-8 ring-[#C05A3C]/5">
          <CheckCircle2 className="h-7 w-7 text-[#C05A3C]" />
        </div>
        <h3 className="font-heading text-2xl font-semibold text-[#8B3A24]">
          Message Sent!
        </h3>
        <p className="max-w-md leading-7 text-muted-foreground">
          Thank you for reaching out. We will get back to you as soon as
          possible.
        </p>
        <Button
          variant="outline"
          onClick={() => setStatus("idle")}
          className="mt-2"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-name"
            name="name"
            placeholder="Your full name"
            autoComplete="name"
            required
            disabled={status === "submitting"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            disabled={status === "submitting"}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject">
          Subject <span className="text-destructive">*</span>
        </Label>
        <Input
          id="contact-subject"
          name="subject"
          placeholder="Donations, volunteering, partnership, or media"
          autoComplete="off"
          required
          disabled={status === "submitting"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Tell us what you need, the best way to reply, and any timing details."
          rows={6}
          required
          disabled={status === "submitting"}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-[#C05A3C] text-white shadow-sm hover:bg-[#8B3A24]"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
      <p className="text-center text-xs leading-5 text-muted-foreground">
        We use your details only to respond to this inquiry. For donor data
        handling, see our privacy commitments.
      </p>
    </form>
  );
}
