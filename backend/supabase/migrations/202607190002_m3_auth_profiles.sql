-- M3 Authentication: Expand profiles for onboarding and AI readiness
-- This migration extends the M1 foundation profiles table.
-- Do NOT edit the M1 migration (202607190001_foundation_profiles.sql).

-- Add new columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS target_role text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS experience_level text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_completed boolean NOT NULL DEFAULT false;

-- Constraints
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_full_name_length CHECK (char_length(full_name) <= 120);

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_target_role_length CHECK (char_length(target_role) <= 120);

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_experience_level_check
    CHECK (experience_level IS NULL OR experience_level IN (
      'student', 'fresher', '1-3', '3-5', '5-10', '10+'
    ));

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);

-- Replace the signup trigger to populate full_name and email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, display_name)
  VALUES (
    new.id,
    NULLIF(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    NULLIF(new.raw_user_meta_data ->> 'full_name', '')
  );
  RETURN new;
END;
$$;
