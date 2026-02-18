import { useNavigate } from "react-router-dom";
import { BookOpen, ClipboardList, ChevronRight, Award, Target, TrendingUp, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Questions", value: "500+", icon: Target },
    { label: "Categories", value: "8+", icon: Award },
    { label: "Pass Rate", value: "94%", icon: TrendingUp },
    { label: "Certified Users", value: "1,200+", icon: Shield },
  ];

  const features = [
    {
      title: "IADC Exercises",
      description: "International Association of Drilling Contractors — Well Services & Drilling disciplines",
      path: "/exercises/iacd",
      badge: "Popular",
    },
    {
      title: "IWCF Exercises",
      description: "International Well Control Forum — Drilling & Well Intervention disciplines",
      path: "/exercises/iwcf",
      badge: "New",
    },
    {
      title: "Study Manuals",
      description: "Access comprehensive study materials and reference guides",
      path: "/manuals",
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background font-jakarta">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Well Control Club</span>
          </div>
          <button
            onClick={() => navigate("/exercises")}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Get Started →
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium border border-primary/20 animate-fade-in">
              <Award className="w-3.5 h-3.5" />
              Industry-Certified Training Platform
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
              Master Well Control
              <span className="block text-primary mt-1">With Confidence</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Prepare for your IADC and IWCF certifications with structured exercises, 
              real exam-style questions, and comprehensive study materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => navigate("/exercises")}
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                Start Practicing
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={() => navigate("/manuals")}
                className="inline-flex items-center justify-center gap-2 bg-muted text-foreground px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-muted/70 transition-all duration-200 border border-border hover:-translate-y-0.5 active:translate-y-0"
              >
                <BookOpen className="w-4 h-4" />
                Browse Manuals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-2xl p-4 sm:p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Navigation Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Training Programs</h2>
          <p className="text-muted-foreground text-sm mt-1">Choose your certification path</p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
          {features.map(({ title, description, path, badge }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="group text-left bg-card border border-border rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              {badge && (
                <span className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20">
                  {badge}
                </span>
              )}
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
              <div className="flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                Open
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground text-sm mt-1">Three simple steps to certification</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: "01", title: "Choose a Program", desc: "Select your certification body — IADC or IWCF — and then your discipline." },
              { step: "02", title: "Practice Questions", desc: "Work through real exam-style questions with immediate feedback on each answer." },
              { step: "03", title: "Track Progress", desc: "Monitor your score, review mistakes, and build confidence before exam day." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center sm:text-left">
                <div className="text-4xl sm:text-5xl font-extrabold text-primary/20 mb-3">{step}</div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-primary rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-foreground mb-3">Ready to Get Certified?</h2>
            <p className="text-primary-foreground/80 text-sm sm:text-base mb-6 max-w-md mx-auto">
              Join thousands of well control professionals who trained with us and passed their certification exams.
            </p>
            <button
              onClick={() => navigate("/exercises")}
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-7 py-3.5 rounded-xl font-bold text-base hover:bg-primary-foreground/90 transition-all duration-200 shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Now — It's Free
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Shield className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm text-foreground">Well Control Club</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 Well Control Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
