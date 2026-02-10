"""FastAPI MCP Server for Portfolio System."""

import logging
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field, EmailStr
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from .config import get_settings
from .tools import send_email_notification, send_whatsapp_notification

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

# Reduce noise from third-party libraries
logging.getLogger("httpx").setLevel(logging.WARNING)
logging.getLogger("httpcore").setLevel(logging.WARNING)
logging.getLogger("openai").setLevel(logging.WARNING)

settings = get_settings()

# Rate limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Portfolio MCP Server",
    description="Model Context Protocol server for AI Portfolio System",
    version="1.0.0",
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


# Resource routes
from .resources import profile_router, skills_router, projects_router

app.include_router(profile_router, prefix="/api/v1", tags=["Resources"])
app.include_router(skills_router, prefix="/api/v1", tags=["Resources"])
app.include_router(projects_router, prefix="/api/v1", tags=["Resources"])


# Chat endpoint
class ChatRequest(BaseModel):
    """Request body for chat endpoint."""

    message: str = Field(..., max_length=2000, description="User message")
    conversation_id: str | None = Field(
        default=None, description="Optional conversation ID for context"
    )


class ChatResponse(BaseModel):
    """Response body for non-streaming chat."""

    response: str
    conversation_id: str


async def generate_sse_response(message: str, conversation_id: str):
    """Generate Server-Sent Events for streaming chat response."""
    from .agent import get_agent

    agent = get_agent()

    try:
        async for chunk in agent.chat(message, conversation_id):
            # Format as SSE data event
            yield f"data: {chunk}\n\n"
        # Send done event
        yield "data: [DONE]\n\n"
    except Exception as e:
        logger.error(f"Chat error: {e}")
        yield f"data: [ERROR] {str(e)}\n\n"


@app.post("/api/v1/tools/chat", tags=["Tools"])
@limiter.limit("10/minute")
async def chat(request: Request, chat_request: ChatRequest):
    """Chat with AI agent.

    Send a message to the AI agent. The agent uses MCP tools to fetch
    portfolio data and responds with streaming text.

    Rate limited to 10 requests per minute per IP.
    Returns Server-Sent Events (SSE) with response chunks.
    """
    logger.info(f"Chat request from {get_remote_address(request)}")
    if not settings.openai_api_key:
        raise HTTPException(
            status_code=503,
            detail="Chat service unavailable - OpenAI API key not configured",
        )

    conversation_id = chat_request.conversation_id or "default"

    return StreamingResponse(
        generate_sse_response(chat_request.message, conversation_id),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


# Contact/Notification endpoints
class ContactRequest(BaseModel):
    """Request body for contact submission endpoints."""

    name: str = Field(..., min_length=1, max_length=100, description="Visitor's name")
    email: EmailStr = Field(..., description="Visitor's email address")
    message: str = Field(
        ..., min_length=10, max_length=2000, description="Visitor's message"
    )
    consent: bool = Field(
        ..., description="Whether visitor consented to share their contact info"
    )


class ContactResponse(BaseModel):
    """Response body for contact submission."""

    success: bool
    message: str
    error: str | None = None


@app.post("/api/v1/tools/send-email", tags=["Tools"], response_model=ContactResponse)
@limiter.limit("3/hour")
async def send_email(request: Request, contact_request: ContactRequest):
    """Send lead notification via email.

    Rate limited to 3 requests per hour per IP.
    Requires explicit user consent. Will reject if consent=false.
    """
    logger.info(f"Email notification request from {get_remote_address(request)}")
    # Consent validation (redundant but explicit)
    if not contact_request.consent:
        raise HTTPException(
            status_code=400,
            detail="Consent is required to send contact information",
        )

    result = await send_email_notification(
        name=contact_request.name,
        email=contact_request.email,
        message=contact_request.message,
        consent=contact_request.consent,
    )

    if not result.get("success"):
        raise HTTPException(
            status_code=500 if "not configured" in result.get("error", "") else 400,
            detail=result.get("error", "Failed to send email"),
        )

    return ContactResponse(
        success=True,
        message=result.get("message", "Email sent successfully"),
    )


@app.post("/api/v1/tools/send-whatsapp", tags=["Tools"], response_model=ContactResponse)
@limiter.limit("3/hour")
async def send_whatsapp(request: Request, contact_request: ContactRequest):
    """Send lead notification via WhatsApp.

    Rate limited to 3 requests per hour per IP.
    Requires explicit user consent. Will reject if consent=false.
    """
    logger.info(f"WhatsApp notification request from {get_remote_address(request)}")
    # Consent validation (redundant but explicit)
    if not contact_request.consent:
        raise HTTPException(
            status_code=400,
            detail="Consent is required to send contact information",
        )

    result = await send_whatsapp_notification(
        name=contact_request.name,
        email=contact_request.email,
        message=contact_request.message,
        consent=contact_request.consent,
    )

    if not result.get("success"):
        raise HTTPException(
            status_code=500 if "not configured" in result.get("error", "") else 400,
            detail=result.get("error", "Failed to send WhatsApp"),
        )

    return ContactResponse(
        success=True,
        message=result.get("message", "WhatsApp sent successfully"),
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=settings.host, port=settings.port)
