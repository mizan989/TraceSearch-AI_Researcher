# TraceSearch Architecture

> Architectural constitution for the TraceSearch codebase.
>
> This document explains how the system is structured, why the major architectural choices were made, where important code lives, and which boundaries must be preserved.

---

# 1. High-Level System Overview

## 1.1 Problem & Purpose

TraceSearch is an AI-powered research engine.

It helps users move from a natural-language question to a structured, source-traceable research report.

The core workflow is:

```text
Question
   ↓
Research Planning
   ↓
Web Search
   ↓
Source Collection
   ↓
Source Normalization
   ↓
AI Analysis
   ↓
Finding Extraction
   ↓
Finding → Source Mapping
   ↓
Structured Research Report
```

The product is intentionally different from a generic AI chatbot.

The core value is the combination of:

1. Web search.
2. AI synthesis.
3. Source visibility.
4. Finding-to-source traceability.
5. Structured research output.

The core product principle is:

> **Search. Analyze. Trace.**

---

# 2. System Architecture

TraceSearch uses a **modular monolith** built around a Next.js application.

It is not a microservices architecture.

```text
                         ┌──────────────────────┐
                         │        USER          │
                         │  Browser / Mobile    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Next.js UI      │
                         │ React + TypeScript   │
                         │ Tailwind + shadcn/ui │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Research API       │
                         │ app/api/research     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                     ┌──────────────────────────────┐
                     │    Research Orchestrator     │
                     │ lib/research/orchestrator.ts │
                     └──────────────┬───────────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             ▼                      ▼                      ▼
   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
   │  Search Layer   │    │    AI Layer     │    │  Data Layer     │
   │                 │    │                 │    │                 │
   │    SerpApi      │    │   Gemini API    │    │ Supabase / PG    │
   └────────┬────────┘    └────────┬────────┘    └────────┬────────┘
            │                      │                      │
            └──────────────────────┼──────────────────────┘
                                   │
                                   ▼
                         ┌──────────────────────┐
                         │ Trace / Citation     │
                         │ Mapping              │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Structured Research  │
                         │ Report               │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       Next.js UI     │
                         └──────────────────────┘
```

---

# 3. Runtime Research Flow

A standard research request follows this sequence.

```text
1. User enters research question
              ↓
2. Next.js validates request
              ↓
3. Research Orchestrator starts
              ↓
4. Research Planner creates focused queries
              ↓
5. Search Layer sends queries to SerpApi
              ↓
6. Raw results are normalized
              ↓
7. Duplicate / irrelevant results are filtered
              ↓
8. Relevant sources are passed to Gemini
              ↓
9. Gemini generates structured findings
              ↓
10. Findings are mapped to source IDs
              ↓
11. Output is validated
              ↓
12. Research session is persisted
              ↓
13. Structured report is returned
              ↓
14. UI renders findings + citations + sources
```

Independent search requests should be executed concurrently when safe.

---

# 4. High-Level Code Map

The repository should remain organized around application boundaries rather than individual implementation details.

```text
trace-search/
│
├── app/
│   ├── (marketing)/
│   ├── research/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── history/
│   ├── shared/
│   ├── api/
│   │   ├── research/
│   │   │   └── route.ts
│   │   └── history/
│   │       └── route.ts
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   ├── research/
│   ├── landing/
│   └── layout/
│
├── lib/
│   ├── research/
│   │   ├── orchestrator.ts
│   │   ├── pipeline.ts
│   │   ├── findings.ts
│   │   └── citations.ts
│   │
│   ├── search/
│   │   ├── serpapi.ts
│   │   ├── queries.ts
│   │   ├── normalizer.ts
│   │   └── filter.ts
│   │
│   ├── ai/
│   │   ├── gemini.ts
│   │   ├── planner.ts
│   │   ├── synthesizer.ts
│   │   └── prompts.ts
│   │
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── queries.ts
│   │
│   ├── validation/
│   │   ├── research.ts
│   │   └── ai-output.ts
│   │
│   └── utils.ts
│
├── types/
│   ├── research.ts
│   ├── search.ts
│   ├── source.ts
│   └── ai.ts
│
├── supabase/
│   ├── migrations/
│   └── seed.sql
│
├── public/
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# 5. Searchable Starting Points

Use these files as the first place to investigate a feature.

| Concern | Start Here |
|---|---|
| Research workflow | `lib/research/orchestrator.ts` |
| Research pipeline | `lib/research/pipeline.ts` |
| Findings | `lib/research/findings.ts` |
| Citations | `lib/research/citations.ts` |
| SerpApi integration | `lib/search/serpapi.ts` |
| Search query generation | `lib/search/queries.ts` |
| Search result normalization | `lib/search/normalizer.ts` |
| Search filtering | `lib/search/filter.ts` |
| Gemini integration | `lib/ai/gemini.ts` |
| Research planning | `lib/ai/planner.ts` |
| AI synthesis | `lib/ai/synthesizer.ts` |
| AI prompts | `lib/ai/prompts.ts` |
| Research API | `app/api/research/route.ts` |
| Database | `lib/supabase/` |
| AI response validation | `lib/validation/ai-output.ts` |
| Research input validation | `lib/validation/research.ts` |
| Research UI | `components/research/` |
| Research page | `app/research/page.tsx` |
| Research report | `app/research/[id]/page.tsx` |
| Research history | `app/history/` |

---

# 6. Core Modules & Boundaries

## 6.1 Presentation Layer

### Location

```text
app/
components/
```

### Responsibility

The presentation layer is responsible for:

- Rendering UI.
- User interaction.
- Navigation.
- Loading states.
- Error states.
- Displaying research results.
- Displaying sources and citations.

### It must not

- Call SerpApi directly.
- Call Gemini directly using private credentials.
- Contain large research orchestration logic.
- Contain raw database queries.

---

# 7. API Layer

### Location

```text
app/api/
```

### Responsibility

The API layer is the server-side application boundary.

It should:

1. Receive requests.
2. Validate input.
3. Authenticate users when required.
4. Call domain/application services.
5. Return structured responses.
6. Convert expected errors into appropriate HTTP responses.

### It must not

Contain the complete implementation of the research pipeline.

The API route should remain a thin adapter.

---

# 8. Research Domain Layer

### Location

```text
lib/research/
```

This is the central application layer.

### Responsibility

It coordinates the research workflow without being tied unnecessarily to UI implementation.

The research layer owns concepts such as:

- Research sessions.
- Research pipelines.
- Findings.
- Citations.
- Source relationships.

The central orchestrator is:

```text
lib/research/orchestrator.ts
```

---

# 9. Search Infrastructure Boundary

### Location

```text
lib/search/
```

The search layer is responsible for communication with SerpApi.

It owns:

- Search requests.
- Search query handling.
- Provider response normalization.
- Result filtering.
- Duplicate detection.

The rest of the application should not depend directly on SerpApi's raw response structure.

This creates the boundary:

```text
Research Domain
      ↓
Search Layer
      ↓
SerpApi
```

not:

```text
React Component
      ↓
SerpApi
```

---

# 10. AI Infrastructure Boundary

### Location

```text
lib/ai/
```

The AI layer is responsible for:

- Gemini API communication.
- Research query planning.
- Prompt management.
- Research synthesis.
- Structured model output.

The rest of the application should consume internal TraceSearch models rather than raw Gemini response objects.

Boundary:

```text
Research Domain
      ↓
AI Layer
      ↓
Gemini API
```

---

# 11. Data Layer

### Location

```text
lib/supabase/
supabase/migrations/
```

### Responsibility

The data layer owns:

- PostgreSQL access.
- Research persistence.
- Authentication integration.
- Data retrieval.
- Database queries.

The UI should never directly perform database operations.

Boundary:

```text
Research Domain
      ↓
Data Access
      ↓
Supabase PostgreSQL
```

---

# 12. Validation Layer

### Location

```text
lib/validation/
```

Validation is a boundary between untrusted external data and trusted internal application data.

Validate:

- User input.
- API request bodies.
- Gemini structured output.
- External provider responses when needed.

The validation layer should prevent malformed or unexpected data from propagating through the application.

---

# 13. Dependency Rules

The following dependency direction should be preserved:

```text
app/components
      ↓
API / application layer
      ↓
Research domain
      ↓
Provider/data infrastructure
```

More specifically:

```text
Presentation
    ↓
API
    ↓
Research
    ↓
Search / AI / Data
    ↓
External Providers
```

## Forbidden Dependencies

### UI → SerpApi

Forbidden.

### UI → Gemini

Forbidden when it exposes private credentials.

### UI → Database

Forbidden for server-side database access.

### Search Provider → React

Forbidden.

### Gemini Integration → UI

Forbidden.

### Provider-specific types → entire application

Avoid.

Provider-specific types should be converted into internal domain types at the boundary.

---

# 14. Architectural Style

TraceSearch uses a **modular monolith with layered boundaries**.

It is influenced by principles from:

- Layered architecture.
- Hexagonal architecture.
- Domain-oriented modularization.

It is **not** a strict implementation of Clean Architecture.

The goal is pragmatic separation rather than architectural ceremony.

---

# 15. Why a Modular Monolith?

## Decision

Use one Next.js application.

## Rationale

The hackathon MVP has:

- One frontend.
- One primary API surface.
- A small engineering team.
- Limited infrastructure requirements.
- Limited expected traffic.

A modular monolith provides:

- Fast development.
- Simple deployment.
- Easy local development.
- Low operational complexity.
- Clear internal boundaries.

## Trade-off

A modular monolith can become tightly coupled if boundaries are ignored.

Therefore, the directory structure and dependency rules in this document are important.

---

# 16. Why Next.js?

Next.js provides:

- React frontend.
- Server-side capabilities.
- API routes.
- Routing.
- Deployment compatibility with Vercel.
- TypeScript support.
- Server Components where appropriate.

Using one framework avoids unnecessary frontend/backend duplication for the MVP.

---

# 17. Why TypeScript?

TypeScript is used to provide:

- Static typing.
- Safer domain models.
- Better IDE support.
- Safer API boundaries.
- Better handling of structured AI output.

It is particularly useful because TraceSearch processes data from multiple untrusted sources.

---

# 18. Why SerpApi?

SerpApi provides structured access to search-engine results.

It is used as the web retrieval infrastructure.

TraceSearch should not implement its own search-engine scraping infrastructure for the MVP.

SerpApi-specific logic must remain inside:

```text
lib/search/
```

This makes the provider replaceable later.

---

# 19. Why Gemini?

Gemini is the current LLM provider for:

- Research planning.
- Source synthesis.
- Finding extraction.
- Follow-up question generation.

Gemini is treated as a provider, not as the application's domain model.

The application should therefore maintain its own internal structures for:

- Findings.
- Sources.
- Citations.
- Research sessions.

---

# 20. Why Supabase?

Supabase provides PostgreSQL plus convenient authentication and application integration.

It is appropriate for the MVP because it avoids operating a separate database infrastructure.

It can store:

- Users.
- Research sessions.
- Search queries.
- Sources.
- Findings.
- Finding/source relationships.

---

# 21. Why Vercel?

Vercel provides straightforward deployment for Next.js.

It also reduces operational overhead during a hackathon.

The application should remain deployable as a standard Next.js application.

---

# 22. Core Data Models

## 22.1 User

Represents an authenticated TraceSearch user.

```text
User
 └── ResearchSession[]
```

---

## 22.2 ResearchSession

Represents one research task.

```text
ResearchSession
├── id
├── userId
├── query
├── title
├── summary
├── status
├── createdAt
└── updatedAt
```

Relationships:

```text
User
  │
  └── ResearchSession
```

---

## 22.3 SearchQuery

Represents a search generated or submitted as part of a research session.

```text
SearchQuery
├── id
├── researchSessionId
├── query
├── provider
├── status
└── createdAt
```

Relationship:

```text
ResearchSession
  │
  └── SearchQuery[]
```

---

## 22.4 Source

Represents a web source retrieved during research.

```text
Source
├── id
├── researchSessionId
├── title
├── url
├── domain
├── snippet
├── sourceType
└── retrievedAt
```

Relationship:

```text
ResearchSession
  │
  └── Source[]
```

---

## 22.5 Finding

Represents a significant research finding produced by the research pipeline.

```text
Finding
├── id
├── researchSessionId
├── title
├── content
├── uncertainty
└── createdAt
```

Relationship:

```text
ResearchSession
  │
  └── Finding[]
```

---

## 22.6 FindingSource

Represents the relationship between a finding and its supporting source.

```text
FindingSource
├── findingId
└── sourceId
```

This creates:

```text
Finding
  │
  ├── Source A
  ├── Source B
  └── Source C
```

This relationship is the foundation of TraceSearch's traceability feature.

---

# 23. Research State Model

A research session should move through explicit states.

```text
idle
  ↓
planning
  ↓
searching
  ↓
analyzing
  ↓
generating
  ↓
completed
```

Error states may occur from any external operation:

```text
planning
searching
analyzing
generating
    ↓
  error
```

A failed request should preserve enough information to allow retry where practical.

---

# 24. Runtime Topology

## Local Development

```text
Developer Machine
│
├── Next.js Dev Server
│
├── Internet
│    ├── SerpApi
│    └── Gemini API
│
└── Supabase
     ├── PostgreSQL
     └── Auth
```

The local project does not require:

- Redis.
- Elasticsearch.
- Kafka.
- RabbitMQ.
- Local Kubernetes.
- Local GPU inference.

---

# 25. Required External Systems

| System | Purpose | Required |
|---|---|---|
| SerpApi | Web search | Yes |
| Gemini API | AI planning/synthesis | Yes |
| Supabase PostgreSQL | Persistence | Yes when persistence is enabled |
| Supabase Auth | Authentication | Optional for anonymous MVP |
| Vercel | Deployment | Required for the target deployment |
| Vercel Analytics | Analytics | Optional |

---

# 26. Environment Variables

Expected environment configuration:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

SERPAPI_API_KEY=

GEMINI_API_KEY=
```

Additional environment variables may be introduced when required.

Never commit actual values.

Public Supabase configuration variables are not equivalent to private server secrets, but authorization policies must still be configured correctly.

---

# 27. Error Handling Philosophy

Errors should be handled at the boundary where they are meaningful.

## Provider Errors

Provider errors should be translated into application-level errors.

Example:

```text
SerpApi timeout
      ↓
SearchProviderError
      ↓
Research pipeline
      ↓
User-friendly API response
```

Do not expose raw provider internals to users.

---

# 28. Error Categories

Prefer meaningful categories such as:

```text
VALIDATION_ERROR
AUTHENTICATION_ERROR
SEARCH_ERROR
AI_ERROR
DATABASE_ERROR
RATE_LIMIT_ERROR
TIMEOUT_ERROR
INTERNAL_ERROR
```

The exact implementation may use a typed application error model.

---

# 29. Logging Philosophy

Logs should answer:

- What operation failed?
- Where did it fail?
- How long did it take?
- Which request was involved?
- Was the failure external or internal?

Do not log secrets.

Do not unnecessarily log full private user research.

Use request IDs or correlation IDs when practical.

---

# 30. Testing Architecture

Testing should exist at three levels.

## Unit Tests

Test isolated logic:

```text
Query generation
Search normalization
Result filtering
Citation mapping
Validation
Research transformations
```

Unit tests should not require live SerpApi or Gemini requests.

---

## Integration Tests

Test boundaries between:

```text
Research → Search
Research → AI
Research → Database
API → Research
```

External providers should generally be mocked or controlled during automated tests.

---

## End-to-End Tests

Test the actual user journey:

```text
Open application
    ↓
Submit research question
    ↓
Research starts
    ↓
Research completes
    ↓
Findings render
    ↓
Citation renders
    ↓
Source can be opened
```

---

# 31. Testing Constraints

Tests should:

- Be deterministic where possible.
- Avoid unnecessary network requests.
- Avoid consuming paid API quotas.
- Avoid depending on changing search results.
- Mock external providers in unit/integration tests.
- Test failure states as well as successful states.

A live SerpApi/Gemini integration can be covered separately as an opt-in smoke test rather than as the default test suite.

---

# 32. Performance Architecture

The main performance bottlenecks are expected to be:

1. SerpApi latency.
2. Gemini latency.
3. Network latency.
4. Large source payloads.

The architecture should therefore:

- Parallelize independent searches.
- Normalize results early.
- Filter irrelevant sources before AI analysis.
- Avoid sending duplicate content to Gemini.
- Keep generated output structured.
- Stream progress to the UI where practical.

---

# 33. Security Architecture

Security boundaries:

```text
Browser
  │
  │ User input
  ▼
Next.js Server
  │
  ├── Validation
  │
  ├── Authentication
  │
  └── Authorization
       │
       ├── SerpApi
       ├── Gemini
       └── Supabase
```

Private credentials never cross into browser code.

External web content is treated as untrusted.

LLM output is treated as untrusted.

Database access is authenticated and authorized.

---

# 34. Architectural Trade-Offs

## Simple MVP vs. Advanced Research Agent

### Chosen

Small, controlled research pipeline.

### Not chosen

Fully autonomous browser agent.

### Reason

The controlled approach is:

- Easier to debug.
- Cheaper.
- More predictable.
- Safer.
- Better suited to a hackathon.

---

## External LLM vs. Local LLM

### Chosen

Gemini API.

### Reason

The application needs to work after deployment without relying on a developer's local machine.

Ollama is therefore not part of the production architecture.

---

## Provider Abstraction vs. Heavy Plugin Architecture

### Chosen

Lightweight provider boundaries.

### Reason

The architecture should allow future provider changes without introducing unnecessary abstraction layers.

---

# 35. Architectural Invariants

These are foundational constraints.

### Invariant 1

The browser never receives private provider API keys.

### Invariant 2

SerpApi integration remains inside the search boundary.

### Invariant 3

Gemini integration remains inside the AI boundary.

### Invariant 4

Database access remains inside the data boundary.

### Invariant 5

UI components do not own research orchestration.

### Invariant 6

Provider-specific response formats do not leak throughout the application.

### Invariant 7

Research findings should be traceable to actual retrieved sources when presented as sourced findings.

### Invariant 8

External web content is untrusted.

### Invariant 9

LLM output is untrusted until validated.

### Invariant 10

The MVP remains a modular monolith unless an explicit architectural decision changes this.

---

# 36. Architecture Change Process

Any significant architecture change should follow:

```text
Identify requirement
      ↓
Inspect existing architecture
      ↓
Identify affected boundaries
      ↓
Evaluate alternatives
      ↓
Choose smallest suitable change
      ↓
Implement
      ↓
Test
      ↓
Update ARCHITECTURE.md
```

Examples of changes that should update this document:

- Adding a new external service.
- Replacing SerpApi.
- Replacing Gemini.
- Introducing a second backend.
- Introducing a queue.
- Introducing a vector database.
- Changing the persistence model.
- Moving to microservices.
- Changing the deployment model.

---

# 37. Architecture Decision Records

Important decisions should be documented in this file initially.

If the project grows, create:

```text
docs/adr/
```

for individual Architecture Decision Records.

Recommended ADR topics:

```text
ADR-001 Modular Monolith
ADR-002 SerpApi as Search Provider
ADR-003 Gemini as LLM Provider
ADR-004 Supabase PostgreSQL
ADR-005 Vercel Deployment
```

Each ADR should document:

```text
Context
Decision
Alternatives
Rationale
Trade-offs
Consequences
```

---

# 38. Development Principles

TraceSearch architecture follows these principles:

### Simplicity

Prefer the simplest design that satisfies the requirements.

### Separation

Keep UI, research logic, providers, and persistence separated.

### Traceability

Make important AI findings traceable to source data.

### Replaceability

Keep external providers behind clear boundaries.

### Security

Treat all external input as untrusted.

### Testability

Keep domain logic independent enough to test without live providers.

### Deployability

The application should work independently of the developer's local environment.

---

# 39. Final Architectural Model

The architecture can be summarized as:

```text
                         TRACESEARCH
                              │
                              ▼
                       ┌──────────────┐
                       │   Next.js    │
                       │ Presentation │
                       └──────┬───────┘
                              │
                              ▼
                       ┌──────────────┐
                       │ Research API │
                       └──────┬───────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Research Domain   │
                    │                   │
                    │ Planner           │
                    │ Orchestrator      │
                    │ Findings          │
                    │ Citations         │
                    └───────┬───────────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
        ┌─────────┐    ┌─────────┐    ┌──────────┐
        │ Search  │    │   AI    │    │   Data   │
        │ Boundary│    │Boundary │    │ Boundary │
        └────┬────┘    └────┬────┘    └────┬─────┘
             │              │              │
             ▼              ▼              ▼
          SerpApi         Gemini        Supabase
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                     Traceable Findings
                            │
                            ▼
                     Research Report
```

The architectural goal is not to maximize the number of layers.

It is to maintain a small number of **clear boundaries** so that TraceSearch can evolve without turning the research workflow into tightly coupled code.
