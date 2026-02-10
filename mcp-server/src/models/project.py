"""Project model for portfolio case studies."""

from pydantic import BaseModel, Field, HttpUrl


class Project(BaseModel):
    """Portfolio project case study."""

    id: str = Field(..., pattern="^[a-z0-9-]+$", max_length=50)
    title: str = Field(..., min_length=1, max_length=150)
    problem: str = Field(..., min_length=50, max_length=500)
    solution: str = Field(..., min_length=100, max_length=1000)
    tech_stack: list[str] = Field(..., min_length=1, max_length=15)
    outcome: str = Field(..., min_length=50, max_length=500)
    images: list[str] = Field(default_factory=list, max_length=5)
    is_ai_work: bool
    featured: bool
    url: str | None = None
    github: str | None = None


class ProjectSummary(BaseModel):
    """Summary model for project list."""

    id: str
    title: str
    tech_stack: list[str]
    is_ai_work: bool
    featured: bool


class ProjectsResponse(BaseModel):
    """Response model for projects list."""

    projects: list[ProjectSummary]
