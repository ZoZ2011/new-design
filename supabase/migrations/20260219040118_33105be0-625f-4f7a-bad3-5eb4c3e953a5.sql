
-- Create user_category_access table to control which categories each user can access
CREATE TABLE public.user_category_access (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  category_slug text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, category_slug)
);

-- Enable Row Level Security
ALTER TABLE public.user_category_access ENABLE ROW LEVEL SECURITY;

-- Allow public read (used in SignIn to check access)
CREATE POLICY "Allow public read access to user_category_access"
ON public.user_category_access
FOR SELECT
USING (true);

-- Allow admin insert
CREATE POLICY "Allow admin insert user_category_access"
ON public.user_category_access
FOR INSERT
WITH CHECK (true);

-- Allow admin delete
CREATE POLICY "Allow admin delete user_category_access"
ON public.user_category_access
FOR DELETE
USING (true);
