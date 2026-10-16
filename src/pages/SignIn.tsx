import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { signinCheck } from "@/lib/backendApi";
import { ArrowRight, Loader2 } from "lucide-react";

interface SignInProps {
  onSuccess?: () => void;
}

const ADMIN_CODE = "ADMIN DASH";

export const SignIn = ({ onSuccess }: SignInProps) => {
  const [idNumber, setIdNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();

  const handleSignIn = async () => {
    const trimmedId = idNumber.trim();
    if (!trimmedId) {
      setErrorMsg("Please enter your ID number");
      return;
    }

    // Admin redirect
    if (trimmedId.toUpperCase() === ADMIN_CODE) {
      navigate("/control-center");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await signinCheck({ userId: trimmedId, category });
      setLoading(false);

      if (!res.ok) {
        setErrorMsg(
          res.error === "Access Denied"
            ? "لا، لا يمكن فتحه، هذا غير متاح حاليًا من الـ admin"
            : res.error || "Invalid ID Number"
        );
        return;
      }

      localStorage.setItem("userId", trimmedId);
      if (res.name) {
        localStorage.setItem("userName", res.name);
      }

      if (onSuccess) {
        onSuccess();
      } else if (category) {
        navigate(`/questions/${category}`);
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg("Failed to verify ID. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] p-3 sm:p-4 lg:p-6 flex items-center justify-center font-jakarta">
      {/* Outer Card with clean white canvas and subtle shadow */}
      <div className="w-full max-w-[1220px] min-h-[calc(100vh-2.5rem)] bg-white rounded-[24px] grid grid-cols-1 lg:grid-cols-12 p-3 sm:p-4 gap-6 lg:gap-8 items-stretch shadow-[0_10px_35px_-10px_rgba(0,0,0,0.06)] border border-slate-200/60">
        
        {/* Left Column (Blue Hero Panel with 18px radius and equal margins) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#1d4ed8] rounded-[18px] p-8 sm:p-10 lg:p-12 flex flex-col justify-between text-white relative overflow-hidden min-h-[540px] shadow-sm">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#1e40af]/30 blur-3xl pointer-events-none" />

          {/* Top: Hany Metwally (Without any logo icon next to it) */}
          <div className="relative z-10 flex items-center">
            <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white select-none">
              Hany Metwally
            </span>
          </div>

          {/* Middle Headline (Without "Join us to learn" badge) */}
          <div className="relative z-10 my-8 sm:my-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Start your Course
            </h1>

            <p className="text-white/85 text-xs sm:text-sm mt-3 max-w-md font-normal leading-relaxed">
              Follow these simple steps to access your well control exams and practice materials.
            </p>
          </div>

          {/* Bottom 3 Step Cards with ~7-8 descriptive words each */}
          <div className="relative z-10 grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {/* Box 1 (Active) */}
            <div className="bg-white text-slate-900 rounded-[16px] p-3.5 sm:p-4 shadow-md flex flex-col justify-between min-h-[145px] sm:min-h-[155px] transition-transform hover:-translate-y-0.5">
              <span className="w-6 h-6 rounded-full bg-[#2563eb] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                1
              </span>
              <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-snug">
                Enter your registered candidate ID number to start
              </p>
            </div>

            {/* Box 2 (Step 2) */}
            <div className="bg-white/15 backdrop-blur-md border border-white/25 text-white rounded-[16px] p-3.5 sm:p-4 flex flex-col justify-between min-h-[145px] sm:min-h-[155px] transition-transform hover:-translate-y-0.5">
              <span className="w-6 h-6 rounded-full bg-white/25 text-white text-xs font-semibold flex items-center justify-center">
                2
              </span>
              <p className="text-[11px] sm:text-xs font-medium text-white/95 leading-snug">
                Practice realistic exam questions with step explanations
              </p>
            </div>

            {/* Box 3 (Step 3) */}
            <div className="bg-white/15 backdrop-blur-md border border-white/25 text-white rounded-[16px] p-3.5 sm:p-4 flex flex-col justify-between min-h-[145px] sm:min-h-[155px] transition-transform hover:-translate-y-0.5">
              <span className="w-6 h-6 rounded-full bg-white/25 text-white text-xs font-semibold flex items-center justify-center">
                3
              </span>
              <p className="text-[11px] sm:text-xs font-medium text-white/95 leading-snug">
                Achieve high passing scores on official exams
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Sign In Form) */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm mx-auto space-y-7">
            {/* Form Title */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Join Us
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium">
                Enter your registered ID to continue
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="candidateId"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
                >
                  Candidate ID
                </label>
                <input
                  id="candidateId"
                  type="text"
                  value={idNumber}
                  onChange={(e) => {
                    setIdNumber(e.target.value);
                    setErrorMsg("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                  placeholder="e.g. 1024"
                  disabled={loading}
                  autoFocus
                  className="w-full h-12 px-4 rounded-xl bg-[#f8fafc] border border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium text-base focus:bg-white focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100/70 transition-all outline-none"
                />
                {errorMsg && (
                  <p
                    className="text-destructive text-xs font-semibold mt-2 animate-fade-in"
                    dir={errorMsg.includes("admin") ? "rtl" : "ltr"}
                  >
                    {errorMsg}
                  </p>
                )}
              </div>

              <button
                onClick={handleSignIn}
                disabled={loading}
                className="w-full h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-base rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Footer note */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Need access or facing issues? Contact your course administrator or enter your instructor PIN.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
