"""Profile model for developer information."""

from pydantic import BaseModel, EmailStr, Field


class ContactMetadata(BaseModel):
    """Contact information for the portfolio owner."""

    email: EmailStr
    linkedin: str | None = None
    github: str | None = None
    twitter: str | None = None


class Profile(BaseModel):
    """Developer profile and professional summary."""

    name: str = Field(..., min_length=1, max_length=100)
    title: str = Field(..., min_length=1, max_length=150)
    summary: str = Field(..., min_length=50, max_length=500)
    expertise: list[str] = Field(..., min_length=3, max_length=10)
    availability: str = Field(
        ..., pattern="^(Available|Limited Availability|Not Available)$"
    )
    location: str
    contact: ContactMetadata
