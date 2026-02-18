import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Drill, Wrench } from "lucide-react";

const Exercises = () => {
  const navigate = useNavigate();

  const organizations = [
    {
      id: "iadc",
      name: "IADC",
      fullName: "International Association of Drilling Contractors",
      path: "/exercises/iacd",
      disciplines: ["Well Services", "Drilling"],
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
    },
    {
      id: "iwcf",
      name: "IWCF",
      fullName: "International Well Control Forum",
      path: "/exercises/iwcf",
      disciplines: ["Drilling", "Well Intervention"],
      color: "from-accent/10 to-accent/5",
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-jakarta">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground">Exercises</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Exercises</h1>
          <p className="text-muted-foreground">Select your certification organization to continue</p>
        </div>

        <div className="grid gap-4">
          {organizations.map(({ id, name, fullName, path, disciplines, color, iconColor, iconBg }) => (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`group text-left bg-gradient-to-br ${color} border border-border rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${iconBg} mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <Drill className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">{name}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{fullName}</p>
                  <div className="flex flex-wrap gap-2">
                    {disciplines.map((d) => (
                      <span key={d} className="text-xs bg-background/60 text-muted-foreground border border-border px-2.5 py-1 rounded-full">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 ${iconColor} mt-1 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0`} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
