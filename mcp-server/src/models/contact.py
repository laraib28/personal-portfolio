"""Contact submission model for lead capture."""

from datetime import datetime
from uuid import uuid4

from pydantic import BaseModel, EmailStr, Field


class ContactMetadata(BaseModel):
    """Contact information metadata."""

    email: EmailStr
    whatsapp: str | None = None
    linkedin: str | None = None
    github: str | None = None
    twitter: str | None = None


class ContactSubmissionRequest(BaseModel):
    """Request model for contact submission."""

    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)
    consent: bool = Field(..., description="User must explicitly consent")


class ContactSubmission(BaseModel):
    """Full contact submission record."""

    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    email: EmailStr
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    email_sent: bool = False
    whatsapp_sent: bool = False


class ContactSubmissionResponse(BaseModel):
    """Response for contact submission."""

    success: bool
    message: str
