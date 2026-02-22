import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Menu } from "lucide-react";
import { Question } from "@/data/questions";
import { useDynamicQuestions } from "@/hooks/useDynamicQuestions";
import AIChat from "@/components/AIChat";
import { supabase } from "@/integrations/supabase/client";
import { ScreenshotBlocker } from "@/components/ScreenshotBlocker";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { QuestionSidebar } from "@/components/questions/QuestionSidebar";
import { QuestionProgress } from "@/components/questions/QuestionProgress";
import { QuestionNavigation } from "@/components/questions/QuestionNavigation";

const Questions = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [key: number]: boolean }>({});
  const [textAnswers, setTextAnswers] = useState<{ [key: number]: string }>({});
  const [showAIChat, setShowAIChat] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [autoSubmit, setAutoSubmit] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();
  const userId = localStorage.getItem("userId");

  const { questions, loading: questionsLoading } = useDynamicQuestions(category || "");
  const currentQuestion = questions[currentQuestionIndex];

  // Calculate correct answers count
  const correctCount = useMemo(() => {
    return questions.filter(q => {
      if (!submittedAnswers[q.id]) return false;
      const sel = selectedAnswers[q.id];
      return q.correctAnswers ? q.correctAnswers.includes(sel) : sel === q.correctAnswer;
    }).length;
  }, [questions, submittedAnswers, selectedAnswers]);

  // Screenshot protection styles
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "questions-protection";
    style.textContent = `
      .no-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById("questions-protection");
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  // Load progress and settings from backend
  useEffect(() => {
    if (!userId) {
      navigate(`/signin/${category}`);
      return;
    }

    const loadData = async () => {
      try {
        const { data: progressData } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", userId)
          .eq("category", category);

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

        const { data: settingsData } = await supabase
          .from("user_settings")
          .select("*")
          .eq("user_id", userId)
          .single();

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

    loadData();
  }, [userId, category, navigate]);

  const saveProgress = async (questionId: number, answer: number | null, isSubmitted: boolean) => {
    if (!userId || !category) return;

    try {
      await supabase
        .from("user_progress")
        .upsert({
          user_id: userId,
          category: category,
          question_id: questionId.toString(),
          selected_answer: answer,
          is_submitted: isSubmitted,
        }, {
          onConflict: "user_id,category,question_id"
        });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const playSound = (isCorrect: boolean) => {
    if (!soundEffects) return;
    
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
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!currentQuestion || submittedAnswers[currentQuestion.id]) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));

    saveProgress(currentQuestion.id, answerIndex, false);

    if (autoSubmit) {
      setTimeout(() => handleSubmit(), 100);
    }
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;
    
    const isStructured = currentQuestion.questionType === "combination" && currentQuestion.options.length === 0;
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    
    if (!isStructured && selectedAnswer === undefined) {
      return;
    }

    setSubmittedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));

    saveProgress(currentQuestion.id, isStructured ? -1 : selectedAnswer, true);

    if (!isStructured) {
      const isCorrect = currentQuestion.correctAnswers 
        ? currentQuestion.correctAnswers.includes(selectedAnswer)
        : selectedAnswer === currentQuestion.correctAnswer;
      playSound(isCorrect);
    }
  };

  const handleClearProgress = async () => {
    if (!userId || !category) return;
    
    if (window.confirm("Are you sure you want to clear all progress? This cannot be undone.")) {
      try {
        await supabase
          .from("user_progress")
          .delete()
          .eq("user_id", userId)
          .eq("category", category);

        setSelectedAnswers({});
        setSubmittedAnswers({});
        setCurrentQuestionIndex(0);
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
    
    return category.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  if (!userId) {
    return null;
  }

  if (questionsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading questions...</h2>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No questions found</h2>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6 no-select overflow-x-hidden">
      <ScreenshotBlocker />
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex gap-4 lg:gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleClearProgress}
                  title="Clear Progress"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                  title="Open Menu"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quiz Card */}
            <div className="bg-card rounded-2xl shadow-lg p-4 sm:p-8 overflow-hidden">
              <h1 className="text-2xl font-bold text-foreground mb-4">
                {getCategoryTitle()}
              </h1>

              <QuestionProgress 
                current={currentQuestionIndex} 
                total={questions.length} 
              />

              <div className="mt-8">
                <QuestionCard
                  question={currentQuestion}
                  questionIndex={currentQuestionIndex}
                  selectedAnswer={selectedAnswers[currentQuestion.id]}
                  isSubmitted={submittedAnswers[currentQuestion.id] || false}
                  onAnswerSelect={handleAnswerSelect}
                  textAnswer={textAnswers[currentQuestion.id] || ""}
                  onTextAnswerChange={(value) => setTextAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))}
                />
              </div>

              <QuestionNavigation
                currentIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                isSubmitted={submittedAnswers[currentQuestion.id] || false}
                hasSelectedAnswer={selectedAnswers[currentQuestion.id] !== undefined || (currentQuestion.questionType === "combination" && currentQuestion.options.length === 0)}
                autoSubmit={autoSubmit}
                onPrevious={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                onNext={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                onSubmit={handleSubmit}
                onAskAI={() => setShowAIChat(true)}
              />
            </div>
          </div>

          <QuestionSidebar
            questions={questions}
            currentIndex={currentQuestionIndex}
            submittedAnswers={submittedAnswers}
            selectedAnswers={selectedAnswers}
            correctCount={correctCount}
            isOpen={sidebarOpen}
            onQuestionSelect={setCurrentQuestionIndex}
            onSettingsClick={() => navigate(`/settings/${category}`)}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

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
