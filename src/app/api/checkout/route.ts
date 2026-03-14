import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { courses } from "@/data/courses";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseId } = body;

    if (!courseId || typeof courseId !== "string") {
      return NextResponse.json(
        { error: "Course ID is required." },
        { status: 400 }
      );
    }

    // Look up course from the data source
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return NextResponse.json(
        { error: "Course not found." },
        { status: 404 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

    // WHY: Create a Stripe Checkout session in payment mode. We include course
    // metadata so webhooks can identify which course was purchased.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: course.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/academy/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/academy/${course.slug}`,
      metadata: {
        courseName: course.title,
        courseId: course.id,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "An error occurred during checkout. Please try again." },
      { status: 500 }
    );
  }
}
