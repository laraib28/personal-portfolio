# Implementation Plan: AI Powered Professional Portfolio System

**Branch**: `001-ai-portfolio-system` | **Date**: 2026-02-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-ai-portfolio-system/spec.md`
**Governed By**: Constitution v1.0.0

## Summary

Build a professional portfolio system with an agentic AI chatbot powered by OpenAI SDK and ChatKit, backed by a FastAPI MCP server that serves as the single source of truth for all portfolio data. The system converts visitors into qualified leads through intelligent conversation while preventing AI hallucination via strict MCP-first architecture.

**Key Technical Approach**:
- Next.js App Router frontend with Shadcn UI components
- FastAPI MCP server exposing portfolio resources and tools
- OpenAI SDK agent with tool-based reasoning
- ChatKit for chat state and streaming management
- Email + WhatsApp notification integrations

## Technical Context

**Language/Version**: TypeScript 5.x (Frontend), Python 3.11+ (Backend)
**Primary Dependencies**:
- Frontend: Next.js 14+, React 18+, Tailwind CSS 3.x, Shadcn UI, ChatKit, Framer Motion
- Backend: FastAPI, Pydantic, python-dotenv, httpx
- AI: OpenAI SDK (Python), langchain (optional)
- Notifications: resend (email), twilio (WhatsApp)

**Storage**: JSON files for portfolio data (no database required for MVP)
**Testing**: Vitest (Frontend), pytest (Backend)
**Target Platform**: Vercel (Frontend), Render/Railway (Backend)
**Project Type**: Web application (frontend + backend)
**Performance Goals**: <3s page load, <2s chat response start
**Constraints**: No authentication, no payments, no analytics (Phase 1 scope)
**Scale/Scope**: Single portfolio owner, 100 concurrent chat sessions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| I. Professionalism | Professional tone, no hype | PASS | Design system enforces clean aesthetics |
| II. Architectural Integrity | Simplicity, modular components | PASS | Two-service architecture (frontend + MCP) |
| III. Design Excellence | Shadcn UI, Tailwind, accessibility | PASS | Tech stack aligned |
| IV. MCP-First | Dedicated MCP server, no hardcoding | PASS | All data via MCP tools |
| V. Deterministic Behavior | Tool-based reasoning, explicit invocations | PASS | Agent uses MCP tools exclusively |
| VI. Specs-Driven Development | Tasks map to requirements | PASS | Traceability enforced |

**Gate Result**: PASS - No violations detected

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-portfolio-system/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── mcp-api.yaml     # MCP server OpenAPI spec
│   └── frontend-api.yaml # Frontend API routes
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── skills/page.tsx     # Skills section
│   │   ├── projects/           # Projects section
│   │   │   ├── page.tsx        # Project list
│   │   │   └── [id]/page.tsx   # Project detail
│   │   ├── ai/page.tsx         # AI work showcase
│   │   └── api/                # API routes (chat proxy)
│   │       └── chat/route.ts   # Chat endpoint
│   ├── components/
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── sections/           # Page sections (Hero, Skills, Projects)
│   │   └── chat/               # ChatKit integration
│   ├── lib/                    # Utilities and helpers
│   │   ├── mcp-client.ts       # MCP API client
│   │   └── utils.ts            # General utilities
│   └── styles/                 # Global styles
├── public/                     # Static assets
├── tests/                      # Frontend tests
└── package.json

mcp-server/
├── src/
│   ├── main.py                 # FastAPI app entry
│   ├── config.py               # Environment configuration
│   ├── models/                 # Pydantic models
│   │   ├── profile.py
│   │   ├── skill.py
│   │   ├── project.py
│   │   └── contact.py
│   ├── resources/              # MCP resource handlers
│   │   ├── profile.py
│   │   ├── skills.py
│   │   └── projects.py
│   ├── tools/                  # MCP tool handlers
│   │   ├── get_profile.py
│   │   ├── get_skills.py
│   │   ├── get_projects.py
│   │   ├── get_project_details.py
│   │   ├── send_email.py
│   │   └── send_whatsapp.py
│   ├── agent/                  # AI agent logic
│   │   ├── agent.py            # OpenAI agent setup
│   │   ├── tools.py            # Tool definitions
│   │   └── prompts.py          # System prompts
│   └── data/                   # Portfolio JSON data
│       ├── profile.json
│       ├── skills.json
│       └── projects.json
├── tests/                      # Backend tests
├── requirements.txt
└── pyproject.toml
```

**Structure Decision**: Web application with separate frontend and backend. Frontend is a Next.js app deployed to Vercel. Backend is a FastAPI MCP server deployed to Render/Railway. This separation enables independent scaling and aligns with MCP-first architecture principle.

## Complexity Tracking

> No violations detected - table intentionally empty

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |

## Phase Summary

| Phase | Objective | Deliverables | Exit Criteria |
|-------|-----------|--------------|---------------|
| 0 | Governance | Constitution, Spec | Approved artifacts |
| 1 | System Decomposition | tasks.md | All FR/NFR mapped |
| 2 | Frontend Foundation | Next.js scaffold | App runs locally |
| 3 | MCP Server | FastAPI server | Deterministic responses |
| 4 | AI Agent | Agent logic | MCP-only responses |
| 5 | ChatKit UI | Chat widget | Streaming works |
| 6 | Lead Handling | Notifications | Leads delivered |
| 7 | Hardening | Error handling | Graceful failures |
| 8 | Deployment | Live system | Public URL works |

## Requirement Traceability

| Requirement | Phase | Description |
|-------------|-------|-------------|
| FR-01.1-01.4 | 2 | Portfolio website foundation |
| FR-02.1-02.3 | 2, 3 | Skills from MCP |
| FR-03.1-03.4 | 2, 3 | Projects from MCP |
| FR-04.1-04.5 | 4, 5 | Agentic chatbot |
| FR-05.1-05.5 | 3 | MCP server |
| FR-06.1-06.5 | 6 | Lead capture |
| NFR-01 | 2, 7 | Performance |
| NFR-02 | 7 | Security |
| NFR-03 | All | Maintainability |
| NFR-04 | 7 | Reliability |
