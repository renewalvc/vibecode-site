"use client";

import { useState, FormEvent } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function NewsletterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to subscribe. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[480px] py-24">
        {status === "success" ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              You&apos;re subscribed.
            </h1>
            <p className="text-muted mt-2">
              Check your inbox for a confirmation email.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Newsletter
            </h1>
            <p className="text-muted mt-2 mb-8">
              A weekly email with the best AI-built projects, new podcast
              episodes, and tutorials.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={status === "error" ? errorMessage : undefined}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>

            <p className="text-xs text-muted mt-4 text-center">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
