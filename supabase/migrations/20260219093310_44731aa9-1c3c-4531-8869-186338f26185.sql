
-- Add access_restricted column to valid_users to track if access control has been configured
ALTER TABLE public.valid_users ADD COLUMN IF NOT EXISTS access_restricted boolean NOT NULL DEFAULT false;
