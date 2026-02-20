
-- Allow updating valid_users (for access_restricted flag)
CREATE POLICY "Allow admin update valid_users"
ON public.valid_users
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow updating user_category_access
CREATE POLICY "Allow admin update user_category_access"
ON public.user_category_access
FOR UPDATE
USING (true)
WITH CHECK (true);
