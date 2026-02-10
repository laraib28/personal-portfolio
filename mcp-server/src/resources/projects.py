"""Projects resource endpoint."""

import json
from pathlib import Path

from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse

from ..models.project import Project, ProjectsResponse, ProjectSummary

router = APIRouter()

DATA_PATH = Path(__file__).parent.parent / "data" / "projects.json"

# Cache headers for resource endpoints (1 hour public cache)
CACHE_HEADERS = {
    "Cache-Control": "public, max-age=3600",
    "Vary": "Accept-Encoding",
}


def load_projects() -> list[Project]:
    """Load projects data from JSON file."""
    try:
        with open(DATA_PATH) as f:
            data = json.load(f)
        return [Project(**project) for project in data.get("projects", [])]
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Projects data not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading projects: {e}")


@router.get("/projects", response_model=ProjectsResponse)
async def get_projects(
    featured: bool | None = Query(None, description="Filter by featured status"),
    is_ai_work: bool | None = Query(None, description="Filter by AI work status"),
):
    """Get projects list with optional filters."""
    projects = load_projects()

    if featured is not None:
        projects = [p for p in projects if p.featured == featured]

    if is_ai_work is not None:
        projects = [p for p in projects if p.is_ai_work == is_ai_work]

    summaries = [
        ProjectSummary(
            id=p.id,
            title=p.title,
            tech_stack=p.tech_stack,
            is_ai_work=p.is_ai_work,
            featured=p.featured,
        )
        for p in projects
    ]

    response = ProjectsResponse(projects=summaries)
    return JSONResponse(
        content=response.model_dump(),
        headers=CACHE_HEADERS,
    )


@router.get("/projects/{project_id}", response_model=Project)
async def get_project_details(project_id: str):
    """Get detailed information for a specific project."""
    projects = load_projects()

    for project in projects:
        if project.id == project_id:
            return JSONResponse(
                content=project.model_dump(),
                headers=CACHE_HEADERS,
            )

    raise HTTPException(status_code=404, detail=f"Project '{project_id}' not found")
