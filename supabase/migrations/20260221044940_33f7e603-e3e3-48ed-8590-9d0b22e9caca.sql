
-- Add image_url column to dynamic_questions
ALTER TABLE public.dynamic_questions ADD COLUMN image_url text;

-- Create storage bucket for question images
INSERT INTO storage.buckets (id, name, public) VALUES ('question-images', 'question-images', true);

-- Allow public read access to question images
CREATE POLICY "Public read access to question images"
ON storage.objects FOR SELECT
USING (bucket_id = 'question-images');

-- Allow anyone to upload question images (admin-only in practice)
CREATE POLICY "Allow upload question images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'question-images');

-- Allow anyone to update question images
CREATE POLICY "Allow update question images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'question-images');

-- Allow anyone to delete question images
CREATE POLICY "Allow delete question images"
ON storage.objects FOR DELETE
USING (bucket_id = 'question-images');
