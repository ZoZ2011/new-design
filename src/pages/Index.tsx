import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Compass,
  Play,
  ArrowRight,
  ArrowLeft,
  Star,
  MapPin,
  CreditCard,
  Grid,
  ChevronRight,
  X,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Sparkles,
  Plane,
} from "lucide-react";
import iwcfLogo from "@/assets/iwcf-logo.jpg";
import iadcLogo from "@/assets/iadc-logo.png";

const Index = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const nav = [
    { label: "ABOUT", path: "/manuals" },
    { label: "TOUR", path: "/exercises" },
    { label: "PACKAGE", path: "/exercises/iwcf" },
    { label: "CONTACT", path: "/manuals" },
  ];

  // Popular Destinations / Courses carousel cards
  const destinations = [
    {
      title: "Forest Wild Life",
      subtitle: "NRT, Indonesia",
      courseName: "IWCF Drilling",
      rating: "4.7",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
      path: "/exercises/iwcf/drilling",
    },
    {
      title: "Forest Wild Life",
      subtitle: "NRT, Indonesia",
      courseName: "IADC Well Services",
      rating: "4.7",
      img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=80",
      path: "/exercises/iacd/well-services",
    },
    {
      title: "Forest Wild Life",
      subtitle: "NRT, Indonesia",
      courseName: "Well Intervention",
      rating: "4.7",
      img: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&auto=format&fit=crop&q=80",
      path: "/exercises/iwcf/well-intervention",
    },
    {
      title: "Ocean Breeze",
      subtitle: "BALI, Indonesia",
      courseName: "OGOR Mock Tests",
      rating: "4.9",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
      path: "/exercises/iacd/well-services/ogor/mock-tests",
    },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollDestinations = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-2 sm:p-5 lg:p-8 font-jakarta flex justify-center items-start">
      {/* Central Canvas Container matching the reference design */}
      <div className="w-full max-w-[1140px] bg-white rounded-[36px] sm:rounded-[44px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 p-4 sm:p-8 lg:p-10 space-y-12 sm:space-y-16 overflow-hidden">
        
        {/* ================= TOP NAVIGATION ================= */}
        <header className="flex items-center justify-between px-2 pt-2">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#1d68f2]" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-900" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-[0.15em] text-slate-900 uppercase">
                UIXSHUVO
              </span>
              <span className="text-[9px] font-semibold text-slate-400 tracking-wider -mt-1 uppercase">
                WELL CONTROL
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 tracking-[0.14em] transition-colors uppercase cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Button */}
          {userId ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-100 text-slate-900 rounded-full pl-3 pr-3.5 py-1.5 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ID: {userId}</span>
                {userName && <span className="text-slate-500 hidden sm:inline">({userName})</span>}
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("userId");
                  localStorage.removeItem("userName");
                  window.location.reload();
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/exercises")}
              className="bg-[#111827] hover:bg-black text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all hover:scale-105 cursor-pointer"
            >
              Book Trip
            </button>
          )}
        </header>

        {/* ================= HERO SECTION ================= */}
        <section className="relative rounded-[32px] sm:rounded-[38px] overflow-hidden bg-gradient-to-br from-[#cbe5f8] via-[#dcedfa] to-[#bfe1f8] min-h-[540px] sm:min-h-[620px] p-6 sm:p-10 lg:p-14 flex flex-col justify-between border border-blue-100/60 shadow-inner">
          
          {/* Airplane Soaring into Cloud Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&auto=format&fit=crop&q=80"
              alt="Magic of Flight"
              className="absolute -right-10 -top-8 w-[82%] sm:w-[70%] lg:w-[65%] h-full object-contain object-right-top opacity-95 transition-transform duration-1000 hover:scale-105"
            />
            {/* Soft Cloud Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#dcedfa] via-[#dcedfa]/80 to-transparent w-3/4 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#cbe5f8] via-[#cbe5f8]/50 to-transparent pointer-events-none" />
          </div>

          {/* Left Vertical Step Tracker & Hero Content */}
          <div className="relative z-10 flex gap-4 sm:gap-7 items-start">
            
            {/* 1-2-3 Step Timeline Pill */}
            <div className="flex flex-col items-center pt-2 select-none shrink-0">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/60 backdrop-blur-md border border-white/90 text-slate-700 text-[11px] sm:text-xs font-bold flex items-center justify-center shadow-xs">
                1
              </span>
              <div className="w-px h-10 sm:h-14 bg-white/70" />
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-slate-600 text-[11px] sm:text-xs font-semibold flex items-center justify-center">
                2
              </span>
              <div className="w-px h-10 sm:h-14 bg-white/70" />
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-slate-600 text-[11px] sm:text-xs font-semibold flex items-center justify-center">
                3
              </span>
            </div>

            {/* Hero Main Copy */}
            <div className="max-w-[460px] pt-1">
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-2 sm:mb-3">
                ELEVATE YOUR TRAVEL JOURNEY
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                Experience <br />
                The Magic Of <br />
                Flight!
              </h1>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex items-center gap-3">
                <button
                  onClick={() => navigate("/exercises")}
                  className="bg-[#1d68f2] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-lg shadow-blue-500/25 transition-all hover:scale-105 cursor-pointer"
                >
                  Book A Trip Now
                </button>
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  aria-label="Play video"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#1d68f2] shadow-md hover:shadow-lg flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-[#1d68f2] ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Right Floating Cutout Card */}
          <div className="relative z-10 self-end mt-12 sm:mt-0">
            <div className="bg-white/95 backdrop-blur-md rounded-[24px] p-4 sm:p-5 shadow-xl border border-white/80 max-w-[270px]">
              <div
                onClick={() => navigate("/exercises")}
                className="flex items-center justify-between text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors pb-3 border-b border-slate-100"
              >
                <span>Know More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="mt-3 flex items-center gap-3">
                {/* Overlapping Avatars */}
                <div className="flex -space-x-2 overflow-hidden shrink-0">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt=""
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt=""
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                    alt=""
                  />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                    Awesome Places
                  </h4>
                  <p className="text-[9px] text-slate-500 leading-tight mt-0.5">
                    Discover The World One Adventure At A Time!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOLLOW & PARTNERS STRIP ================= */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-6 py-1 border-b border-slate-100 pb-10">
          {/* Social Follow */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">Follow</span>
            <div className="flex items-center gap-2">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors text-xs"
              >
                <Twitter className="w-3 h-3" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors text-xs"
              >
                <Facebook className="w-3 h-3" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors text-xs"
              >
                <Instagram className="w-3 h-3" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors text-xs"
              >
                <Linkedin className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Partner Brands */}
          <div className="flex items-center flex-wrap justify-center gap-8 sm:gap-12 opacity-70">
            <span className="text-slate-800 font-bold text-sm sm:text-base flex items-center gap-1.5 tracking-tight">
              <svg className="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              airbnb
            </span>
            <span className="text-slate-800 font-extrabold text-sm sm:text-base tracking-tight">
              Booking.com
            </span>
            <span className="text-slate-800 font-bold text-sm sm:text-base tracking-tight flex items-center gap-1">
              <span className="w-3 h-3 rounded-full border-2 border-orange-500" />
              trivago
            </span>
            <span className="text-slate-800 font-bold text-sm sm:text-base tracking-tight flex items-center gap-1">
              <Plane className="w-3.5 h-3.5 text-blue-500" />
              Expedia
            </span>
          </div>
        </section>

        {/* ================= SECTION 1: POPULAR DESTINATION ================= */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Popular Destination
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                Unleash Your Wanderlust With SkyWings
              </p>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollDestinations(-1)}
                aria-label="Previous"
                className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollDestinations(1)}
                aria-label="Next"
                className="w-8 h-8 rounded-full bg-slate-900 text-white hover:bg-black flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {destinations.map((dest, i) => (
              <div
                key={i}
                data-card
                onClick={() => navigate(dest.path)}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-[28px] bg-white p-3 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-slate-100">
                  <img
                    src={dest.img}
                    alt={dest.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Card Meta */}
                <div className="pt-3.5 pb-1 px-1.5 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      {dest.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{dest.subtitle}</span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <span className="bg-[#1d68f2] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-white" />
                    <span>{dest.rating}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 2: JOURNEY TO THE SKIES MADE SIMPLE! ================= */}
        <section className="space-y-8 pt-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Journey To The Skies Made Simple!
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
              Travelling Is A Wonderful Way To Explore New Places, Learn About Different Cultures, And Gain Unique Experiences.
            </p>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Card 1: Find Your Destination */}
            <div
              onClick={() => navigate("/exercises")}
              className="bg-[#f8fafc] rounded-[28px] p-7 sm:p-8 border border-slate-100 flex flex-col justify-between min-h-[300px] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Find Your <br />
                  Destination
                </h3>
              </div>
            </div>

            {/* Card 2: Center Feature Card (Book A Ticket) */}
            <div
              onClick={() => navigate("/exercises")}
              className="bg-gradient-to-b from-[#1d68f2] to-[#1554cc] text-white rounded-[28px] p-7 sm:p-8 shadow-xl shadow-blue-500/25 relative overflow-hidden flex flex-col justify-between min-h-[330px] cursor-pointer hover:shadow-2xl transition-all group"
            >
              {/* Circular Cutout Image Accent */}
              <div className="absolute top-4 right-4 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white/20 overflow-hidden shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80"
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Top Left Icon Pill */}
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-xs">
                <Grid className="w-5 h-5" />
              </div>

              {/* Title & Desc */}
              <div className="mt-8 pr-12">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Book <br />
                  A Ticket
                </h3>
                <p className="text-xs text-white/80 leading-relaxed mt-2.5 max-w-[210px]">
                  Travelling Is A Wonderful Way To Explore New Places, Learn About Different Cultures, And Gain Unique Experiences.
                </p>
              </div>

              {/* Bottom Link */}
              <div className="mt-6 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-white hover:text-white/90">
                <span>LEARN MORE</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Pay & Start Journey */}
            <div
              onClick={() => navigate("/exercises")}
              className="bg-[#f8fafc] rounded-[28px] p-7 sm:p-8 border border-slate-100 flex flex-col justify-between min-h-[300px] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Pay & <br />
                  Start Journey
                </h3>
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION 3: UNLEASH WANDERLUST WITH SKYWINGS ================= */}
        <section className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Photo Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-[3/4] rounded-[32px] overflow-hidden shadow-lg border border-slate-100 bg-sky-50">
                <img
                  src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=800&auto=format&fit=crop&q=80"
                  alt="Beach Holiday"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Discount Badge at bottom */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 flex items-center justify-between shadow-md border border-white/80">
                  <div className="text-[#1d68f2] font-black text-lg">
                    20% OFF
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold text-right leading-tight">
                    Till 30 September, <br />
                    2026
                  </div>
                </div>
              </div>
            </div>

            {/* Right Typographic Content */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              
              <div className="space-y-4">
                {/* Row 1: UNLEASH + small text */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    UNLEASH
                  </h2>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Travelling Is A Wonderful Way To Explore New Places, Learn About Different Cultures, And Gain Unique
                  </p>
                </div>

                {/* Row 2: WANDERLUST WITH */}
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight">
                    WANDERLUST WITH
                  </h2>
                </div>

                {/* Row 3: small text + SKYWINGS */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Travelling Is A Wonderful Way To Explore New Places, Learn About Different Cultures
                  </p>
                  <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    SKYWINGS
                  </h2>
                </div>
              </div>

              {/* Bottom CTA Pill Bar */}
              <div
                onClick={() => navigate("/exercises")}
                className="w-full bg-gradient-to-r from-[#d9edf9] via-[#e5f3fd] to-[#d9edf9] hover:from-[#cbe7f7] hover:to-[#dceffa] text-slate-900 rounded-full py-4 px-8 text-center text-sm font-bold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book A Flight Now</span>
                <ArrowRight className="w-4 h-4" />
              </div>

            </div>

          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1d68f2]" />
            <span className="font-semibold text-slate-600">UIXSHUVO • Well Control Club</span>
          </div>
          <span>© 2026 Well Control Club. All rights reserved.</span>
        </footer>

      </div>

      {/* Video / Feature Preview Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-xl w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1d68f2]" />
              <h3 className="font-bold text-slate-900 text-lg">Experience Well Control Prep</h3>
            </div>
            <div className="aspect-video rounded-2xl bg-slate-900 overflow-hidden relative flex items-center justify-center text-white p-6 text-center">
              <div className="space-y-2">
                <Play className="w-12 h-12 text-[#1d68f2] mx-auto opacity-80" />
                <p className="font-semibold text-sm">Interactive Exam Simulation & Topic Drills</p>
                <p className="text-xs text-slate-400">Practice IWCF Level 3, Level 4 & IADC Well Services</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  navigate("/exercises");
                }}
                className="bg-[#1d68f2] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-blue-600 transition-colors"
              >
                Start Practicing Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
