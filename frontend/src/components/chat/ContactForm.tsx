"use client";

import { useState, FormEvent } from "react";
import { Send, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  onClose: () => void;
  onSuccess: (message: string) => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ onClose, onSuccess }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!message.trim() || message.length < 10) {
      setError("Please enter a message (at least 10 characters)");
      return;
    }
    if (!consent) {
      setError("Please provide consent to share your information");
      return;
    }

    setState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          consent,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send contact info");
      }

      setState("success");
      setTimeout(() => {
        onSuccess(
          `Thanks ${name}! Your contact information has been sent to the developer. They'll be in touch soon.`
        );
      }, 1500);
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
        <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
        <p className="text-sm text-muted-foreground">
          The developer will be notified and may reach out soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Get in Touch</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="text-sm text-muted-foreground -mt-2">
        Leave your contact info and the developer will get back to you.
      </p>

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium mb-1 block">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          disabled={state === "submitting"}
          className={cn(
            "w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="text-sm font-medium mb-1 block">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={state === "submitting"}
          className={cn(
            "w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="text-sm font-medium mb-1 block">
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What would you like to discuss?"
          rows={3}
          disabled={state === "submitting"}
          className={cn(
            "w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm resize-none",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
      </div>

      {/* Consent Checkbox */}
      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={state === "submitting"}
          className="mt-1 rounded border-gray-300"
        />
        <span className="text-muted-foreground">
          I consent to sharing my contact information with the developer. They
          may use it to respond to my inquiry.
        </span>
      </label>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className={cn(
          "flex items-center justify-center gap-2 rounded-lg",
          "bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground",
          "transition-colors hover:bg-primary/90",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        {state === "submitting" ? (
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
      </button>
    </form>
  );
}
