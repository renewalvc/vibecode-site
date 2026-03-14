"use client";

import { useState, FormEvent } from "react";
import {
  Mail,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Star,
  Clock,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

/* WHY: Placeholder past issue data — demonstrates newsletter value
   without needing a real archive. Dates kept recent for credibility. */
const PAST_ISSUES = [
  {
    title: "How a Solo Dev Built a $10K MRR SaaS in 6 Weeks with Claude Code",
    date: "March 7, 2026",
  },
  {
    title: "5 Prompt Engineering Patterns Every Vibe Coder Needs to Know",
    date: "February 28, 2026",
  },
  {
    title: "From Idea to App Store: Building a Mobile App with AI in 48 Hours",
    date: "February 21, 2026",
  },
];

const BENEFITS = [
  {
    icon: Star,
    title: "Weekly Showcase Picks",
    description:
      "Hand-picked projects from our community showcase — see what's possible and get inspired for your next build.",
  },
  {
    icon: Zap,
    title: "New Podcast Episode Alerts",
    description:
      "Be the first to know when new episodes drop, with quick summaries so you can decide what to listen to.",
  },
  {
    icon: BookOpen,
    title: "Exclusive Tutorials & Tips",
    description:
      "Practical techniques and workflows you won't find anywhere else — straight from experienced AI builders.",
  },
  {
    icon: Users,
    title: "Community Highlights",
    description:
      "Discover what fellow vibe coders are building, learn from their wins, and connect with like-minded builders.",
  },
];

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] opacity-5" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-6">
            <Mail className="w-4 h-4" />
            Weekly Newsletter
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            Stay Ahead of the{" "}
            <span className="gradient-text">Vibe Coding</span>{" "}
            Revolution
          </h1>

          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8">
            A weekly roundup of the best AI-built projects, practical tips,
            podcast highlights, and community wins — delivered straight to your
            inbox every Friday.
          </p>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted mb-10">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              Join 5,000+ builders
            </span>
            <span className="text-border hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-accent" />
              Free, weekly, no spam
            </span>
            <span className="text-border hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              5-minute read
            </span>
          </div>

          {/* Signup Form */}
          <div className="max-w-md mx-auto">
            {status === "success" ? (
              <Card hover={false} className="text-center bg-emerald-50 border-emerald-200">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-emerald-900 mb-1">
                  You&apos;re in!
                </h3>
                <p className="text-sm text-emerald-700">
                  Check your inbox for a confirmation email. Welcome to the
                  community!
                </p>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  id="name"
                  type="text"
                  placeholder="Your first name"
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
                  size="lg"
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                  {status !== "loading" && <ArrowRight className="w-5 h-5" />}
                </Button>
                <p className="text-xs text-muted text-center">
                  No spam, ever. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            What You&apos;ll Get Every Week
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Each issue is packed with practical value to help you build better
            with AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card key={benefit.title} hover={false}>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-light shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Past Issues Preview */}
      <section className="border-t border-border bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
              Recent Issues
            </h2>
            <p className="text-muted">
              See what you&apos;ve been missing.
            </p>
          </div>

          <div className="space-y-4">
            {PAST_ISSUES.map((issue) => (
              <Card key={issue.title} hover={false} padding="sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-light shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm sm:text-base truncate">
                      {issue.title}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{issue.date}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 hidden sm:inline-flex">
                    Past Issue
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-lg font-semibold text-foreground mb-2">
              Don&apos;t miss the next one.
            </p>
            <p className="text-sm text-muted mb-4">
              Join 5,000+ builders getting smarter about AI development every
              week.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Subscribe Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
