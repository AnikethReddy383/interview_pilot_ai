# InterviewPilot

InterviewPilot is a privacy-conscious preparation workspace for job seekers. The repository currently implements **Milestone M1 — Foundation** only: a React application shell, Supabase authentication integration, reusable accessible UI components, protected workspace routes, and a secure profile database foundation.

No resume analysis, ATS scoring, AI, mock interview, code review, job matching, analytics, or production deployment capability is included.

## Stack

- React 19, TypeScript, Vite, and Tailwind CSS
- React Router for public and protected client routes
- Supabase Auth and Postgres with Row Level Security
- shadcn/ui-compatible UI conventions, Lucide icons, React Hook Form, and Zod

## Start locally

```powershell
cd frontend
Copy-Item .env.example .env.local
npm.cmd install
npm.cmd run dev
```

Set the values in `frontend/.env.local` before attempting sign-in. Open the local Vite URL after starting the server.

## Required environment variables

| Name | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Browser-safe Supabase anonymous/publishable key |

Never put a Supabase service-role key in the frontend or commit environment files.

## Supabase setup

1. Create a Supabase project.
2. Enable Email authentication and configure the Google provider in **Authentication → Providers**.
3. Add `http://localhost:5173/login` and `http://localhost:5173/dashboard` to your redirect URL allow list, along with deployed equivalents.
4. Apply `backend/supabase/migrations/202607190001_foundation_profiles.sql` through the Supabase CLI or SQL editor.
5. Populate `frontend/.env.local` from `.env.example`.

The migration creates `public.profiles`, enables RLS, grants authenticated users access only to their own profile, and creates a profile after sign-up.

## Checks

```powershell
cd frontend
npm.cmd run lint
npm.cmd run test
npm.cmd run build
```

## Project layout

```text
frontend/                  React application
  src/app/                 Route composition
  src/components/          Shared shadcn-compatible UI and feedback components
  src/lib/                 Supabase client and shared utilities
  src/styles/              Tailwind and design token foundations
backend/supabase/          Reviewed, immutable Supabase migrations
docs/                      Source-of-truth engineering and product policies
```

## Scope boundary

The dashboard’s resume upload control is disabled UI only. It does not choose, transmit, store, or process a file. Secure upload functionality belongs to Milestone M5.
