import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MessageSquare, Settings as SettingsIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getQuestionsByCategory, Question } from "@/data/questions";
import AIChat from "@/components/AIChat";
import { supabase } from "@/integrations/supabase/client";
import { ScreenshotBlocker } from "@/components/ScreenshotBlocker";

const Questions = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [key: number]: boolean }>({});
  const [showAIChat, setShowAIChat] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [autoSubmit, setAutoSubmit] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const navigate = useNavigate();
  const { category } = useParams();
  const userId = localStorage.getItem("userId");

  const questions = getQuestionsByCategory(category || "");

  // Use the ScreenshotBlocker component
  useEffect(() => {
    // Additional page-specific protections
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
        // Load progress from backend
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

        // Load settings from backend
        const { data: settingsData } = await supabase
          .from("user_settings")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (settingsData) {
          // Apply theme
          if (settingsData.theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }

          // Apply font size
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

  // Save progress to backend
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
      // Success sound: ascending notes
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    } else {
      // Error sound: descending note
      oscillator.frequency.setValueAtTime(392, audioContext.currentTime); // G4
      oscillator.frequency.setValueAtTime(349.23, audioContext.currentTime + 0.15); // F4
    }
    
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number, question: Question) => {
    if (!submittedAnswers[questionId]) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: answerIndex
      }));

      saveProgress(questionId, answerIndex, false);

      // Auto-submit if enabled
      if (autoSubmit) {
        setTimeout(() => handleSubmit(question), 100);
      }
    }
  };

  const handleSubmit = (question: Question) => {
    const selectedAnswer = selectedAnswers[question.id];
    
    if (selectedAnswer === undefined) {
      toast.error("Please select an answer");
      return;
    }

    setSubmittedAnswers(prev => ({
      ...prev,
      [question.id]: true
    }));

    saveProgress(question.id, selectedAnswer, true);

    const isCorrect = selectedAnswer === question.correctAnswer;
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
        toast.success("Progress cleared");
      } catch (error) {
        console.error("Error clearing progress:", error);
        toast.error("Failed to clear progress");
      }
    }
  };

  const calculateProgress = () => {
    const submitted = Object.keys(submittedAnswers).length;
    const total = questions.length;
    return total > 0 ? (submitted / total) * 100 : 0;
  };

  const formatQuestionText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return <li key={index} className="ml-4">{line.trim().substring(1).trim()}</li>;
      }
      return <p key={index}>{line}</p>;
    });
  };

  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4 no-select">
      <ScreenshotBlocker />
      <div className="max-w-4xl mx-auto pt-8 pb-20 space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
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
              onClick={() => navigate(`/settings/${category}`)}
              title="Settings"
            >
              <SettingsIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold text-primary">
            {(() => {
              if (!category) return "";
              
              // Special handling for IADC OGOR mock tests
              if (category.includes("iadc-ogor-mock-test")) {
                const testNumber = category.split("-").pop();
                return `IADC OGOR Mock Test #${testNumber}`;
              }
              
              return category.split("-").map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(" ");
            })()}
          </h1>
          <p className="text-muted-foreground">Answer all questions to complete the assessment</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Object.keys(submittedAnswers).length} / {questions.length}</span>
          </div>
          <Progress value={calculateProgress()} />
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={question.id} className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-black dark:text-black">
                  {index + 1}
                </h3>
                <div className="text-black dark:text-black whitespace-pre-wrap">
                  {formatQuestionText(question.question)}
                </div>
                {question.image && (
                  <div className="mt-4">
                    <img 
                      src={question.image} 
                      alt={`Question ${question.id} diagram`}
                      className="max-w-full h-auto rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <RadioGroup
                value={selectedAnswers[question.id]?.toString()}
                onValueChange={(value) => handleAnswerSelect(question.id, parseInt(value), question)}
                disabled={submittedAnswers[question.id]}
              >
                {question.options.map((option, optionIndex) => {
                  const isCorrectAnswer = optionIndex === question.correctAnswer;
                  const isSelectedAnswer = selectedAnswers[question.id] === optionIndex;
                  const isSubmitted = submittedAnswers[question.id];
                  
                  let labelColor = "text-black dark:text-black";
                  if (isSubmitted) {
                    if (isCorrectAnswer) {
                      labelColor = "text-green-600 dark:text-green-500 font-semibold";
                    } else if (isSelectedAnswer) {
                      labelColor = "text-red-600 dark:text-red-500 font-semibold";
                    }
                  }
                  
                  return (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={optionIndex.toString()}
                        id={`q${question.id}-option${optionIndex}`}
                      />
                      <Label
                        htmlFor={`q${question.id}-option${optionIndex}`}
                        className={`cursor-pointer flex-1 ${labelColor}`}
                      >
                        {option}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>

              {submittedAnswers[question.id] && (
                <div className={`p-4 rounded-lg ${
                  selectedAnswers[question.id] === question.correctAnswer
                    ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                }`}>
                  {selectedAnswers[question.id] === question.correctAnswer
                    ? "✓ Correct!"
                    : `✗ Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`
                  }
                </div>
              )}

              <div className="flex gap-2">
                {!submittedAnswers[question.id] && !autoSubmit && (
                  <Button
                    onClick={() => handleSubmit(question)}
                    disabled={selectedAnswers[question.id] === undefined}
                  >
                    Submit Answer
                  </Button>
                )}
                {!submittedAnswers[question.id] && autoSubmit && (
                  <div className="text-sm text-muted-foreground">
                    Auto-submit enabled
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentQuestion(question);
                    setShowAIChat(true);
                  }}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask AI
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {showAIChat && currentQuestion && (
        <AIChat
          onClose={() => {
            setShowAIChat(false);
            setCurrentQuestion(null);
          }}
          category={category || ""}
          userId={userId || ""}
          currentQuestion={currentQuestion}
        />
      )}
    </div>
  );
};

export default Questions;
