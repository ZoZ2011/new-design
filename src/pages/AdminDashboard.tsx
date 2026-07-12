import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Users, FileText, RefreshCw, Edit3, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { verifyAdminPin, setAdminPin, getAdminPin, clearAdminPin } from "@/lib/backendApi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(!!getAdminPin());
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  // Verify existing pin on mount
  useEffect(() => {
    const existing = getAdminPin();
    if (!existing) return;
    (async () => {
      const ok = await verifyAdminPin(existing);
      if (!ok) {
        clearAdminPin();
        setAuthed(false);
      }
    })();
  }, []);

  const handleLogin = async () => {
    if (!pin.trim()) return;
    setVerifying(true);
    setError("");
    const ok = await verifyAdminPin(pin.trim());
    setVerifying(false);
    if (!ok) {
      setError("Invalid admin PIN");
      return;
    }
    setAdminPin(pin.trim());
    setAuthed(true);
    toast.success("Admin session started");
  };

  const handleLogout = () => {
    clearAdminPin();
    setAuthed(false);
    setPin("");
    toast.success("Signed out of admin");
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background font-jakarta flex flex-col">
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
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Admin Sign-In
              </h1>
              <p className="text-muted-foreground text-sm">
                Enter the admin PIN to manage the platform
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Admin PIN
                </label>
                <Input
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError("");
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter admin PIN"
                  disabled={verifying}
                  className="h-11 text-base"
                />
                {error && (
                  <p className="text-destructive text-xs mt-1">{error}</p>
                )}
              </div>
              <Button
                onClick={handleLogin}
                className="w-full h-11 font-semibold text-base gap-2"
                disabled={verifying}
              >
                <LogIn className="w-4 h-4" />
                {verifying ? "Verifying..." : "Unlock"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      title: "Edit Answers",
      description: "Change the correct answer for any question across all categories",
      icon: Edit3,
      action: () => navigate("/control-center/answers"),
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
          <button
            onClick={handleLogout}
            className="ml-auto text-xs text-muted-foreground hover:text-destructive"
          >
            Sign out
          </button>
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
