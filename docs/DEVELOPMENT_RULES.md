# InterviewPilot — Development Rules

**Status:** Active  
**Owner:** Engineering Leadership  
**Last reviewed:** 2026-07-19

## Feature Delivery Lifecycle

Every feature is developed as a complete vertical slice:

1. Define the user problem, non-goals, acceptance criteria, and success metric.
2. Identify data classification, authorization needs, failure cases, and rollout risk.
3. Produce a small technical design for changes that cross boundaries or affect data.
4. Implement typed contracts and the smallest user-visible path.
5. Add automated tests at the appropriate boundary and test keyboard/mobile behavior.
6. Instrument meaningful events and errors without collecting unnecessary PII.
7. Request review with screenshots or a preview link, test evidence, and migration/rollout notes.
8. Release behind a feature flag when risk, reversibility, or product readiness warrants it.

No feature is “done” merely because its happy path works.

## File Organization

- Organize code by product feature first, then by technical role inside that feature.
- Keep reusable UI primitives in a shared component area; keep domain-specific components beside their feature.
- Separate presentation, domain logic, persistence, and integration adapters. Do not call external services directly from rendering components.
- Co-locate tests, types, fixtures, and feature-specific utilities with the code they exercise.
- Store database migrations in chronological, immutable files. Never edit a migration that has reached a shared environment.
- Keep prompts and evaluation fixtures versioned in `prompts/`; do not bury production prompts in UI components.

## Naming Conventions

- Files and folders: `kebab-case`; React components may use `PascalCase.tsx` where the framework convention requires it.
- Components, types, and classes: `PascalCase`.
- Functions, variables, and object properties: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` only for true cross-module constants; otherwise use `camelCase`.
- Boolean names start with `is`, `has`, `can`, `should`, or `did`.
- Event handlers start with `handle`; callbacks passed as props start with `on`.
- Database tables and columns use `snake_case`; API JSON uses `camelCase` unless an external contract requires otherwise.
- Name by intent, not implementation: `resumeAnalysisService`, not `openAiHelper`.

## Error Handling

- Validate input at every trust boundary and return actionable, non-sensitive error messages.
- Use typed/domain error categories for expected failures; reserve uncaught exceptions for genuine defects.
- APIs return a stable error shape with a machine-readable `code`, human-safe `message`, and correlation identifier when available.
- Never expose stack traces, provider payloads, secrets, or authorization details to clients.
- Log errors with contextual metadata, sanitized identifiers, severity, and correlation ID.
- Treat AI provider timeouts, malformed output, upload failures, and rate limits as expected conditions with a user recovery path.
- UI error states state what happened, what remains safe, and what users can do next. Do not silently fail.

## API Conventions

- Version public/server API contracts when a breaking change is possible.
- Use resource-oriented routes and standard HTTP semantics: `GET` reads, `POST` creates/actions, `PATCH` updates, `DELETE` removes.
- Authenticate before processing and authorize the specific resource on every request.
- Parse and validate request and response shapes with shared schemas where appropriate.
- Use pagination for collection endpoints; define stable sort and filter semantics.
- Make write operations idempotent where retries may occur, especially uploads, billing-adjacent work, and asynchronous AI jobs.
- Return ISO 8601 UTC timestamps and explicit nullable fields. Avoid ambiguous optionality.
- Document rate limits, quotas, and asynchronous job state transitions.

## Supabase Conventions

- Supabase Auth is the system of record for application identities. Application profile data belongs in an owned profile table keyed to the auth user ID.
- Enable RLS on every application table, view, storage bucket, and RPC exposed to clients. Policies are reviewed as production code.
- Client-side code uses the anonymous key only; the service-role key is server-only and never reaches browser bundles, logs, or tests.
- Policies must validate ownership or membership from authenticated context; do not trust client-supplied user IDs for authorization.
- Use private storage buckets for resumes and derived artifacts. Generate short-lived signed URLs only after authorization.
- Schema changes are migration-driven, reviewed, and tested against representative data. Include rollback/compatibility notes in the pull request.
- Store timestamps in UTC and use database constraints for invariants that must survive all callers.

## Authentication Rules

- Use the approved Supabase Auth flows and validate sessions on the server for protected operations.
- Public routes are explicitly allowlisted. All other routes default to authenticated access.
- Redirect unauthenticated users to sign-in and preserve a safe, validated return path.
- Never rely on client-only route guards for security; they are an experience enhancement, not authorization.
- Enforce ownership on resumes, analyses, interview sessions, and user settings in RLS and server-side checks.
- Re-authenticate or request a recent session for sensitive account actions where provider capabilities support it.
- Session expiry, revoked access, and failed token refresh must lead to a clear re-authentication experience.

## Documentation and Review

Update relevant product, API, data-model, and operational documentation in the same change. Reviewers should block changes that lack authorization analysis, validation, tests, or user-safe error handling when those apply.

