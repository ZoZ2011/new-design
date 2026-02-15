
-- Table for dynamic question categories
CREATE TABLE public.question_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_path TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.question_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to question_categories"
ON public.question_categories FOR SELECT USING (true);

CREATE POLICY "Allow admin insert question_categories"
ON public.question_categories FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin update question_categories"
ON public.question_categories FOR UPDATE USING (true);

CREATE POLICY "Allow admin delete question_categories"
ON public.question_categories FOR DELETE USING (true);

-- Table for dynamic questions
CREATE TABLE public.dynamic_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_slug TEXT NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_answer INTEGER NOT NULL DEFAULT 0,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.dynamic_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to dynamic_questions"
ON public.dynamic_questions FOR SELECT USING (true);

CREATE POLICY "Allow admin insert dynamic_questions"
ON public.dynamic_questions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin update dynamic_questions"
ON public.dynamic_questions FOR UPDATE USING (true);

CREATE POLICY "Allow admin delete dynamic_questions"
ON public.dynamic_questions FOR DELETE USING (true);

-- Index for fast category lookups
CREATE INDEX idx_dynamic_questions_category ON public.dynamic_questions(category_slug);

-- Triggers for updated_at
CREATE TRIGGER update_question_categories_updated_at
BEFORE UPDATE ON public.question_categories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dynamic_questions_updated_at
BEFORE UPDATE ON public.dynamic_questions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
