import { useState, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Shield, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signinCheck } from "@/lib/backendApi";

/** Asks for the candidate ID before any page except home, sign-in and admin pages. */
const IdGate = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [, force] = useState(0);

  const p = location.pathname;
  const exempt = p === "/" || p.startsWith("/control-center") || p.startsWith("/signin");
  if (exempt || localStorage.getItem("userId")) return <>{children}</>;

  const submit = async () => {
    const v = id.trim();
    if (!v) return setErr("Please enter your ID");
    if (v.toUpperCase() === "ADMIN DASH") return navigate("/control-center");
    setLoading(true);
    const res = await signinCheck({ userId: v });
    setLoading(false);
    if (!res.ok) return setErr(res.error || "Invalid ID Number");
    localStorage.setItem("userId", v);
    force((n) => n + 1);
  };

  return (
    <div className="min-h-screen bg-background font-jakarta flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 items-center justify-center">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Sign In</h1>
          <p className="text-sm text-muted-foreground">Enter your ID number to continue</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <Input
            value={id}
            onChange={(e) => { setId(e.target.value); setErr(""); }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Enter your ID number"
            className="h-11"
            disabled={loading}
          />
          {err && <p className="text-destructive text-xs">{err}</p>}
          <Button onClick={submit} disabled={loading} className="w-full h-11 gap-2">
            <LogIn className="w-4 h-4" />
            {loading ? "Checking..." : "Continue"}
          </Button>
          <button onClick={() => navigate("/")} className="w-full text-xs text-muted-foreground hover:text-foreground">
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdGate;
