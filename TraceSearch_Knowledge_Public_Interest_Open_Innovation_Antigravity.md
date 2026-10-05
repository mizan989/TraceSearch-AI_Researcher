# TraceSearch --- Knowledge & Public Interest + Open Innovation Expansion

## Antigravity Implementation Specification

> **Purpose:** Expand TraceSearch so that **Knowledge & Public
> Interest** and **Open Innovation** become first-class research use
> cases, while preserving the existing product identity, research
> pipeline, evidence-tracing architecture, visual language, and minimal
> UX.
>
> **Important:** This is an implementation specification, not a request
> to rebuild TraceSearch from scratch. Reuse the existing architecture
> and components wherever possible.

------------------------------------------------------------------------

# 1. Product Context

TraceSearch is an open-source AI web research and evidence-tracing
engine.

Its core promise is:

> **Turn complex questions into verified research.**

The current product already supports:

-   Multi-query web retrieval
-   Query decomposition
-   Search result normalization and deduplication
-   Source inspection
-   Source categorization
-   AI synthesis
-   Claim-level source grounding
-   Evidence mapping
-   Uncertainty and conflict detection
-   Research history
-   Shareable research reports
-   PDF/Markdown export
-   Local/demo mode
-   Coding-agent/API usage

The current research pipeline is conceptually:

``` text
User Question
      ↓
Query Planning
      ↓
Multi-Query Search
      ↓
Source Normalization
      ↓
Source Enrichment
      ↓
AI Synthesis
      ↓
Evidence Mapping
      ↓
Uncertainty / Conflict Detection
      ↓
Research Report
```

Do **not** replace this architecture.

The objective is to make the existing engine visibly useful for two
additional categories:

1.  **Knowledge & Public Interest**
2.  **Open Innovation**

These should feel like natural extensions of TraceSearch rather than
separate products.

------------------------------------------------------------------------

# 2. Core Product Principle

## Do NOT create separate research modes

Do not introduce a complicated mode selector such as:

``` text
General Research
Knowledge Research
Open Innovation
Market Intelligence
Travel
Technical Research
```

That would make TraceSearch feel heavier and more complicated.

The user should still have **one primary research input**.

The categories should act as:

-   discovery pathways
-   curated research examples
-   use-case positioning
-   query suggestions
-   source-priority hints where appropriate

The central interaction remains:

``` text
Ask a question
      ↓
TraceSearch researches it
      ↓
Evidence-backed findings
      ↓
Trace every claim to its sources
```

The categories should help users understand **what TraceSearch can
investigate**, not force them to classify every query.

------------------------------------------------------------------------

# 3. New Use Case: Knowledge & Public Interest

## Product definition

Add **Knowledge & Public Interest** as a first-class use-case category.

The purpose is to communicate that TraceSearch can investigate questions
involving information that matters to people, communities, and society.

This category should cover:

-   Public policy
-   Government decisions
-   Laws and regulations
-   Public records
-   Civic information
-   Environmental issues
-   Climate information
-   Education
-   Healthcare information
-   Public-interest investigations
-   Fact-checking
-   Viral claims
-   Scientific developments
-   Historical research
-   Social issues
-   Consumer/public-interest questions
-   Government statistics
-   Institutional reports

This does **not** mean TraceSearch should present itself as a
replacement for official authorities, doctors, lawyers, journalists, or
other professionals.

It means TraceSearch helps users **research and trace information back
to authoritative sources.**

------------------------------------------------------------------------

# 4. Knowledge & Public Interest --- UX Copy

Add a homepage section around the research input.

Suggested heading:

> **Research anything that matters**

Suggested supporting copy:

> From everyday questions to public-interest investigations, TraceSearch
> connects claims to the sources behind them.

Keep the copy concise.

Do not create a huge marketing section.

The section should feel like a natural continuation of the current
minimal landing page.

------------------------------------------------------------------------

# 5. Knowledge & Public Interest --- Example Queries

Create several clickable example query cards.

Recommended examples:

### Public Policy

> What changed in India's latest data protection rules?

### Environment

> How has air quality in Delhi changed over the last decade?

### Climate

> What does the latest scientific evidence say about extreme heat?

### Fact Checking

> Is this viral claim about India's economy supported by official data?

### Education

> What does recent research say about the effectiveness of online
> learning?

### Public Information

> What are the main findings of the latest national census or population
> data?

The exact examples can be adjusted if necessary, but they should
represent **real research questions**, not generic filler.

------------------------------------------------------------------------

# 6. Knowledge & Public Interest --- Interaction

When a user clicks one of these examples:

1.  Populate the existing research input.
2.  Do not immediately execute the search unless the current product
    already does that for demo query cards.
3.  Preserve existing interaction behavior.
4.  The user should be able to edit the query before running it.
5.  Do not create a new research page or new workflow solely for this
    category.

The examples should use the existing `ResearchInput` and existing query
execution mechanism.

------------------------------------------------------------------------

# 7. Knowledge & Public Interest --- Source Prioritization

This is the most important functional improvement.

TraceSearch already categorizes sources and performs evidence tracing.

For public-interest research, the system should prefer authoritative
sources.

Preferred source hierarchy:

``` text
1. Government / official public institutions
2. Official regulatory bodies
3. Universities / research institutions
4. Peer-reviewed scientific literature
5. Established non-profit / international organizations
6. Reputable journalism
7. Industry / organizational reports
8. Secondary sources
9. General web sources
```

Do not blindly reject lower-ranked sources.

The goal is **source prioritization**, not source censorship.

For example:

-   Government data should generally outrank a random blog.
-   A primary research paper should generally outrank a blog summarizing
    that paper.
-   An official regulation should outrank commentary about the
    regulation.

------------------------------------------------------------------------

# 8. Public-Interest Source Categories

If the existing source classification system can support it without
architectural disruption, add or improve classification for:

-   Official
-   Government
-   Academic
-   Research
-   Non-profit
-   News
-   Technical
-   Industry
-   Other

However:

**Do not unnecessarily redesign the existing source filter UI.**

The current source filters such as:

``` text
All
Official
Academic
Technical
News
```

should remain usable.

Only extend them if the implementation can be done cleanly and
consistently.

------------------------------------------------------------------------

# 9. Public-Interest Research Behavior

When the query clearly concerns public-interest information, the query
planner should consider generating searches that target authoritative
sources.

Example:

User query:

> What changed in India's data protection rules?

Possible research angles:

``` text
1. Latest official Indian data protection regulation
2. Government explanation / notification of the changes
3. Expert or academic analysis of the changes
4. Reputable reporting explaining practical implications
```

Another example:

> How has Delhi air quality changed over the last decade?

Potential search angles:

``` text
1. Official air quality historical data
2. Government/environmental agency reports
3. Scientific studies analyzing long-term trends
4. Independent analysis for contextual interpretation
```

Do not hard-code these exact queries.

The planner should dynamically generate appropriate research angles.

------------------------------------------------------------------------

# 10. New Use Case: Open Innovation

Add **Open Innovation** as another first-class use case.

The category should communicate that TraceSearch can help people
discover:

-   Emerging technologies
-   Open-source projects
-   New research
-   New approaches to technical problems
-   Research-to-product opportunities
-   Technology landscapes
-   Competing technical approaches
-   Open-source alternatives
-   Experimental projects
-   Developer ecosystems
-   New scientific directions
-   Existing solutions before building something from scratch

The key concept is:

> **Discover what already exists, what is emerging, and where new ideas
> are being developed.**

------------------------------------------------------------------------

# 11. Open Innovation --- UX Copy

Suggested heading:

> **Explore what's next**

Suggested supporting copy:

> Discover emerging technologies, open-source projects, research, and
> new approaches to difficult problems.

Keep this concise.

Avoid startup-style buzzword overload.

TraceSearch should still feel like a serious research tool.

------------------------------------------------------------------------

# 12. Open Innovation --- Example Queries

Create several clickable example query cards.

Recommended examples:

### Open Source

> What open-source alternatives exist to Stripe for a small SaaS?

### AI Infrastructure

> What are the most promising open-source LLM inference frameworks in
> 2026?

### Emerging Technology

> What technologies could replace traditional CAPTCHA systems?

### Scientific Innovation

> How are researchers approaching sodium-ion batteries?

### Technical Landscape

> What open-source projects are solving this problem already?

### Research to Implementation

> Which recent research papers have practical open-source
> implementations?

Again, examples should be representative rather than exhaustive.

------------------------------------------------------------------------

# 13. Open Innovation --- Source Prioritization

For Open Innovation research, prioritize sources differently from
public-interest research.

Preferred hierarchy:

``` text
1. Official project repositories
2. Official project documentation
3. Primary research papers
4. Maintainer / developer documentation
5. Official technical announcements
6. Universities / research institutions
7. Technical publications
8. Reputable industry analysis
9. Secondary sources
10. General web sources
```

This is particularly important for open-source projects.

If a GitHub repository exists, the repository and official documentation
should generally be preferred over an article merely discussing that
project.

If a research paper exists, the original paper should generally be
preferred over a secondary summary.

------------------------------------------------------------------------

# 14. Open Innovation Research Behavior

When the query is clearly about emerging technology, open-source
projects, or innovation, the query planner should generate research
angles that discover both **primary implementations** and **context**.

Example:

User query:

> What are the best open-source alternatives to proprietary vector
> databases?

Potential angles:

``` text
1. Open-source vector database projects
2. Official documentation and repository activity
3. Technical comparisons and benchmarks
4. Academic / technical research
5. Current limitations and tradeoffs
```

Another example:

> What are the most promising open-source LLM inference frameworks?

Potential angles:

``` text
1. Major open-source inference frameworks
2. Official repositories and documentation
3. Benchmark/performance evidence
4. Hardware compatibility
5. Current limitations and ecosystem maturity
```

Do not hard-code these searches.

Use them as planning principles.

------------------------------------------------------------------------

# 15. Add These Categories to the Homepage

The homepage should visually communicate the broader TraceSearch scope.

Recommended structure:

``` text
[Existing Hero]

Turn complex questions into verified research.

[Existing Research Input]


Research anything that matters

From everyday questions to public-interest investigations,
TraceSearch connects claims to the sources behind them.

[Public Policy] [Climate] [Fact Checking]
[Science]       [Education] [Civic Information]


Explore what's next

Discover emerging technologies, open-source projects,
research, and new approaches to difficult problems.

[Open Source] [Emerging Tech] [AI]
[Research]    [Technical Solutions]
```

However, do not blindly implement this exact layout.

The final design must fit the existing TraceSearch visual system.

------------------------------------------------------------------------

# 16. Better Alternative: Unified Use-Case Section

If two separate sections make the homepage too long, use one compact
section:

## What can you research?

Use cards such as:

``` text
Market Intelligence
Understand companies, markets, competitors and industries.

Knowledge & Public Interest
Investigate public issues, policies, science and claims.

Open Innovation
Discover technologies, research and open-source solutions.

Academic Research
Connect findings across papers and primary studies.

Technical & Security Research
Investigate technologies, vulnerabilities and architectures.

Travel & Local Discovery
Research destinations, places and local experiences.
```

This is preferred if the current homepage is intentionally minimal.

The user should not feel like they are scrolling through a giant feature
catalogue.

------------------------------------------------------------------------

# 17. Keep the Visual Language Consistent

The current TraceSearch visual identity must remain intact.

Current design direction:

-   Quiet luxury
-   Apple/editorial influence
-   Minimal
-   Light interface
-   Inter typography
-   Alabaster Grey
-   Coffee Bean
-   Racing Red
-   Black Cherry
-   Subtle glass surfaces
-   Restrained motion
-   Generous spacing
-   High information clarity

Do not introduce:

-   Neon gradients
-   Cyberpunk visuals
-   Excessive glassmorphism
-   Huge illustrations
-   3D blobs
-   Excessive icons
-   Loud animations
-   Giant marketing cards
-   Generic AI graphics
-   Unnecessary badges
-   Excessive technical terminology

TraceSearch should still look like a **serious research product**.

------------------------------------------------------------------------

# 18. Card Design

If category/example cards are introduced:

Use restrained cards.

Recommended characteristics:

-   subtle border
-   very light surface contrast
-   rounded corners matching existing UI
-   short title
-   one-line description where needed
-   small arrow/interaction indicator
-   subtle hover elevation
-   subtle border/accent transition
-   no giant icons

Example:

``` text
┌──────────────────────────────────────────┐
│ Knowledge & Public Interest          →  │
│ Public policy, science, claims & civic  │
│ information.                            │
└──────────────────────────────────────────┘
```

The cards should feel editorial rather than SaaS-dashboard-like.

------------------------------------------------------------------------

# 19. Motion & Interaction

Reuse the existing animation system.

Allowed:

-   subtle fade-in
-   slight upward reveal
-   hover lift
-   border transition
-   opacity transition
-   gentle arrow movement
-   staggered appearance

Do not add:

-   parallax-heavy animations
-   constant floating elements
-   excessive scale effects
-   bouncing icons
-   distracting background animations

The research product should prioritize reading and investigation.

------------------------------------------------------------------------

# 20. Responsive Requirements

Everything must work on:

-   320px mobile
-   375px mobile
-   390px mobile
-   430px mobile
-   tablet
-   laptop
-   large desktop

On mobile:

-   cards should stack naturally
-   text must not become cramped
-   no horizontal scrolling
-   no oversized headings
-   category cards should remain easy to tap
-   query examples should remain readable
-   preserve existing mobile navigation
-   preserve existing research input behavior

On desktop:

-   use the existing content width
-   do not create unnecessarily wide sections
-   maintain visual rhythm and whitespace

------------------------------------------------------------------------

# 21. Research Pipeline Changes

Do not create separate pipelines.

Instead, extend the existing pipeline with optional **research
intent/context** where appropriate.

Conceptually:

``` text
Research Request
      │
      ├── query
      │
      └── optional intent
              │
              ├── public_interest
              ├── open_innovation
              └── general
```

If the current architecture does not need explicit intent, do not force
it into the data model.

The system can infer intent from the query.

Prefer the smallest clean architectural change.

------------------------------------------------------------------------

# 22. Query Planner

The existing planner should remain the authority for query
decomposition.

Enhance its instructions so it understands:

### Public Interest

When a question involves:

-   government
-   law
-   regulation
-   public policy
-   public data
-   environmental issues
-   public health information
-   civic issues
-   public claims
-   social issues

the planner should prioritize authoritative primary sources.

### Open Innovation

When a question involves:

-   open-source
-   emerging technology
-   technical alternatives
-   research-to-product
-   developer ecosystems
-   new projects
-   experimental approaches
-   technical innovation

the planner should prioritize primary technical sources.

Do not make the planner rigid.

It must still be able to search the broader web.

------------------------------------------------------------------------

# 23. Evidence Quality

The purpose of these changes is NOT simply to produce more search
results.

The important objective is:

> **Better source selection and stronger evidence provenance.**

The final research report should continue to show:

-   finding
-   supporting sources
-   source snippets
-   source URL
-   uncertainty
-   conflicting evidence
-   evidence map

For the new categories, this becomes especially important.

------------------------------------------------------------------------

# 24. Avoid Hallucinated Authority

Do not add language implying:

> "This is definitely true because TraceSearch found it."

Instead, maintain the current evidence-oriented language.

TraceSearch should communicate:

> "Here is what the available evidence says, and here are the sources
> behind it."

For public-interest research, this distinction is especially important.

------------------------------------------------------------------------

# 25. README Updates

Update the README so the new use cases are officially represented.

Current use cases should be expanded.

Recommended final list:

``` text
- Market & Competitive Intelligence
- Knowledge & Public Interest
- Open Innovation
- Academic & Scientific Investigation
- Fact-Checking & Claims Validation
- Technical & Security Research
- Travel & Local Discovery
- Executive Briefings & Dossiers
```

Do not add categories that the actual application cannot reasonably
support.

The README should accurately describe the product.

------------------------------------------------------------------------

# 26. README --- Knowledge & Public Interest Description

Use language similar to:

> **Knowledge & Public Interest** --- Investigate public policy,
> government information, scientific developments, environmental issues,
> civic questions, and claims of public interest while tracing findings
> back to authoritative sources.

Keep it concise.

------------------------------------------------------------------------

# 27. README --- Open Innovation Description

Use language similar to:

> **Open Innovation** --- Discover emerging technologies, open-source
> projects, research, technical alternatives, and new approaches by
> connecting claims to primary repositories, documentation, papers, and
> other evidence.

Again, keep it concise.

------------------------------------------------------------------------

# 28. README --- Usage Examples

Add at least one example for each category.

### Knowledge & Public Interest

``` text
Query:
"What changed in India's latest data protection rules?"

Outcome:
- Official regulatory sources identified
- Government documentation prioritized
- Independent analysis used for context
- Key claims linked to supporting evidence
- Conflicting interpretations surfaced where relevant
```

### Open Innovation

``` text
Query:
"What are the most promising open-source LLM inference frameworks in 2026?"

Outcome:
- Primary project repositories identified
- Official documentation inspected
- Technical comparisons collected
- Research/benchmark evidence cross-referenced
- Tradeoffs and limitations surfaced
```

These are illustrative examples.

Do not hard-code these results into the application.

------------------------------------------------------------------------

# 29. Homepage Content Hierarchy

Do not let the new content overpower the main product.

Recommended hierarchy:

``` text
1. Hero
2. Research input
3. Suggested research queries
4. Compact "What can you research?" section
5. Existing product/features content
6. Existing footer
```

If the current site already has an equivalent section, modify it instead
of duplicating it.

------------------------------------------------------------------------

# 30. Reuse Existing Components

Before creating new components, inspect the existing codebase.

Reuse:

-   existing cards
-   existing buttons
-   existing typography
-   existing spacing
-   existing animation utilities
-   existing icons
-   existing query suggestion components
-   existing layout containers

Possible new components only if necessary:

``` text
UseCases
UseCaseCard
ResearchExamples
ResearchExampleCard
```

Do not create unnecessary abstraction layers.

------------------------------------------------------------------------

# 31. Accessibility

All new UI must:

-   use semantic HTML
-   have keyboard-accessible interactive cards
-   have visible focus states
-   have accessible labels
-   maintain sufficient text/background contrast
-   not rely on color alone
-   support reduced-motion preferences if the existing system supports
    them

Clickable cards must behave like actual interactive elements, not
`<div>` elements with click handlers only.

------------------------------------------------------------------------

# 32. SEO / Metadata

If appropriate, update page metadata to naturally reflect the broader
capability.

Do not keyword-stuff.

The product should still primarily be described as:

> Open-source AI web research and evidence-tracing engine.

Potential supporting concepts:

-   knowledge research
-   public-interest research
-   open innovation
-   evidence-based research
-   source-grounded AI research

Do not turn metadata into a keyword list.

------------------------------------------------------------------------

# 33. No Fake Functionality

This is critical.

Do NOT create UI that implies functionality that doesn't exist.

For example, do not add:

``` text
"Government Database Search"
"Patent Search"
"GitHub Intelligence Mode"
"Local Business Intelligence"
```

unless the application actually implements those dedicated capabilities.

The categories are **research use cases**, not separate integrations.

------------------------------------------------------------------------

# 34. Travel & Local Discovery

The current product can research travel/local topics through general web
search, but this specification is primarily about:

-   Knowledge & Public Interest
-   Open Innovation

Do not spend most of the implementation on Travel & Local Discovery.

If the existing homepage already mentions or plans travel/local
discovery, keep it as a general research category without building a
dedicated location engine.

------------------------------------------------------------------------

# 35. Testing Checklist

After implementation, test:

## Homepage

-   [ ] Knowledge & Public Interest is visible
-   [ ] Open Innovation is visible
-   [ ] Content fits the existing design
-   [ ] No excessive vertical bloat
-   [ ] Query cards work
-   [ ] Existing demo queries still work

## Research

-   [ ] Existing research flow still works
-   [ ] New example queries execute normally
-   [ ] Evidence mapping still works
-   [ ] Source sidebar still works
-   [ ] Source filters still work
-   [ ] Uncertainty display still works
-   [ ] PDF export still works
-   [ ] Copy/share functionality still works
-   [ ] History still works

## Source Quality

Test public-interest queries and verify that authoritative sources are
favored.

Test open-innovation queries and verify that primary
repositories/documentation/papers are favored.

## Responsive

-   [ ] Mobile layout
-   [ ] Tablet layout
-   [ ] Desktop layout
-   [ ] No horizontal overflow
-   [ ] Cards remain usable on touchscreens

## Accessibility

-   [ ] Keyboard navigation
-   [ ] Focus states
-   [ ] Screen-reader labels
-   [ ] Contrast
-   [ ] Reduced motion where applicable

------------------------------------------------------------------------

# 36. Build Validation

After making changes:

``` bash
npm run typecheck
npm run lint
npm run build
```

Fix all errors introduced by the implementation.

Do not suppress TypeScript or ESLint errors simply to make the build
pass.

------------------------------------------------------------------------

# 37. Regression Protection

Do not break:

-   `/`
-   `/research`
-   `/research/[id]`
-   `/history`
-   `/shared/[id]`
-   `/api/research`
-   `/api/history`
-   existing research sessions
-   existing source cards
-   evidence trace map
-   source modal
-   PDF export
-   copy report
-   share functionality
-   demo mode
-   existing navigation
-   existing responsive behavior

Do not remove existing functionality unless absolutely necessary.

------------------------------------------------------------------------

# 38. Visual Quality Rules

The implementation should look like it was designed as part of
TraceSearch from day one.

Avoid the common AI-generated redesign mistakes:

-   too many cards
-   too many icons
-   excessive gradients
-   oversized section headings
-   random illustrations
-   inconsistent corner radii
-   inconsistent spacing
-   arbitrary colors
-   unnecessary badges
-   excessive copy
-   fake statistics
-   generic AI imagery
-   unnecessary "AI-powered" labels

The product should remain:

> **quiet, intelligent, editorial, evidence-focused, and minimal.**

------------------------------------------------------------------------

# 39. Final Intended Positioning

After the changes, TraceSearch should communicate a broader but still
coherent proposition:

> **TraceSearch helps you investigate complex questions across markets,
> public interest, science, technology, and emerging ideas --- then
> trace the answer back to the evidence.**

The important differentiation is not simply:

> "AI searches the web."

It is:

> **"AI researches the web, connects findings to evidence, and shows you
> where those findings came from."**

Knowledge & Public Interest strengthens the **public knowledge /
evidence** side.

Open Innovation strengthens the **discovery / emerging technology /
open-source** side.

Both should reinforce the same central TraceSearch identity:

``` text
ASK
 ↓
SEARCH
 ↓
COLLECT
 ↓
ANALYZE
 ↓
TRACE
 ↓
SYNTHESIZE
```

------------------------------------------------------------------------

# 40. Final Implementation Rule

Before changing anything:

1.  Inspect the current repository.
2.  Identify existing homepage/use-case/query components.
3.  Identify existing query planner and search pipeline.
4.  Identify source classification/filtering logic.
5.  Reuse existing patterns.
6.  Make the smallest clean architectural changes necessary.
7.  Implement the two new use cases.
8.  Update README/documentation.
9.  Test the full existing research flow.
10. Run typecheck, lint, and production build.
11. Review the result visually on mobile and desktop.
12. Remove any unnecessary UI or code introduced during the
    implementation.

**Do not redesign TraceSearch.**

This task is an **evolution of the existing product**, not a
replacement.

The final result should make a user immediately understand:

> TraceSearch isn't only for technical research or market research.

It can also help them:

> **understand important public questions and discover what is being
> built next.**
