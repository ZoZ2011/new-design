import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, Plus, Trash2, FileText, Check, AlertCircle, FolderOpen, RefreshCw, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import mammoth from "mammoth";

interface ParsedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  correctAnswers: number[];
  imageFile?: File | null;
  imagePreview?: string | null;
  existingImageUrl?: string | null;
  answerText?: string | null;
  detectedType?: "mcq_single" | "mcq_multiple" | "combination";
}

interface CategoryInfo {
  name: string;
  slug: string;
  parentPath: string;
}

type QuestionType = "mcq_single" | "mcq_multiple" | "combination";

const EXISTING_CATEGORIES: CategoryInfo[] = [
  { name: "Coiled Tubing", slug: "coiled-tubing", parentPath: "/exercises/iacd/well-services" },
  { name: "Workover", slug: "workover", parentPath: "/exercises/iacd/well-services" },
  { name: "Snubbing", slug: "snubbing", parentPath: "/exercises/iacd/well-services" },
  { name: "Wireline", slug: "wireline", parentPath: "/exercises/iacd/well-services" },
  { name: "IADC OGOR Mock Test 1", slug: "iadc-ogor-mock-test-1", parentPath: "/exercises/iacd/well-services/mock-test" },
  { name: "IADC OGOR Mock Test 2", slug: "iadc-ogor-mock-test-2", parentPath: "/exercises/iacd/well-services/mock-test" },
  { name: "IADC OGOR Mock Test 3", slug: "iadc-ogor-mock-test-3", parentPath: "/exercises/iacd/well-services/mock-test" },
];

const QUESTION_TYPE_OPTIONS = [
  { value: "mcq_single" as QuestionType, label: "MCQ — Single Answer", description: "Each question has one correct answer" },
  { value: "mcq_multiple" as QuestionType, label: "MCQ — Multiple Answers", description: "Each question can have multiple correct answers" },
  { value: "combination" as QuestionType, label: "Mixed (All Types)", description: "Mix of MCQ single, MCQ multiple, and structured answers — auto-detected per question" },
];

const QuestionManager = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") as "update" | "add" | null;
  const [mode, setMode] = useState<"menu" | "update" | "add">(initialMode || "menu");
  const [questionType, setQuestionType] = useState<QuestionType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryParent, setNewCategoryParent] = useState("/exercises/iacd/well-services");
  const [parsedQuestions, setParsedQuestions] = useState<ParsedQuestion[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dynamicCategories, setDynamicCategories] = useState<CategoryInfo[]>([]);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    fetchDynamicCategories();
  }, []);

  const fetchDynamicCategories = async () => {
    const { data } = await supabase
      .from("question_categories")
      .select("*")
      .order("display_order");

    if (data) {
      setDynamicCategories(
        data.map((c) => ({
          name: c.name,
          slug: c.slug,
          parentPath: c.parent_path,
        }))
      );
    }
  };

  const allCategories = [...EXISTING_CATEGORIES, ...dynamicCategories];

  const parseWordFile = useCallback(async (file: File) => {
    setUploading(true);
    setFileName(file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      const questions = questionType === "combination"
        ? parseCombinationQuestionsFromText(text)
        : parseQuestionsFromText(text, questionType);

      if (questions.length === 0) {
        toast.error("No questions found in the file. Please check the format.");
        setUploading(false);
        return;
      }

      setParsedQuestions(questions);
      toast.success(`Parsed ${questions.length} questions from the file`);
    } catch (error) {
      console.error("Error parsing Word file:", error);
      toast.error("Failed to parse the Word file");
    }

    setUploading(false);
  }, [questionType]);

  // Pre-process text: split inline options after "(Select X Answer)" into labeled lines
  const preprocessInlineOptions = (text: string): string => {
    const lines = text.split("\n");
    const result: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      
      // Match: question text with (Select X Answer(s)) followed by inline options
      // The ? before (Select...) is optional — some questions end with period or no punctuation
      const selectMatch = trimmed.match(
        /^(.*?[?.:]?\s*)\(Select\s+(\d+)\s+Answers?\)\s*\.?\s*(.+)/i
      );

      if (selectMatch && selectMatch[3].trim().length > 10) {
        const qPart = selectMatch[1].trim();
        const selectCount = parseInt(selectMatch[2], 10);
        const selectLabel = selectCount > 1 
          ? `(Select ${selectCount} Answers)` 
          : "(Select 1 Answer)";
        result.push(qPart + " " + selectLabel);

        const optionsRaw = selectMatch[3].trim();
        
        // Split at sentence boundaries: ". " followed by uppercase letter or digit "1"
        // Also handle ". 1 " which means "correct marker then next option"
        const segments = optionsRaw.split(/\.\s+(?=[A-Z1])/);
        const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
        let letterIdx = 0;

        for (let i = 0; i < segments.length; i++) {
          let seg = segments[i].trim().replace(/\.$/, "").trim();
          if (!seg) continue;

          // Check if starts with "1 " — THIS option is the correct one
          let markThis = false;
          if (/^1\s+/.test(seg)) {
            seg = seg.replace(/^1\s+/, "").trim();
            markThis = true;
          }

          // If ends with " 1" — this option is also correct
          if (/\s+1$/.test(seg)) {
            seg = seg.replace(/\s+1$/, "").trim();
            markThis = true;
          }

          if (seg && letterIdx < letters.length) {
            result.push(`${letters[letterIdx]}. ${seg}${markThis ? " 1" : ""}`);
            letterIdx++;
          }
        }
      } else {
        result.push(line);
      }
    }

    return result.join("\n");
  };

  const parseCombinationQuestionsFromText = (text: string): ParsedQuestion[] => {
    text = preprocessInlineOptions(text);
    const questions: ParsedQuestion[] = [];
    const lines = text.split("\n");

    const questionStartRegex = /^\s*(\d+)\s*[\.\)\-]\s+(.*)/;
    const optionStartRegex = /^\s*([A-Ha-h])\s*[\.\)\-]\s+(.*)/;

    let currentQuestion: { question: string; options: string[]; correctAnswer: number; correctAnswers: number[]; answerText: string; isMultiple: boolean } | null = null;
    let currentOptionText = "";
    let inStructuredAnswer = false;

    const finishOption = () => {
      if (currentQuestion && currentOptionText) {
        let text = currentOptionText.trim();
        const hasMarker = /\s+1\s*$/.test(text);
        text = text.replace(/\s+1\s*$/, "").trim();
        if (text) {
          const optIdx = currentQuestion.options.length;
          if (hasMarker) {
            currentQuestion.correctAnswers.push(optIdx);
            if (currentQuestion.correctAnswer < 0) {
              currentQuestion.correctAnswer = optIdx;
            }
          }
          currentQuestion.options.push(text);
        }
      }
      currentOptionText = "";
    };

    const finishQuestion = () => {
      if (currentQuestion && currentQuestion.question.trim()) {
        if (currentQuestion.options.length >= 2) {
          // Determine detected type: if multiple correct answers or marked as multiple
          const hasMultipleCorrect = currentQuestion.correctAnswers.length > 1;
          const detectedType: "mcq_single" | "mcq_multiple" = 
            (currentQuestion.isMultiple || hasMultipleCorrect) ? "mcq_multiple" : "mcq_single";
          
          questions.push({
            question: currentQuestion.question,
            options: currentQuestion.options,
            correctAnswer: currentQuestion.correctAnswers.length > 0 ? currentQuestion.correctAnswers[0] : 0,
            correctAnswers: currentQuestion.correctAnswers.length > 0 ? currentQuestion.correctAnswers : [],
            imageFile: null, imagePreview: null, existingImageUrl: null, answerText: null,
            detectedType,
          });
        } else {
          let fullAnswer = currentQuestion.answerText.trim();
          if (currentQuestion.options.length === 1) {
            fullAnswer = (currentQuestion.options[0] + "\n" + fullAnswer).trim();
          }
          questions.push({
            question: currentQuestion.question,
            options: [],
            correctAnswer: -1,
            correctAnswers: [],
            imageFile: null, imagePreview: null, existingImageUrl: null,
            answerText: fullAnswer || null,
            detectedType: "combination",
          });
        }
      }
      currentQuestion = null;
      inStructuredAnswer = false;
    };

    for (const rawLine of lines) {
      const trimmed = rawLine.trim();
      if (!trimmed) continue;
      if (/^Page\s+\d+/i.test(trimmed)) continue;

      // Detect "(Select X Answers)" — mark current question as multiple if X > 1
      const selectMatch = trimmed.match(/^\(?\s*select\s+(\d+)\s+answers?\s*\)?$/i);
      if (selectMatch) {
        if (currentQuestion && !currentOptionText) {
          currentQuestion.question += " " + trimmed;
          const num = parseInt(selectMatch[1], 10);
          if (num > 1) {
            currentQuestion.isMultiple = true;
          }
        }
        continue;
      }

      const qMatch = trimmed.match(questionStartRegex);
      const oMatch = trimmed.match(optionStartRegex);

      if (qMatch && !oMatch) {
        finishOption();
        finishQuestion();
        // Check if question text itself contains "(Select X Answers)"
        let qText = qMatch[2].trim();
        let isMultiple = false;
        const inlineSelectMatch = qText.match(/\(select\s+(\d+)\s+answers?\)/i);
        if (inlineSelectMatch) {
          const num = parseInt(inlineSelectMatch[1], 10);
          if (num > 1) isMultiple = true;
        }
        currentQuestion = { question: qText, options: [], correctAnswer: -1, correctAnswers: [], answerText: "", isMultiple };
        inStructuredAnswer = false;
      } else if (oMatch && currentQuestion) {
        finishOption();
        inStructuredAnswer = false;
        currentOptionText = oMatch[2].trim();
      } else if (currentQuestion) {
        if (currentOptionText) {
          currentOptionText += " " + trimmed;
        } else if (currentQuestion.options.length === 0 && !inStructuredAnswer) {
          // Check for inline select pattern in continuation
          const inlineSelectMatch = trimmed.match(/^\(?\s*select\s+(\d+)\s+answers?\s*\)?/i);
          if (inlineSelectMatch) {
            const num = parseInt(inlineSelectMatch[1], 10);
            if (num > 1) currentQuestion.isMultiple = true;
            currentQuestion.question += " " + trimmed;
          } else if (currentQuestion.question.match(/[?:]\s*$/) && !trimmed.match(/^\(/)) {
            inStructuredAnswer = true;
            currentQuestion.answerText = trimmed;
          } else {
            currentQuestion.question += " " + trimmed;
          }
        } else if (inStructuredAnswer) {
          currentQuestion.answerText += "\n" + trimmed;
        } else {
          currentQuestion.answerText += "\n" + trimmed;
        }
      }
    }

    finishOption();
    finishQuestion();

    return questions;
  };

  const parseQuestionsFromText = (text: string, type: QuestionType = "mcq_single"): ParsedQuestion[] => {
    // Pre-process to split inline options
    text = preprocessInlineOptions(text);
    const questions: ParsedQuestion[] = [];
    const lines = text.split("\n");
    const autoDetectCorrect = type === "mcq_multiple";

    // Regex patterns
    const questionStartRegex = /^\s*(\d+)\s*[\.\)\-]\s+(.*)/;
    const optionStartRegex = /^\s*([A-Da-d])\s*[\.\)]\s+(.*)/;

    let currentQuestion: { question: string; options: string[]; correctAnswer: number; correctAnswers: number[] } | null = null;
    let currentOptionText = "";
    let currentOptionIsCorrect = false;

    const finishOption = () => {
      if (currentQuestion && currentOptionText) {
        let text = currentOptionText.trim();
        const hasMarker = /\s+1\s*$/.test(text);
        text = text.replace(/\s+1\s*$/, "").trim();
        if (text) {
          const optIdx = currentQuestion.options.length;
          if (autoDetectCorrect && hasMarker) {
            currentQuestion.correctAnswers.push(optIdx);
            if (currentQuestion.correctAnswer < 0) {
              currentQuestion.correctAnswer = optIdx;
            }
          }
          currentQuestion.options.push(text);
        }
      }
      currentOptionText = "";
      currentOptionIsCorrect = false;
    };

    const finishQuestion = () => {
      if (currentQuestion && currentQuestion.options.length >= 2 && currentQuestion.question.trim()) {
        questions.push({
          question: currentQuestion.question,
          options: currentQuestion.options,
          correctAnswer: currentQuestion.correctAnswers.length > 0 ? currentQuestion.correctAnswers[0] : 0,
          correctAnswers: currentQuestion.correctAnswers.length > 0 ? currentQuestion.correctAnswers : [],
          imageFile: null, imagePreview: null, existingImageUrl: null, answerText: null,
        });
      }
      currentQuestion = null;
    };

    for (const rawLine of lines) {
      const trimmed = rawLine.trim();
      if (!trimmed) continue;
      if (/^Page\s+\d+/i.test(trimmed)) continue;

      // Skip lines like "(Select 1 Answer)" — treat as part of the question
      if (/^\(?\s*select\s+\d+\s+answers?\s*\)?$/i.test(trimmed)) {
        if (currentQuestion && !currentOptionText) {
          currentQuestion.question += " " + trimmed;
        }
        continue;
      }

      // Check if this line starts a new question
      const qMatch = trimmed.match(questionStartRegex);
      // But make sure it's not actually an option (A-D)
      const oMatch = trimmed.match(optionStartRegex);

      if (qMatch && !oMatch) {
        // Save previous option & question
        finishOption();
        finishQuestion();
        currentQuestion = { question: qMatch[2].trim(), options: [], correctAnswer: -1, correctAnswers: [] };
      } else if (oMatch && currentQuestion) {
        // Save previous option
        finishOption();
        currentOptionText = oMatch[2].trim();
      } else if (currentQuestion) {
        if (currentOptionText) {
          // Continuation of current option
          currentOptionText += " " + trimmed;
        } else {
          // Continuation of question text
          currentQuestion.question += " " + trimmed;
        }
      }
    }

    // Finish last option & question
    finishOption();
    finishQuestion();

    // If nothing found, try old block-based fallback
    if (questions.length === 0) {
      return parseQuestionsFromBlocks(text);
    }

    return questions;
  };

  // Fallback block-based parser for old format (no A. B. C. D. labels)
  const parseQuestionsFromBlocks = (text: string): ParsedQuestion[] => {
    const blocks = text.split(/\n\s*\n\s*\n/).filter(b => b.trim());
    const questions: ParsedQuestion[] = [];

    for (const block of blocks) {
      const lines = block.split("\n").map(l => l.trim()).filter(l => l);
      if (lines.length < 3) continue;
      if (/^Page\s+\d+/i.test(lines[0])) continue;

      let qEndIdx = 0;
      for (let j = 0; j < lines.length; j++) {
        if (lines[j].match(/[?.:]\s*$/) || lines[j].includes("______") || lines[j].includes("___")) {
          qEndIdx = j;
          break;
        }
      }
      let questionText = lines.slice(0, qEndIdx + 1).join(" ").trim();
      questionText = questionText.replace(/^\d+\s*[\.\)\-]\s*/, "");
      const optionStartIdx = qEndIdx + 1;

      if (!questionText || optionStartIdx >= lines.length) continue;

      const options: string[] = [];
      let correctAnswer = -1;
      for (let j = optionStartIdx; j < lines.length; j++) {
        let optLine = lines[j].replace(/^[a-dA-D]\s*[\.\)]\s*/, "");
        if (/\s+1\s*$/.test(optLine)) {
          correctAnswer = options.length;
          optLine = optLine.replace(/\s+1\s*$/, "").trim();
        }
        if (optLine.trim()) options.push(optLine.trim());
      }

      if (options.length >= 2 && questionText.trim()) {
        questions.push({
          question: questionText, options,
          correctAnswer: correctAnswer >= 0 ? correctAnswer : 0,
          correctAnswers: correctAnswer >= 0 ? [correctAnswer] : [],
          imageFile: null, imagePreview: null, existingImageUrl: null, answerText: null,
        });
      }
    }
    return questions;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".docx") && !file.name.endsWith(".doc")) {
      toast.error("Please upload a Word file (.docx or .doc)");
      return;
    }

    parseWordFile(file);
  };

  const handleImageUpload = (questionIdx: number, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setParsedQuestions(prev => prev.map((q, i) => 
        i === questionIdx 
          ? { ...q, imageFile: file, imagePreview: e.target?.result as string }
          : q
      ));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (questionIdx: number) => {
    setParsedQuestions(prev => prev.map((q, i) => 
      i === questionIdx 
        ? { ...q, imageFile: null, imagePreview: null, existingImageUrl: null }
        : q
    ));
  };

  const handleCorrectAnswerChange = useCallback((questionIdx: number, answerIdx: number) => {
    setParsedQuestions(prev => prev.map((q, i) => {
      if (i !== questionIdx) return q;
      // Determine if this question should allow multiple answers
      const isMulti = questionType === "mcq_multiple" || 
        (questionType === "combination" && q.detectedType === "mcq_multiple");
      
      if (isMulti) {
        const exists = (q.correctAnswers || []).includes(answerIdx);
        const newCorrectAnswers = exists
          ? (q.correctAnswers || []).filter(a => a !== answerIdx)
          : [...(q.correctAnswers || []), answerIdx].sort();
        return {
          ...q,
          correctAnswers: newCorrectAnswers,
          correctAnswer: newCorrectAnswers.length > 0 ? newCorrectAnswers[0] : 0,
        };
      }
      // For single answer, replace
      return { ...q, correctAnswer: answerIdx, correctAnswers: [answerIdx] };
    }));
  }, [questionType]);

  const uploadQuestionImage = async (file: File, categorySlug: string, questionIdx: number): Promise<string | null> => {
    const ext = file.name.split(".").pop() || "png";
    const path = `${categorySlug}/q${questionIdx + 1}-${Date.now()}.${ext}`;
    
    const { error } = await supabase.storage
      .from("question-images")
      .upload(path, file, { upsert: true });

    if (error) {
      console.error("Image upload error:", error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("question-images")
      .getPublicUrl(path);

    return urlData.publicUrl;
  };

  const handleSaveUpdate = async () => {
    if (!selectedCategory || parsedQuestions.length === 0 || !questionType) return;

    setSaving(true);
    try {
      const imageUrls: (string | null)[] = [];
      for (let i = 0; i < parsedQuestions.length; i++) {
        const q = parsedQuestions[i];
        if (q.imageFile) {
          const url = await uploadQuestionImage(q.imageFile, selectedCategory, i);
          imageUrls.push(url);
        } else {
          imageUrls.push(q.existingImageUrl || null);
        }
      }

      await supabase
        .from("dynamic_questions")
        .delete()
        .eq("category_slug", selectedCategory);

      const rows = parsedQuestions.map((q, idx) => {
        const effectiveType = questionType === "combination" 
          ? (q.detectedType || "mcq_single") 
          : questionType;
        const isMulti = effectiveType === "mcq_multiple";
        return {
          category_slug: selectedCategory,
          question_text: q.question,
          options: q.options,
          correct_answer: q.correctAnswer >= 0 ? q.correctAnswer : 0,
          display_order: idx + 1,
          image_url: imageUrls[idx] || null,
          question_type: effectiveType,
          answer_text: isMulti && q.correctAnswers.length > 0
            ? JSON.stringify(q.correctAnswers)
            : q.answerText || null,
        };
      });

      const { error } = await supabase.from("dynamic_questions").insert(rows);
      if (error) throw error;

      toast.success(`Updated ${parsedQuestions.length} questions`);
      setParsedQuestions([]);
      setFileName("");
      setSelectedCategory("");
      setQuestionType(null);
      setMode("menu");
    } catch (error) {
      console.error("Error saving questions:", error);
      toast.error("Failed to save questions");
    }
    setSaving(false);
  };

  const handleSaveNew = async () => {
    if (!newCategoryName.trim() || parsedQuestions.length === 0 || !questionType) return;

    const slug = newCategoryName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const actualParent = newCategoryParent === "iwcf-drilling-level4" ? selectedDay : newCategoryParent;
    if (newCategoryParent === "iwcf-drilling-level4" && !selectedDay) return;

    setSaving(true);
    try {
      const { error: catError } = await supabase.from("question_categories").insert({
        name: newCategoryName.trim(),
        slug,
        parent_path: actualParent,
        display_order: allCategories.length + 1,
      });
      if (catError) throw catError;

      const imageUrls: (string | null)[] = [];
      for (let i = 0; i < parsedQuestions.length; i++) {
        const q = parsedQuestions[i];
        if (q.imageFile) {
          const url = await uploadQuestionImage(q.imageFile, slug, i);
          imageUrls.push(url);
        } else {
          imageUrls.push(null);
        }
      }

      const rows = parsedQuestions.map((q, idx) => {
        const effectiveType = questionType === "combination" 
          ? (q.detectedType || "mcq_single") 
          : questionType;
        const isMulti = effectiveType === "mcq_multiple";
        return {
          category_slug: slug,
          question_text: q.question,
          options: q.options,
          correct_answer: q.correctAnswer >= 0 ? q.correctAnswer : 0,
          display_order: idx + 1,
          image_url: imageUrls[idx] || null,
          question_type: effectiveType,
          answer_text: isMulti && q.correctAnswers.length > 0
            ? JSON.stringify(q.correctAnswers)
            : q.answerText || null,
        };
      });

      const { error } = await supabase.from("dynamic_questions").insert(rows);
      if (error) throw error;

      toast.success(`Created "${newCategoryName}" with ${parsedQuestions.length} questions`);
      setParsedQuestions([]);
      setFileName("");
      setNewCategoryName("");
      setQuestionType(null);
      setMode("menu");
      fetchDynamicCategories();
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    }
    setSaving(false);
  };

  const handleDeleteCategory = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this category and all its questions?")) return;

    try {
      await supabase.from("dynamic_questions").delete().eq("category_slug", slug);
      await supabase.from("question_categories").delete().eq("slug", slug);
      toast.success("Category deleted");
      fetchDynamicCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const IWCF_LEVEL4_DAYS = [
    { label: "Day #1 — P&P Part 1", value: "iwcf-drilling-level4-day1" },
    { label: "Day #2 — P&P Part 2", value: "iwcf-drilling-level4-day2" },
    { label: "Day #3 — Equipment", value: "iwcf-drilling-level4-day3" },
  ];

  const [selectedDay, setSelectedDay] = useState("");

  const parentOptions = [
    { label: "IADC Well Services", value: "/exercises/iacd/well-services" },
    { label: "IADC Drilling", value: "/exercises/iacd/drilling" },
    { label: "IWCF Drilling Level 4", value: "iwcf-drilling-level4" },
    { label: "IWCF Well Intervention", value: "/exercises/iwcf/well-intervention" },
    { label: "IADC Mock Tests", value: "/exercises/iacd/well-services/mock-test" },
  ];

  // Question type selection component
  const QuestionTypeSelector = () => (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-foreground">What type of questions?</label>
      <div className="grid gap-3">
        {QUESTION_TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setQuestionType(opt.value)}
            className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              questionType === opt.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40"
            }`}
          >
            <p className="font-semibold text-sm text-foreground">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-jakarta">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => {
              if (mode === "menu") navigate("/control-center");
              else if (questionType && (mode === "update" || mode === "add")) {
                setQuestionType(null);
                setParsedQuestions([]);
                setFileName("");
              } else {
                setMode("menu");
              }
            }}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            {mode === "menu" ? "Control Center" : questionType ? "Change Type" : "Back to Menu"}
          </button>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground">Question Manager</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Question Manager</h1>
          </div>
          <p className="text-muted-foreground text-sm pl-[52px]">Manage categories and upload questions</p>
        </div>

        {mode === "menu" && (
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => setMode("update")}
              className="group text-left bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                <RefreshCw className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground mb-1">Update Questions</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">Replace questions in an existing category by uploading a Word file</p>
            </button>

            <button
              onClick={() => setMode("add")}
              className="group text-left bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground mb-1">Add New Category</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">Create a new question category with uploaded questions</p>
            </button>
          </div>
        )}

        {/* Update mode */}
        {mode === "update" && !questionType && (
          <Card className="p-5 sm:p-6 space-y-5 border border-border shadow-sm rounded-2xl">
            <h2 className="text-lg font-bold text-foreground">Update Existing Questions</h2>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Select Category</label>
              <select
                className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">— Select a category —</option>
                {allCategories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            {selectedCategory && <QuestionTypeSelector />}
          </Card>
        )}

        {mode === "update" && questionType && (
          <Card className="p-5 sm:p-6 space-y-5 border border-border shadow-sm rounded-2xl">
            <h2 className="text-lg font-bold text-foreground">
              Update: {allCategories.find(c => c.slug === selectedCategory)?.name}
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-2">
                {QUESTION_TYPE_OPTIONS.find(o => o.value === questionType)?.label}
              </span>
            </h2>

            <UploadSection
              fileName={fileName}
              uploading={uploading}
              parsedQuestions={parsedQuestions}
              questionType={questionType}
              onFileUpload={handleFileUpload}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
              onCorrectAnswerChange={handleCorrectAnswerChange}
            />

            {parsedQuestions.length > 0 && (
              <Button
                onClick={handleSaveUpdate}
                disabled={saving}
                className="w-full h-11 font-semibold gap-2 hover:-translate-y-0.5 transition-all duration-200"
                size="lg"
              >
                <Check className="h-4 w-4" />
                {saving ? "Saving..." : `Save ${parsedQuestions.length} Questions (Replace Existing)`}
              </Button>
            )}
          </Card>
        )}

        {/* Add mode */}
        {mode === "add" && !questionType && (
          <Card className="p-5 sm:p-6 space-y-5 border border-border shadow-sm rounded-2xl">
            <h2 className="text-lg font-bold text-foreground">Add New Question Category</h2>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Category Name</label>
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Well Control Drilling"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Where should it be placed?</label>
              <select
                className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                value={newCategoryParent}
                onChange={(e) => setNewCategoryParent(e.target.value)}
              >
                {parentOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {newCategoryParent === "iwcf-drilling-level4" && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Which day?</label>
                <select
                  className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="">— Select a day —</option>
                  {IWCF_LEVEL4_DAYS.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
            )}
            {newCategoryName.trim() && (newCategoryParent !== "iwcf-drilling-level4" || selectedDay) && <QuestionTypeSelector />}
          </Card>
        )}

        {mode === "add" && questionType && (
          <Card className="p-5 sm:p-6 space-y-5 border border-border shadow-sm rounded-2xl">
            <h2 className="text-lg font-bold text-foreground">
              New: {newCategoryName}
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-2">
                {QUESTION_TYPE_OPTIONS.find(o => o.value === questionType)?.label}
              </span>
            </h2>

            <UploadSection
              fileName={fileName}
              uploading={uploading}
              parsedQuestions={parsedQuestions}
              questionType={questionType}
              onFileUpload={handleFileUpload}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
              onCorrectAnswerChange={handleCorrectAnswerChange}
            />

            {parsedQuestions.length > 0 && newCategoryName.trim() && (
              <Button
                onClick={handleSaveNew}
                disabled={saving}
                className="w-full h-11 font-semibold gap-2 hover:-translate-y-0.5 transition-all duration-200"
                size="lg"
              >
                <Check className="h-4 w-4" />
                {saving ? "Saving..." : `Create "${newCategoryName}" with ${parsedQuestions.length} Questions`}
              </Button>
            )}
          </Card>
        )}

        {/* Dynamic categories management */}
        {mode === "menu" && dynamicCategories.length > 0 && (
          <Card className="p-5 sm:p-6 space-y-4 border border-border shadow-sm rounded-2xl">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-primary" />
              Dynamic Categories
              <span className="ml-auto text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">{dynamicCategories.length}</span>
            </h2>
            <div className="space-y-2">
              {dynamicCategories.map((cat) => (
                <div key={cat.slug} className="flex items-center justify-between p-3 bg-muted/60 rounded-xl border border-border">
                  <div>
                    <p className="font-semibold text-sm text-foreground">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.parentPath}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
                    onClick={() => handleDeleteCategory(cat.slug)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Word file format guide */}
        <Card className="p-5 sm:p-6 space-y-3 border border-border shadow-sm rounded-2xl">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            Word File Format Guide
          </h3>
          <div className="text-xs text-muted-foreground space-y-2">
            <p>Your Word file should follow this format:</p>
            <pre className="bg-muted/60 border border-border p-3 rounded-xl text-xs whitespace-pre-wrap leading-relaxed">
{`The four principles of systemic risk management are: identify, quantify/qualify, mitigate, and _______ .

Communication

Calibrate

Kill sheet

Control risk              1
Which of the following statements best describe Well Integrity?

Option A text here

Option B text here               1

Option C text here

None of the above`}
            </pre>
            <p>• Questions are separated by blank lines</p>
            <p>• Each option is on its own line</p>
            <p>• The correct answer has a <strong>"1" at the end</strong> of the line (with spaces before it)</p>
            <p>• After uploading, you can attach images to any question using drag & drop</p>
            {questionType === "combination" && (
              <>
                <p className="font-semibold text-foreground mt-2">For mixed mode:</p>
                <p>• Questions with <strong>"(Select 2 Answers)"</strong> or similar are auto-detected as multiple-answer MCQ</p>
                <p>• Questions with A/B/C/D options are detected as single-answer MCQ</p>
                <p>• Questions without options are detected as structured (written) answers</p>
                <p>• Each question type badge (SINGLE / MULTI / STRUCTURED) shows in the preview</p>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ── Image Drop Zone per Question ── */
const QuestionImageUploader = ({
  questionIdx,
  question,
  onImageUpload,
  onRemoveImage,
}: {
  questionIdx: number;
  question: ParsedQuestion;
  onImageUpload: (idx: number, file: File) => void;
  onRemoveImage: (idx: number) => void;
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onImageUpload(questionIdx, file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(questionIdx, file);
  };

  const previewSrc = question.imagePreview || question.existingImageUrl;

  if (previewSrc) {
    return (
      <div className="relative group mt-2">
        <img 
          src={previewSrc} 
          alt={`Q${questionIdx + 1} image`} 
          className="max-h-32 rounded-lg border border-border object-contain"
        />
        <button
          onClick={() => onRemoveImage(questionIdx)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => fileInputRef.current?.click()}
      className={`mt-2 border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all duration-200 ${
        isDragOver 
          ? "border-primary bg-primary/5" 
          : "border-border/60 hover:border-primary/40 hover:bg-primary/5"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ImagePlus className="w-4 h-4" />
        <span>{isDragOver ? "Drop image here" : "Click or drag & drop image"}</span>
      </div>
    </div>
  );
};

/* ── Upload Section ── */
const UploadSection = ({
  fileName,
  uploading,
  parsedQuestions,
  questionType,
  onFileUpload,
  onImageUpload,
  onRemoveImage,
  onCorrectAnswerChange,
}: {
  fileName: string;
  uploading: boolean;
  parsedQuestions: ParsedQuestion[];
  questionType: QuestionType;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageUpload: (idx: number, file: File) => void;
  onRemoveImage: (idx: number) => void;
  onCorrectAnswerChange: (questionIdx: number, answerIdx: number) => void;
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground">Upload Word File (.docx)</label>
      <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-200">
        <input
          type="file"
          accept=".docx,.doc"
          onChange={onFileUpload}
          className="hidden"
          id="word-upload"
        />
        <label htmlFor="word-upload" className="cursor-pointer block">
          {uploading ? (
            <div className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-primary animate-pulse" />
              <p className="text-sm text-muted-foreground">Parsing file...</p>
            </div>
          ) : fileName ? (
            <div className="flex items-center justify-center gap-2 text-primary">
              <FileText className="h-5 w-5" />
              <span className="font-semibold text-sm">{fileName}</span>
              <Check className="h-5 w-5" />
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground/60" />
              <p className="text-sm text-muted-foreground">Click to upload a Word file</p>
              <p className="text-xs text-muted-foreground/60">.docx or .doc</p>
            </div>
          )}
        </label>
      </div>
    </div>

    {parsedQuestions.length > 0 && (
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
          <Check className="h-4 w-4 text-success" />
          Preview — {parsedQuestions.length} questions parsed
        </h3>
        <div className="max-h-[500px] overflow-y-auto space-y-3 pr-1">
          {parsedQuestions.map((q, idx) => (
            <div key={idx} className="p-4 bg-muted/60 border border-border rounded-xl text-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-foreground">
                  {idx + 1}. {q.question}
                </p>
                {questionType === "combination" && q.detectedType && (
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    q.detectedType === "mcq_multiple" 
                      ? "bg-blue-500/10 text-blue-600" 
                      : q.detectedType === "combination" 
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-emerald-500/10 text-emerald-600"
                  }`}>
                    {q.detectedType === "mcq_multiple" ? "MULTI" : q.detectedType === "combination" ? "STRUCTURED" : "SINGLE"}
                  </span>
                )}
              </div>
              
              <QuestionImageUploader
                questionIdx={idx}
                question={q}
                onImageUpload={onImageUpload}
                onRemoveImage={onRemoveImage}
              />

              {q.options.length > 0 ? (
              <div className="mt-2 space-y-1">
                  <p className="text-xs text-muted-foreground mb-1">
                    Click to select correct answer{(questionType === "mcq_multiple" || q.detectedType === "mcq_multiple") ? "(s)" : ""}:
                  </p>
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => onCorrectAnswerChange(idx, oi)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${
                        q.correctAnswers.includes(oi)
                          ? "bg-success/15 text-success font-medium border border-success/30"
                          : "text-muted-foreground hover:bg-muted border border-transparent"
                      }`}
                    >
                      {String.fromCharCode(65 + oi)}. {opt}
                      {q.correctAnswers.includes(oi) && " ✓"}
                    </button>
                  ))}
                </div>
              ) : q.answerText ? (
                <div className="mt-2 p-2 bg-success/10 rounded-lg">
                  <p className="text-xs font-semibold text-success">Correct Answer:</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{q.answerText}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default QuestionManager;
