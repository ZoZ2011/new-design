import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, Plus, Trash2, FileText, Check, AlertCircle, FolderOpen, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import mammoth from "mammoth";

interface ParsedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface CategoryInfo {
  name: string;
  slug: string;
  parentPath: string;
}

const EXISTING_CATEGORIES: CategoryInfo[] = [
  { name: "Coiled Tubing", slug: "coiled-tubing", parentPath: "/exercises/iacd/well-services" },
  { name: "Workover", slug: "workover", parentPath: "/exercises/iacd/well-services" },
  { name: "Snubbing", slug: "snubbing", parentPath: "/exercises/iacd/well-services" },
  { name: "Wireline", slug: "wireline", parentPath: "/exercises/iacd/well-services" },
  { name: "IADC OGOR Mock Test 1", slug: "iadc-ogor-mock-test-1", parentPath: "/exercises/iacd/well-services/mock-test" },
  { name: "IADC OGOR Mock Test 2", slug: "iadc-ogor-mock-test-2", parentPath: "/exercises/iacd/well-services/mock-test" },
  { name: "IADC OGOR Mock Test 3", slug: "iadc-ogor-mock-test-3", parentPath: "/exercises/iacd/well-services/mock-test" },
];

const QuestionManager = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"menu" | "update" | "add">("menu");
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

      console.log("Raw mammoth text (first 2000 chars):", text.substring(0, 2000));

      const questions = parseQuestionsFromText(text);

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
  }, []);

  const parseQuestionsFromText = (text: string): ParsedQuestion[] => {
    // Split into blocks separated by 2+ blank lines
    const blocks = text.split(/\n\s*\n\s*\n/).filter(b => b.trim());
    const questions: ParsedQuestion[] = [];

    for (const block of blocks) {
      const lines = block.split("\n").map(l => l.trim()).filter(l => l);
      if (lines.length < 3) continue; // Need at least question + 2 options

      // Skip page markers or metadata
      if (/^Page\s+\d+/i.test(lines[0])) continue;

      // Try numbered question format first: "1. question text"
      const numberedMatch = lines[0].match(/^(\d+)\s*[\.\)]\s*(.*)/);
      // Try lettered option format: "a. option text"  
      const isFirstLineOption = /^[a-dA-D]\s*[\.\)]\s/.test(lines[0]);

      if (isFirstLineOption) continue; // Skip blocks that start with options

      let questionText = "";
      let optionStartIdx = -1;

      if (numberedMatch) {
        questionText = numberedMatch[2].trim();
      } else {
        questionText = lines[0];
      }

      // Find where options start - look for lettered options OR plain text options
      // First check for lettered options (a. b. c. d.)
      for (let j = 1; j < lines.length; j++) {
        if (/^[a-dA-D]\s*[\.\)]\s/.test(lines[j])) {
          optionStartIdx = j;
          break;
        }
      }

      // If no lettered options found, treat all lines after the first as options
      if (optionStartIdx === -1) {
        // The question is line(s) that end with ? or other punctuation
        // Options are the remaining lines
        let qEndIdx = 0;
        for (let j = 0; j < lines.length; j++) {
          const line = lines[j];
          // A question line typically ends with ? . : or contains "______"
          if (line.match(/[?.:]\s*$/) || line.includes("______") || line.includes("___")) {
            qEndIdx = j;
            break;
          }
        }
        
        // Build question from lines 0..qEndIdx
        questionText = lines.slice(0, qEndIdx + 1).join(" ").trim();
        // Remove leading number if present
        questionText = questionText.replace(/^\d+\s*[\.\)]\s*/, "");
        optionStartIdx = qEndIdx + 1;
      } else {
        // Build question from lines before optionStartIdx
        const qLines = numberedMatch 
          ? [numberedMatch[2], ...lines.slice(1, optionStartIdx)]
          : lines.slice(0, optionStartIdx);
        questionText = qLines.join(" ").trim();
      }

      if (!questionText || optionStartIdx >= lines.length) continue;

      // Parse options
      const options: string[] = [];
      let correctAnswer = -1;

      for (let j = optionStartIdx; j < lines.length; j++) {
        let optLine = lines[j];
        
        // Skip page markers
        if (/^Page\s+\d+/i.test(optLine)) continue;

        // Remove letter prefix if present (a. b. c. d.)
        optLine = optLine.replace(/^[a-dA-D]\s*[\.\)]\s*/, "");

        // Check for correct answer marker (trailing "1" with spaces before it)
        if (/\s{2,}1\s*$/.test(optLine) || optLine.match(/\t+1\s*$/)) {
          correctAnswer = options.length;
          optLine = optLine.replace(/\s+1\s*$/, "").trim();
        }

        if (optLine.trim()) {
          options.push(optLine.trim());
        }
      }

      // Only add if we have at least 2 options
      if (options.length >= 2 && questionText.trim()) {
        questions.push({
          question: questionText,
          options,
          correctAnswer: correctAnswer >= 0 ? correctAnswer : 0,
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

  const handleSaveUpdate = async () => {
    if (!selectedCategory || parsedQuestions.length === 0) return;

    setSaving(true);
    try {
      await supabase
        .from("dynamic_questions")
        .delete()
        .eq("category_slug", selectedCategory);

      const rows = parsedQuestions.map((q, idx) => ({
        category_slug: selectedCategory,
        question_text: q.question,
        options: q.options,
        correct_answer: q.correctAnswer,
        display_order: idx + 1,
      }));

      const { error } = await supabase.from("dynamic_questions").insert(rows);
      if (error) throw error;

      toast.success(`Updated ${parsedQuestions.length} questions for "${allCategories.find(c => c.slug === selectedCategory)?.name}"`);
      setParsedQuestions([]);
      setFileName("");
      setSelectedCategory("");
      setMode("menu");
    } catch (error) {
      console.error("Error saving questions:", error);
      toast.error("Failed to save questions");
    }
    setSaving(false);
  };

  const handleSaveNew = async () => {
    if (!newCategoryName.trim() || parsedQuestions.length === 0) return;

    const slug = newCategoryName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setSaving(true);
    try {
      const { error: catError } = await supabase.from("question_categories").insert({
        name: newCategoryName.trim(),
        slug,
        parent_path: newCategoryParent,
        display_order: allCategories.length + 1,
      });
      if (catError) throw catError;

      const rows = parsedQuestions.map((q, idx) => ({
        category_slug: slug,
        question_text: q.question,
        options: q.options,
        correct_answer: q.correctAnswer,
        display_order: idx + 1,
      }));

      const { error } = await supabase.from("dynamic_questions").insert(rows);
      if (error) throw error;

      toast.success(`Created "${newCategoryName}" with ${parsedQuestions.length} questions`);
      setParsedQuestions([]);
      setFileName("");
      setNewCategoryName("");
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

  const parentOptions = [
    { label: "IADC Well Services", value: "/exercises/iacd/well-services" },
    { label: "IADC Drilling", value: "/exercises/iacd/drilling" },
    { label: "IWCF Drilling", value: "/exercises/iwcf/drilling" },
    { label: "IWCF Well Intervention", value: "/exercises/iwcf/well-intervention" },
    { label: "IADC Mock Tests", value: "/exercises/iacd/well-services/mock-test" },
  ];

  return (
    <div className="min-h-screen bg-background font-jakarta">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => (mode === "menu" ? navigate("/") : setMode("menu"))}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            {mode === "menu" ? "Home" : "Back to Menu"}
          </button>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground">Question Manager</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in">
        {/* Page Title */}
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

        {mode === "update" && (
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
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <UploadSection
                fileName={fileName}
                uploading={uploading}
                parsedQuestions={parsedQuestions}
                onFileUpload={handleFileUpload}
              />
            )}

            {parsedQuestions.length > 0 && selectedCategory && (
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

        {mode === "add" && (
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
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <UploadSection
              fileName={fileName}
              uploading={uploading}
              parsedQuestions={parsedQuestions}
              onFileUpload={handleFileUpload}
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
          </div>
        </Card>
      </div>
    </div>
  );
};

const UploadSection = ({
  fileName,
  uploading,
  parsedQuestions,
  onFileUpload,
}: {
  fileName: string;
  uploading: boolean;
  parsedQuestions: ParsedQuestion[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
          <Check className="h-4 w-4 text-success" />
          Preview — {parsedQuestions.length} questions parsed
        </h3>
        <div className="max-h-64 overflow-y-auto space-y-2">
          {parsedQuestions.slice(0, 5).map((q, idx) => (
            <div key={idx} className="p-3 bg-muted/60 border border-border rounded-xl text-sm">
              <p className="font-semibold text-foreground">
                Q{idx + 1}: {q.question}
              </p>
              <div className="mt-1.5 space-y-0.5">
                {q.options.map((opt, oi) => (
                  <p
                    key={oi}
                    className={oi === q.correctAnswer ? "text-success font-medium" : "text-muted-foreground"}
                  >
                    {String.fromCharCode(65 + oi)}. {opt}
                    {oi === q.correctAnswer && " ✓"}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {parsedQuestions.length > 5 && (
            <p className="text-xs text-muted-foreground text-center py-2">
              + {parsedQuestions.length - 5} more questions
            </p>
          )}
        </div>
      </div>
    )}
  </div>
);

export default QuestionManager;
