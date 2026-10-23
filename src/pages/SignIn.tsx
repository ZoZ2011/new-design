import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { signinCheck } from "@/lib/backendApi";
import { ArrowRight, ArrowLeft, Loader2, ShieldCheck, Shield } from "lucide-react";

interface SignInProps {
  onSuccess?: () => void;
  initialMode?: "candidate" | "instructor";
}

const ADMIN_CODE = "ADMIN DASH";

export const SignIn = ({ onSuccess, initialMode = "candidate" }: SignInProps) => {
  const [mode, setMode] = useState<"candidate" | "instructor">(initialMode);
  const [idNumber, setIdNumber] = useState("");
  const [adminId, setAdminId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();

  const handleCandidateSignIn = async () => {
    const trimmedId = idNumber.trim();
    if (!trimmedId) {
      setErrorMsg("Please enter your ID number");
      return;
    }

    // Admin redirect if entered in candidate field
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

  const handleInstructorSignIn = () => {
    const trimmed = adminId.trim();
    if (!trimmed) {
      setErrorMsg("Please enter your Administrator ID");
      return;
    }

    if (trimmed.toUpperCase() === ADMIN_CODE) {
      navigate("/control-center");
    } else {
      setErrorMsg("Invalid Administrator ID. Please try again.");
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

          {/* Top: Well Control Training Portal */}
          <div className="relative z-10 flex items-center">
            <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white select-none">
              Well Control Training Portal
            </span>
          </div>

          {/* Middle Headline */}
          <div className="relative z-10 my-8 sm:my-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              {mode === "candidate" ? "Train with confidence." : "Instructor & Admin Portal"}
            </h1>

            <p className="text-white/85 text-xs sm:text-sm mt-3 max-w-md font-normal leading-relaxed">
              {mode === "candidate"
                ? "Practice realistic well control scenarios, strengthen your technical knowledge, and track your exam readiness."
                : "Manage candidate access, review syllabus question banks, monitor activity, and oversee system settings."}
            </p>
          </div>

          {/* Bottom 3 Step Cards */}
          <div className="relative z-10 grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {/* Box 1 */}
            <div className="bg-white text-slate-900 rounded-[16px] p-3.5 sm:p-4 shadow-md flex flex-col justify-between min-h-[145px] sm:min-h-[155px] transition-transform hover:-translate-y-0.5">
              <span className="w-6 h-6 rounded-full bg-[#2563eb] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                1
              </span>
              <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-snug">
                {mode === "candidate"
                  ? "Enter your registered candidate ID number to start"
                  : "Enter your authorized Administrator ID number"}
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white/15 backdrop-blur-md border border-white/25 text-white rounded-[16px] p-3.5 sm:p-4 flex flex-col justify-between min-h-[145px] sm:min-h-[155px] transition-transform hover:-translate-y-0.5">
              <span className="w-6 h-6 rounded-full bg-white/25 text-white text-xs font-semibold flex items-center justify-center">
                2
              </span>
              <p className="text-[11px] sm:text-xs font-medium text-white/95 leading-snug">
                {mode === "candidate"
                  ? "Practice realistic exam questions with step explanations"
                  : "Access Question Manager, User Roster & Answer Editor"}
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white/15 backdrop-blur-md border border-white/25 text-white rounded-[16px] p-3.5 sm:p-4 flex flex-col justify-between min-h-[145px] sm:min-h-[155px] transition-transform hover:-translate-y-0.5">
              <span className="w-6 h-6 rounded-full bg-white/25 text-white text-xs font-semibold flex items-center justify-center">
                3
              </span>
              <p className="text-[11px] sm:text-xs font-medium text-white/95 leading-snug">
                {mode === "candidate"
                  ? "Achieve high passing scores on official exams"
                  : "Oversee live candidate testing and permissions"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Sign In Form) */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm mx-auto space-y-7">
            
            {mode === "candidate" ? (
              <>
                {/* Form Title: Candidate Login */}
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Candidate Login
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium">
                    Enter your registered ID to continue
                  </p>
                </div>

                {/* Candidate Form */}
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
                      onKeyDown={(e) => e.key === "Enter" && handleCandidateSignIn()}
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
                    onClick={handleCandidateSignIn}
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

                  {/* Instructor Access Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("instructor");
                        setErrorMsg("");
                      }}
                      className="w-full h-11 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <Shield className="w-4 h-4 text-[#2563eb]" />
                      <span>Instructor Access</span>
                    </button>
                  </div>
                </div>

                {/* Footer note */}
                <div className="pt-4 border-t border-slate-100 text-center">
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Need access or facing issues? Contact your course administrator or enter your instructor PIN.
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Form Title: Instructor Access */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] mb-3">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Instructor Access
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium">
                    Enter your Administrator ID to access the Control Center
                  </p>
                </div>

                {/* Instructor Form */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="adminId"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
                    >
                      Administrator / Instructor ID
                    </label>
                    <input
                      id="adminId"
                      type="text"
                      value={adminId}
                      onChange={(e) => {
                        setAdminId(e.target.value);
                        setErrorMsg("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleInstructorSignIn()}
                      placeholder="e.g. ADMIN DASH"
                      autoFocus
                      className="w-full h-12 px-4 rounded-xl bg-[#f8fafc] border border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium text-base focus:bg-white focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100/70 transition-all outline-none"
                    />
                    {errorMsg && (
                      <p className="text-destructive text-xs font-semibold mt-2 animate-fade-in">
                        {errorMsg}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleInstructorSignIn}
                    className="w-full h-12 bg-slate-900 hover:bg-black text-white font-semibold text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enter Control Center</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Back to Candidate Login */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("candidate");
                        setErrorMsg("");
                      }}
                      className="text-xs text-slate-500 hover:text-slate-900 font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer py-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Candidate Login</span>
                    </button>
                  </div>
                </div>

                {/* Footer note */}
                <div className="pt-4 border-t border-slate-100 text-center">
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Authorized instructors and examiners only. Enter ADMIN DASH to continue.
                  </p>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
