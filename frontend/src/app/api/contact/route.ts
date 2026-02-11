import { env } from "@/lib/env";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, consent, channel } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate consent
    if (!consent) {
      return NextResponse.json(
        { error: "Consent is required to submit contact information" },
        { status: 400 }
      );
    }

    const payload = JSON.stringify({ name, email, message, consent });
    const headers = { "Content-Type": "application/json" };

    // Send both email and WhatsApp in parallel
    const [emailRes, whatsappRes] = await Promise.allSettled([
      fetch(`${env.MCP_SERVER_URL}/api/v1/tools/send-email`, {
        method: "POST",
        headers,
        body: payload,
      }),
      fetch(`${env.MCP_SERVER_URL}/api/v1/tools/send-whatsapp`, {
        method: "POST",
        headers,
        body: payload,
      }),
    ]);

    const emailOk = emailRes.status === "fulfilled" && emailRes.value.ok;
    const whatsappOk = whatsappRes.status === "fulfilled" && whatsappRes.value.ok;

    if (!emailOk && !whatsappOk) {
      return NextResponse.json(
        { error: "Failed to send contact info via email and WhatsApp" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact info sent successfully",
      channels: {
        email: emailOk,
        whatsapp: whatsappOk,
      },
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
