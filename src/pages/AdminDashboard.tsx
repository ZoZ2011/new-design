import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Users, FileText, RefreshCw, Edit3 } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const panels = [
    {
      title: "Update Questions",
      description: "Replace or modify questions in existing categories",
      icon: RefreshCw,
      action: () => navigate("/control-center/questions?mode=update"),
    },
    {
      title: "Add New Category",
      description: "Create a new question category with uploaded questions",
      icon: FileText,
      action: () => navigate("/control-center/questions?mode=add"),
    },
    {
      title: "Control ID Numbers",
      description: "Add, remove, and manage user IDs and access permissions",
      icon: Users,
      action: () => navigate("/control-center/users"),
    },
  ];

  return (
    <div className="min-h-screen bg-background font-jakarta">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground">Control Center</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Control Center
            </h1>
          </div>
          <p className="text-muted-foreground text-sm pl-[52px]">
            Platform administration and content management
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {panels.map(({ title, description, icon: Icon, action }) => (
            <button
              key={title}
              onClick={action}
              className="group text-left bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground mb-1">{title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
