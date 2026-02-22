
-- Add question_type column to dynamic_questions
-- Values: 'mcq_single', 'mcq_multiple', 'combination'
ALTER TABLE public.dynamic_questions 
ADD COLUMN question_type text NOT NULL DEFAULT 'mcq_single';

-- Add answer_text column for structured/combination questions
ALTER TABLE public.dynamic_questions 
ADD COLUMN answer_text text DEFAULT NULL;
