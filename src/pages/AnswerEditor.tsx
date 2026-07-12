import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Save, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { adminOp } from "@/lib/backendApi";
import { getQuestionsByCategory, Question } from "@/data/questions";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface EditableQuestion {
  key: string; // unique row key
  category: string;
  displayOrder: number;
  questionText: string;
  options: string[];
  correctAnswer: number;
  source: "db" | "static";
  dbId?: string;
  questionType: string;
  answerText?: string | null;
  image?: string | null;
}

const STATIC_CATEGORIES = [
  "workover",
  "coiled-tubing",
  "wireline",
  "snubbing",
  "iadc-ogor-mock-test-1",
  "iadc-ogor-mock-test-2",
  "iadc-ogor-mock-test-3",
];

const humanize = (slug: string) =>
  slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

const ALL_OPTION = "__all__";

const AnswerEditor = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_OPTION);
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState<EditableQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  // Load category list (union of DB + static)
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("dynamic_questions")
        .select("category_slug");
      const dbCats = new Set<string>(
        (data || []).map((r: any) => r.category_slug).filter(Boolean)
      );
      STATIC_CATEGORIES.forEach((c) => dbCats.add(c));
      setCategories(Array.from(dbCats).sort());
    })();
  }, []);

  // Load questions for selected category, or all (lazy: only when user searches with ALL)
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (selectedCategory === ALL_OPTION) {
          // Load everything - DB first, then static for categories not in DB
          const { data: dbRows } = await supabase
            .from("dynamic_questions")
            .select("*")
            .order("category_slug")
            .order("display_order");
          const dbBySlug = new Set<string>(
            (dbRows || []).map((r: any) => r.category_slug)
          );
          const fromDb: EditableQuestion[] = (dbRows || []).map((r: any) => ({
            key: `db:${r.id}`,
            category: r.category_slug,
            displayOrder: r.display_order,
            questionText: r.question_text,
            options: Array.isArray(r.options) ? r.options : [],
            correctAnswer: r.correct_answer,
            source: "db",
            dbId: r.id,
            questionType: r.question_type || "mcq_single",
            answerText: r.answer_text,
            image: r.image_url,
          }));
          const fromStatic: EditableQuestion[] = [];
          STATIC_CATEGORIES.forEach((cat) => {
            if (dbBySlug.has(cat)) return;
            const list = getQuestionsByCategory(cat);
            list.forEach((q, idx) => {
              fromStatic.push({
                key: `static:${cat}:${idx}`,
                category: cat,
                displayOrder: idx + 1,
                questionText: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
                source: "static",
                questionType: q.questionType || "mcq_single",
                answerText: q.answerText ?? null,
                image: q.image ?? null,
              });
            });
          });
          setQuestions([...fromDb, ...fromStatic]);
        } else {
          const { data: dbRows } = await supabase
            .from("dynamic_questions")
            .select("*")
            .eq("category_slug", selectedCategory)
            .order("display_order");
          if (dbRows && dbRows.length > 0) {
            setQuestions(
              dbRows.map((r: any) => ({
                key: `db:${r.id}`,
                category: r.category_slug,
                displayOrder: r.display_order,
                questionText: r.question_text,
                options: Array.isArray(r.options) ? r.options : [],
                correctAnswer: r.correct_answer,
                source: "db",
                dbId: r.id,
                questionType: r.question_type || "mcq_single",
                answerText: r.answer_text,
                image: r.image_url,
              }))
            );
          } else {
            const list = getQuestionsByCategory(selectedCategory);
            setQuestions(
              list.map((q, idx) => ({
                key: `static:${selectedCategory}:${idx}`,
                category: selectedCategory,
                displayOrder: idx + 1,
                questionText: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
                source: "static",
                questionType: q.questionType || "mcq_single",
                answerText: q.answerText ?? null,
                image: q.image ?? null,
              }))
            );
          }
        }
      } catch (e: any) {
        toast.error("Failed to load questions: " + (e.message || e));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedCategory]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return questions.slice(0, 200);
    return questions
      .filter(
        (q) =>
          q.questionText.toLowerCase().includes(s) ||
          q.category.toLowerCase().includes(s)
      )
      .slice(0, 200);
  }, [questions, search]);

  const updateAnswer = async (q: EditableQuestion, newAnswer: number) => {
    setSavingKey(q.key);
    try {
      if (q.source === "db" && q.dbId) {
        await adminOp("update_question_answer", { id: q.dbId, correct_answer: newAnswer });
        setQuestions((prev) =>
          prev.map((x) =>
            x.key === q.key ? { ...x, correctAnswer: newAnswer } : x
          )
        );
        toast.success("Answer updated");
      } else {
        // Migrate the whole static category into DB so future edits persist
        const list = getQuestionsByCategory(q.category);
        const rows = list.map((sq, idx) => ({
          category_slug: q.category,
          display_order: idx + 1,
          question_text: sq.question,
          options: sq.options,
          correct_answer:
            idx + 1 === q.displayOrder ? newAnswer : sq.correctAnswer,
          question_type: sq.questionType || "mcq_single",
          answer_text: sq.answerText ?? null,
          image_url: sq.image ?? null,
        }));
        await adminOp("replace_category_questions", { category_slug: q.category, rows });
        toast.success("Answer updated");
        // Reload from DB
        const { data: dbRows } = await supabase
          .from("dynamic_questions")
          .select("*")
          .eq("category_slug", q.category)
          .order("display_order");
        setQuestions((prev) => {
          const others = prev.filter((x) => x.category !== q.category);
          const fresh: EditableQuestion[] = (dbRows || []).map((r: any) => ({
            key: `db:${r.id}`,
            category: r.category_slug,
            displayOrder: r.display_order,
            questionText: r.question_text,
            options: Array.isArray(r.options) ? r.options : [],
            correctAnswer: r.correct_answer,
            source: "db",
            dbId: r.id,
            questionType: r.question_type || "mcq_single",
            answerText: r.answer_text,
            image: r.image_url,
          }));
          return [...others, ...fresh];
        });
      }
    } catch (e: any) {
      toast.error("Save failed: " + (e.message || e));
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="min-h-screen bg-background font-jakarta">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/control-center")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground">
            Edit Answers
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Edit Question Answers
          </h1>
          <p className="text-sm text-muted-foreground">
            Pick a category or search across all questions to change the
            correct answer.
          </p>
        </div>

        <div className="grid sm:grid-cols-[260px_1fr] gap-3">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              <SelectItem value={ALL_OPTION}>All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {humanize(c)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions by text or category..."
              className="pl-9"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading questions...
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length} of {questions.length} questions
              {filtered.length === 200 && " (refine search to see more)"}
            </p>
            {filtered.map((q) => (
              <div
                key={q.key}
                className="bg-card border border-border rounded-xl p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {humanize(q.category)} · Q{q.displayOrder}
                      {q.source === "static" && (
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-muted text-foreground/70">
                          static
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-foreground whitespace-pre-wrap">
                      {q.questionText}
                    </p>
                  </div>
                  {savingKey === q.key && (
                    <Loader2 className="w-4 h-4 animate-spin text-primary mt-1" />
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {q.options.map((opt, idx) => {
                    const isCorrect = idx === q.correctAnswer;
                    return (
                      <button
                        key={idx}
                        disabled={savingKey === q.key || isCorrect}
                        onClick={() => updateAnswer(q, idx)}
                        className={`text-left text-sm rounded-lg border px-3 py-2 transition-all flex items-start gap-2 ${
                          isCorrect
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <span className="font-bold text-xs mt-0.5">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        ) : (
                          <Save className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {q.questionType !== "mcq_single" && (
                  <p className="text-xs text-muted-foreground italic">
                    Note: This is a {q.questionType} question. Only the
                    primary correct answer index is editable here.
                  </p>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-12">
                No questions match your search.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerEditor;
