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

    // Determine which endpoint to call (default to email)
    const endpoint = channel === "whatsapp"
      ? "/api/v1/tools/send-whatsapp"
      : "/api/v1/tools/send-email";

    // Forward request to MCP server
    const mcpResponse = await fetch(`${env.MCP_SERVER_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        consent,
      }),
    });

    const result = await mcpResponse.json();

    if (!mcpResponse.ok) {
      return NextResponse.json(
        { error: result.detail || "Failed to send contact info" },
        { status: mcpResponse.status }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
