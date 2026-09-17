-- הרצה: Supabase → SQL Editor → הדביקו והריצו
create table if not exists public.registrations (
  id          bigserial primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  email       text,
  people      text,
  notes       text,
  event       text default 'הבוקר הוולנסי',
  status      text default 'חדש'   -- חדש / אושר / שילם / ביטל
);

alter table public.registrations enable row level security;

-- הדף הציבורי רשאי רק להוסיף הרשמה. אין קריאה, עדכון או מחיקה מהדפדפן —
-- את הנרשמים רואים בלוח הבקרה של Supabase (Table editor).
drop policy if exists "public can insert registrations" on public.registrations;
create policy "public can insert registrations"
  on public.registrations for insert
  to anon
  with check (true);

create index if not exists registrations_created_at_idx
  on public.registrations (created_at desc);

-- ===== גישה לעמוד הניהול (admin.html) =====
-- רשימת המיילים שמורשים לראות את הנרשמים. הוסיפו כאן את המיילים של המנהלים.
create table if not exists public.staff (
  email text primary key
);
alter table public.staff enable row level security;   -- אף אחד לא קורא אותה מהדפדפן

insert into public.staff (email) values
  ('gmrozental@gmail.com'),
  ('hilirozental@gmail.com'),
  ('esterikatruck@gmail.com')
on conflict (email) do nothing;

-- רק מי שנכנס עם מייל שמופיע בטבלת staff יכול לראות ולעדכן נרשמים.
create or replace function public.is_staff() returns boolean
  language sql stable security definer set search_path = public as $$
    select exists (
      select 1 from public.staff
      where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    );
  $$;

drop policy if exists "staff can read registrations" on public.registrations;
create policy "staff can read registrations"
  on public.registrations for select
  to authenticated
  using (public.is_staff());

drop policy if exists "staff can update registrations" on public.registrations;
create policy "staff can update registrations"
  on public.registrations for update
  to authenticated
  using (public.is_staff()) with check (public.is_staff());

drop policy if exists "staff can delete registrations" on public.registrations;
create policy "staff can delete registrations"
  on public.registrations for delete
  to authenticated
  using (public.is_staff());
