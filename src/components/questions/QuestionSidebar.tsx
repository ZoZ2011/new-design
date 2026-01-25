import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Question } from "@/data/questions";

interface QuestionSidebarProps {
  questions: Question[];
  currentIndex: number;
  submittedAnswers: { [key: number]: boolean };
  selectedAnswers: { [key: number]: number };
  correctCount: number;
  onQuestionSelect: (index: number) => void;
  onSettingsClick: () => void;
}

export const QuestionSidebar = ({
  questions,
  currentIndex,
  submittedAnswers,
  selectedAnswers,
  correctCount,
  onQuestionSelect,
  onSettingsClick,
}: QuestionSidebarProps) => {
  const submittedCount = Object.keys(submittedAnswers).filter(k => submittedAnswers[parseInt(k)]).length;
  const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div className="w-72 bg-card rounded-2xl p-6 shadow-lg h-fit sticky top-8">
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
              onClick={() => onQuestionSelect(index)}
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
  );
};
