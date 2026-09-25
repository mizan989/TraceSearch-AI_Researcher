# TraceSearch

AI-powered web research and evidence-tracing engine.

> **Search. Analyze. Trace.**
>
> TraceSearch turns complex questions into structured, verified research reports by searching the web, synthesizing findings with Gemini, and connecting every claim back to its original source.

---

## Features

- **Multi-Query Web Retrieval**: Automatically decomposes questions into 2 to 3 targeted search queries.
- **Evidence-Grounded Findings**: Every key finding is numbered and mapped to concrete, server-retrieved sources.
- **Interactive Evidence Trace Map**: Inspect the direct relationship tree between findings and supporting evidence.
- **Source Inspection & Filtering**: Filter sources by category (Official, Academic, Technical, News) and view extracted snippets with direct origin links.
- **Uncertainty & Caveat Disclosure**: Highlights data gaps, differing estimates, or conflicting claims.
- **Apple Editorial Linear Design**: Muted ocean-inspired palette (`#4E635E`), Inter typography, subtle surfaces, and manual dark mode toggle.
- **Export & Sharing**: One-click markdown report copying and shareable permalinks (`/shared/[id]`).
- **Research Archive**: Persistent research history stored across sessions.

---

## Architecture & Code Structure

TraceSearch is built as a Next.js modular monolith:

```text
trace-search/
├── app/
│   ├── page.tsx               # Homepage and instant research interface
│   ├── research/
│   │   ├── page.tsx           # Research workspace
│   │   └── [id]/page.tsx      # Persistent research report view
│   ├── history/page.tsx       # Past research session archive
│   ├── shared/[id]/page.tsx   # Public shareable research report
│   ├── api/
│   │   ├── research/route.ts  # Thin API controller for research execution
│   │   └── history/route.ts   # Session history API
│   ├── layout.tsx             # Root layout with Inter font and theme provider
│   └── globals.css            # Design tokens and quiet luxury motion styles
│
├── components/
│   ├── layout/                # Navbar, Footer, ThemeToggle, ThemeProvider
│   ├── research/              # ResearchInput, Progress, FindingCard, EvidenceMap, Sidebar
│   ├── landing/               # Hero, Features, DemoQueries
│   └── ui/                    # Button, Badge
│
├── lib/
│   ├── ai/                    # gemini.ts, planner.ts, synthesizer.ts, prompts.ts
│   ├── search/                # serpapi.ts, queries.ts, normalizer.ts, filter.ts
│   ├── research/              # orchestrator.ts, pipeline.ts, findings.ts, citations.ts
│   ├── supabase/              # client.ts, server.ts, queries.ts
│   ├── validation/            # research.ts, ai-output.ts (Zod validation schemas)
│   └── utils.ts               # Formatting and styling helpers
│
└── supabase/
    ├── migrations/            # SQL migration for sessions, sources, findings
    └── seed.sql               # Seed dataset
```

---

## Getting Started

### 1. Prerequisites

- Node.js 18+ (tested on Node.js v24)
- npm

### 2. Environment Configuration

Copy the sample environment file:

```bash
cp .env.example .env.local
```

Configure your API keys in `.env.local`:

```env
SERPAPI_API_KEY=your_serpapi_key_here
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

*Note: If external API keys are not supplied, TraceSearch automatically falls back to verified demo datasets and source-grounded synthesis so the application remains fully functional for testing and evaluations.*

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Verification & Quality Bar

```bash
# Typecheck TypeScript
npm run typecheck

# Run ESLint
npm run lint

# Build production bundle
npm run build
```

---

## Flagship Demo Scenario

To experience the research workflow end-to-end:

1. Open [http://localhost:3000](http://localhost:3000)
2. Click on the curated query prompt:
   **"How is artificial intelligence changing cybersecurity in 2026?"**
3. Watch the progress sequence: *Planning -> Searching -> Analyzing -> Connecting evidence*
4. Inspect the resulting report, click evidence citation pills to highlight sources in the sidebar, and explore the **Evidence Trace Map**.
