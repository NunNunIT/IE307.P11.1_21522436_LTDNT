CREATE TABLE IF NOT EXISTS public.location (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  img TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.video (
  id SERIAL PRIMARY KEY,
  video_url text,
  created_at TIMESTAMP DEFAULT NOW()
);