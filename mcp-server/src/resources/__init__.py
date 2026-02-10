"""MCP Resource handlers."""

from .profile import router as profile_router
from .projects import router as projects_router
from .skills import router as skills_router

__all__ = ["profile_router", "skills_router", "projects_router"]
