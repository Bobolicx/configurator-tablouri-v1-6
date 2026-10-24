-- Profiles
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

-- Panels
create table public.panels (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  name text not null,
  manufacturer text not null,
  mounting text not null check (mounting in ('incasabil','aplicat')),
  rows int not null,
  modules_per_row int not null,
  price numeric(10,2),
  stock_available int not null default 0,
  stock_reserved int not null default 0,
  stock_min_alert int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Devices
create table public.devices (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  name text not null,
  manufacturer text not null,
  category text not null check (category in ('general','mcb','rcd','rcbo','spd')),
  poles int not null,
  rated_current_a numeric,
  sensitivity_ma int,
  modules int not null default 1,
  price numeric(10,2),
  stock_available int not null default 0,
  stock_reserved int not null default 0,
  stock_min_alert int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  name text not null,
  phase_type text not null check (phase_type in ('monofazic','trifazic')),
  installed_power_kw numeric(10,2),
  panel_id uuid references public.panels,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Project devices
create table public.project_devices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects on delete cascade,
  device_id uuid not null references public.devices,
  row_index int not null,
  position int not null,
  modules int not null,
  circuit_name text,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_devices enable row level security;

create policy "Users can view own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id);

create policy "Users can view own projects"
on public.projects for select
using (auth.uid() = user_id);

create policy "Users can insert own projects"
on public.projects for insert
with check (auth.uid() = user_id);

create policy "Users can update own projects"
on public.projects for update
using (auth.uid() = user_id);

create policy "Users can delete own projects"
on public.projects for delete
using (auth.uid() = user_id);

create policy "Users can view own project devices"
on public.project_devices for select
using (
  exists (
    select 1 from public.projects p
    where p.id = project_id and p.user_id = auth.uid()
  )
);

create policy "Users can insert own project devices"
on public.project_devices for insert
with check (
  exists (
    select 1 from public.projects p
    where p.id = project_id and p.user_id = auth.uid()
  )
);

create policy "Users can delete own project devices"
on public.project_devices for delete
using (
  exists (
    select 1 from public.projects p
    where p.id = project_id and p.user_id = auth.uid()
  )
);
