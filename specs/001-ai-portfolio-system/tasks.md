# Tasks: AI Powered Professional Portfolio System

**Input**: Design documents from `/specs/001-ai-portfolio-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/
**Branch**: `001-ai-portfolio-system`
**Governed By**: Constitution v1.0.0

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions (Web App)

- **Frontend**: `frontend/src/`
- **Backend**: `mcp-server/src/`
- **Frontend Tests**: `frontend/tests/`
- **Backend Tests**: `mcp-server/tests/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and repository structure
**Mapped Requirements**: FR-01, NFR-02, NFR-03

- [x] T001 Create repository directory structure per plan.md (`frontend/`, `mcp-server/`)
- [x] T002 [P] Initialize Next.js 14+ project with TypeScript in `frontend/`
- [x] T003 [P] Initialize Python 3.11+ FastAPI project in `mcp-server/`
- [x] T004 [P] Create `frontend/.env.example` with MCP_SERVER_URL, OPENAI_API_KEY placeholders
- [x] T005 [P] Create `mcp-server/.env.example` with OPENAI_API_KEY, RESEND_API_KEY, TWILIO credentials placeholders
- [x] T006 [P] Configure ESLint and Prettier for frontend in `frontend/.eslintrc.json`, `frontend/.prettierrc`
- [x] T007 [P] Configure ruff/black for backend in `mcp-server/pyproject.toml`
- [x] T008 Add `.gitignore` files for both projects (node_modules, venv, .env, __pycache__)

**Checkpoint**: Both projects initialized, run locally with default scaffolds

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented
**Mapped Requirements**: FR-05, NFR-02, NFR-03, NFR-04

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Frontend Foundation

- [x] T009 Install and configure Tailwind CSS 3.x in `frontend/tailwind.config.ts`
- [x] T010 Install and configure Shadcn UI in `frontend/` with default theme
- [x] T011 Create root layout with metadata in `frontend/src/app/layout.tsx`
- [x] T012 [P] Create Header component in `frontend/src/components/layout/Header.tsx`
- [x] T013 [P] Create Footer component in `frontend/src/components/layout/Footer.tsx`
- [x] T014 [P] Create Navigation component in `frontend/src/components/layout/Navigation.tsx`
- [x] T015 Create MCP API client utility in `frontend/src/lib/mcp-client.ts`
- [x] T016 Configure environment variables loading in `frontend/src/lib/env.ts`

### Backend Foundation

- [x] T017 Create FastAPI app entry point in `mcp-server/src/main.py`
- [x] T018 Create environment configuration in `mcp-server/src/config.py`
- [x] T019 [P] Create Profile Pydantic model in `mcp-server/src/models/profile.py`
- [x] T020 [P] Create Skill Pydantic model in `mcp-server/src/models/skill.py`
- [x] T021 [P] Create Project Pydantic model in `mcp-server/src/models/project.py`
- [x] T022 [P] Create ContactSubmission Pydantic model in `mcp-server/src/models/contact.py`
- [x] T023 Create health check endpoint in `mcp-server/src/main.py` (GET /health)
- [x] T024 [P] Create sample `mcp-server/src/data/profile.json` with placeholder data
- [x] T025 [P] Create sample `mcp-server/src/data/skills.json` with placeholder data
- [x] T026 [P] Create sample `mcp-server/src/data/projects.json` with placeholder data
- [x] T027 Configure CORS middleware for frontend origin in `mcp-server/src/main.py`

**Checkpoint**: Foundation ready - frontend runs with layout, backend responds to /health

---

## Phase 3: User Story 1 - Browse Portfolio Website (Priority: P1) 🎯 MVP

**Goal**: Visitors can view a clean, professional portfolio website and understand developer expertise
**Mapped Requirements**: FR-01.1, FR-01.2, FR-01.3, FR-01.4
**Independent Test**: Visit homepage, navigate all sections, verify responsive layout

### Implementation for User Story 1

- [x] T028 [US1] Create Hero section component in `frontend/src/components/sections/Hero.tsx`
- [x] T029 [US1] Create About section component in `frontend/src/components/sections/About.tsx`
- [x] T030 [US1] Implement homepage with Hero and About sections in `frontend/src/app/page.tsx`
- [x] T031 [US1] Add SEO metadata to homepage in `frontend/src/app/page.tsx`
- [x] T032 [US1] Create responsive mobile navigation in `frontend/src/components/layout/MobileNav.tsx`
- [x] T033 [US1] Configure sitemap generation in `frontend/src/app/sitemap.ts`
- [x] T034 [US1] Add Open Graph and Twitter meta tags in `frontend/src/app/layout.tsx`
- [ ] T035 [US1] Verify responsive layout on mobile, tablet, desktop viewports

**Checkpoint**: User Story 1 complete - Homepage loads with professional hero, responsive layout, SEO metadata

---

## Phase 4: User Story 2 - Explore Skills and Projects (Priority: P2)

**Goal**: Visitors can see verified skills and explore project case studies
**Mapped Requirements**: FR-02.1, FR-02.2, FR-02.3, FR-03.1, FR-03.2, FR-03.3, FR-03.4
**Independent Test**: Navigate to skills page, view categorized skills; navigate to projects, view case study

### MCP Server Resources (Backend)

- [x] T036 [US2] Implement GET /api/v1/profile endpoint in `mcp-server/src/resources/profile.py`
- [x] T037 [US2] Implement GET /api/v1/skills endpoint with category filter in `mcp-server/src/resources/skills.py`
- [x] T038 [US2] Implement GET /api/v1/projects endpoint with featured/ai_work filters in `mcp-server/src/resources/projects.py`
- [x] T039 [US2] Implement GET /api/v1/projects/{project_id} endpoint in `mcp-server/src/resources/projects.py`
- [x] T040 [US2] Register all resource routes in `mcp-server/src/main.py`

### Frontend Pages

- [x] T041 [US2] Create SkillCard component in `frontend/src/components/sections/SkillCard.tsx`
- [x] T042 [US2] Create SkillsGrid component in `frontend/src/components/sections/SkillsGrid.tsx`
- [x] T043 [US2] Implement skills page fetching from MCP in `frontend/src/app/skills/page.tsx`
- [x] T044 [US2] Create ProjectCard component in `frontend/src/components/sections/ProjectCard.tsx`
- [x] T045 [US2] Create ProjectsGrid component in `frontend/src/components/sections/ProjectsGrid.tsx`
- [x] T046 [US2] Implement projects list page in `frontend/src/app/projects/page.tsx`
- [x] T047 [US2] Implement project detail page in `frontend/src/app/projects/[id]/page.tsx`
- [x] T048 [US2] Create AI Work page filtering is_ai_work projects in `frontend/src/app/ai/page.tsx`
- [x] T049 [US2] Add navigation links to Skills, Projects, AI pages in Header

**Checkpoint**: User Story 2 complete - Skills show from MCP, Projects display case studies, AI Work filtered

---

## Phase 5: User Story 3 - Interact with AI Chatbot (Priority: P3)

**Goal**: Visitors can ask questions via AI chatbot and receive streaming MCP-sourced responses
**Mapped Requirements**: FR-04.1, FR-04.2, FR-04.3, FR-04.4, FR-04.5, FR-05.1, FR-05.2, FR-05.3, FR-05.4
**Independent Test**: Open chat, ask about skills/projects, verify streaming response from MCP data

### MCP Server Agent (Backend)

- [x] T050 [US3] Create tool definitions in `mcp-server/src/agent/tools.py` (get_profile, get_skills, get_projects, get_project_details)
- [x] T051 [US3] Create system prompts with constitution persona in `mcp-server/src/agent/prompts.py`
- [x] T052 [US3] Implement OpenAI agent with tool calling in `mcp-server/src/agent/agent.py`
- [x] T053 [US3] Implement POST /api/v1/tools/chat streaming endpoint in `mcp-server/src/main.py`
- [x] T054 [US3] Ensure agent ONLY uses MCP tools for portfolio data (no hallucination)

### Frontend Chat UI

- [x] T055 [US3] Create chat API route proxy in `frontend/src/app/api/chat/route.ts`
- [x] T056 [US3] Install and configure AI SDK in `frontend/` (using Vercel AI SDK instead of ChatKit)
- [x] T057 [US3] Create ChatWidget component in `frontend/src/components/chat/ChatWidget.tsx`
- [x] T058 [US3] Create ChatMessage component in `frontend/src/components/chat/ChatMessage.tsx`
- [x] T059 [US3] Create ChatInput component in `frontend/src/components/chat/ChatInput.tsx`
- [x] T060 [US3] Implement streaming response handling in ChatWidget
- [x] T061 [US3] Add loading/thinking/error UX states to chat UI
- [x] T062 [US3] Embed ChatWidget globally in layout (floating button)

**Checkpoint**: User Story 3 complete - Chat opens, streams responses, answers from MCP data only

---

## Phase 6: User Story 4 - Contact via Chatbot (Priority: P4)

**Goal**: Visitors can submit contact information via chatbot with notifications sent to owner
**Mapped Requirements**: FR-06.1, FR-06.2, FR-06.3, FR-06.4, FR-06.5
**Independent Test**: Express hiring interest in chat, provide contact info with consent, verify notifications

### MCP Server Notification Tools (Backend)

- [x] T063 [US4] Create send_email tool in `mcp-server/src/tools/send_email.py` using Resend
- [x] T064 [US4] Create send_whatsapp tool in `mcp-server/src/tools/send_whatsapp.py` using Twilio
- [x] T065 [US4] Add email and whatsapp tools to agent tool definitions
- [x] T066 [US4] Implement POST /api/v1/tools/send-email endpoint in `mcp-server/src/main.py`
- [x] T067 [US4] Implement POST /api/v1/tools/send-whatsapp endpoint in `mcp-server/src/main.py`
- [x] T068 [US4] Add consent validation - reject if consent=false

### Frontend Contact Flow

- [x] T069 [US4] Create contact API route proxy in `frontend/src/app/api/contact/route.ts`
- [x] T070 [US4] Update ChatWidget to handle contact intent detection
- [x] T071 [US4] Create ContactForm component with consent checkbox in `frontend/src/components/chat/ContactForm.tsx`
- [x] T072 [US4] Add input validation for name, email, message
- [x] T073 [US4] Display success/error states after submission

**Checkpoint**: User Story 4 complete - Contact via chat triggers email + WhatsApp notifications

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Quality, security, and reliability improvements
**Mapped Requirements**: NFR-01, NFR-02, NFR-04

### Error Handling & Reliability

- [x] T074 [P] Add error boundaries to frontend pages in `frontend/src/app/error.tsx`
- [x] T075 [P] Add loading states to frontend pages in `frontend/src/app/loading.tsx`
- [x] T076 [P] Add not-found handling in `frontend/src/app/not-found.tsx`
- [x] T077 Implement graceful fallback when MCP server unavailable (chat shows "temporarily unavailable")
- [x] T078 Add structured logging to MCP server using Python logging

### Security & Rate Limiting

- [x] T079 Add rate limiting to /api/v1/tools/chat endpoint (10 req/min per IP)
- [x] T080 Add rate limiting to /api/v1/tools/send-email endpoint (3 req/hour per IP)
- [x] T081 Add rate limiting to /api/v1/tools/send-whatsapp endpoint (3 req/hour per IP)
- [x] T082 Validate and sanitize all user inputs in contact submission (via Pydantic)
- [x] T083 Ensure no secrets in API responses (audit endpoints - no secrets exposed)

### Performance

- [x] T084 Optimize images with next/image in frontend components (using Next.js Image component)
- [x] T085 Add caching headers to MCP resource endpoints
- [ ] T086 Verify page load <3s, chat response start <2s (requires runtime testing)

**Checkpoint**: System hardened - graceful failures, rate limits, validated inputs

---

## Phase 8: Deployment

**Purpose**: Make system publicly accessible
**Mapped Requirements**: NFR-01, NFR-04

### Backend Deployment (Render)

- [x] T087 Create `mcp-server/render.yaml` with service configuration
- [ ] T088 Configure environment variables in Render dashboard (manual)
- [ ] T089 Deploy MCP server to Render (manual)
- [ ] T090 Verify /health endpoint reachable on production URL (manual)

### Frontend Deployment (Vercel)

- [x] T091 Create `frontend/vercel.json` with configuration
- [ ] T092 Configure environment variables in Vercel dashboard (MCP_SERVER_URL) (manual)
- [ ] T093 Deploy frontend to Vercel (manual)
- [ ] T094 Verify all pages load correctly on production URL (manual)

### Integration Verification

- [ ] T095 Test chat functionality end-to-end on production (manual)
- [ ] T096 Test contact submission with email notification on production (manual)
- [ ] T097 Test contact submission with WhatsApp notification on production (manual)
- [ ] T098 Run accessibility audit (target 90+ score) (manual)

**Checkpoint**: System live - Public URL accessible, chatbot functional, notifications working

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────────────────────────────────────────┐
                                                              │
Phase 2 (Foundational) ◄─────────────────────────────────────┘
    │
    ├──► Phase 3 (US1: Browse Portfolio) ──► MVP Checkpoint
    │         │
    │         ▼
    ├──► Phase 4 (US2: Skills & Projects)
    │         │
    │         ▼
    ├──► Phase 5 (US3: AI Chatbot)
    │         │
    │         ▼
    └──► Phase 6 (US4: Lead Capture)
              │
              ▼
         Phase 7 (Polish) ──► Quality Checkpoint
              │
              ▼
         Phase 8 (Deployment) ──► Live System
```

### User Story Dependencies

| Story | Can Start After | Dependencies |
|-------|-----------------|--------------|
| US1 | Phase 2 complete | None |
| US2 | Phase 2 complete | None (parallel with US1) |
| US3 | US2 complete | MCP resources from US2 |
| US4 | US3 complete | Agent from US3 |

### Parallel Opportunities

- **Phase 1**: T002, T003, T004, T005, T006, T007 can run in parallel
- **Phase 2 Frontend**: T012, T013, T014 can run in parallel
- **Phase 2 Backend**: T019, T020, T021, T022, T024, T025, T026 can run in parallel
- **Phase 4 (US2)**: Frontend and backend tasks can progress in parallel
- **Phase 7**: T074, T075, T076 can run in parallel

---

## Requirement Traceability Matrix

| Requirement | Tasks |
|-------------|-------|
| FR-01.1 | T028, T029, T030 |
| FR-01.2 | T009, T010, T032, T035 |
| FR-01.3 | T031, T033, T034 |
| FR-01.4 | T012, T013, T014, T049 |
| FR-02.1 | T037, T043 |
| FR-02.2 | T043 (fetches from MCP) |
| FR-02.3 | T041, T042 |
| FR-03.1 | T044, T045, T047 |
| FR-03.2 | T038, T039, T046 |
| FR-03.3 | T024, T025, T026 |
| FR-03.4 | T048 |
| FR-04.1 | T057, T060 |
| FR-04.2 | T050, T052, T054 |
| FR-04.3 | T051, T054 |
| FR-04.4 | T051 |
| FR-04.5 | T051, T052 |
| FR-05.1 | T017 |
| FR-05.2 | T036, T037, T038, T039 |
| FR-05.3 | T050 |
| FR-05.4 | T019, T020, T021, T022 |
| FR-05.5 | T083 |
| FR-06.1 | T068, T071 |
| FR-06.2 | T072, T082 |
| FR-06.3 | T063, T066 |
| FR-06.4 | T064, T067 |
| FR-06.5 | T068 |
| NFR-01 | T084, T085, T086 |
| NFR-02 | T004, T005, T079, T080, T081, T082, T083 |
| NFR-03 | T001, T006, T007, T008 |
| NFR-04 | T023, T074, T075, T076, T077, T078 |

---

## Notes

- [P] tasks = different files, no dependencies - can run in parallel
- [US#] label maps task to specific user story for traceability
- Each commit MUST reference a task ID (e.g., "T028: Create Hero section component")
- No coding outside of tasks - all changes must map to this document
- Stop at any checkpoint to validate story independently
- Constitution v1.0.0 is the final authority for design decisions
