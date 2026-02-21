import { Question } from "@/data/questions";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  selectedAnswer: number | undefined;
  isSubmitted: boolean;
  onAnswerSelect: (answerIndex: number) => void;
}

export const QuestionCard = ({
  question,
  questionIndex,
  selectedAnswer,
  isSubmitted,
  onAnswerSelect,
}: QuestionCardProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-foreground">
          <span className="font-bold">Q{questionIndex + 1}. </span>
          <span className="whitespace-pre-wrap">{question.question}</span>
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

      <div className="space-y-3">
        {question.options.map((option, optionIndex) => {
          const isCorrectAnswer = optionIndex === question.correctAnswer;
          const isSelectedAnswer = selectedAnswer === optionIndex;
          
          let optionStyles = "bg-muted/50 hover:bg-muted border-transparent";
          
          if (isSubmitted) {
            if (isCorrectAnswer) {
              optionStyles = "bg-success/10 border-success text-success";
            } else if (isSelectedAnswer) {
              optionStyles = "bg-destructive/10 border-destructive text-destructive";
            }
          } else if (isSelectedAnswer) {
            optionStyles = "bg-primary/10 border-primary";
          }
          
          const letter = String.fromCharCode(65 + optionIndex);
          
          return (
            <button
              key={optionIndex}
              onClick={() => !isSubmitted && onAnswerSelect(optionIndex)}
              disabled={isSubmitted}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
                optionStyles,
                !isSubmitted && "cursor-pointer",
                isSubmitted && "cursor-default"
              )}
            >
              <span className="font-medium">{letter}) </span>
              {option}
            </button>
          );
        })}
      </div>

      {isSubmitted && (
        <div className={cn(
          "p-4 rounded-xl",
          selectedAnswer === question.correctAnswer
            ? "bg-success/10 text-success"
            : "bg-destructive/10 text-destructive"
        )}>
          {selectedAnswer === question.correctAnswer
            ? "✓ Correct!"
            : `✗ Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`
          }
        </div>
      )}
    </div>
  );
};
