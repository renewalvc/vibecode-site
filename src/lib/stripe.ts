import Stripe from "stripe";

// WHY: Lazy-initialized Stripe instance. Created on first use rather than at module
// load time so the build succeeds even without STRIPE_SECRET_KEY set. The secret key
// must never be exposed to the client.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-02-25.clover",
    });
  }
  return _stripe;
}

// WHY: Kept for backward-compatibility with any code importing `stripe` directly.
// At runtime the getter ensures STRIPE_SECRET_KEY is available.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

// Price IDs for academy courses — configured in Stripe Dashboard
export const COURSE_PRICES: Record<string, string> = {
  "vibe-coding-fundamentals": process.env.STRIPE_PRICE_FUNDAMENTALS || "price_placeholder_fundamentals",
  "ai-assisted-fullstack": process.env.STRIPE_PRICE_FULLSTACK || "price_placeholder_fullstack",
  "claude-code-mastery": process.env.STRIPE_PRICE_MASTERY || "price_placeholder_mastery",
  "ship-your-first-app": process.env.STRIPE_PRICE_SHIP || "price_placeholder_ship",
};
