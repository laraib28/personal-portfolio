"""Tool definitions for the AI agent.

These tools provide the agent with access to portfolio data from the MCP server.
The agent MUST use these tools to fetch data - it should never invent information.

Notification tools (send_email, send_whatsapp) require explicit user consent.
"""

import json
from pathlib import Path
from typing import Any

from ..tools.send_email import send_email_notification
from ..tools.send_whatsapp import send_whatsapp_notification

# Path to data files
DATA_DIR = Path(__file__).parent.parent / "data"


def get_profile() -> dict[str, Any]:
    """Get the developer's professional profile.

    Returns:
        Profile data including name, title, summary, expertise, availability,
        location, and contact information.
    """
    with open(DATA_DIR / "profile.json") as f:
        return json.load(f)


def get_skills(category: str | None = None) -> dict[str, Any]:
    """Get the list of technical skills.

    Args:
        category: Optional filter by category (Frontend, Backend, AI, DevOps, Tools, Methodology)

    Returns:
        Dictionary with 'skills' key containing list of skill objects.
    """
    with open(DATA_DIR / "skills.json") as f:
        data = json.load(f)

    if category:
        data["skills"] = [s for s in data["skills"] if s["category"] == category]

    return data


def get_projects(featured: bool | None = None, is_ai_work: bool | None = None) -> dict[str, Any]:
    """Get the list of projects.

    Args:
        featured: Optional filter by featured status
        is_ai_work: Optional filter by AI work status

    Returns:
        Dictionary with 'projects' key containing list of project summaries.
    """
    with open(DATA_DIR / "projects.json") as f:
        data = json.load(f)

    projects = data["projects"]

    if featured is not None:
        projects = [p for p in projects if p["featured"] == featured]

    if is_ai_work is not None:
        projects = [p for p in projects if p["is_ai_work"] == is_ai_work]

    return {"projects": projects}


def get_project_details(project_id: str) -> dict[str, Any] | None:
    """Get full details for a specific project.

    Args:
        project_id: The project ID (slug) to look up

    Returns:
        Full project details or None if not found.
    """
    with open(DATA_DIR / "projects.json") as f:
        data = json.load(f)

    for project in data["projects"]:
        if project["id"] == project_id:
            return project

    return None


# Tool definitions for OpenAI function calling
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_profile",
            "description": "Get the developer's professional profile including name, title, summary, expertise areas, availability, location, and contact information. Use this when asked about who the developer is, their background, or how to contact them.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": [],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_skills",
            "description": "Get the list of technical skills with proficiency levels and years of experience. Use this when asked about technical capabilities, technologies, or expertise.",
            "parameters": {
                "type": "object",
                "properties": {
                    "category": {
                        "type": "string",
                        "description": "Filter skills by category",
                        "enum": ["Frontend", "Backend", "AI", "DevOps", "Tools", "Methodology"],
                    },
                },
                "required": [],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_projects",
            "description": "Get the list of portfolio projects. Use this when asked about work experience, projects, or examples of past work.",
            "parameters": {
                "type": "object",
                "properties": {
                    "featured": {
                        "type": "boolean",
                        "description": "Filter to show only featured projects",
                    },
                    "is_ai_work": {
                        "type": "boolean",
                        "description": "Filter to show only AI/agentic projects",
                    },
                },
                "required": [],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_project_details",
            "description": "Get full details for a specific project including problem, solution, tech stack, and outcomes. Use this when asked for more information about a specific project.",
            "parameters": {
                "type": "object",
                "properties": {
                    "project_id": {
                        "type": "string",
                        "description": "The project ID (slug) to look up",
                    },
                },
                "required": ["project_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "send_email",
            "description": "Send the visitor's contact information to the portfolio owner via email. ONLY use this when the visitor has explicitly provided their name, email, and message AND has given consent to be contacted. You MUST ask for consent before using this tool.",
            "parameters": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "The visitor's full name",
                    },
                    "email": {
                        "type": "string",
                        "description": "The visitor's email address",
                    },
                    "message": {
                        "type": "string",
                        "description": "The visitor's message or inquiry",
                    },
                    "consent": {
                        "type": "boolean",
                        "description": "Whether the visitor explicitly consented to share their contact info. MUST be true.",
                    },
                },
                "required": ["name", "email", "message", "consent"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "send_whatsapp",
            "description": "Send the visitor's contact information to the portfolio owner via WhatsApp. ONLY use this when the visitor has explicitly provided their name, email, and message AND has given consent to be contacted. You MUST ask for consent before using this tool.",
            "parameters": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "The visitor's full name",
                    },
                    "email": {
                        "type": "string",
                        "description": "The visitor's email address",
                    },
                    "message": {
                        "type": "string",
                        "description": "The visitor's message or inquiry",
                    },
                    "consent": {
                        "type": "boolean",
                        "description": "Whether the visitor explicitly consented to share their contact info. MUST be true.",
                    },
                },
                "required": ["name", "email", "message", "consent"],
            },
        },
    },
]


async def send_email(name: str, email: str, message: str, consent: bool) -> dict[str, Any]:
    """Send contact info to portfolio owner via email.

    Args:
        name: Visitor's name
        email: Visitor's email
        message: Visitor's message
        consent: Must be True for the email to be sent

    Returns:
        Result of the email send operation
    """
    return await send_email_notification(name, email, message, consent)


async def send_whatsapp(name: str, email: str, message: str, consent: bool) -> dict[str, Any]:
    """Send contact info to portfolio owner via WhatsApp.

    Args:
        name: Visitor's name
        email: Visitor's email
        message: Visitor's message
        consent: Must be True for the message to be sent

    Returns:
        Result of the WhatsApp send operation
    """
    return await send_whatsapp_notification(name, email, message, consent)


def execute_tool(tool_name: str, arguments: dict[str, Any]) -> Any:
    """Execute a tool by name with the given arguments.

    Args:
        tool_name: Name of the tool to execute
        arguments: Dictionary of arguments to pass to the tool

    Returns:
        Tool execution result

    Raises:
        ValueError: If tool name is unknown
    """
    tool_map = {
        "get_profile": get_profile,
        "get_skills": get_skills,
        "get_projects": get_projects,
        "get_project_details": get_project_details,
    }

    if tool_name not in tool_map:
        raise ValueError(f"Unknown tool: {tool_name}")

    return tool_map[tool_name](**arguments)


async def execute_tool_async(tool_name: str, arguments: dict[str, Any]) -> Any:
    """Execute an async tool by name with the given arguments.

    Args:
        tool_name: Name of the tool to execute
        arguments: Dictionary of arguments to pass to the tool

    Returns:
        Tool execution result

    Raises:
        ValueError: If tool name is unknown
    """
    # Sync tools
    sync_tools = {
        "get_profile": get_profile,
        "get_skills": get_skills,
        "get_projects": get_projects,
        "get_project_details": get_project_details,
    }

    # Async tools (notification)
    async_tools = {
        "send_email": send_email,
        "send_whatsapp": send_whatsapp,
    }

    if tool_name in sync_tools:
        return sync_tools[tool_name](**arguments)
    elif tool_name in async_tools:
        return await async_tools[tool_name](**arguments)
    else:
        raise ValueError(f"Unknown tool: {tool_name}")
