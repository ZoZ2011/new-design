-- Create a table for valid user IDs
CREATE TABLE public.valid_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.valid_users ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (needed for sign-in validation)
CREATE POLICY "Allow public read access to valid_users" 
ON public.valid_users 
FOR SELECT 
USING (true);

-- Create policy for admin insert (using the admin ID)
CREATE POLICY "Allow admin to insert valid_users" 
ON public.valid_users 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin delete
CREATE POLICY "Allow admin to delete valid_users" 
ON public.valid_users 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_valid_users_updated_at
BEFORE UPDATE ON public.valid_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the initial valid user ID
INSERT INTO public.valid_users (user_id, name) VALUES ('400315', 'Admin User');