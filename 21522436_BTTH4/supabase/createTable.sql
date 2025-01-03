CREATE TABLE IF NOT EXISTS public.cart (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON public.cart (user_id);
CREATE INDEX IF NOT EXISTS idx_cart_product_id ON public.cart (product_id);


create table public.profiles (
id uuid primary key default uuid_generate_v4(),
user_id uuid UNIQUE REFERENCES auth.users ON DELETE CASCADE,
created_at timestamp with time zone default timezone('utc'::text, now()) not null,
updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

-- Basic Information
first_name text,
last_name text,
username text,
email text,
phone text,

-- Profile Details
age integer check (age >= 0 and age <= 100),

-- Location Information
house_number text,
street text,
city text

);

-- Add indexes for better query performance
create index profiles_user_id_idx on public.profiles(user_id);
create index profiles_username_idx on public.profiles(username);
create index profiles_age_idx on public.profiles(age);
create index profiles_city_idx on public.profiles(city);