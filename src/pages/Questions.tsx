import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Trash2,
  Menu,
  Timer,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Calculator,
  Lock,
  Sparkles,
  Search,
  HelpCircle,
  X,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Question } from "@/data/questions";
import { useDynamicQuestions } from "@/hooks/useDynamicQuestions";
import AIChat from "@/components/AIChat";
import { userData } from "@/lib/backendApi";
import { ScreenshotBlocker } from "@/components/ScreenshotBlocker";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { QuestionSidebar } from "@/components/questions/QuestionSidebar";
import { QuestionProgress } from "@/components/questions/QuestionProgress";
import { QuestionNavigation } from "@/components/questions/QuestionNavigation";
import { checkCategoryAccess, ACCESS_DENIED_MESSAGE } from "@/lib/accessControl";
import { toast } from "sonner";

// Common formulas for reference modal
const FORMULAS = [
  { name: "Hydrostatic Pressure (psi)", formula: "0.052 × Mud Weight (ppg) × TVD (ft)" },
  { name: "Pressure Gradient (psi/ft)", formula: "Mud Weight (ppg) × 0.052" },
  { name: "Formation Pressure (psi)", formula: "Hydrostatic Pressure + SIDPP" },
  { name: "Kill Mud Weight (ppg)", formula: "Original MW + (SIDPP / (0.052 × TVD))" },
  { name: "Initial Circulating Pressure (psi)", formula: "SIDPP + SCR (Slow Circulating Rate Pressure)" },
  { name: "Final Circulating Pressure (psi)", formula: "SCR × (Kill Mud Weight / Original Mud Weight)" },
  { name: "MAASP (psi)", formula: "(Fracture Gradient - Current Mud Weight) × 0.052 × Casing Shoe TVD" },
  { name: "Gas Law (Boyle's)", formula: "P1 × V1 = P2 × V2" },
  { name: "Annular Velocity (ft/min)", formula: "Pump Output (bbl/min) / Annular Capacity (bbl/ft)" },
];

const Questions = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [key: number]: boolean }>({});
  const [textAnswers, setTextAnswers] = useState<{ [key: number]: string }>({});
  const [multiSelectedAnswers, setMultiSelectedAnswers] = useState<{ [key: number]: number[] }>({});
  const [showAIChat, setShowAIChat] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [autoSubmit, setAutoSubmit] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  // 5 New Innovative & Helpful Features
  // 1. Bookmarks / Review Later Flagging
  const [flaggedIds, setFlaggedIds] = useState<Set<number>>(new Set());

  // 2. Exam Stopwatch / Practice Timer
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  // 3. Built-in Formula Sheet Modal
  const [showFormulas, setShowFormulas] = useState(false);

  // 4. Scratchpad Calculator
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInput, setCalcInput] = useState("");
  const [calcResult, setCalcResult] = useState<string | null>(null);

  // 5. Verified Answer Syllabus Explanation Toggle
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});

  const navigate = useNavigate();
  const { category } = useParams();
  const userId = localStorage.getItem("userId");

  const { questions, loading: questionsLoading } = useDynamicQuestions(category || "");
  const currentQuestion = questions[currentQuestionIndex];

  // Practice Timer
  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  // Toggle bookmark / flagged question
  const toggleFlag = (id: number) => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.info("Removed from review list");
      } else {
        next.add(id);
        toast.success("Flagged for review");
      }
      return next;
    });
  };

  // Calculator evaluation
  const handleCalcEval = () => {
    try {
      // Safe math evaluation with sanitization
      const sanitized = calcInput.replace(/[^0-9+\-*/(). ]/g, "");
      // eslint-disable-next-line no-eval
      const result = Function(`'use strict'; return (${sanitized})`)();
      setCalcResult(String(Number(result.toFixed(4))));
    } catch {
      setCalcResult("Error");
    }
  };

  // Calculate correct answers count
  const correctCount = useMemo(() => {
    return questions.filter((q) => {
      if (!submittedAnswers[q.id]) return false;
      const sel = selectedAnswers[q.id];
      return q.correctAnswers ? q.correctAnswers.includes(sel) : sel === q.correctAnswer;
    }).length;
  }, [questions, submittedAnswers, selectedAnswers]);

  // Load progress and user settings
  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    const verifyAccessAndLoadData = async () => {
      if (category) {
        const { allowed } = await checkCategoryAccess(category);
        if (!allowed) {
          setAccessDenied(true);
          return;
        }
      }
      try {
        const progressRes = await userData<{ data: any[] }>("get_progress", userId, { category });
        const progressData = progressRes?.data;

        if (progressData) {
          const answers: { [key: number]: number } = {};
          const submitted: { [key: number]: boolean } = {};

          progressData.forEach((item) => {
            const questionId = parseInt(item.question_id);
            if (item.selected_answer !== null) {
              answers[questionId] = item.selected_answer;
            }
            submitted[questionId] = item.is_submitted || false;
          });

          setSelectedAnswers(answers);
          setSubmittedAnswers(submitted);
        }

        const settingsRes = await userData<{ data: any }>("get_settings", userId);
        const settingsData = settingsRes?.data;

        if (settingsData) {
          if (settingsData.theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }

          const root = document.documentElement;
          if (settingsData.font_size === "small") {
            root.style.fontSize = "14px";
          } else if (settingsData.font_size === "large") {
            root.style.fontSize = "18px";
          } else {
            root.style.fontSize = "16px";
          }

          setAutoSubmit(settingsData.auto_submit || false);
          setSoundEffects(settingsData.sound_effects !== false);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    verifyAccessAndLoadData();
  }, [userId, category, navigate]);

  const saveProgress = async (questionId: number, answer: number | null, isSubmitted: boolean) => {
    if (!userId || !category) return;
    try {
      await userData("save_progress", userId, {
        category,
        question_id: questionId,
        selected_answer: answer,
        is_submitted: isSubmitted,
      });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const playSound = (isCorrect: boolean) => {
    if (!soundEffects) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (isCorrect) {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
      } else {
        oscillator.frequency.setValueAtTime(392, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(349.23, audioContext.currentTime + 0.15);
      }

      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.25);
    } catch {
      // Audio context might be restricted
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!currentQuestion || submittedAnswers[currentQuestion.id]) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerIndex,
    }));

    saveProgress(currentQuestion.id, answerIndex, false);

    if (autoSubmit) {
      setTimeout(() => handleSubmit(), 150);
    }
  };

  const handleMultiAnswerToggle = (answerIndex: number) => {
    if (!currentQuestion || submittedAnswers[currentQuestion.id]) return;

    setMultiSelectedAnswers((prev) => {
      const current = prev[currentQuestion.id] || [];
      const updated = current.includes(answerIndex)
        ? current.filter((i) => i !== answerIndex)
        : [...current, answerIndex];
      return { ...prev, [currentQuestion.id]: updated };
    });
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;

    const isStructured = currentQuestion.questionType === "combination" && currentQuestion.options.length === 0;
    const isKillSheet = currentQuestion.questionType === "kill_sheet";
    const isMultiple = currentQuestion.questionType === "mcq_multiple";
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    const multiSelected = multiSelectedAnswers[currentQuestion.id] || [];

    if (isKillSheet) return;
    if (isMultiple) {
      const requiredCount = currentQuestion.correctAnswers?.length || 1;
      if (multiSelected.length !== requiredCount) return;
    } else if (!isStructured && selectedAnswer === undefined) {
      return;
    }

    setSubmittedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));

    saveProgress(currentQuestion.id, isStructured ? -1 : isMultiple ? -1 : selectedAnswer, true);

    if (!isStructured) {
      let isCorrect: boolean;
      if (isMultiple && currentQuestion.correctAnswers) {
        isCorrect =
          currentQuestion.correctAnswers.every((i) => multiSelected.includes(i)) &&
          multiSelected.length === currentQuestion.correctAnswers.length;
      } else {
        isCorrect = currentQuestion.correctAnswers
          ? currentQuestion.correctAnswers.includes(selectedAnswer)
          : selectedAnswer === currentQuestion.correctAnswer;
      }
      playSound(isCorrect);
    }
  };

  const handleClearProgress = async () => {
    if (!userId || !category) return;
    if (window.confirm("Are you sure you want to reset your answers and start over?")) {
      try {
        await userData("clear_progress", userId, { category });
        setSelectedAnswers({});
        setSubmittedAnswers({});
        setMultiSelectedAnswers({});
        setTextAnswers({});
        setFlaggedIds(new Set());
        setCurrentQuestionIndex(0);
        setTimerSeconds(0);
        toast.success("Progress cleared");
      } catch (error) {
        console.error("Error clearing progress:", error);
      }
    }
  };

  const getCategoryTitle = () => {
    if (!category) return "";
    if (category.includes("iadc-ogor-mock-test")) {
      const testNumber = category.split("-").pop();
      return `IADC OGOR Mock Test #${testNumber}`;
    }
    const dayTopicMatch = category.match(/^iwcf-drilling-level4-day\d-(.+)$/);
    if (dayTopicMatch) {
      return dayTopicMatch[1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!userId) return null;

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-[#fafafc] font-jakarta flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Access Restricted</h2>
            <p className="text-rose-600 font-bold text-base leading-relaxed" dir="rtl">
              {ACCESS_DENIED_MESSAGE}
            </p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Please contact the course instructor or system administrator to enable access for your ID.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/exercises")} className="flex-1 h-11 font-semibold rounded-full bg-slate-900">
              Back to Courses
            </Button>
            <Button variant="outline" onClick={() => navigate("/")} className="flex-1 h-11 font-semibold rounded-full">
              Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (questionsLoading) {
    return (
      <div className="min-h-screen bg-[#fafafc] flex items-center justify-center font-jakarta">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="text-sm font-semibold text-slate-700">Loading syllabus question bank...</h2>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#fafafc] flex items-center justify-center font-jakarta p-4">
        <div className="text-center bg-white border border-slate-200 p-8 rounded-3xl shadow-sm max-w-sm">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900">No questions available</h2>
          <p className="text-xs text-slate-500 mt-1 mb-5">Questions for this topic are being updated.</p>
          <Button onClick={() => navigate(-1)} className="rounded-full px-6">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafc] dark:bg-slate-950 font-jakarta p-3 sm:p-6 no-select overflow-x-hidden text-slate-900 dark:text-slate-100">
      <ScreenshotBlocker />

      <div className="max-w-6xl mx-auto w-full">
        {/* Top Floating App Bar */}
        <header className="mb-6 flex items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:px-6 sm:py-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const dayMatch = category?.match(/^iwcf-drilling-level4-(day\d)/);
                if (dayMatch) {
                  navigate("/exercises/iwcf/drilling", { state: { level: 4 } });
                } else {
                  navigate(-1);
                }
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
              {getCategoryTitle()}
            </span>
          </div>

          {/* Quick Utility Tools (Timer, Formulas, Calculator, Menu) */}
          <div className="flex items-center gap-2">
            {/* Timer Pill */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-slate-700 dark:text-slate-200">
              <Timer className="w-3.5 h-3.5 text-slate-500" />
              <span>{formatTimer(timerSeconds)}</span>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="text-slate-400 hover:text-slate-700 ml-0.5 cursor-pointer"
                title={timerRunning ? "Pause Timer" : "Resume Timer"}
              >
                {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-600" />}
              </button>
            </div>

            {/* Formulas Sheet Button */}
            <button
              onClick={() => setShowFormulas(true)}
              title="Formula Sheet"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Formulas</span>
            </button>

            {/* Quick Calculator Button */}
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              title="Drilling Calculator"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-purple-600" />
              <span>Calc</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                setSoundEffects(!soundEffects);
                toast.info(soundEffects ? "Sound effects muted" : "Sound effects enabled");
              }}
              title={soundEffects ? "Mute sounds" : "Enable sounds"}
              className="w-8 h-8 rounded-full border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {soundEffects ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="flex gap-6 items-start">
          {/* Central Question Card */}
          <main className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-9 shadow-xs space-y-6">
            {/* Progress Top Bar */}
            <QuestionProgress
              current={currentQuestionIndex}
              total={questions.length}
              answeredCount={Object.keys(submittedAnswers).length}
              flaggedCount={flaggedIds.size}
            />

            {/* Question Body */}
            <QuestionCard
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              selectedAnswer={selectedAnswers[currentQuestion.id]}
              selectedAnswers={multiSelectedAnswers[currentQuestion.id] || []}
              isSubmitted={submittedAnswers[currentQuestion.id] || false}
              onAnswerSelect={handleAnswerSelect}
              onMultiAnswerToggle={handleMultiAnswerToggle}
              textAnswer={textAnswers[currentQuestion.id] || ""}
              onTextAnswerChange={(val) => setTextAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }))}
              isFlagged={flaggedIds.has(currentQuestion.id)}
              onToggleFlag={() => toggleFlag(currentQuestion.id)}
              showExplanation={!!showExplanations[currentQuestion.id]}
              onToggleExplanation={() =>
                setShowExplanations((prev) => ({
                  ...prev,
                  [currentQuestion.id]: !prev[currentQuestion.id],
                }))
              }
            />

            {/* Navigation Bar */}
            <QuestionNavigation
              currentIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              isSubmitted={submittedAnswers[currentQuestion.id] || false}
              hasSelectedAnswer={(() => {
                const isStructured =
                  currentQuestion.questionType === "combination" && currentQuestion.options.length === 0;
                const isMultiple = currentQuestion.questionType === "mcq_multiple";
                const isKillSheet = currentQuestion.questionType === "kill_sheet";
                if (isKillSheet) return false;
                if (isStructured) return true;
                if (isMultiple) {
                  const requiredCount = currentQuestion.correctAnswers?.length || 1;
                  return (multiSelectedAnswers[currentQuestion.id] || []).length === requiredCount;
                }
                return selectedAnswers[currentQuestion.id] !== undefined;
              })()}
              autoSubmit={autoSubmit}
              onPrevious={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              onNext={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              onSubmit={handleSubmit}
              onAskAI={() => setShowAIChat(true)}
            />
          </main>

          {/* Right Sidebar: Palette & Score */}
          <QuestionSidebar
            questions={questions}
            currentIndex={currentQuestionIndex}
            submittedAnswers={submittedAnswers}
            selectedAnswers={selectedAnswers}
            correctCount={correctCount}
            flaggedIds={flaggedIds}
            isOpen={sidebarOpen}
            onQuestionSelect={setCurrentQuestionIndex}
            onSettingsClick={() => navigate(`/settings/${category}`)}
            onClose={() => setSidebarOpen(false)}
            onResetProgress={handleClearProgress}
          />
        </div>
      </div>

      {/* ================= MODAL: FORMULA SHEET REFERENCE ================= */}
      {showFormulas && (
        <div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  IWCF / IADC Key Formulas Reference
                </h3>
              </div>
              <button
                onClick={() => setShowFormulas(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {FORMULAS.map((f, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{f.name}</p>
                  <p className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-1">{f.formula}</p>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setShowFormulas(false)}
              className="w-full rounded-full font-semibold h-10 bg-slate-900 text-white"
            >
              Close Formulas
            </Button>
          </div>
        </div>
      )}

      {/* ================= FLOATING DRILLING SCRATCHPAD CALCULATOR ================= */}
      {showCalculator && (
        <div className="fixed bottom-20 left-6 z-[65] w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-4 space-y-3 animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-purple-600" /> Quick Scratchpad
            </span>
            <button
              onClick={() => setShowCalculator(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={calcInput}
              onChange={(e) => setCalcInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCalcEval()}
              placeholder="e.g. 0.052 * 10 * 8500"
              className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2 outline-none border border-slate-200 focus:border-purple-400 text-slate-800 dark:text-slate-200"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCalcEval}
                className="flex-1 bg-slate-900 text-white py-1.5 rounded-xl text-xs font-semibold hover:bg-black transition-colors"
              >
                Calculate
              </button>
              <button
                onClick={() => {
                  setCalcInput("");
                  setCalcResult(null);
                }}
                className="px-3 bg-slate-100 text-slate-600 py-1.5 rounded-xl text-xs font-semibold hover:bg-slate-200"
              >
                C
              </button>
            </div>
            {calcResult !== null && (
              <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 text-xs font-mono font-bold text-purple-900 dark:text-purple-300 text-center">
                = {calcResult}
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Tutor Chat */}
      {showAIChat && currentQuestion && (
        <AIChat
          onClose={() => setShowAIChat(false)}
          category={category || ""}
          userId={userId || ""}
          currentQuestion={currentQuestion}
        />
      )}
    </div>
  );
};

export default Questions;
