create table if not exists public.profiles (id uuid primary key references auth.users(id) on delete cascade, display_name text, created_at timestamptz not null default timezone('utc', now()), updated_at timestamptz not null default timezone('utc', now()), constraint profiles_display_name_length check (char_length(display_name) <= 120));
alter table public.profiles enable row level security;
create policy "Users can read their own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "Users can update their own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "Users can insert their own profile" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$ begin insert into public.profiles (id, display_name) values (new.id, nullif(new.raw_user_meta_data ->> 'full_name', '')); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
