import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, Plus, Trash2, FileText, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import backgroundImage from "@/assets/oil-rig-background.jpg";
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
    <div className="min-h-screen p-4 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="max-w-4xl mx-auto pt-8 space-y-6 relative z-10">
        <Button
          variant="ghost"
          onClick={() => (mode === "menu" ? navigate("/") : setMode("menu"))}
          className="text-white hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {mode === "menu" ? "Home" : "Back to Menu"}
        </Button>

        <h1 className="text-4xl font-bold text-primary text-center">Question Manager</h1>

        {mode === "menu" && (
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card
              className="p-8 cursor-pointer hover:border-primary transition-colors"
              onClick={() => setMode("update")}
            >
              <div className="text-center space-y-4">
                <Upload className="h-12 w-12 mx-auto text-primary" />
                <h2 className="text-2xl font-bold">Update Questions</h2>
                <p className="text-muted-foreground">
                  Upload a Word file to replace questions in an existing category
                </p>
              </div>
            </Card>

            <Card
              className="p-8 cursor-pointer hover:border-primary transition-colors"
              onClick={() => setMode("add")}
            >
              <div className="text-center space-y-4">
                <Plus className="h-12 w-12 mx-auto text-primary" />
                <h2 className="text-2xl font-bold">Add New Category</h2>
                <p className="text-muted-foreground">
                  Create a new question category with uploaded questions
                </p>
              </div>
            </Card>
          </div>
        )}

        {mode === "update" && (
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Update Existing Questions</h2>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Category</label>
              <select
                className="w-full p-2 rounded-md border bg-background text-foreground"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">-- Select a category --</option>
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
                className="w-full"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                {saving ? "Saving..." : `Add ${parsedQuestions.length} Questions (Replace Existing)`}
              </Button>
            )}
          </Card>
        )}

        {mode === "add" && (
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Add New Question Category</h2>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category Name</label>
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. Well Control Drilling"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Where should it be placed?</label>
              <select
                className="w-full p-2 rounded-md border bg-background text-foreground"
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
                className="w-full"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                {saving ? "Saving..." : `Add "${newCategoryName}" with ${parsedQuestions.length} Questions`}
              </Button>
            )}
          </Card>
        )}

        {/* Dynamic categories management */}
        {mode === "menu" && dynamicCategories.length > 0 && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Dynamic Categories</h2>
            {dynamicCategories.map((cat) => (
              <div key={cat.slug} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-sm text-muted-foreground">{cat.parentPath}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteCategory(cat.slug)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </Card>
        )}

        {/* Word file format guide */}
        <Card className="p-6 space-y-3">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Word File Format Guide
          </h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Your Word file should follow this format:</p>
            <pre className="bg-muted p-3 rounded text-xs whitespace-pre-wrap">
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
      <label className="text-sm font-medium">Upload Word File (.docx)</label>
      <div className="border-2 border-dashed rounded-lg p-6 text-center">
        <input
          type="file"
          accept=".docx,.doc"
          onChange={onFileUpload}
          className="hidden"
          id="word-upload"
        />
        <label htmlFor="word-upload" className="cursor-pointer space-y-2 block">
          {uploading ? (
            <p className="text-muted-foreground">Parsing file...</p>
          ) : fileName ? (
            <div className="flex items-center justify-center gap-2 text-primary">
              <FileText className="h-5 w-5" />
              <span>{fileName}</span>
              <Check className="h-5 w-5" />
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Click to upload a Word file</p>
            </>
          )}
        </label>
      </div>
    </div>

    {parsedQuestions.length > 0 && (
      <div className="space-y-2">
        <h3 className="font-medium">
          Preview ({parsedQuestions.length} questions parsed)
        </h3>
        <div className="max-h-64 overflow-y-auto space-y-3">
          {parsedQuestions.slice(0, 5).map((q, idx) => (
            <div key={idx} className="p-3 bg-muted rounded-lg text-sm">
              <p className="font-medium">
                Q{idx + 1}: {q.question}
              </p>
              <div className="mt-1 space-y-0.5">
                {q.options.map((opt, oi) => (
                  <p
                    key={oi}
                    className={oi === q.correctAnswer ? "text-green-600 font-medium" : "text-muted-foreground"}
                  >
                    {String.fromCharCode(65 + oi)}. {opt}
                    {oi === q.correctAnswer && " ✓"}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {parsedQuestions.length > 5 && (
            <p className="text-sm text-muted-foreground text-center">
              ... and {parsedQuestions.length - 5} more questions
            </p>
          )}
        </div>
      </div>
    )}
  </div>
);

export default QuestionManager;
