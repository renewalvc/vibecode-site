import { NextResponse } from "next/server";

// WHY: Simple email format validation. Catches the most common typos
// without being overly strict — the real validation happens when the
// email service sends a confirmation email.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate required fields
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    // Validate email format
    const trimmedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      return NextResponse.json(
        { error: "Name cannot be empty." },
        { status: 400 }
      );
    }

    // TODO: Connect to email service (e.g., Resend, ConvertKit, Mailchimp)
    // For now, log and return success as a placeholder.
    console.log(`Newsletter signup: ${trimmedName} <${trimmedEmail}>`);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to the newsletter!",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
