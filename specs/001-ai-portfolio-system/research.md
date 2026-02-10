# Research: AI Powered Professional Portfolio System

**Feature**: 001-ai-portfolio-system
**Date**: 2026-02-03
**Status**: Complete

## Research Questions

### RQ-01: Next.js App Router Best Practices

**Question**: What are the best practices for building a portfolio site with Next.js App Router?

**Decision**: Use Next.js 14+ with App Router, Server Components by default, and Client Components only where interactivity is required (chat widget).

**Rationale**:
- Server Components reduce JavaScript bundle size
- Built-in SEO support with metadata API
- Streaming SSR improves perceived performance
- File-based routing simplifies navigation structure

**Alternatives Considered**:
- Pages Router: Legacy approach, less optimal for new projects
- Remix: Good alternative but smaller ecosystem
- Astro: Better for static sites, less suitable for interactive chat

---

### RQ-02: ChatKit Integration Pattern

**Question**: How should ChatKit integrate with Next.js App Router for streaming chat?

**Decision**: Use ChatKit's React hooks in a Client Component, with API route as proxy to MCP server.

**Rationale**:
- ChatKit manages message state and streaming automatically
- API route handles server-side communication securely
- Client Component isolation keeps Server Components lean
- Environment variables stay server-side only

**Alternatives Considered**:
- Direct browser-to-MCP calls: Exposes API keys, rejected
- WebSocket connection: Overkill for single-user portfolio, rejected
- Server Actions: Not suitable for streaming responses

---

### RQ-03: MCP Server Architecture

**Question**: How should the MCP server be structured for portfolio data?

**Decision**: FastAPI with Pydantic models, JSON file storage, RESTful tool endpoints.

**Rationale**:
- FastAPI is fast, modern, and Python-native
- Pydantic provides automatic validation and documentation
- JSON files are simple, version-controllable, and sufficient for single-owner portfolio
- RESTful design is familiar and easy to test

**Alternatives Considered**:
- Flask: Less modern, no built-in validation
- Django: Overkill for API-only service
- Database (PostgreSQL): Adds complexity without benefit for static content

---

### RQ-04: OpenAI Agent Tool Calling

**Question**: How should the agent use MCP tools to fetch portfolio data?

**Decision**: Define tools as OpenAI function calls, agent invokes tools and receives structured responses.

**Rationale**:
- Native OpenAI function calling is well-documented
- Tool responses are typed and predictable
- Agent cannot respond without calling tools (prevents hallucination)
- Explicit tool calls are auditable

**Alternatives Considered**:
- RAG with embeddings: Adds complexity, less deterministic
- Prompt stuffing: Context limits, no dynamic updates
- LangChain agents: Additional abstraction layer, not needed

---

### RQ-05: Email Notification Service

**Question**: Which email service should be used for lead notifications?

**Decision**: Use Resend for transactional email delivery.

**Rationale**:
- Simple API, fast integration
- Free tier sufficient for portfolio leads
- Good deliverability
- Modern developer experience

**Alternatives Considered**:
- SendGrid: More complex setup
- AWS SES: Requires AWS account and configuration
- Mailgun: Similar to Resend, slightly older API

---

### RQ-06: WhatsApp Notification Integration

**Question**: How should WhatsApp notifications be sent?

**Decision**: Use Twilio WhatsApp Business API.

**Rationale**:
- Reliable, well-documented API
- Supports message templates for business use
- Widely adopted in industry
- Free sandbox for testing

**Alternatives Considered**:
- WhatsApp Cloud API (Meta): More complex setup, requires business verification
- Third-party aggregators: Less reliable, additional cost

---

### RQ-07: Portfolio Data Schema

**Question**: What schema should portfolio data follow?

**Decision**: Three JSON files (profile.json, skills.json, projects.json) with Pydantic validation.

**Rationale**:
- Separation of concerns (profile vs skills vs projects)
- Easy to edit manually
- Version controllable in git
- Pydantic ensures data integrity

**Alternatives Considered**:
- Single JSON file: Hard to maintain as content grows
- YAML: Less standard for API responses
- Markdown with frontmatter: Requires parsing logic

---

### RQ-08: Deployment Strategy

**Question**: Where should frontend and backend be deployed?

**Decision**: Vercel for frontend, Render for backend.

**Rationale**:
- Vercel is optimized for Next.js
- Render supports Python with easy environment configuration
- Both have generous free tiers
- Automatic HTTPS and custom domains

**Alternatives Considered**:
- Railway: Good alternative to Render
- AWS/GCP: Overkill for portfolio scale
- Self-hosted: Maintenance burden

## Technology Stack Summary

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend Framework | Next.js | 14+ |
| UI Components | Shadcn UI | Latest |
| Styling | Tailwind CSS | 3.x |
| Chat UI | ChatKit | Latest |
| Animation | Framer Motion | Latest |
| Backend Framework | FastAPI | 0.100+ |
| Data Validation | Pydantic | 2.x |
| AI SDK | OpenAI Python | 1.x |
| Email | Resend | Latest |
| WhatsApp | Twilio | Latest |
| Frontend Hosting | Vercel | N/A |
| Backend Hosting | Render | N/A |

## Open Questions (None)

All research questions resolved. Ready for Phase 1 design.
