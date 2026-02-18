import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Drill, Wrench } from "lucide-react";

const IACD = () => {
  const navigate = useNavigate();

  const disciplines = [
    {
      name: "Well Services",
      description: "IADC Well Services certification preparation with practice questions",
      path: "/exercises/iacd/well-services",
      icon: Wrench,
    },
    {
      name: "Drilling",
      description: "IADC Drilling certification exam practice and mock tests",
      path: "/exercises/iacd/drilling",
      icon: Drill,
    },
  ];

  return (
    <div className="min-h-screen bg-background font-jakarta">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3 flex-wrap">
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <span className="text-border">›</span>
          <button onClick={() => navigate("/exercises")} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Exercises</button>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground">IADC</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/20">
            IADC — International Association of Drilling Contractors
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Select Discipline</h1>
          <p className="text-muted-foreground">Choose the certification discipline you want to practice</p>
        </div>

        <div className="grid gap-4">
          {disciplines.map(({ name, description, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="group text-left bg-card border border-border rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{name}</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IACD;
