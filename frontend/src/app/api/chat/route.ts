import { env } from "@/lib/env";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, conversationId } = body;

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Forward request to MCP server
    const mcpResponse = await fetch(`${env.MCP_SERVER_URL}/api/v1/tools/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversation_id: conversationId || "default",
      }),
    });

    if (!mcpResponse.ok) {
      const errorText = await mcpResponse.text();
      return new Response(
        JSON.stringify({ error: "Chat service error", details: errorText }),
        { status: mcpResponse.status, headers: { "Content-Type": "application/json" } }
      );
    }

    // Forward the streaming response
    return new Response(mcpResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
