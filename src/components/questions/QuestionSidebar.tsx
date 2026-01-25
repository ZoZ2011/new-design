import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Question } from "@/data/questions";

interface QuestionSidebarProps {
  questions: Question[];
  currentIndex: number;
  submittedAnswers: { [key: number]: boolean };
  selectedAnswers: { [key: number]: number };
  correctCount: number;
  isOpen: boolean;
  onQuestionSelect: (index: number) => void;
  onSettingsClick: () => void;
  onClose: () => void;
}

export const QuestionSidebar = ({
  questions,
  currentIndex,
  submittedAnswers,
  selectedAnswers,
  correctCount,
  isOpen,
  onQuestionSelect,
  onSettingsClick,
  onClose,
}: QuestionSidebarProps) => {
  const submittedCount = Object.keys(submittedAnswers).filter(k => submittedAnswers[parseInt(k)]).length;
  const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  const handleQuestionSelect = (index: number) => {
    onQuestionSelect(index);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed right-0 top-0 h-full w-72 bg-card shadow-lg z-50 transition-transform duration-300 lg:relative lg:translate-x-0 lg:z-0 lg:h-fit lg:rounded-2xl lg:sticky lg:top-8",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 lg:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="p-6 pt-16 lg:pt-6">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-foreground">{percentage}%</div>
            <div className="text-muted-foreground text-sm mt-1">
              You got {correctCount} answers correct
            </div>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {questions.map((question, index) => {
              const isSubmitted = submittedAnswers[question.id];
              const isCorrect = isSubmitted && selectedAnswers[question.id] === question.correctAnswer;
              const isCurrent = index === currentIndex;
              
              return (
                <button
                  key={question.id}
                  onClick={() => handleQuestionSelect(index)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200",
                    isCurrent 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "hover:bg-muted",
                    isSubmitted && !isCurrent && (
                      isCorrect 
                        ? "text-success" 
                        : "text-destructive"
                    )
                  )}
                >
                  Question {index + 1}
                </button>
              );
            })}
          </div>

          <Button
            variant="ghost"
            className="w-full mt-6 justify-start"
            onClick={onSettingsClick}
          >
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
    </>
  );
};
