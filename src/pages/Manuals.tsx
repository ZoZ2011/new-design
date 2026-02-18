import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, FileText, Clock } from "lucide-react";

const Manuals = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-jakarta">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3 flex-wrap">
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground">Manuals</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Study Manuals</h1>
          <p className="text-muted-foreground">Reference materials and guides for certification preparation</p>
        </div>

        {/* Coming soon card */}
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Manuals Coming Soon</h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
              We're preparing comprehensive study guides and reference manuals. Check back soon!
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl py-2.5 px-4 w-fit mx-auto border border-border">
            <Clock className="w-3.5 h-3.5" />
            In preparation
          </div>
        </div>

        {/* Placeholder cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {["IADC Well Control Manual", "IWCF Reference Guide", "Drilling Engineering Basics", "Well Intervention Procedures"].map((title) => (
            <div
              key={title}
              className="bg-muted/30 border border-border rounded-xl p-4 flex items-center gap-3 opacity-50"
            >
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{title}</div>
                <div className="text-xs text-muted-foreground">Coming soon</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manuals;
