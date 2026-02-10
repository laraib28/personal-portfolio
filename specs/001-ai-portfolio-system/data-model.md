# Data Model: AI Powered Professional Portfolio System

**Feature**: 001-ai-portfolio-system
**Date**: 2026-02-03
**Status**: Complete

## Entity Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Profile   │     │    Skill    │     │   Project   │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ name        │     │ id          │     │ id          │
│ title       │     │ name        │     │ title       │
│ summary     │     │ category    │     │ problem     │
│ expertise[] │     │ proficiency │     │ solution    │
│ availability│     │ years       │     │ tech_stack[]│
│ location    │     │ icon        │     │ outcome     │
│ contact     │     └─────────────┘     │ images[]    │
└─────────────┘                         │ is_ai_work  │
                                        │ featured    │
                                        └─────────────┘
        │
        │ has
        ▼
┌─────────────────┐
│ ContactMetadata │
├─────────────────┤
│ email           │
│ whatsapp        │
│ linkedin        │
│ github          │
│ twitter         │
└─────────────────┘

                    ┌───────────────────┐
                    │ ContactSubmission │
                    ├───────────────────┤
                    │ id                │
                    │ name              │
                    │ email             │
                    │ message           │
                    │ timestamp         │
                    │ email_sent        │
                    │ whatsapp_sent     │
                    └───────────────────┘
```

## Entity Definitions

### Profile

Developer's professional identity and summary.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Full name |
| title | string | Yes | Professional title (e.g., "Full Stack AI Engineer") |
| summary | string | Yes | 2-3 sentence professional summary |
| expertise | string[] | Yes | List of expertise areas |
| availability | string | Yes | Current availability status |
| location | string | Yes | Geographic location |
| contact | ContactMetadata | Yes | Contact information |

**Validation Rules**:
- `name`: Non-empty, max 100 characters
- `title`: Non-empty, max 150 characters
- `summary`: 50-500 characters
- `expertise`: 3-10 items, each max 50 characters
- `availability`: One of "Available", "Limited Availability", "Not Available"

---

### Skill

Technical competency with proficiency level.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (slug) |
| name | string | Yes | Skill name |
| category | string | Yes | Skill category |
| proficiency | string | Yes | Proficiency level |
| years | number | Yes | Years of experience |
| icon | string | No | Icon identifier |

**Validation Rules**:
- `id`: Lowercase alphanumeric with hyphens, max 50 characters
- `name`: Non-empty, max 100 characters
- `category`: One of "Frontend", "Backend", "AI", "DevOps", "Tools", "Methodology"
- `proficiency`: One of "Expert", "Advanced", "Intermediate"
- `years`: 0-30

**Categories**:
- Frontend: React, Next.js, TypeScript, Tailwind, etc.
- Backend: Python, FastAPI, Node.js, etc.
- AI: Prompt Engineering, OpenAI, LangChain, etc.
- DevOps: Docker, CI/CD, Cloud platforms
- Tools: Git, VS Code, etc.
- Methodology: SDD, Agile, TDD, etc.

---

### Project

Portfolio case study with problem-solution structure.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (slug) |
| title | string | Yes | Project title |
| problem | string | Yes | Problem statement |
| solution | string | Yes | Solution description |
| tech_stack | string[] | Yes | Technologies used |
| outcome | string | Yes | Results and impact |
| images | string[] | No | Image URLs |
| is_ai_work | boolean | Yes | AI/Agentic project flag |
| featured | boolean | Yes | Featured project flag |
| url | string | No | Live project URL |
| github | string | No | GitHub repository URL |

**Validation Rules**:
- `id`: Lowercase alphanumeric with hyphens, max 50 characters
- `title`: Non-empty, max 150 characters
- `problem`: 50-500 characters
- `solution`: 100-1000 characters
- `tech_stack`: 1-15 items
- `outcome`: 50-500 characters
- `images`: Max 5 items, valid URLs
- `url`: Valid URL or null
- `github`: Valid GitHub URL or null

---

### ContactMetadata

Portfolio owner's contact information (read-only, exposed via profile).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Public contact email |
| whatsapp | string | No | WhatsApp number (for notifications, not public) |
| linkedin | string | No | LinkedIn profile URL |
| github | string | No | GitHub profile URL |
| twitter | string | No | Twitter/X profile URL |

**Validation Rules**:
- `email`: Valid email format
- `whatsapp`: E.164 format (e.g., +1234567890)
- `linkedin`, `github`, `twitter`: Valid URLs or null

---

### ContactSubmission

Lead capture record (created at runtime, not stored in portfolio data).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Auto-generated UUID |
| name | string | Yes | Visitor's name |
| email | string | Yes | Visitor's email |
| message | string | Yes | Visitor's message |
| timestamp | datetime | Yes | Submission time (UTC) |
| email_sent | boolean | Yes | Email notification status |
| whatsapp_sent | boolean | Yes | WhatsApp notification status |

**Validation Rules**:
- `name`: Non-empty, max 100 characters
- `email`: Valid email format
- `message`: 10-2000 characters
- `timestamp`: ISO 8601 format

**Note**: ContactSubmission is ephemeral - sent via notifications, not persisted.

## JSON File Schemas

### profile.json

```json
{
  "name": "string",
  "title": "string",
  "summary": "string",
  "expertise": ["string"],
  "availability": "Available | Limited Availability | Not Available",
  "location": "string",
  "contact": {
    "email": "string",
    "linkedin": "string | null",
    "github": "string | null",
    "twitter": "string | null"
  }
}
```

### skills.json

```json
{
  "skills": [
    {
      "id": "string",
      "name": "string",
      "category": "Frontend | Backend | AI | DevOps | Tools | Methodology",
      "proficiency": "Expert | Advanced | Intermediate",
      "years": "number",
      "icon": "string | null"
    }
  ]
}
```

### projects.json

```json
{
  "projects": [
    {
      "id": "string",
      "title": "string",
      "problem": "string",
      "solution": "string",
      "tech_stack": ["string"],
      "outcome": "string",
      "images": ["string"],
      "is_ai_work": "boolean",
      "featured": "boolean",
      "url": "string | null",
      "github": "string | null"
    }
  ]
}
```

## Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| Profile → ContactMetadata | 1:1 | Profile contains contact metadata |
| Profile → Skill | 1:N | Implicit via expertise areas |
| Project → Skill | N:M | Implicit via tech_stack |

## State Transitions

### ContactSubmission Lifecycle

```
[Created] → [Email Sending] → [Email Sent/Failed]
                ↓
         [WhatsApp Sending] → [WhatsApp Sent/Failed]
                ↓
         [Complete/Partial Failure]
```

**Note**: Submission is fire-and-forget. Failures are logged but not persisted.
