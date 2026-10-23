import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  X,
  Facebook,
  Youtube,
  Menu,
  Calendar,
  Building2,
  MapPin,
} from "lucide-react";

const Index = () => {
  // Projects / Portfolio items
  const projects = [
    {
      title: "EcoHarvest Business Center",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      tag: "LEARN DETAILS",
      drag: false,
    },
    {
      title: "AquaVista Marina Build",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
      tag: "LEARN DETAILS",
      drag: false,
    },
    {
      title: "BioUrban Living Complex",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
      tag: "LEARN DETAILS",
      dragIndicator: true,
    },
    {
      title: "TechHaven Residences",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
      tag: "LEARN DETAILS",
      drag: false,
    },
  ];

  // Services list
  const services = [
    {
      title: "Green space & sustainable landscape design",
      desc: "We develop innovative and sustainable green space designs for urban spaces, housing estates and business centers.",
      img: "https://images.unsplash.com/photo-1558445420-4e2e2a862660?w=200&auto=format&fit=crop&q=80",
    },
    {
      title: "Smart home and automation technologies",
      desc: "We integrate advanced smart home technologies to improve the comfort and energy efficiency of residential and commercial properties.",
      img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=200&auto=format&fit=crop&q=80",
    },
    {
      title: "Engineering and construction of solar power systems",
      desc: "We specialize in the design and construction of solar power systems for residential and commercial buildings.",
      img: "https://images.unsplash.com/photo-1509391365360-e835f377c86a?w=200&auto=format&fit=crop&q=80",
    },
    {
      title: "Innovative architectural and structural design",
      desc: "Our team of architects and engineers develops innovative and unique projects that combine modern design and cutting-edge technology.",
      img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=200&auto=format&fit=crop&q=80",
    },
    {
      title: "Consulting and certification of sustainable projects",
      desc: "We provide consulting services and certify projects related to sustainable development and commercial energy.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&auto=format&fit=crop&q=80",
    },
  ];

  // Featured Case Studies
  const caseStudies = [
    {
      title: "FUTURECO BUSINESS CENTER",
      date: "15 June",
      type: "Business Center",
      place: "Downtown Business District",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80",
      grayscale: true,
    },
    {
      title: "INFINITY GREEN RESTAURANT",
      date: "20 July",
      type: "Commercial",
      place: "Eco Park Avenue",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80",
      grayscale: false,
    },
    {
      title: "RENEWASPHERE DISTRICT",
      date: "10 August",
      type: "Residential",
      place: "Green Valley",
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80",
      grayscale: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f6] py-6 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Outer Main Container */}
      <div className="max-w-[1320px] mx-auto bg-white rounded-[40px] shadow-2xl border border-slate-100 p-6 sm:p-10 lg:p-12 space-y-16">
        
        {/* ================= HEADER ================= */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-100">
          {/* Logo & Tag */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900">NexArch</span>
              <span className="w-2 h-2 rounded-full bg-slate-900" />
            </div>
            <div className="hidden sm:block text-[10px] tracking-widest font-bold text-slate-400 uppercase bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
              CONSTRUCTION COMPANY
            </div>
          </div>

          {/* Social Icons & Menu */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors">
                <Facebook className="w-3.5 h-3.5 fill-current" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors">
                <Youtube className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>

            <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs px-4 py-2 rounded-full transition-colors">
              <Menu className="w-3.5 h-3.5" />
              <span>MENU</span>
            </button>

            <div className="hidden lg:flex items-center gap-1 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>

            <button className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-xs">
              CONTACT US
            </button>
          </div>
        </header>

        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-6 pb-12">
          {/* Top Project Closed badge with avatar */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&auto=format&fit=crop&q=80" alt="Project" className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              248+ PROJECTS CLOSED
            </span>
          </div>

          {/* Headline with Floating Avatars */}
          <div className="relative max-w-4xl">
            {/* Top-right floating image */}
            <div className="absolute right-12 -top-6 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg hidden sm:block">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=150&auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-black tracking-tight text-slate-900 leading-[1.08]">
              Building visions & <br />
              creating <span className="font-serif italic font-normal text-slate-800">reality</span> with NexArch
            </h1>

            {/* Center floating image */}
            <div className="absolute left-1/3 -bottom-8 w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-lg hidden md:block">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=150&auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Subtitle & CTA button */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-slate-500 text-sm sm:text-base max-w-md leading-relaxed font-normal">
              About us. We are a futuristic construction company focused on innovative technologies and sustainability.
            </p>

            <button className="bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-7 py-4 rounded-full flex items-center gap-4 transition-all shadow-lg hover:scale-105 group self-start sm:self-auto">
              <span>START A PROJECT</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </section>

        {/* ================= PROJECTS SLIDER SECTION ================= */}
        <section className="space-y-6 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="group relative rounded-[28px] overflow-hidden bg-slate-100 aspect-[4/5] flex flex-col justify-between p-5 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold px-3.5 py-1.5 rounded-full shadow-xs">
                    {proj.tag}
                  </span>

                  {proj.dragIndicator && (
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-xs">
                      &lt; DRAG &gt;
                    </span>
                  )}

                  <button className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md text-slate-900 flex items-center justify-center hover:bg-white transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-4">
                  {/* Pagination dots */}
                  <div className="flex items-center gap-1.5 justify-end">
                    {[0, 1, 2, 3].map((dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`w-1.5 h-1.5 rounded-full ${
                          dotIdx === idx ? "bg-white w-3" : "bg-white/50"
                        } transition-all`}
                      />
                    ))}
                  </div>

                  <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight">
                    {proj.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-8">
            <div className="bg-slate-900 w-1/4 h-full rounded-full" />
          </div>
        </section>

        {/* ================= SERVICES SECTION ================= */}
        <section className="space-y-12 pt-10">
          <div className="text-center">
            <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-slate-900">
              Services
            </h2>
          </div>

          {/* Services Grid Layout matching Image 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <div className="bg-[#f8f9fb] rounded-[32px] p-8 border border-slate-100 flex flex-col justify-between space-y-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <img src={services[0].img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <h3 className="font-extrabold text-xl text-slate-900 leading-snug">
                  {services[0].title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {services[0].desc}
                </p>
              </div>
              <button className="self-start bg-white hover:bg-slate-900 hover:text-white text-slate-900 border border-slate-200 font-bold text-[11px] px-5 py-2.5 rounded-full transition-all shadow-xs">
                READ MORE
              </button>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <img src={services[1].img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <h3 className="font-extrabold text-xl text-slate-900 leading-snug">
                  {services[1].title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {services[1].desc}
                </p>
              </div>
              <button className="self-start bg-white hover:bg-slate-900 hover:text-white text-slate-900 border border-slate-200 font-bold text-[11px] px-5 py-2.5 rounded-full transition-all shadow-xs">
                READ MORE
              </button>
            </div>

            {/* Service 3 */}
            <div className="bg-[#f8f9fb] rounded-[32px] p-8 border border-slate-100 flex flex-col justify-between space-y-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <img src={services[2].img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <h3 className="font-extrabold text-xl text-slate-900 leading-snug">
                  {services[2].title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {services[2].desc}
                </p>
              </div>
              <button className="self-start bg-white hover:bg-slate-900 hover:text-white text-slate-900 border border-slate-200 font-bold text-[11px] px-5 py-2.5 rounded-full transition-all shadow-xs">
                READ MORE
              </button>
            </div>

          </div>

          {/* Second Row of Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#f8f9fb] rounded-[32px] p-8 border border-slate-100 flex flex-col justify-between space-y-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <img src={services[3].img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <h3 className="font-extrabold text-xl text-slate-900 leading-snug">
                  {services[3].title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {services[3].desc}
                </p>
              </div>
              <button className="self-start bg-white hover:bg-slate-900 hover:text-white text-slate-900 border border-slate-200 font-bold text-[11px] px-5 py-2.5 rounded-full transition-all shadow-xs">
                READ MORE
              </button>
            </div>

            <div className="bg-[#f8f9fb] rounded-[32px] p-8 border border-slate-100 flex flex-col justify-between space-y-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <img src={services[4].img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <h3 className="font-extrabold text-xl text-slate-900 leading-snug">
                  {services[4].title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {services[4].desc}
                </p>
              </div>
              <button className="self-start bg-white hover:bg-slate-900 hover:text-white text-slate-900 border border-slate-200 font-bold text-[11px] px-5 py-2.5 rounded-full transition-all shadow-xs">
                READ MORE
              </button>
            </div>
          </div>
        </section>

        {/* ================= FEATURED CASE STUDIES / PROJECTS ================= */}
        <section className="space-y-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <div
                key={i}
                className="group relative rounded-[32px] overflow-hidden bg-slate-900 aspect-[4/5] flex flex-col justify-between p-6 shadow-xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={cs.img}
                    alt={cs.title}
                    className={`w-full h-full object-cover ${cs.grayscale ? "grayscale contrast-125" : ""} group-hover:scale-105 transition-transform duration-700`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                </div>

                {/* Top Tags/Metadata Pill */}
                <div className="relative z-10 flex flex-wrap gap-2 items-center">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                    <Calendar className="w-3 h-3" />
                    <span>{cs.date}</span>
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                    <Building2 className="w-3 h-3" />
                    <span>{cs.type}</span>
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                    <MapPin className="w-3 h-3" />
                    <span>{cs.place}</span>
                  </span>
                </div>

                {/* Bottom Title & CTA */}
                <div className="relative z-10 space-y-6">
                  <h3 className="text-white font-black text-2xl sm:text-3xl leading-tight">
                    {cs.title}
                  </h3>

                  <button className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-4 px-6 rounded-full flex items-center justify-between transition-all shadow-lg">
                    <span>START A PROJECT</span>
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIALS SECTION ================= */}
        <section className="space-y-12 pt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 text-center sm:text-left">
              Recent <span className="font-serif italic font-normal">feedback</span> <br />
              from our clients
            </h2>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-3">
              <button className="w-12 h-12 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-all cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-slate-900 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Cards Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Left Preview Card */}
            <div className="bg-[#f8f9fb] rounded-[32px] p-8 border border-slate-100 opacity-60 hidden lg:block">
              <p className="text-xs text-slate-600 leading-relaxed">
                "NexArch was a pleasure and a productive one. They built our sustainable business center and they turned our vision into a reality. They provided us with great ideas to reduce our energy costs and their service was professional and tailored to our needs."
              </p>
            </div>

            {/* Center Main Testimonial Card */}
            <div className="bg-white rounded-[36px] p-8 sm:p-10 border-2 border-slate-100 shadow-2xl relative space-y-6">
              {/* Quotation Mark */}
              <div className="absolute top-6 right-8 text-slate-200 font-serif text-6xl select-none">
                “
              </div>

              <p className="text-slate-800 text-sm sm:text-base leading-relaxed relative z-10">
                "NexArch exceeded my expectations! We commissioned them to design and build a sustainable home for our family and the result was amazing. They implemented advanced smart home technology, integrated a solar panel system and created green areas around the house."
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Jeremy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Jeremy</h4>
                  <p className="text-xs text-slate-400">Manager from LA</p>
                </div>
              </div>
            </div>

            {/* Right Preview Card */}
            <div className="bg-[#f8f9fb] rounded-[32px] p-8 border border-slate-100 opacity-60 hidden lg:block">
              <p className="text-xs text-slate-600 leading-relaxed">
                "NexArch is truly the company of the future. We collaborated with them on several green projects in the city and the results have always been stellar. A team of architects and landscape designers creating innovative projects that delight everyone."
              </p>
              <div className="flex items-center gap-3 pt-6">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Helen</h4>
                  <p className="text-[10px] text-slate-400">City Mayor</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-900" />
            <span className="font-bold text-slate-900">NexArch © 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Index;
