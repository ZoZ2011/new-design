import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getQuestionsByCategory, Question } from "@/data/questions";

export function useDynamicQuestions(category: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);

      // First check if there are dynamic questions in the DB
      const { data, error } = await supabase
        .from("dynamic_questions")
        .select("*")
        .eq("category_slug", category)
        .order("display_order");

      if (!error && data && data.length > 0) {
        const mapped: Question[] = data.map((q, idx) => {
          let correctAnswers: number[] | undefined;
          if ((q as any).question_type === "mcq_multiple" && q.answer_text) {
            try {
              correctAnswers = JSON.parse(q.answer_text);
            } catch {}
          }
          return {
            id: idx + 1,
            question: q.question_text,
            options: Array.isArray(q.options) ? (q.options as string[]) : [],
            correctAnswer: q.correct_answer,
            correctAnswers,
            image: (q as any).image_url || undefined,
            questionType: (q as any).question_type || "mcq_single",
            answerText: (q as any).question_type === "mcq_multiple" ? null : q.answer_text || null,
          };
        });
        setQuestions(mapped);
      } else {
        // Fall back to static questions
        const staticQuestions = getQuestionsByCategory(category);
        setQuestions(staticQuestions);
      }

      setLoading(false);
    };

    if (category) {
      fetchQuestions();
    }
  }, [category]);

  return { questions, loading };
}
