import { Question } from "@/data/questions";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Bookmark, BookmarkCheck, Lightbulb, Sparkles } from "lucide-react";
import { useState } from "react";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  selectedAnswer: number | undefined;
  selectedAnswers?: number[];
  isSubmitted: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  onMultiAnswerToggle?: (answerIndex: number) => void;
  textAnswer?: string;
  onTextAnswerChange?: (value: string) => void;
  isFlagged?: boolean;
  onToggleFlag?: () => void;
  showExplanation?: boolean;
  onToggleExplanation?: () => void;
}

export const QuestionCard = ({
  question,
  questionIndex,
  selectedAnswer,
  selectedAnswers = [],
  isSubmitted,
  onAnswerSelect,
  onMultiAnswerToggle,
  textAnswer = "",
  onTextAnswerChange,
  isFlagged = false,
  onToggleFlag,
  showExplanation = false,
  onToggleExplanation,
}: QuestionCardProps) => {
  const isKillSheet = question.questionType === "kill_sheet";
  const isStructured = !isKillSheet && question.questionType === "combination" && question.options.length === 0;
  const isMultiple = question.questionType === "mcq_multiple";
  const requiredCount = question.correctAnswers?.length || 1;

  const [killSheetAnswers, setKillSheetAnswers] = useState<string[]>(
    isKillSheet ? new Array(question.options.length).fill("") : []
  );
  const [killSheetSubmitted, setKillSheetSubmitted] = useState(false);

  const allKillSheetFilled = isKillSheet && killSheetAnswers.every((a) => a.trim().length > 0);

  const handleKillSheetSubmit = () => {
    if (allKillSheetFilled) {
      setKillSheetSubmitted(true);
    }
  };

  const getSelectLabel = () => {
    if (isStructured || isKillSheet) return null;
    if (isMultiple) return `Select ${requiredCount} Answer${requiredCount > 1 ? "s" : ""}`;
    return "Single Choice";
  };

  // Structured Kill Sheet Question
  if (isKillSheet) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-semibold px-2.5 py-1 bg-slate-50 text-slate-700 border-slate-200">
            Interactive Kill Sheet Problem
          </Badge>
          {onToggleFlag && (
            <button
              onClick={onToggleFlag}
              className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                isFlagged
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-white text-slate-500 hover:text-slate-800 border-slate-200"
              }`}
            >
              {isFlagged ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" /> : <Bookmark className="w-3.5 h-3.5" />}
              {isFlagged ? "Bookmarked" : "Bookmark"}
            </button>
          )}
        </div>

        <div className="text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
          <span className="font-bold text-slate-900 dark:text-white mr-1.5">{questionIndex + 1}.</span>
          {question.question}
        </div>

        {question.image && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 max-w-2xl bg-white p-2">
            <img src={question.image} alt="Diagram" className="max-w-full h-auto rounded-xl mx-auto" />
          </div>
        )}

        <div className="space-y-3 pt-2">
          {question.options.map((option, idx) => {
            const isCorrect =
              killSheetSubmitted &&
              killSheetAnswers[idx]?.trim().toLowerCase() === (question.killSheetAnswers?.[idx] || "").trim().toLowerCase();
            const isWrong =
              killSheetSubmitted &&
              killSheetAnswers[idx]?.trim().toLowerCase() !== (question.killSheetAnswers?.[idx] || "").trim().toLowerCase();

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCorrect
                    ? "bg-emerald-50/60 border-emerald-300"
                    : isWrong
                    ? "bg-rose-50/60 border-rose-300"
                    : "bg-slate-50/80 border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {idx + 1}. {option}
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      disabled={killSheetSubmitted}
                      value={killSheetAnswers[idx] || ""}
                      onChange={(e) => {
                        const newAns = [...killSheetAnswers];
                        newAns[idx] = e.target.value;
                        setKillSheetAnswers(newAns);
                      }}
                      placeholder="Enter value..."
                      className="px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white outline-none focus:border-slate-500 w-36"
                    />
                    {killSheetSubmitted && (
                      <span className="text-xs font-bold">
                        {isCorrect ? (
                          <Check className="w-4 h-4 text-emerald-600 inline" />
                        ) : (
                          <span className="text-rose-600 text-xs">Expected: {question.killSheetAnswers?.[idx]}</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!killSheetSubmitted ? (
          <Button
            onClick={handleKillSheetSubmit}
            disabled={!allKillSheetFilled}
            className="rounded-xl px-6 h-10 font-semibold"
          >
            Submit All Calculations
          </Button>
        ) : (
          <div className="p-4 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold">
            Calculation review complete. Review individual steps above.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Question Header & Meta Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {getSelectLabel() && (
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/80">
              {getSelectLabel()}
            </span>
          )}
        </div>

        {/* Action: Bookmark / Flag Question */}
        {onToggleFlag && (
          <button
            type="button"
            onClick={onToggleFlag}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              isFlagged
                ? "bg-amber-50 text-amber-800 border-amber-300 shadow-2xs"
                : "bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-slate-200"
            }`}
          >
            {isFlagged ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isFlagged ? "Marked for review" : "Mark for review"}</span>
          </button>
        )}
      </div>

      {/* Main Question Text */}
      <div className="text-slate-900 dark:text-slate-100 text-base sm:text-lg font-medium leading-relaxed">
        <span className="font-bold text-slate-900 mr-2">{questionIndex + 1}.</span>
        <span className="whitespace-pre-wrap">{question.question}</span>
      </div>

      {/* Attached Diagram / Image */}
      {question.image && (
        <div className="rounded-2xl overflow-hidden border border-slate-200/90 bg-white p-3 shadow-xs max-w-2xl">
          <img
            src={question.image}
            alt={`Diagram for Question ${question.id}`}
            className="max-w-full h-auto rounded-xl mx-auto object-contain max-h-96"
          />
        </div>
      )}

      {/* Structured / Open Text Answer */}
      {isStructured && (
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Your Written Answer</label>
            <Textarea
              value={textAnswer}
              onChange={(e) => onTextAnswerChange?.(e.target.value)}
              placeholder="Type your worked explanation or calculated answer here..."
              disabled={isSubmitted}
              className="min-h-[100px] rounded-xl border-slate-200 bg-white text-sm focus:border-slate-400 focus:ring-0 leading-relaxed"
            />
          </div>
          {isSubmitted && question.answerText && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Official Syllabus Solution</p>
              <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                {question.answerText.replace(/^answer:\s*/i, "").trim()}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Multiple Choice Options List with Minimal Quiet Style */}
      {!isStructured && question.options.length > 0 && (
        <div className="space-y-2.5 pt-1">
          {question.options.map((option, optionIndex) => {
            const isCorrect = question.correctAnswers
              ? question.correctAnswers.includes(optionIndex)
              : optionIndex === question.correctAnswer;

            const isSelected = isMultiple
              ? selectedAnswers.includes(optionIndex)
              : selectedAnswer === optionIndex;

            const letter = String.fromCharCode(65 + optionIndex);

            // Calm, non-flashy state styles
            let cardStyle =
              "bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800 shadow-2xs";
            let badgeStyle = "bg-slate-100 text-slate-700 border-slate-200";

            if (isSubmitted) {
              if (isCorrect) {
                cardStyle = "bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-xs";
                badgeStyle = "bg-emerald-600 text-white border-emerald-600";
              } else if (isSelected) {
                cardStyle = "bg-rose-50/70 border-rose-300 text-rose-950 shadow-xs";
                badgeStyle = "bg-rose-600 text-white border-rose-600";
              } else {
                cardStyle = "bg-white/60 border-slate-200/60 text-slate-400";
                badgeStyle = "bg-slate-100 text-slate-400 border-slate-200";
              }
            } else if (isSelected) {
              cardStyle = "bg-slate-900 border-slate-900 text-white shadow-sm";
              badgeStyle = "bg-white text-slate-950 border-white font-bold";
            }

            return (
              <button
                key={optionIndex}
                type="button"
                onClick={() => {
                  if (isSubmitted) return;
                  if (isMultiple && onMultiAnswerToggle) {
                    onMultiAnswerToggle(optionIndex);
                  } else {
                    onAnswerSelect(optionIndex);
                  }
                }}
                disabled={isSubmitted}
                className={cn(
                  "w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-150 flex items-start gap-3.5 group",
                  cardStyle,
                  !isSubmitted && "cursor-pointer hover:border-slate-300",
                  isSubmitted && "cursor-default"
                )}
              >
                {/* Letter indicator (A, B, C, D) */}
                <span
                  className={cn(
                    "w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 transition-colors mt-0.5",
                    badgeStyle
                  )}
                >
                  {letter}
                </span>

                {/* Option text */}
                <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                  {option}
                </div>

                {/* Status icon after submit */}
                {isSubmitted && (
                  <span className="shrink-0 mt-1">
                    {isCorrect ? (
                      <Check className="w-5 h-5 text-emerald-600" />
                    ) : isSelected ? (
                      <X className="w-5 h-5 text-rose-600" />
                    ) : null}
                  </span>
                )}
              </button>
            );
          })}

          {isMultiple && !isSubmitted && (
            <p className="text-xs text-slate-500 font-medium text-center pt-1">
              {selectedAnswers.length} of {requiredCount} selected
            </p>
          )}
        </div>
      )}

      {/* Feedback Banner & Answer Explanation Toggle */}
      {!isStructured && isSubmitted && (
        <div className="pt-2 space-y-3">
          {(() => {
            let isAllCorrect = false;
            if (isMultiple && question.correctAnswers) {
              isAllCorrect =
                question.correctAnswers.every((i) => selectedAnswers.includes(i)) &&
                selectedAnswers.length === question.correctAnswers.length;
            } else {
              isAllCorrect = question.correctAnswers
                ? question.correctAnswers.includes(selectedAnswer!)
                : selectedAnswer === question.correctAnswer;
            }

            return (
              <div
                className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                  isAllCorrect
                    ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                    : "bg-rose-50/80 border-rose-200 text-rose-900"
                }`}
              >
                <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                  <p className="font-bold flex items-center gap-1.5">
                    {isAllCorrect ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Correct Answer</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-rose-600" />
                        <span>Incorrect Answer</span>
                      </>
                    )}
                  </p>
                  {!isAllCorrect && (
                    <p className="text-xs text-slate-700 pt-0.5">
                      Correct option:{" "}
                      <span className="font-semibold">
                        {question.correctAnswers
                          ? question.correctAnswers
                              .map((i) => `${String.fromCharCode(65 + i)}) ${question.options[i]}`)
                              .join("; ")
                          : `${String.fromCharCode(65 + question.correctAnswer)}) ${
                              question.options[question.correctAnswer]
                            }`}
                      </span>
                    </p>
                  )}
                </div>

                {onToggleExplanation && (
                  <button
                    onClick={onToggleExplanation}
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200 text-slate-700 hover:bg-white transition-colors cursor-pointer shrink-0"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>{showExplanation ? "Hide Explanation" : "Explanation"}</span>
                  </button>
                )}
              </div>
            );
          })()}

          {/* Collapsible Verified Answer Explanation */}
          {showExplanation && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-700 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Verified Syllabus Rationale & Reference</span>
              </div>
              <p className="leading-relaxed">
                {question.answerText
                  ? question.answerText.replace(/^answer:\s*/i, "")
                  : "Based on IWCF/IADC standard well control principles. Correct procedures maintain primary barrier control and prevent unplanned influx migration."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
