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
          const qType = q.question_type || "mcq_single";
          let correctAnswers: number[] | undefined;
          if (qType === "mcq_multiple" && q.answer_text) {
            try {
              correctAnswers = JSON.parse(q.answer_text);
            } catch {}
          }
          let killSheetAnswers: string[] | undefined;
          if (qType === "kill_sheet" && q.answer_text) {
            try {
              killSheetAnswers = JSON.parse(q.answer_text);
            } catch {}
          }
          return {
            id: idx + 1,
            question: q.question_text,
            options: Array.isArray(q.options) ? (q.options as string[]) : [],
            correctAnswer: q.correct_answer,
            correctAnswers,
            image: q.image_url || undefined,
            questionType: qType === "kill_sheet" ? "kill_sheet" : qType === "combination" ? "combination" : qType === "mcq_multiple" ? "mcq_multiple" : "mcq_single",
            answerText: qType === "mcq_multiple" ? null : (qType === "kill_sheet" ? null : q.answer_text || null),
            killSheetAnswers,
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
