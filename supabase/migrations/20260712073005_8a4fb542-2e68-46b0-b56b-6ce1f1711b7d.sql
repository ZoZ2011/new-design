
-- Lock down public writes on all sensitive tables and route through edge functions.
-- Reads on quiz content and category access remain public (needed by the app).
-- Reads/writes on user identity, user progress, and user settings become server-only.

-- valid_users: entirely server-only (no public read or write)
DROP POLICY IF EXISTS "Allow public read access to valid_users" ON public.valid_users;
DROP POLICY IF EXISTS "Allow admin to insert valid_users" ON public.valid_users;
DROP POLICY IF EXISTS "Allow admin update valid_users" ON public.valid_users;
DROP POLICY IF EXISTS "Allow admin to delete valid_users" ON public.valid_users;
REVOKE ALL ON public.valid_users FROM anon, authenticated;
GRANT ALL ON public.valid_users TO service_role;

-- dynamic_questions: public read stays, writes are server-only
DROP POLICY IF EXISTS "Allow admin insert dynamic_questions" ON public.dynamic_questions;
DROP POLICY IF EXISTS "Allow admin update dynamic_questions" ON public.dynamic_questions;
DROP POLICY IF EXISTS "Allow admin delete dynamic_questions" ON public.dynamic_questions;
REVOKE INSERT, UPDATE, DELETE ON public.dynamic_questions FROM anon, authenticated;
GRANT ALL ON public.dynamic_questions TO service_role;

-- question_categories: public read stays, writes are server-only
DROP POLICY IF EXISTS "Allow admin insert question_categories" ON public.question_categories;
DROP POLICY IF EXISTS "Allow admin update question_categories" ON public.question_categories;
DROP POLICY IF EXISTS "Allow admin delete question_categories" ON public.question_categories;
REVOKE INSERT, UPDATE, DELETE ON public.question_categories FROM anon, authenticated;
GRANT ALL ON public.question_categories TO service_role;

-- user_category_access: public read stays (needed at sign-in), writes are server-only
DROP POLICY IF EXISTS "Allow admin insert user_category_access" ON public.user_category_access;
DROP POLICY IF EXISTS "Allow admin update user_category_access" ON public.user_category_access;
DROP POLICY IF EXISTS "Allow admin delete user_category_access" ON public.user_category_access;
REVOKE INSERT, UPDATE, DELETE ON public.user_category_access FROM anon, authenticated;
GRANT ALL ON public.user_category_access TO service_role;

-- user_progress: fully server-only, accessed via edge function
DROP POLICY IF EXISTS "Allow all access to user_progress" ON public.user_progress;
REVOKE ALL ON public.user_progress FROM anon, authenticated;
GRANT ALL ON public.user_progress TO service_role;

-- user_settings: fully server-only, accessed via edge function
DROP POLICY IF EXISTS "Allow all access to user_settings" ON public.user_settings;
REVOKE ALL ON public.user_settings FROM anon, authenticated;
GRANT ALL ON public.user_settings TO service_role;

-- storage.objects for question-images bucket: remove permissive policies.
-- Bucket stays public so image URLs continue to render without signed URLs,
-- but no policy is required for public URL delivery of a public bucket.
-- All writes go through an edge function using the service role.
DROP POLICY IF EXISTS "Allow upload question images" ON storage.objects;
DROP POLICY IF EXISTS "Allow update question images" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete question images" ON storage.objects;
DROP POLICY IF EXISTS "Public read access to question images" ON storage.objects;
