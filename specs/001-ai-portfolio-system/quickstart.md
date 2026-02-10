# Quickstart: AI Powered Professional Portfolio System

**Feature**: 001-ai-portfolio-system
**Date**: 2026-02-03

## Prerequisites

- Node.js 18+ (for frontend)
- Python 3.11+ (for MCP server)
- pnpm (recommended) or npm
- OpenAI API key
- Resend API key (for email notifications)
- Twilio credentials (for WhatsApp notifications)

## Project Setup

### 1. Clone and Install

```bash
# Clone repository
git clone <repo-url>
cd portfolio

# Checkout feature branch
git checkout 001-ai-portfolio-system
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with:
# - MCP_SERVER_URL=http://localhost:8000
# - OPENAI_API_KEY=sk-...
```

### 3. MCP Server Setup

```bash
cd mcp-server

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env

# Edit .env with:
# - OPENAI_API_KEY=sk-...
# - RESEND_API_KEY=re_...
# - TWILIO_ACCOUNT_SID=AC...
# - TWILIO_AUTH_TOKEN=...
# - TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
# - OWNER_EMAIL=your@email.com
# - OWNER_WHATSAPP=whatsapp:+1234567890
```

### 4. Add Portfolio Data

Edit the JSON files in `mcp-server/src/data/`:

**profile.json**:
```json
{
  "name": "Your Name",
  "title": "Full Stack AI Engineer",
  "summary": "Your professional summary here...",
  "expertise": ["AI Systems", "Full Stack", "Python", "TypeScript"],
  "availability": "Available",
  "location": "Your Location",
  "contact": {
    "email": "your@email.com",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  }
}
```

**skills.json**:
```json
{
  "skills": [
    {
      "id": "nextjs",
      "name": "Next.js",
      "category": "Frontend",
      "proficiency": "Expert",
      "years": 4
    }
  ]
}
```

**projects.json**:
```json
{
  "projects": [
    {
      "id": "project-name",
      "title": "Project Title",
      "problem": "The problem this project solved...",
      "solution": "How we solved it...",
      "tech_stack": ["Next.js", "Python", "OpenAI"],
      "outcome": "The results achieved...",
      "is_ai_work": true,
      "featured": true
    }
  ]
}
```

## Running Locally

### Terminal 1: MCP Server

```bash
cd mcp-server
source venv/bin/activate
uvicorn src.main:app --reload --port 8000
```

Server runs at: http://localhost:8000

### Terminal 2: Frontend

```bash
cd frontend
pnpm dev
```

Frontend runs at: http://localhost:3000

## Verification Checklist

### MCP Server

- [ ] Health check: `curl http://localhost:8000/health`
- [ ] Profile endpoint: `curl http://localhost:8000/api/v1/profile`
- [ ] Skills endpoint: `curl http://localhost:8000/api/v1/skills`
- [ ] Projects endpoint: `curl http://localhost:8000/api/v1/projects`

### Frontend

- [ ] Homepage loads with profile data
- [ ] Skills page shows categorized skills
- [ ] Projects page lists all projects
- [ ] Project detail page shows full case study
- [ ] Chat widget opens and responds
- [ ] Chat responses reference portfolio data correctly
- [ ] Contact form validates inputs
- [ ] Contact submission sends notifications (check email/WhatsApp)

## Common Issues

### MCP Server Connection Failed

```
Error: ECONNREFUSED 127.0.0.1:8000
```

**Solution**: Ensure MCP server is running on port 8000.

### OpenAI API Error

```
Error: Invalid API Key
```

**Solution**: Verify OPENAI_API_KEY in both `.env` files.

### Chat Not Streaming

**Solution**: Ensure browser supports Server-Sent Events (SSE).

### Email/WhatsApp Not Sending

**Solution**: Verify Resend/Twilio credentials and recipient addresses.

## Deployment

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

Set environment variables in Vercel dashboard:
- `MCP_SERVER_URL` = production MCP server URL
- `OPENAI_API_KEY` = your key

### MCP Server (Render)

1. Create new Web Service on Render
2. Connect repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables

## Next Steps

After successful local verification:

1. Run `/sp.tasks` to generate implementation tasks
2. Follow task list in priority order
3. Commit after each task completion
4. Deploy when all P1/P2 stories complete
