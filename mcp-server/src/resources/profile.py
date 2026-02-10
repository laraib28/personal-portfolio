"""Profile resource endpoint."""

import json
from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

from ..models.profile import Profile

router = APIRouter()

DATA_PATH = Path(__file__).parent.parent / "data" / "profile.json"

# Cache headers for resource endpoints (1 hour public cache)
CACHE_HEADERS = {
    "Cache-Control": "public, max-age=3600",
    "Vary": "Accept-Encoding",
}


def load_profile() -> Profile:
    """Load profile data from JSON file."""
    try:
        with open(DATA_PATH) as f:
            data = json.load(f)
        return Profile(**data)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Profile data not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading profile: {e}")


@router.get("/profile", response_model=Profile)
async def get_profile():
    """Get the developer profile."""
    profile = load_profile()
    return JSONResponse(
        content=profile.model_dump(),
        headers=CACHE_HEADERS,
    )
