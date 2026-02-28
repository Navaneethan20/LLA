import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ChevronDown, Menu, X, GraduationCap, BookOpen, Briefcase, Sparkles } from "lucide-react";

const programs = [
  { label: "School Programs", page: "SchoolPrograms", icon: BookOpen, desc: "Ages 8–18 · Confidence & Character" },
  { label: "College Programs", page: "CollegePrograms", icon: GraduationCap, desc: "Ages 18–25 · Career & Leadership" },
  { label: "Corporate Programs", page: "CorporatePrograms", icon: Briefcase, desc: "Professionals · Executive Growth" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProgOpen, setMobileProgOpen] = useState(false);
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

  // Checks if we're on a sub-page (not Home)
  const isSubPage = !location.pathname.includes("Home") && location.pathname !== "/";

  const scrollToSection = (id) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    if (isSubPage) {
      // On sub-pages, scroll within the current page
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleHomeClick = () => {
    setMobileOpen(false);
    if (isSubPage) {
      navigate(createPageUrl("Home"));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0B1832]/96 backdrop-blur-lg shadow-lg shadow-black/40" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo — always goes home / scroll top */}
        <button onClick={handleHomeClick} className="flex items-center gap-2.5 group text-left">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#D4AF37] flex items-center justify-center font-black text-[#D4AF37] text-base group-hover:bg-[#D4AF37] group-hover:text-[#0B1832] transition-all duration-300">L</div>
          <div className="leading-tight">
            <span className="text-white font-black text-sm sm:text-base tracking-wide"><span className="text-[#D4AF37]">Living</span> Leadership</span>
            <p className="text-white/30 text-[9px] tracking-widest uppercase hidden sm:block">Academy · South India</p>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          <button onClick={handleHomeClick} className="text-white/80 hover:text-[#D4AF37] transition-colors font-bold text-sm tracking-wide">Home</button>
          <button onClick={() => scrollToSection("about")} className="text-white/80 hover:text-[#D4AF37] transition-colors font-bold text-sm tracking-wide">About</button>

          {/* Programs Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-1.5 text-white/80 hover:text-[#D4AF37] transition-colors font-bold text-sm tracking-wide select-none"
            >
              Programs <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-[#D4AF37]" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 z-50">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#112244] border-l border-t border-[#D4AF37]/30 rotate-45" />
                <div className="bg-[#112244] border border-[#D4AF37]/30 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#D4AF37]/10">
                    <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> Our Programs
                    </p>
                  </div>
                  {programs.map((p) => (
                    <Link
                      key={p.page}
                      to={createPageUrl(p.page)}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-start gap-3 px-4 py-3.5 hover:bg-[#D4AF37]/10 transition-all duration-200 border-b border-white/5 last:border-0 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#D4AF37]/20 transition-all">
                        <p.icon className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm group-hover:text-[#D4AF37] transition-colors">{p.label}</p>
                        <p className="text-white/40 text-xs mt-0.5">{p.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={() => scrollToSection("contact")} className="text-white/80 hover:text-[#D4AF37] transition-colors font-bold text-sm tracking-wide">Contact</button>
          <button onClick={() => scrollToSection("enroll")} className="px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#0B1832] font-black text-sm hover:bg-[#F0CE6A] transition-all hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-105">Enroll Now</button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 rounded-xl border border-white/10 text-white hover:border-[#D4AF37]/50 transition-all" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-400 overflow-hidden ${mobileOpen ? "max-h-[600px]" : "max-h-0"}`}>
        <div className="mx-3 mb-3 bg-[#112244] rounded-2xl border border-[#D4AF37]/20 overflow-hidden">
          <button onClick={handleHomeClick} className="w-full text-left flex items-center px-5 py-3.5 text-white font-bold text-sm border-b border-white/5 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all">Home</button>
          <button onClick={() => scrollToSection("about")} className="w-full text-left flex items-center px-5 py-3.5 text-white font-bold text-sm border-b border-white/5 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all">About</button>

          <div className="border-b border-white/5">
            <button onClick={() => setMobileProgOpen((v) => !v)} className="w-full flex items-center justify-between px-5 py-3.5 text-white font-bold text-sm hover:text-[#D4AF37] transition-all">
              Programs <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileProgOpen ? "rotate-180 text-[#D4AF37]" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 bg-[#0B1832]/40 ${mobileProgOpen ? "max-h-60" : "max-h-0"}`}>
              {programs.map((p) => (
                <Link key={p.page} to={createPageUrl(p.page)} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-5 py-3 text-white/70 hover:text-[#D4AF37] text-sm font-semibold transition-all border-b border-white/5 last:border-0">
                  <p.icon className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          <button onClick={() => scrollToSection("contact")} className="w-full text-left flex items-center px-5 py-3.5 text-white font-bold text-sm border-b border-white/5 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all">Contact</button>
          <div className="p-3">
            <button onClick={() => scrollToSection("enroll")} className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#0B1832] font-black text-sm text-center hover:bg-[#F0CE6A] transition-all">
              Enroll Now →
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}