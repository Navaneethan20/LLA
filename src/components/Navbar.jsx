import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
// Use Vite compatible URL for static image in src to avoid TS/loader issues
import { ChevronDown, Menu, X, GraduationCap, BookOpen, Briefcase, Heart, Sparkles, Zap } from "lucide-react";

const programs = [
  { label: "Family Programs", page: "FamilyPrograms", icon: Heart, desc: "All Ages · Bonds & Legacy", color: "from-rose-500/20 to-rose-600/5" },
  { label: "School Programs", page: "SchoolPrograms", icon: BookOpen, desc: "Ages 8–18 · Confidence & Character", color: "from-blue-500/20 to-blue-600/5" },
  { label: "College Programs", page: "CollegePrograms", icon: GraduationCap, desc: "Ages 18–25 · Career & Leadership", color: "from-indigo-500/20 to-indigo-600/5" },
  { label: "Corporate Programs", page: "CorporatePrograms", icon: Briefcase, desc: "Professionals · Executive Growth", color: "from-amber-500/20 to-amber-600/5" },
  ];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProgOpen, setMobileProgOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [location.pathname]);

  const isSubPage = !location.pathname.includes("Home") && location.pathname !== "/";

  const scrollToSection = (id) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleHomeClick = () => {
    setMobileOpen(false);
    if (isSubPage) navigate(createPageUrl("Home"));
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", action: handleHomeClick },
    { label: "About", action: () => scrollToSection("about") },
    { label: "Contact", action: () => scrollToSection("contact") },
  ];

  return (
    <>
      <style>{`
        @keyframes navSlideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dropFadeIn { from { opacity: 0; transform: translateY(10px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes shimmerNav { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        .nav-slide { animation: navSlideDown 0.4s ease both; }
        .drop-fade { animation: dropFadeIn 0.25s cubic-bezier(0.22,1,0.36,1) both; }
        .logo-shimmer { animation: shimmerNav 3s ease-in-out infinite; }
        .nav-underline { position: relative; }
        .nav-underline::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #D4AF37, #F0CE6A); border-radius: 2px; transform: scaleX(0); transform-origin: center; transition: transform 0.3s ease; }
        .nav-underline:hover::after { transform: scaleX(1); }
        .prog-item-hover { transition: all 0.2s ease; }
        .prog-item-hover:hover { transform: translateX(4px); }
      `}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#070F28]/95 backdrop-blur-xl shadow-xl shadow-black/50 border-b border-[#D4AF37]/10" : "bg-transparent"}`}>

        {/* Top accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

          {/* Logo */}
          <button onClick={handleHomeClick} className="flex items-center gap-3 group text-left">
            {/* Replace the letter logo with an image. Place your image at /logo.png */}
            <img
              src="/Logo.jpeg"
              alt="Living Leadership logo"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border-2 border-[#D4AF37] object-cover overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/30"
            />
            <div className="leading-tight">
              <span className="text-white font-black text-sm sm:text-base tracking-wide">
                <span className="text-[#D4AF37] logo-shimmer">Living</span> Leadership
              </span>
              <p className="text-white/30 text-[9px] tracking-widest uppercase hidden sm:block">Academy · India</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                onMouseEnter={() => setActiveLink(label)}
                onMouseLeave={() => setActiveLink(null)}
                className="relative px-4 py-2 text-white/80 hover:text-[#D4AF37] font-bold text-sm tracking-wide transition-all duration-200 rounded-lg hover:bg-white/5 nav-underline"
              >
                {label}
                {activeLink === label && <span className="absolute inset-0 rounded-lg bg-white/5" />}
              </button>
            ))}

            {/* Programs Dropdown */}
            <div className="relative mx-1" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-200 select-none ${dropdownOpen ? "text-[#D4AF37] bg-[#D4AF37]/10" : "text-white/80 hover:text-white hover:bg-white/5"}`}
              >
                <Zap className={`w-3.5 h-3.5 transition-all duration-300 ${dropdownOpen ? "text-[#D4AF37]" : "text-white/40"}`} />
                Programs
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-[#D4AF37]" : "text-white/40"}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-80 z-50 drop-fade">
                  {/* Arrow */}
                  <div className="absolute -top-1.5 left-6 w-3 h-3 bg-[#0E1F42] border-l border-t border-[#D4AF37]/30 rotate-45" />
                  <div className="bg-gradient-to-b from-[#0E1F42] to-[#0B1832] border border-[#D4AF37]/25 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#D4AF37]/10 flex items-center justify-between">
                      <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" /> Our Programs
                      </p>
                      <span className="text-white/20 text-[10px]">{programs.length} programs</span>
                    </div>
                    {programs.map((p, i) => (
                      <Link
                        key={p.page}
                        to={createPageUrl(p.page)}
                        onClick={() => setDropdownOpen(false)}
                        className={`prog-item-hover flex items-start gap-3 px-4 py-3.5 hover:bg-gradient-to-r hover:${p.color} transition-all duration-200 border-b border-white/5 last:border-0 group`}
                        style={{ animationDelay: `${i * 40}ms` }}
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#D4AF37]/25 group-hover:border-[#D4AF37]/40 transition-all duration-200">
                          <p.icon className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold text-sm group-hover:text-[#D4AF37] transition-colors duration-200">{p.label}</p>
                          <p className="text-white/35 text-xs mt-0.5 group-hover:text-white/55 transition-colors">{p.desc}</p>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-white/20 -rotate-90 mt-1 group-hover:text-[#D4AF37]/60 transition-colors" />
                      </Link>
                    ))}
                    <div className="px-4 py-3 bg-[#D4AF37]/5 border-t border-[#D4AF37]/10">
                      <p className="text-white/30 text-[10px] text-center">Click any program to explore</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("enroll")}
              className="ml-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C4A028] text-[#0B1832] font-black text-sm hover:from-[#F0CE6A] hover:to-[#D4AF37] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-105 active:scale-95"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative w-10 h-10 rounded-xl border border-white/15 text-white hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all duration-200 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`absolute transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}><X className="w-5 h-5" /></span>
            <span className={`absolute transition-all duration-300 ${mobileOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}><Menu className="w-5 h-5" /></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-400 overflow-hidden ${mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="mx-3 mb-3 bg-gradient-to-b from-[#0E1F42] to-[#0B1832] rounded-2xl border border-[#D4AF37]/20 overflow-hidden shadow-2xl">
            {navLinks.map((l) => (
              <button key={l.label} onClick={l.action} className="w-full text-left flex items-center px-5 py-3.5 text-white font-bold text-sm border-b border-white/5 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-200">
                {l.label}
              </button>
            ))}

            <div className="border-b border-white/5">
              <button onClick={() => setMobileProgOpen((v) => !v)} className="w-full flex items-center justify-between px-5 py-3.5 text-white font-bold text-sm hover:text-[#D4AF37] transition-all duration-200">
                <span className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-[#D4AF37]" /> Programs</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileProgOpen ? "rotate-180 text-[#D4AF37]" : "text-white/30"}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileProgOpen ? "max-h-80" : "max-h-0"}`}>
                {programs.map((p) => (
                  <Link key={p.page} to={createPageUrl(p.page)} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-5 py-3 text-white/70 hover:text-[#D4AF37] text-sm font-semibold transition-all border-b border-white/5 last:border-0 hover:bg-[#D4AF37]/5">
                    <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                      <p.icon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="font-bold text-xs">{p.label}</p>
                      <p className="text-white/30 text-[10px]">{p.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-3">
              <button onClick={() => { scrollToSection("enroll"); setMobileOpen(false); }} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C4A028] text-[#0B1832] font-black text-sm text-center hover:from-[#F0CE6A] hover:to-[#D4AF37] transition-all">
                ✦ Enroll Now
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}