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
-- משתמשים מחוברים (ההורים) רשאים לראות ולעדכן את הנרשמים.
drop policy if exists "staff can read registrations" on public.registrations;
create policy "staff can read registrations"
  on public.registrations for select
  to authenticated
  using (true);

drop policy if exists "staff can update registrations" on public.registrations;
create policy "staff can update registrations"
  on public.registrations for update
  to authenticated
  using (true) with check (true);

drop policy if exists "staff can delete registrations" on public.registrations;
create policy "staff can delete registrations"
  on public.registrations for delete
  to authenticated
  using (true);
