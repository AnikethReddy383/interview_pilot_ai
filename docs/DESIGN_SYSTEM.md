# InterviewPilot AI — Design System

**Status:** Active  
**Owner:** Product Design  
**Last reviewed:** 2026-07-19

## Design Direction

InterviewPilot AI should feel calm, credible, and encouraging: a professional workspace that turns an intimidating job search into clear next actions. The interface favors focused content, visible progress, plain language, and restrained motion. Visual decoration must never compete with a user’s resume, feedback, or decision.

## Foundations

### Color palette

| Token | Value | Intended use |
| --- | --- | --- |
| `--color-brand-600` | `#4F46E5` | Primary actions, active states, links |
| `--color-brand-700` | `#4338CA` | Hover and pressed primary states |
| `--color-accent-500` | `#14B8A6` | Positive progress and supporting emphasis |
| `--color-success-600` | `#16A34A` | Confirmed success and positive status |
| `--color-warning-600` | `#D97706` | Caution and review-needed status |
| `--color-danger-600` | `#DC2626` | Destructive actions and errors |
| `--color-slate-950` | `#0F172A` | Primary text, dark surfaces |
| `--color-slate-700` | `#334155` | Secondary text |
| `--color-slate-500` | `#64748B` | Supporting text and icons |
| `--color-slate-200` | `#E2E8F0` | Borders and separators |
| `--color-slate-50` | `#F8FAFC` | App background |
| `--color-white` | `#FFFFFF` | Elevated surfaces |

Use semantic tokens (`surface`, `text`, `border`, `action`, `feedback`) in components rather than raw palette values. Minimum contrast is WCAG AA: 4.5:1 for normal text and 3:1 for large text and UI boundaries.

### Typography

- **Primary typeface:** Inter, with `system-ui, sans-serif` fallback.
- **Display typeface:** Inter; avoid decorative fonts in product UI.
- **Base size:** 16px; body line height 1.5–1.625.
- **Scale:** 12, 14, 16, 18, 20, 24, 30, 36, 48px.
- **Weights:** 400 body, 500 controls, 600 headings, 700 only for high-emphasis metrics.
- **Numerical metrics:** use tabular figures when presenting scores, trends, or aligned data.

### Spacing

Use a 4px base unit. The standard scale is 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px. Use 8px minimum internal component spacing, 16–24px card padding, and 24–32px between major dashboard regions.

### Radius and shadows

- Radius: 6px for inputs and small controls, 10px for cards, 14px for modals and feature panels, full radius for pills.
- Borders are preferred for structural separation. Use shadows only to show elevation.
- Shadow scale: `sm` for hoverable cards, `md` for popovers, `lg` for dialogs. Shadows should be soft, low-opacity, and neutral.

### Motion

- Default interaction duration: 150–200ms; larger panels: 220–280ms.
- Use `ease-out` for entrances and `ease-in-out` for state changes.
- Motion communicates cause and hierarchy: feedback, progressive disclosure, and route transitions—not decoration.
- Respect `prefers-reduced-motion`; disable nonessential transforms and autoplay animation.

### Icons

Use one consistent, outline-first SVG icon library. Icons are 16px in compact controls, 20px by default, and 24px for primary navigation. Every icon-only control requires an accessible name; meaningful icons must not rely on color alone. Do not use emoji as operational UI icons.

## Component Styles

### Buttons

- **Primary:** brand fill, white label, used once per visual group for the main action.
- **Secondary:** white/neutral surface with border, for alternative actions.
- **Tertiary/ghost:** no container by default, for low-emphasis actions.
- **Destructive:** danger treatment, reserved for irreversible or consequential actions.
- All buttons provide hover, focus-visible, disabled, and loading states. Loading keeps the label context and prevents duplicate submission.

### Forms

- Labels are always visible; placeholders provide examples, not labels.
- Place help text beneath its field. Place error text adjacent to the field and describe recovery.
- Validate as early as useful without interrupting typing; validate again on submission.
- Inputs, selects, and text areas have a minimum 44×44px touch target where practical.

### Cards, tables, and feedback

- Cards group related information, use a clear heading, and avoid nesting cards unnecessarily.
- Tables support dense, scan-friendly data; preserve a responsive alternative on small screens.
- Alerts distinguish success, information, warning, and error with icon, text, and semantic color.
- Empty states explain what is absent, why it matters, and the next action.

### Data visualizations

Use charts only when a pattern is clearer than a table or sentence. Provide labels, non-color cues, accessible summaries, and exact values on focus/hover. A score must explain its inputs, uncertainty, and recommended next action.

## Dashboard Style

The dashboard is an action-oriented workspace, not a marketing page. Use a persistent navigation shell, a concise page title, and a single primary next step. Organize content as:

1. Current status and next action.
2. Key outcomes (such as ATS score or application readiness).
3. Actionable insight cards with clear priority and rationale.
4. Supporting history and detailed analysis.

Avoid oversized hero sections, excessive gradients, and dense walls of cards. Scores must pair with explanation, trend/context, and an accessible text equivalent.

## Mobile Responsiveness

- Design mobile-first. Support 320px viewport width without horizontal scrolling.
- Use breakpoints based on content pressure rather than device names; typical layout changes occur near 640px, 768px, and 1024px.
- On small screens, collapse navigation into an accessible menu, stack card grids, and make primary actions easy to reach.
- Preserve task completion: mobile users can upload, review results, edit profile information, and complete mock-interview flows.
- Tables become horizontally scrollable with clear affordance or transform into labelled stacked rows.
- Maintain 44×44px touch targets, visible focus states for keyboard users, and no hover-only interactions.

