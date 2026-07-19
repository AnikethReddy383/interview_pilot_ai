# InterviewPilot AI — Product Roadmap

**Status:** Planning baseline  
**Owner:** Product & Engineering Leadership  
**Last reviewed:** 2026-07-19

## Roadmap Principles

Milestones are outcome gates, not date promises. A milestone may proceed when its success criteria are met and its security, accessibility, and operational obligations are satisfied. Later milestones may be prototyped early, but are not committed until their prerequisites are stable.

## M1 — Foundation

**Goal:** Establish a secure, reliable delivery foundation for product development.

**Deliverables:** Repository conventions; CI quality gates; environment configuration; Supabase project and migration workflow; error monitoring; analytics baseline; preview deployment path; engineering documentation.

**Success criteria:** A clean checkout can be built and verified consistently; secrets are not committed; protected environments are configured; a trivial vertical slice can be deployed and observed.

## M2 — Landing Page

**Goal:** Clearly communicate InterviewPilot AI’s value and convert qualified visitors into sign-up intent.

**Deliverables:** Responsive marketing page; value proposition; feature overview; trust/privacy messaging; accessible CTA flow; basic conversion analytics.

**Success criteria:** The page meets accessibility and responsive standards, loads within agreed performance budgets, and tracks CTA conversion without collecting unnecessary data.

## M3 — Authentication

**Goal:** Give users a secure, low-friction way to create and access their workspace.

**Deliverables:** Sign-up, sign-in, sign-out, session recovery, protected routes, profile bootstrap, and authentication error states.

**Success criteria:** Users can reliably access only their own workspace; session expiry is handled gracefully; RLS and server authorization protect user data; authentication flows are tested.

## M4 — Dashboard

**Goal:** Provide a focused home for a user’s current preparation status and next best action.

**Deliverables:** Application shell; navigation; empty and populated dashboard states; progress/status cards; recent activity; mobile layout.

**Success criteria:** A new or returning user understands what to do next within seconds; core flows are keyboard-accessible and mobile-complete; dashboard events are observable.

## M5 — Resume Upload

**Goal:** Let users securely upload and manage resumes.

**Deliverables:** File picker/drop zone; supported-file validation; private storage upload; upload progress; resume list; replacement and deletion controls; safe failure recovery.

**Success criteria:** Valid files upload reliably; unsupported or oversized files receive clear guidance; files remain private to their owner; users can recover from interrupted uploads.

## M6 — Resume Analysis

**Goal:** Transform uploaded resumes into understandable, useful improvement guidance.

**Deliverables:** Text extraction pipeline; asynchronous analysis job; AI prompt/version management; structured insight display; retry path; user feedback control.

**Success criteria:** Analyses are schema-valid, traceable to an input and prompt version, understandable without AI jargon, and resilient to provider failure or malformed output.

## M7 — ATS Score

**Goal:** Give users a transparent measure of resume readiness against a target role or job description.

**Deliverables:** Score methodology; job-description input; score breakdown; prioritized recommendations; explanation of limits and uncertainty.

**Success criteria:** Every score explains its factors and recommended actions; scoring is repeatable for identical inputs; no score is framed as a hiring prediction or guarantee.

## M8 — Job Matching

**Goal:** Help users assess fit between their resume and target job opportunities.

**Deliverables:** Job input/import path; match analysis; skills and experience gap view; recommended resume tailoring actions; saved job records.

**Success criteria:** Match rationale is specific and editable by the user; matching respects data ownership; results are actionable and clearly distinguished from factual job requirements.

## M9 — Mock Interview

**Goal:** Enable realistic, adaptive interview practice with constructive feedback.

**Deliverables:** Interview setup; role/job context; question flow; answer capture; feedback summary; session history; safety and privacy controls for recordings if enabled.

**Success criteria:** Users can finish a complete practice session on desktop and mobile; feedback cites observable answer qualities; interruptions preserve progress; no sensitive recording is exposed without authorization.

## M10 — AI Code Review

**Goal:** Offer developers clear, secure, educational feedback on code they choose to submit.

**Deliverables:** Code input; language/context selection; structured review findings; severity and rationale; remediation suggestions; safe content-handling policy.

**Success criteria:** Findings are actionable and never claim exhaustive security assurance; submitted code follows retention controls; responses are schema-validated and resilient to unsafe or malformed input.

## M11 — Analytics

**Goal:** Give users and the business trustworthy insight into progress and product outcomes.

**Deliverables:** User progress views; score/history trends; privacy-aware product event taxonomy; operational dashboards; data retention documentation.

**Success criteria:** Metrics reconcile to source events, have documented definitions, and distinguish user-visible progress from internal business analytics; users are not shown misleading precision.

## M12 — Deployment

**Goal:** Operate a production-ready service with controlled releases and clear recovery procedures.

**Deliverables:** Production environments; CI/CD; domain and security configuration; alerting; backups and restore validation; release runbook; incident process; launch checklist.

**Success criteria:** The team can deploy and roll back safely, detect key failures promptly, restore critical data within agreed objectives, and complete a production readiness review.

## Dependency Order

M1 enables all work. M2 and M3 can then progress independently. M4 depends on M3. M5 depends on M3 and M4; M6 depends on M5; M7 and M8 depend on M6; M9 depends on M3/M4 and benefits from M8; M10 depends on M1/M3; M11 is instrumented from M1 onward and becomes user-facing after core workflows; M12 formalizes production readiness across all released scope.

