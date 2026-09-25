---
name: TraceSearch Design System
theme: Apple Editorial Linear
version: "1.0"
status: draft
default_theme: light
dark_mode: manual_toggle
font_family:
  primary: "Inter"
  fallback: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
colors:
  light:
    background: "#FAFAF7"
    surface: "#FFFFFF"
    surface_subtle: "#F4F4EF"
    text_primary: "#263A35"
    text_secondary: "#66716C"
    text_muted: "#8A938E"
    border: "#E3E5DF"
    border_strong: "#D2D6CF"
    ocean_deep: "#4E635E"
    ocean_deep_hover: "#40544F"
    villa_nova: "#E2E0C8"
    siren_song: "#A6B49E"
    big_river: "#818C78"
    focus_ring: "#4E635E"
    success: "#4E635E"
    error: "#B42318"
    warning: "#8A6418"
  dark:
    background: "#0C100F"
    surface: "#121715"
    surface_subtle: "#171D1A"
    text_primary: "#F3F5F1"
    text_secondary: "#AAB3AD"
    text_muted: "#747E78"
    border: "#28302C"
    border_strong: "#39433E"
    ocean_deep: "#8EA8A0"
    ocean_deep_hover: "#A7BDB5"
    villa_nova: "#D8D5B8"
    siren_song: "#A6B49E"
    big_river: "#919D88"
    focus_ring: "#8EA8A0"
    success: "#8EA8A0"
    error: "#F97066"
    warning: "#D8B45B"
typography:
  font_sizes_px:
    display: 64
    h1: 48
    h2: 32
    h3: 24
    h4: 20
    body: 16
    body_small: 14
    label: 13
    caption: 12
  font_weights:
    regular: 400
    medium: 500
    semibold: 600
    bold: 700
  line_heights:
    display: 1.05
    heading: 1.15
    body: 1.65
    compact: 1.4
  letter_spacing:
    display: "-0.04em"
    heading: "-0.025em"
    body: "0em"
spacing:
  base_px: 8
  scale_px: [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128]
radii:
  xs_px: 6
  sm_px: 8
  md_px: 12
  lg_px: 16
  pill_px: 999
layout:
  content_max_width_px: 1200
  reading_max_width_px: 760
  research_max_width_px: 1080
  page_horizontal_padding_px:
    mobile: 20
    tablet: 32
    desktop: 48
elevation:
  strategy: "tonal_surfaces_and_thin_borders"
  shadows:
    none: "none"
    subtle: "0 1px 2px rgba(20, 30, 26, 0.04)"
    floating: "0 8px 30px rgba(20, 30, 26, 0.08)"
motion:
  philosophy: "quiet_luxury"
  fast_ms: 150
  normal_ms: 200
  slow_ms: 350
  reveal_ms: 500
  hover_transform_px: 2
  content_reveal_offset_px: 8
  reduced_motion: true
accessibility:
  standard: "WCAG 2.2 AA"
  normal_text_contrast_minimum: "4.5:1"
  large_text_contrast_minimum: "3:1"
  focus_indicator_required: true
  color_alone_for_status: false


# TraceSearch Design System

## Product Brief

TraceSearch is an AI-powered research engine that searches the web, analyzes multiple sources, and lets users trace important findings back to their evidence.

The interface must help users move through a simple mental model:

**Search → Analyze → Trace**

Users should be able to ask a research question, understand the resulting synthesis, inspect individual findings, and immediately see which sources support those findings.

The product is a hackathon MVP, but its interface should feel like a mature, premium research product rather than a generic AI chatbot.

---

## Visual Theme & Brand Direction

### Core direction

**Apple × Editorial × Linear**

TraceSearch should feel:

- Minimal
- Calm
- Intelligent
- Luxurious
- Precise
- Trustworthy
- Modern
- Quietly technical

The design must use restraint as a feature.

The interface should not try to look impressive through visual noise. It should look impressive because spacing, typography, motion, color, and hierarchy are exceptionally deliberate.

### Core design principle

> If an element does not improve understanding, interaction, trust, or atmosphere, remove it.

### Design personality

TraceSearch is a research instrument, not an AI toy.

The UI should prioritize the research itself. Content, evidence, citations, and hierarchy should remain more visually important than decoration.

---

# Color System

## Primary palette

The TraceSearch brand palette is based on four muted natural tones:

| Token | Hex | Role |
|---|---|---|
| `ocean-deep` | `#4E635E` | Primary brand/action color |
| `villa-nova` | `#E2E0C8` | Warm highlight/background accent |
| `siren-song` | `#A6B49E` | Secondary accent |
| `big-river` | `#818C78` | Muted supporting accent |

These colors should be used deliberately rather than covering the interface in green.

### Usage ratio

As a general visual guideline:

- 80–90% neutral surfaces and typography
- 10–20% brand palette and semantic accents

Ocean Deep should feel special because it is not everywhere.

---

## Light Theme

Light mode is the default TraceSearch experience.

### Surfaces

- Background: `#FAFAF7`
- Surface: `#FFFFFF`
- Subtle surface: `#F4F4EF`

The background should feel slightly warm rather than pure white.

### Typography

- Primary: `#263A35`
- Secondary: `#66716C`
- Muted: `#8A938E`

Avoid pure black text.

### Borders

- Default: `#E3E5DF`
- Strong: `#D2D6CF`

Borders should be subtle and should never visually dominate content.

### Actions

- Primary: `#4E635E`
- Hover: `#40544F`
- Focus: `#4E635E`

Primary actions should generally use Ocean Deep with light text.

---

## Dark Theme

Dark mode is manually enabled through the theme toggle.

It should not simply invert the light theme.

### Surfaces

- Background: `#0C100F`
- Surface: `#121715`
- Subtle surface: `#171D1A`

### Typography

- Primary: `#F3F5F1`
- Secondary: `#AAB3AD`
- Muted: `#747E78`

### Borders

- Default: `#28302C`
- Strong: `#39433E`

### Actions

- Primary: `#8EA8A0`
- Hover: `#A7BDB5`

The dark theme should feel deep, calm, and slightly green rather than pure black.

---

# Typography

## Font

Use **Inter** as the single primary typeface.

Do not introduce additional display fonts unless the design system is explicitly revised.

```text
Inter
  400 Regular
  500 Medium
  600 Semibold
  700 Bold
```

A single typeface keeps TraceSearch visually coherent and allows hierarchy to come from scale, weight, spacing, and whitespace.

## Type scale

| Token | Size | Weight | Line height |
|---|---:|---:|---:|
| Display | 64px | 600 | 1.05 |
| H1 | 48px | 600 | 1.15 |
| H2 | 32px | 600 | 1.15 |
| H3 | 24px | 600 | 1.15 |
| H4 | 20px | 600 | 1.15 |
| Body | 16px | 400 | 1.65 |
| Body Small | 14px | 400 | 1.65 |
| Label | 13px | 500 | 1.4 |
| Caption | 12px | 500 | 1.4 |

### Large headings

Use negative letter spacing:

- Display: `-0.04em`
- Headings: `-0.025em`

Large typography should feel confident rather than loud.

Do not use oversized text merely to fill space.

---

# Layout & Spacing

## Spacing scale

TraceSearch follows an 8px spacing system with a 4px micro-step.

```text
4
8
12
16
24
32
40
48
64
80
96
128
```

Do not invent arbitrary spacing values when an existing token is appropriate.

## Content widths

- General content maximum: `1200px`
- Research workspace maximum: `1080px`
- Long-form reading content maximum: `760px`

Research prose should remain narrow enough to be comfortable to read.

## Page padding

- Mobile: `20px`
- Tablet: `32px`
- Desktop: `48px`

## Grid

Use a responsive 12-column grid on desktop.

The grid should support:

- Main research content
- Evidence/source panel
- Supporting metadata
- Responsive collapse into a single column

Do not force a multi-column layout when the content does not benefit from it.

---

# Shape Language

TraceSearch uses **precise structure with subtle rounding**.

### Corner radiuses

- XS: `6px`
- Small: `8px`
- Medium: `12px`
- Large: `16px`
- Pill: `999px`

Use `12px` as the normal interactive/control radius.

Do not make every component pill-shaped.

Pills should be reserved for compact tags, filters, statuses, and similar controls.

---

# Elevation & Depth

TraceSearch should be primarily flat.

Visual hierarchy should come from:

1. Typography
2. Spacing
3. Tonal surfaces
4. Thin borders
5. Very subtle shadows

### Shadow tokens

**None**

```text
none
```

**Subtle**

```text
0 1px 2px rgba(20, 30, 26, 0.04)
```

**Floating**

```text
0 8px 30px rgba(20, 30, 26, 0.08)
```

Do not use large, dark, obvious shadows.

Cards should not appear to float several centimeters above the page.

---

# Component Patterns

## Buttons

Buttons should be simple and confident.

### Primary

- Background: Ocean Deep
- Text: light
- Radius: `8px`
- Height: approximately `40–44px`
- Weight: 500
- Transition: 200ms

### Secondary

Use a neutral surface with a subtle border.

### Ghost

Use only when the action is secondary and the surrounding context is obvious.

### Hover

Use a subtle color transition.

Avoid scaling buttons dramatically on hover.

### Active

Use a small tonal change or approximately `1px` downward movement.

### Focus

Every interactive button must have a clearly visible focus indicator.

---

## Inputs

The research input is a primary product element and should feel exceptionally refined.

- Background: `#FFFFFF` in light mode
- Border: `#E3E5DF`
- Radius: `12px`
- Generous internal padding
- Clear focus state
- No excessive inner shadows

The input should feel like a calm canvas for the user's question.

The primary action should be visually obvious without requiring a large colorful button.

---

## Cards

Cards are intentionally limited.

Prefer:

- Sections
- Dividers
- Whitespace
- Tonal surfaces
- Inline metadata

Use cards when grouping information genuinely improves comprehension.

Do not put every piece of content inside a rounded rectangle.

---

## Research Findings

Findings should be treated as the primary content.

Recommended structure:

```text
01

Finding title

Finding explanation...

Sources
Google · NIST · FIDO Alliance
```

Finding numbers should provide visual orientation without becoming decorative.

---

## Sources & Citations

Sources are central to TraceSearch's identity.

Citation elements should be:

- Easy to identify
- Easy to click
- Visually secondary to the finding
- Clearly associated with the evidence they support

Never fabricate citations.

Never display a citation that is not actually connected to the source data.

---

# Motion & Animation

## Philosophy

TraceSearch uses **quiet luxury motion**.

Animations should make the interface feel alive and sophisticated without becoming the focus.

### Timing

- Fast: `150ms`
- Normal: `200ms`
- Slow: `350ms`
- Content reveal: `500ms`

### Motion principles

Use:

- Fade
- Small vertical translation
- Subtle opacity transitions
- Gentle scale changes
- Smooth state morphing
- Progressive content reveals
- Drawing/connecting evidence relationships

Typical content reveal movement should be no more than `8px`.

Hover movement should generally not exceed `2px`.

### Research pipeline animation

The research process should visually communicate:

```text
Planning
   ↓
Searching
   ↓
Analyzing
   ↓
Connecting evidence
   ↓
Completed
```

Avoid generic infinite spinners when the interface can communicate actual progress.

### Evidence animation

The Evidence/Trace Map should use meaningful motion.

When a finding is selected:

```text
Finding
  │
  ├──── Source 01
  ├──── Source 02
  └──── Source 03
```

Connections can gently draw into view to show the relationship between evidence and claims.

### Reduced motion

Respect `prefers-reduced-motion`.

When reduced motion is enabled:

- Remove decorative movement
- Remove large transitions
- Avoid animated transforms
- Preserve instant or minimal opacity/state changes
- Never make functionality dependent on animation

---

# Accessibility

TraceSearch targets **WCAG 2.2 AA**.

## Non-negotiable requirements

Normal text must have at least:

**4.5:1 contrast**

Large text must have at least:

**3:1 contrast**

Interactive controls must have:

- Visible keyboard focus
- Logical tab order
- Accessible names
- Adequate target size
- Clear disabled states

Never communicate important information through color alone.

For example, an error should not be indicated only by red.

Use:

- Icon
- Text
- Color

where appropriate.

Forms must have accessible labels.

Interactive elements must remain understandable without animation.

---

# Responsive Design

TraceSearch must work across:

- Mobile
- Tablet
- Desktop

Desktop should provide the full research workspace.

On mobile:

- Collapse multi-column layouts
- Keep the research question prominent
- Stack evidence/source content
- Preserve readable line lengths
- Maintain generous touch targets

Do not simply shrink the desktop interface.

---

# Do's

- Do use whitespace aggressively.
- Do make typography carry much of the visual hierarchy.
- Do use the palette as restrained accents.
- Do keep Ocean Deep meaningful.
- Do use thin borders.
- Do use subtle tonal differences between surfaces.
- Do animate meaningful state changes.
- Do make research findings visually dominant.
- Do make evidence relationships easy to understand.
- Do preserve consistent spacing.
- Do support keyboard navigation.
- Do respect reduced-motion preferences.
- Do make light mode the default.
- Do provide a manual dark-mode toggle.
- Do favor clarity over decoration.

# Don'ts

- Don't use random gradients.
- Don't use neon AI-style glow effects.
- Don't use excessive glassmorphism.
- Don't make every element a card.
- Don't make every button a pill.
- Don't use huge shadows.
- Don't use excessive rounded corners.
- Don't use color alone for status or errors.
- Don't animate everything.
- Don't use bouncing or attention-seeking animations.
- Don't introduce arbitrary colors outside the token system.
- Don't introduce arbitrary font sizes when a token exists.
- Don't use pure black for primary light-theme text.
- Don't create visual noise to make the product look "AI".
- Don't sacrifice readability for aesthetics.
- Don't make animations necessary to understand content.
- Don't copy Apple's UI directly.
- Don't turn TraceSearch into a generic SaaS dashboard.

---

# Design Invariants

These rules should remain true across the entire product:

1. **Light mode is the default.**
2. **Dark mode is available through a manual toggle.**
3. **Inter is the primary and default typeface.**
4. **The interface is predominantly neutral.**
5. **Ocean Deep is the primary brand/action accent.**
6. **Cards are used sparingly.**
7. **Whitespace is a primary design tool.**
8. **Motion is subtle, intentional, and meaningful.**
9. **Evidence and citations are first-class UI elements.**
10. **No decorative effect should compete with research content.**
11. **Accessibility is not optional.**
12. **Design tokens must be used instead of ad-hoc values.**
13. **The product should feel premium through restraint, not visual complexity.**

## Final Design Statement

> **TraceSearch is quiet intelligence.**
>
> A minimal research interface where typography, whitespace, evidence, and meaningful motion create a premium experience without unnecessary decoration.
