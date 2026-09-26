<p align="center">
  <a href="https://github.com/mizan989/TraceSearch-AI_Researcher">
    <img src="https://raw.githubusercontent.com/mizan989/TraceSearch-AI_Researcher/main/public/logo.svg" alt="TraceSearch Banner" width="100" height="100">
  </a>
</p>

<div align="center">

# TraceSearch

### The open-source AI web research & evidence-tracing engine. Autonomous AI researchers that search, synthesize, and ground every claim in verifiable proof.

<br/>

<a href="#-quick-start"><img src="https://img.shields.io/badge/Docs-Quickstart-4E635E?style=for-the-badge&logo=gitbook&logoColor=white" alt="Docs"></a>
<a href="https://github.com/mizan989/TraceSearch-AI_Researcher"><img src="https://img.shields.io/badge/Website-TraceSearch-f0f0f0?style=for-the-badge&logoColor=000000" alt="Website"></a>
<a href="https://github.com/mizan989/TraceSearch-AI_Researcher/discussions"><img src="https://img.shields.io/badge/Community-Discussions-4E635E?style=for-the-badge&logo=github&logoColor=white" alt="Discussions"></a>

<a href="#-ways-to-run-tracesearch"><img src="https://img.shields.io/badge/TraceSearch%20App-Next.js%2015-4E635E?style=for-the-badge&logoColor=white" alt="TraceSearch App"></a>
<a href="#-flagship-demo-scenario"><img src="https://img.shields.io/badge/Try%20Live%20Demo-555555?style=for-the-badge&logoColor=white" alt="Try Live Demo"></a>

<a href="https://github.com/mizan989/TraceSearch-AI_Researcher/stargazers"><img src="https://img.shields.io/github/stars/mizan989/TraceSearch-AI_Researcher?style=flat-square" alt="GitHub Stars"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-3b82f6?style=flat-square" alt="License"></a>
<a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15.3-black?style=flat-square&logo=next.js" alt="Next.js"></a>
<a href="https://ai.google.dev"><img src="https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?style=flat-square&logo=google" alt="Google Gemini"></a>
<a href="https://serpapi.com"><img src="https://img.shields.io/badge/Search-SerpApi-2b9246?style=flat-square" alt="SerpApi"></a>

</div>

> [!TIP]
> **Zero-Setup Demo Ready!** TraceSearch ships with built-in verified research archives and intelligent fallbacks. Clone, install, and run locally without requiring immediate external API keys — [Get started in under 60 seconds](#-quick-start).

---

## TraceSearch Overview

TraceSearch is an autonomous AI web research and evidence-tracing engine designed to replace conversational hallucination with verified, source-grounded intelligence. Unlike generic AI chatbots that output untraceable prose, TraceSearch executes autonomous multi-query web retrieval, analyzes real-time search results with Google Gemini, detects conflicting narratives, and weaves an interactive, verifiable evidence trail connecting every finding back to its primary origin.

**Key Capabilities:**

- **Multi-Query Web Retrieval** — Automatically decomposes complex inquiries into 2 to 4 targeted, multi-angle search queries via SerpAPI
- **Verifiable Claim-to-Source Grounding** — Every key finding is numbered, categorized, and linked directly to concrete snippets and primary source URLs
- **Interactive Evidence Trace Map** — Visual dependency graph mapping the lineage between synthesized findings and supporting evidence
- **Uncertainty & Divergence Detection** — Proactively highlights data gaps, conflicting estimates, differing viewpoints, or incomplete coverage
- **Source Inspection & Deep Filtering** — Filter sources by domain category (Academic, Official, Technical, News) with live snippet preview
- **Quiet Luxury Apple Editorial UX** — Restrained typography (Inter), ocean slate palette (`#4E635E`), subtle glass surfaces, and manual dark mode toggle

<br>

<div align="center">
  <pre>
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   TRACESEARCH                                   │
│            Ask ➔ Search ➔ Collect ➔ Analyze ➔ Trace ➔ Synthesize                │
├───────────────────────────────┬─────────────────────────────────────────────────┤
│  🔍 Multi-Query Retrieval     │  📊 Evidence Trace Graph                        │
│   • serpapi.google_search()   │    [Finding 1: Quantum Encryption]              │
│   • query decomposition       │       ├── [Source #1: NIST Report] (Official)   │
│   • deduplication & ranking   │       └── [Source #3: Nature Paper] (Academic)  │
├───────────────────────────────┼─────────────────────────────────────────────────┤
│  🧠 Gemini 2.5 Synthesis      │  ⚖️ Uncertainty & Conflict Engine              │
│   • citation-linked findings  │    "Estimates differ between 2028 and 2035      │
│   • extracted quote anchors   │     depending on hardware error correction."    │
└───────────────────────────────┴─────────────────────────────────────────────────┘
  </pre>
</div>

## Use Cases

- **Market & Competitive Intelligence** — Gather real-time market data, vendor benchmarks, and cite primary business disclosures
- **Academic & Scientific Investigation** — Synthesize literature across multiple papers and trace specific claims back to primary studies
- **Fact-Checking & Claims Validation** — Dissect viral rumors or breaking news stories with bidirectional claim-to-source mapping
- **Technical & Security Research** — Investigate CVE disclosures, architectural tradeoffs, and emerging software paradigms
- **Executive Briefings & Dossiers** — Generate clean, citation-anchored markdown reports with shareable permalinks

---

## 🚀 Quick Start

**Prerequisites:**
- Node.js 18+ (tested on Node.js v20 and v24)
- npm, pnpm, or yarn
- *(Optional)* Gemini API key & SerpAPI key — *TraceSearch includes offline verified datasets so you can test immediately without keys!*

### Installation & First Run

```bash
# 1. Clone the repository
git clone https://github.com/mizan989/TraceSearch-AI_Researcher.git
cd TraceSearch-AI_Researcher

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional for demo mode)
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start researching.

> [!NOTE]
> When external API keys are omitted, TraceSearch automatically activates verified demo mode with pre-computed search traces, allowing you to test the full pipeline, interactive trace map, and citation inspector without setup.

---

## Ways to Run TraceSearch

- **Open Source / Local Dev** — Free, runs locally with Next.js App Router and your own Gemini & SerpAPI keys. [Quick Start](#-quick-start)
- **Zero-Config Demo Mode** — Instant evaluation with verified mock search traces and full UI interactivity. [Try Demo](#-flagship-demo-scenario)
- **Cloud Deployment (Vercel)** — One-click deploy to Vercel with serverless edge streaming. [Deploy Guide](#-cloud-deployment)

---

## ☁️ Research Workspaces & Views

TraceSearch provides a dedicated suite of interfaces purpose-built for the research lifecycle:

- **Instant Search Hub (`/`)** — Clean, distraction-free search input with suggested research prompts, recent queries, and instant execution.
- **Active Research Studio (`/research` & `/research/[id]`)** — Real-time progress visualization (*Planning -> Searching -> Analyzing -> Synthesizing*), split-view Finding Cards, Evidence Inspector, and Source Sidebar.
- **Interactive Evidence Trace Map** — Node-and-edge visualization linking findings directly to supporting sources with bi-directional highlight states.
- **Research Archive & History (`/history`)** — Persistent research session log with instant re-opening, query filtering, and session management.
- **Public Dossiers (`/shared/[id]`)** — Read-only, shareable research reports with one-click markdown copy and source navigation.

---

## 🤖 Use TraceSearch with Coding Agents

TraceSearch is designed to be agent-ready. Coding assistants (Claude Code, Cursor, Codex, Antigravity) can query the research API or leverage the local research pipeline:

```bash
# Execute research via the API endpoint
curl -X POST http://localhost:3000/api/research \
  -H "Content-Type: application/json" \
  -d '{"query": "What are the latest breakthroughs in solid-state batteries in 2026?"}'
```

The endpoint returns structured JSON conforming to `zod` schemas, including `findings`, `sources`, `evidenceMap`, and `uncertaintyNotes`.

---

## ✨ Features

### Autonomous Multi-Stage Pipeline

TraceSearch executes a disciplined 5-stage research pipeline rather than a single LLM prompt:

```text
User Query
   │
   ▼
[1. Query Planning]       ── Decomposes question into 2-4 targeted search angles
   │
   ▼
[2. SerpAPI Search]       ── Parallel retrieval across web, news, and technical domains
   │
   ▼
[3. Source Normalization] ── Cleans snippets, extracts metadata, filters low-quality links
   │
   ▼
[4. Gemini Synthesis]     ── Extracts discrete key findings with direct citation anchors
   │
   ▼
[5. Evidence Mapping]     ── Connects claims to sources and surfaces caveats & conflicts
```

### Verifiable Grounding & Bi-directional Citations

- **Claim-Level Numbering** — Every finding is assigned an explicit reference number (e.g., `Finding 1`, `Finding 2`).
- **Citation Badges** — Clicking any `[1]`, `[2]` citation pill immediately highlights and scrolls to the corresponding source card in the sidebar.
- **Source Inspection Drawer** — Inspect the extracted snippet, domain authority tier, and published date alongside the original URL.

### Interactive Evidence Trace Map

The **Evidence Trace Map** transforms flat bibliographies into an interactive relationship graph:

- **Finding Nodes** — Represent individual conclusions reached during research.
- **Source Nodes** — Represent primary web pages, papers, and articles.
- **Connection Lines** — Visually demonstrate single-source dependencies vs. multi-source consensus.
- **Interactive Highlighting** — Hovering over any finding isolates its evidence trail; clicking a source reveals all claims that depend on it.

### Uncertainty & Conflict Disclosures

When sources disagree or information is incomplete, TraceSearch refuses to invent consensus:

- **Divergence Alerts** — Highlights when two reputable sources report conflicting figures or timelines.
- **Data Gap Badges** — Informs the user when specific sub-questions could not be authoritatively answered.
- **Caveat Annotations** — Explains underlying assumptions or constraints behind complex claims.

### Apple Editorial Linear Aesthetics

- **Color System** — Restrained warm neutrals (`#FAFAF7` light, `#0C100F` dark) paired with ocean slate accents (`#4E635E`).
- **Typography** — Crisp Inter typography with high typographic hierarchy and generous spacing.
- **Motion & Micro-interactions** — Smooth cubic-bezier transitions, glassmorphic card borders, and responsive split drawers.

---

## Usage Examples

### 1. Basic Market Research

```text
Query: "Current global market share of RISC-V processors in cloud data centers"
Outcome:
- 3 targeted sub-queries generated
- 8 unique sources indexed (SemiAnalysis, AnandTech, IEEE)
- 4 key findings synthesized with 12 citation links
- 1 divergence note on 2026 vs. 2027 adoption timeline
```

### 2. Scientific & Health Inquiries

```text
Query: "Mechanisms of GLP-1 receptor agonists in neurodegenerative disease trials"
Outcome:
- Queries targeting clinical trial phases and neuro-inflammatory pathways
- Sources filtered to academic and medical repositories
- Interactive trace map connecting phase 2 trial endpoints to primary publications
```

### 3. Flagship Demo Scenario

To experience TraceSearch end-to-end:

1. Launch `npm run dev` and navigate to [http://localhost:3000](http://localhost:3000).
2. Select the curated prompt on the homepage:
   > *"How is artificial intelligence changing cybersecurity in 2026?"*
3. Observe the live 4-step progress tracker (*Planning -> Searching -> Analyzing -> Connecting evidence*).
4. Review the generated report:
   - Click citation pills to trigger bi-directional source highlighting.
   - Switch to the **Evidence Trace Map** tab to inspect the graph.
   - Review the **Uncertainty & Caveats** banner at the bottom of the dossier.
   - Click **Copy Markdown** or **Share Report** to export your findings.

---

## ⚙️ Configuration

Copy `.env.example` to `.env.local` to configure production API keys:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini API key for synthesis and planning | Optional *(falls back to verified demo data)* |
| `SERPAPI_API_KEY` | SerpAPI key for real-time web retrieval | Optional *(falls back to verified demo data)* |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for persistent cloud storage | Optional *(falls back to local memory store)* |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anonymous key | Optional *(falls back to local memory store)* |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key for server operations | Optional *(falls back to local memory store)* |

### Supported AI Models

TraceSearch leverages the official `@google/genai` SDK and supports:

- **Google Gemini 2.5 Flash** — Default recommendation for high-speed research synthesis
- **Google Gemini 2.5 Pro** — Recommended for complex scientific and multi-document synthesis
- **Google Gemini 1.5 Pro / Flash** — Supported legacy model tier

---

## Architecture & Code Structure

TraceSearch is built as a modular Next.js application:

```text
trace-search/
├── app/
│   ├── page.tsx               # Homepage and instant research interface
│   ├── research/
│   │   ├── page.tsx           # Research workspace & active runner
│   │   └── [id]/page.tsx      # Persistent research report view
│   ├── history/page.tsx       # Past research session archive
│   ├── shared/[id]/page.tsx   # Public shareable research report view
│   ├── api/
│   │   ├── research/route.ts  # Thin API controller for research execution
│   │   └── history/route.ts   # Session history API
│   ├── layout.tsx             # Root layout with Inter font and theme provider
│   └── globals.css            # Design tokens and quiet luxury styles
│
├── components/
│   ├── landing/               # Hero, Features, DemoQueries
│   ├── research/              # ResearchInput, Progress, FindingCard, EvidenceMap, Sidebar
│   ├── layout/                # Navbar, Footer, ThemeToggle, ThemeProvider
│   └── ui/                    # Button, Badge, Modal primitives
│
├── lib/
│   ├── ai/                    # gemini.ts, planner.ts, synthesizer.ts, prompts.ts
│   ├── search/                # serpapi.ts, queries.ts, normalizer.ts, filter.ts
│   ├── research/              # orchestrator.ts, pipeline.ts, findings.ts, citations.ts
│   ├── supabase/              # client.ts, server.ts, queries.ts
│   ├── validation/            # research.ts, ai-output.ts (Zod schemas)
│   └── utils.ts               # Formatting and styling helpers
│
└── supabase/
    ├── migrations/            # SQL migration for sessions, sources, findings
    └── seed.sql               # Seed dataset for demo sessions
```

---

## ☁️ Cloud Deployment

Deploy TraceSearch with one click or via the Vercel CLI:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmizan989%2FTraceSearch-AI_Researcher)

```bash
# Deploy via Vercel CLI
npm i -g vercel
vercel
```

Add `GEMINI_API_KEY`, `SERPAPI_API_KEY`, and Supabase credentials in your Vercel Project Settings.

---

## Verification & Quality Bar

```bash
# Typecheck TypeScript code
npm run typecheck

# Run ESLint validation
npm run lint

# Build production bundle
npm run build
```

---

## Contributing

We welcome contributions! Whether you're adding new search connectors, refining evidence-mapping algorithms, or improving UI themes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/evidence-clustering`)
3. Commit your changes (`git commit -m 'Add evidence clustering visualization'`)
4. Push to the branch (`git push origin feature/evidence-clustering`)
5. Open a [Pull Request](https://github.com/mizan989/TraceSearch-AI_Researcher/pulls)

---

## Support the Project

**Enjoying TraceSearch?** Give us a ⭐ on [GitHub](https://github.com/mizan989/TraceSearch-AI_Researcher) to help others discover transparent AI research!

---

## Acknowledgements

TraceSearch is built on the shoulders of remarkable open-source engineering:

- [Next.js](https://nextjs.org/) & [React 19](https://react.dev/) — Modern React framework and server architecture
- [Google Gemini API](https://ai.google.dev/) (`@google/genai`) — High-precision multimodal and text intelligence
- [SerpAPI](https://serpapi.com/) — Clean, structured web search data retrieval
- [Tailwind CSS v4](https://tailwindcss.com/) — Modern utility-first styling engine
- [Lucide Icons](https://lucide.dev/) — Beautiful, consistent iconography
- [Zod](https://zod.dev/) — Robust runtime schema validation

<div align="center">

> [!NOTE]
> **Source Attribution & Evidence Integrity:** TraceSearch is designed to elevate primary sources and maintain provenance transparency. All web search results are attributed directly to their respective publisher domains. TraceSearch encourages verifying critical citations through the provided primary URLs.

</div>
