import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getQuestionsByCategory, Question } from "@/data/questions";
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
  const [showAIChat, setShowAIChat] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [autoSubmit, setAutoSubmit] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const navigate = useNavigate();
  const { category } = useParams();
  const userId = localStorage.getItem("userId");

  const questions = getQuestionsByCategory(category || "");
  const currentQuestion = questions[currentQuestionIndex];

  // Calculate correct answers count
  const correctCount = useMemo(() => {
    return questions.filter(
      q => submittedAnswers[q.id] && selectedAnswers[q.id] === q.correctAnswer
    ).length;
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
    
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    
    if (selectedAnswer === undefined) {
      toast.error("Please select an answer");
      return;
    }

    setSubmittedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));

    saveProgress(currentQuestion.id, selectedAnswer, true);

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    playSound(isCorrect);

    if (isCorrect) {
      toast.success("Correct! Well done!");
    } else {
      toast.error("Incorrect. Try reviewing the material.");
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
        toast.success("Progress cleared");
      } catch (error) {
        console.error("Error clearing progress:", error);
        toast.error("Failed to clear progress");
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
    <div className="min-h-screen bg-background p-6 no-select">
      <ScreenshotBlocker />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
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
              <Button
                variant="outline"
                size="icon"
                onClick={handleClearProgress}
                title="Clear Progress"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Quiz Card */}
            <div className="bg-card rounded-2xl shadow-lg p-8">
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
                />
              </div>

              <QuestionNavigation
                currentIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                isSubmitted={submittedAnswers[currentQuestion.id] || false}
                hasSelectedAnswer={selectedAnswers[currentQuestion.id] !== undefined}
                autoSubmit={autoSubmit}
                onPrevious={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                onNext={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                onSubmit={handleSubmit}
                onAskAI={() => setShowAIChat(true)}
              />
            </div>
          </div>

          {/* Sidebar */}
          <QuestionSidebar
            questions={questions}
            currentIndex={currentQuestionIndex}
            submittedAnswers={submittedAnswers}
            selectedAnswers={selectedAnswers}
            correctCount={correctCount}
            onQuestionSelect={setCurrentQuestionIndex}
            onSettingsClick={() => navigate(`/settings/${category}`)}
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
