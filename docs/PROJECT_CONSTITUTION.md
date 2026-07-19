# InterviewPilot AI — Project Constitution

**Status:** Active  
**Owner:** Engineering Leadership  
**Last reviewed:** 2026-07-19

## Purpose

This constitution is the operating agreement for InterviewPilot AI. It establishes the product and engineering decisions that protect user trust, keep delivery predictable, and let a small team move quickly without accumulating avoidable risk.

When a delivery shortcut conflicts with this document, the team should choose the option that is safer for users, easier to operate, and reversible. Exceptions require an explicit, time-bound decision recorded in the pull request or architecture decision record (ADR).

## Project Goals

InterviewPilot AI helps job seekers prepare stronger, more relevant applications and interviews. The product will:

- Turn a user’s resume and target job information into clear, actionable guidance.
- Provide transparent AI-assisted insights rather than presenting inference as fact.
- Protect personal and career data as sensitive data.
- Deliver a fast, accessible experience on desktop and mobile.
- Be observable, maintainable, and affordable to operate as usage grows.

We will not optimize for engagement at the expense of usefulness, use applicant data to train models without explicit consent, or make employment decisions on a user’s behalf.

## Engineering Principles

1. **Earn user trust.** Accuracy, privacy, transparency, and reliable recovery matter more than cleverness.
2. **Ship vertical slices.** Deliver a thin, usable path with validation and observability before expanding scope.
3. **Keep boundaries explicit.** UI, domain logic, persistence, and third-party integrations must have clear contracts.
4. **Prefer simple, typed systems.** Use the smallest abstraction that makes the next change safer.
5. **Design for failure.** Every network, AI, and file-processing path needs a useful failure mode and retry strategy.
6. **Measure outcomes.** Instrument meaningful product and operational events; do not collect data merely because it is available.
7. **Leave the codebase better.** A feature is not complete until its docs, tests, accessibility, and operational concerns are addressed.

## Folder Ownership

| Area | Primary owner | Responsibility |
| --- | --- | --- |
| `frontend/` | Product Engineering | User experience, client state, accessibility, UI tests |
| `backend/` | Platform Engineering | APIs, domain services, integrations, security controls |
| `docs/` | Engineering Leadership | Product, design, architecture, and delivery standards |
| `prompts/` | AI Platform | Versioned prompts, evaluation fixtures, safety guidance |
| `assets/` | Product Design | Approved visual assets and brand resources |
| `screenshots/` | QA / Product Engineering | Approved visual baselines and release evidence |
| Database migrations and Supabase configuration | Platform Engineering | Schema evolution, RLS, retention, recovery |

Ownership means accountable review, not exclusive edit rights. Changes that cross an ownership boundary require review from the owning discipline.

## AI Usage Policy

- AI outputs are assistive recommendations, never guarantees, professional advice, or hiring decisions.
- User content sent to an AI provider must follow the approved data-processing path and use the minimum content necessary.
- Do not send secrets, credentials, payment data, or internal security details to AI systems.
- Prompts, model identifiers, structured output schemas, evaluation cases, and fallback behavior are version-controlled.
- AI-generated content must be validated against a schema before it is displayed or persisted.
- Product copy must disclose when an insight or draft is AI-generated and give users an appropriate way to edit, retry, or report it.
- Engineers may use coding assistants, but remain accountable for reviewing, testing, licensing, security, and correctness of every change.

## Security Principles

- Treat resumes, job history, contact details, uploaded files, and interview recordings as sensitive personal data.
- Apply least privilege everywhere: Supabase Row Level Security (RLS), scoped service credentials, short-lived tokens, and role-specific access.
- Never commit secrets. Store configuration in approved secret management and expose only explicitly public client variables.
- Validate all untrusted input at boundaries; authorize every resource access on the server/database layer.
- Encrypt data in transit and use approved providers for encryption at rest.
- Log operational events without logging raw resumes, authentication tokens, file contents, or unnecessary PII.
- Establish retention and deletion behavior for every user-data class before collecting it.
- Security issues are handled privately, prioritized by impact, and remediated with a documented root-cause review when material.

## Git Workflow

- `main` is always releasable and protected from direct pushes.
- Work is performed on short-lived branches named `<type>/<ticket-or-scope>`; e.g., `feat/resume-upload` or `fix/auth-redirect`.
- Every change enters `main` through a pull request with a focused description, test evidence, and linked requirement.
- Required checks must pass before merge. Changes to authentication, data access, payments, or AI data handling require an additional qualified reviewer.
- Prefer small, independently reviewable commits using Conventional Commit-style prefixes: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.
- Do not mix unrelated refactors with feature work. Document intentional breaking changes and migration paths.

## Release Strategy

- Release from `main` through a staged pipeline: local verification → preview environment → production.
- Use feature flags for incomplete, high-risk, or behavior-changing functionality. Flags need an owner and removal date.
- Production releases have a release note, monitoring window, and rollback plan proportionate to risk.
- Database changes follow expand/migrate/contract: introduce compatible schema, migrate data, switch reads/writes, then remove old paths later.
- Urgent fixes may use a `hotfix/` branch, but must be merged back to `main` immediately after release.
- A release is complete only after health checks, key funnel metrics, and error monitoring remain within expected thresholds.

## Decision Rights

The product owner decides user value and scope; design decides interaction and visual direction; engineering decides implementation and operational safety. Material trade-offs are recorded in an ADR under `docs/adr/` once that directory is introduced.

