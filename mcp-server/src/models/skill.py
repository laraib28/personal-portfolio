"""Skill model for technical competencies."""

from pydantic import BaseModel, Field


class Skill(BaseModel):
    """Technical skill with proficiency level."""

    id: str = Field(..., pattern="^[a-z0-9-]+$", max_length=50)
    name: str = Field(..., min_length=1, max_length=100)
    category: str = Field(
        ..., pattern="^(Frontend|Backend|AI & LLM|AI|DevOps|Deployment|Tools|Methodology|Security)$"
    )
    proficiency: str = Field(..., pattern="^(Expert|Advanced|Intermediate)$")
    years: int = Field(..., ge=0, le=30)
    icon: str | None = None
    description: str | None = None


class SkillsResponse(BaseModel):
    """Response model for skills list."""

    skills: list[Skill]
