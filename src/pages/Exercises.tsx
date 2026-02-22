import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import iadcLogo from "@/assets/iadc-logo.png";
import iwcfLogo from "@/assets/iwcf-logo.jpg";

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
      logo: iadcLogo,
    },
    {
      id: "iwcf",
      name: "IWCF",
      fullName: "International Well Control Forum",
      path: "/exercises/iwcf",
      disciplines: ["Drilling", "Well Intervention"],
      color: "from-accent/10 to-accent/5",
      logo: iwcfLogo,
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
          {organizations.map(({ id, name, fullName, path, disciplines, color, logo }) => (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`group text-left bg-gradient-to-br ${color} border border-border rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={logo} alt={`${name} logo`} className="w-16 h-16 object-contain rounded-xl shrink-0" />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">{name}</h2>
                    <p className="text-sm text-muted-foreground mb-2">{fullName}</p>
                    <div className="flex flex-wrap gap-2">
                      {disciplines.map((d) => (
                        <span key={d} className="text-xs bg-background/60 text-muted-foreground border border-border px-2.5 py-1 rounded-full">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
