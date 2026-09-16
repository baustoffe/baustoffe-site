-- Database Schema for Baustoffe (Best Baustoffe SRL)
-- Supabase / Postgres
-- Run via: supabase db push OR psql

-- Site settings (single row)
create table site_settings (
  id int primary key default 1,
  company_name text,
  cui text,
  reg_com text,
  address text,
  contact_name text,
  contact_phone text,
  pickup_address text,
  delivery_fee_ron numeric default 150,
  contact_email text,
  orders_email text,
  offers_email text,
  gtm_container_id text,
  check (id = 1)
);

-- Categories
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  sort_order int,
  name_ro text,
  name_en text,
  name_de text
);

-- Products (consolidated master record)
create table products (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,           -- BB-EXT-001 etc.
  category_id uuid references categories(id),
  base_name_ro text not null,
  slug text unique not null,
  material text,
  glass_type text,
  is_double boolean default false,
  description_ro text,
  description_en text,
  description_de text,
  base_price_ron numeric not null,
  source_url text,                     -- internal only
  seo_title_ro text,
  seo_title_en text,
  seo_title_de text,
  seo_description_ro text,
  seo_description_en text,
  seo_description_de text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Color variants per product
create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  code text unique not null,
  color_name_ro text,
  color_name_en text,
  color_name_de text,
  color_hex text,
  price_override_ron numeric,
  primary_image_url text,
  gallery_image_urls text[],
  is_default boolean default false,
  sort_order int
);

-- Fixed sizes per product
create table product_sizes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  width_cm int not null,
  height_cm int not null,
  is_default boolean default false
);

-- Orders
create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_type text not null,
  full_name text not null,
  phone text not null,
  email text,
  delivery_method text not null,
  address_street text, address_city text, address_county text, address_postal text,
  billing_different boolean default false,
  billing_name text, billing_cui text, billing_reg_com text,
  billing_address_street text, billing_address_city text, billing_address_county text, billing_address_postal text,
  notes text,
  delivery_fee_ron numeric,
  total_ron numeric,
  status text default 'new',
  gdpr_consent boolean not null,
  gdpr_consent_at timestamptz,
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  size_label text,
  quantity int not null default 1,
  unit_price_ron numeric not null,
  line_total_ron numeric not null
);

-- Quote requests
create table quote_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  product_id uuid references products(id),
  custom_width_cm int,
  custom_height_cm int,
  color_preference text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

-- Contact messages
create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  subject text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

-- Editable content blocks per locale
create table content_blocks (
  id uuid primary key default gen_random_uuid(),
  block_key text not null,
  locale text not null,
  value text,
  unique (block_key, locale)
);

-- Row Level Security
alter table site_settings enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table product_sizes enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table quote_requests enable row level security;
alter table contact_messages enable row level security;
alter table content_blocks enable row level security;

-- Policies: public (anon) read-only on display data
create policy "anon read products" on products for anon using (status = 'active');
create policy "anon read variants" on product_variants for anon using (true);
create policy "anon read sizes" on product_sizes for anon using (true);
create policy "anon read categories" on categories for anon using (true);
create policy "anon read content" on content_blocks for anon using (true);
create policy "anon read settings" on site_settings for anon using (true);
create policy "anon insert orders" on orders for anon with check (true);
create policy "anon insert order_items" on order_items for anon with check (true);
create policy "anon insert quotes" on quote_requests for anon with check (true);
create policy "anon insert contact" on contact_messages for anon with check (true);

-- Note: admin role policies to be added once Supabase Auth is configured.
