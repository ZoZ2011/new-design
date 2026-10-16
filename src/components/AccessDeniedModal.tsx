import { Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ACCESS_DENIED_MESSAGE } from "@/lib/accessControl";

interface AccessDeniedModalProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export const AccessDeniedModal = ({
  open,
  onClose,
  message = ACCESS_DENIED_MESSAGE,
}: AccessDeniedModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-jakarta">
      <div className="relative w-full max-w-md bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">
            تم تقييد الوصول
          </h2>
          <p className="text-destructive font-semibold text-base sm:text-lg leading-relaxed dir-rtl" dir="rtl">
            {message}
          </p>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          يرجى التواصل مع مسؤول النظام أو المحاضر لتفعيل هذا القسم لحسابك.
        </p>

        <Button
          onClick={onClose}
          className="w-full h-11 font-semibold rounded-xl"
        >
          حسناً، فهمت
        </Button>
      </div>
    </div>
  );
};

export default AccessDeniedModal;
