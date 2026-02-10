"""Skills resource endpoint."""

import json
from pathlib import Path

from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse

from ..models.skill import Skill, SkillsResponse

router = APIRouter()

DATA_PATH = Path(__file__).parent.parent / "data" / "skills.json"

# Cache headers for resource endpoints (1 hour public cache)
CACHE_HEADERS = {
    "Cache-Control": "public, max-age=3600",
    "Vary": "Accept-Encoding",
}


def load_skills() -> list[Skill]:
    """Load skills data from JSON file."""
    try:
        with open(DATA_PATH) as f:
            data = json.load(f)
        return [Skill(**skill) for skill in data.get("skills", [])]
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Skills data not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading skills: {e}")


@router.get("/skills", response_model=SkillsResponse)
async def get_skills(
    category: str | None = Query(
        None,
        description="Filter by category",
        pattern="^(Frontend|Backend|AI|DevOps|Tools|Methodology)$",
    )
):
    """Get skills list, optionally filtered by category."""
    skills = load_skills()

    if category:
        skills = [s for s in skills if s.category == category]

    response = SkillsResponse(skills=skills)
    return JSONResponse(
        content=response.model_dump(),
        headers=CACHE_HEADERS,
    )
