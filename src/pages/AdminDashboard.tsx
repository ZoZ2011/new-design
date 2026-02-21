import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Users, FileText, RefreshCw, LogIn } from "lucide-react";
import { toast } from "sonner";

const ADMIN_CODE = "WELLCONTROL.ADMIN.2025";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuth = () => {
    if (accessCode.trim() === ADMIN_CODE) {
      setAuthenticated(true);
      toast.success("Admin access granted");
    } else {
      toast.error("Invalid access code");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background font-jakarta flex flex-col">
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
            <span className="text-sm font-semibold text-foreground">Administration</span>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Admin Access
              </h1>
              <p className="text-muted-foreground text-sm">Enter your administration code to continue</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="space-y-2">
                <label htmlFor="accessCode" className="text-sm font-semibold text-foreground">
                  Access Code
                </label>
                <Input
                  id="accessCode"
                  type="password"
                  value={accessCode}
                  onChange={e => setAccessCode(e.target.value)}
                  placeholder="Enter admin access code"
                  onKeyPress={e => e.key === "Enter" && handleAuth()}
                  className="h-11 text-base"
                />
              </div>

              <Button
                onClick={handleAuth}
                className="w-full h-11 font-semibold text-base gap-2 hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-primary/20"
              >
                <LogIn className="w-4 h-4" />
                Authenticate
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const panels = [
    {
      title: "User Management",
      description: "Add, remove, and manage user IDs and access permissions",
      icon: Users,
      action: () => navigate("/control-center/users"),
    },
    {
      title: "Upload Questions",
      description: "Add new question categories with Word file uploads and image attachments",
      icon: FileText,
      action: () => navigate("/control-center/questions?mode=add"),
    },
    {
      title: "Update Questions",
      description: "Replace or modify questions in existing categories",
      icon: RefreshCw,
      action: () => navigate("/control-center/questions?mode=update"),
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
