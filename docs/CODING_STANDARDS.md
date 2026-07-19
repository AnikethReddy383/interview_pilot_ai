# InterviewPilot AI — Coding Standards

**Status:** Active  
**Owner:** Engineering Leadership  
**Last reviewed:** 2026-07-19

## Standard of Care

Code should be clear to a teammate encountering it for the first time, safe with real user data, and easy to change without surprising unrelated behavior. Prefer readable, explicit solutions over compressed cleverness. Automate formatting and static analysis; use review time for product, security, and design judgment.

## React Conventions

- Build small, composable function components with one clear responsibility.
- Keep rendering declarative. Derive display values during render instead of storing redundant state.
- Use controlled form behavior where validation, persistence, or user feedback requires it.
- Use effects only for synchronization with an external system. Avoid effects for values that can be derived from props/state.
- Make loading, empty, error, unauthorized, and success states first-class UI states.
- Keep data fetching and side effects in feature hooks/services, not generic presentational components.
- Use semantic HTML before adding ARIA. Every interactive element must be reachable and operable by keyboard.
- Avoid premature memoization. Add `memo`, `useMemo`, or `useCallback` only when profiling or a known render boundary justifies it.

## TypeScript Conventions

- Enable strict TypeScript settings and resolve type errors; do not use `any` as an escape hatch.
- Prefer `unknown` for untrusted values and narrow with runtime validation.
- Model domain states precisely with unions and discriminated unions, especially for async operations and API results.
- Use interfaces for stable object contracts and type aliases for unions, utilities, and composition; consistency within a module matters more than dogma.
- Keep types close to their domain. Do not create global types for one-off component props.
- Never assert (`as`) a value merely to silence an error; validate, transform, or improve the source type instead.
- Export only public module contracts. Keep internal helpers private by default.

## Folder Conventions

- Structure product code by feature: each feature owns its components, hooks, services, schemas, types, and tests.
- Shared UI contains reusable, domain-neutral primitives only. Shared utilities must be genuinely cross-cutting.
- Place server-only code behind an explicit server boundary. Browser code must not import secrets, privileged clients, or server modules.
- Keep generated files, build output, local environment files, and coverage output out of source control.
- Keep documentation in `docs/`, visual assets in `assets/`, and versioned AI prompt assets in `prompts/`.

## Accessibility

- Meet WCAG 2.2 AA for all released user-facing experiences.
- Use semantic landmarks, headings in logical order, labelled form fields, and descriptive button/link text.
- Provide a visible keyboard focus indicator and logical focus management for dialogs, route transitions, and dynamic updates.
- Ensure color is never the only way to convey status. Maintain text and component contrast requirements.
- Provide meaningful alternative text for informative images; mark decorative images as decorative.
- Test critical flows with keyboard-only navigation and a screen reader before release.
- Honor reduced-motion settings and support zoom/reflow without loss of functionality.

## Performance

- Establish and enforce performance budgets for landing-page load, core dashboard interactions, and AI job feedback.
- Avoid shipping unused JavaScript, oversized client dependencies, raw documents, or unoptimized images.
- Code-split by route and defer noncritical modules. Lazy-load heavy analysis, editor, and visualization dependencies.
- Optimize images to their rendered dimensions and use modern formats where appropriate.
- Paginate data collections and avoid N+1 request patterns. Cache only with defined invalidation behavior.
- Measure user-centric performance in representative environments; do not optimize solely against local development hardware.

## State Management

- Keep state local by default. Lift state only to the nearest common owner that needs it.
- Treat server data as distinct from UI state; use a dedicated query/cache layer when server-state complexity requires it.
- Prefer URL state for shareable or navigable view configuration such as filters, selected record, and pagination.
- Use context for stable, low-frequency cross-tree concerns such as theme, authenticated session metadata, or feature flags—not as a general state store.
- State transitions with multiple steps or invariants should use a reducer or explicit state machine.
- Never duplicate server data in multiple client stores without a documented synchronization strategy.

## Code Quality

- Format code automatically and enforce linting, type checking, and tests in continuous integration.
- Keep functions focused; extract a domain helper when branching or repeated rules obscure intent.
- Avoid hidden side effects and mutable shared state. Make dependencies explicit through parameters or well-scoped modules.
- Use comments to explain non-obvious rationale, constraints, or trade-offs—not to narrate code.
- Keep public interfaces stable and document behavioral changes. Remove dead code and expired feature flags promptly.
- Treat dependencies as code: minimize additions, pin/lock versions, review maintenance/security posture, and remove unused packages.

## Testing Philosophy

Test behavior at the boundary where a regression would matter to a user or operator. The test suite should provide fast feedback while preserving a small number of high-value end-to-end journeys.

- **Unit tests:** domain rules, parsers, score calculations, formatters, and complex state transitions.
- **Component tests:** user interactions, validation, accessible names/roles, and visual state changes.
- **Integration tests:** API contracts, authorization, Supabase/RLS behavior, storage flows, and provider adapters.
- **End-to-end tests:** sign-in, resume upload, analysis visibility, and other critical happy and recovery paths.
- **AI evaluations:** versioned representative inputs that check schema validity, safety, consistency, and actionable quality; never rely solely on snapshotting free-form prose.

Tests must be deterministic, independent, and readable. Mock external boundaries—not the behavior under test. A bug fix should include a regression test when practical. Manual QA remains necessary for visual polish, accessibility, and exploratory failure modes.

