import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight, GraduationCap, BookOpen, Briefcase, Heart } from "lucide-react";

const programs = [
    {
    icon: Heart,
    title: "Family Programs",
    subtitle: "Every Generation",
    description: "Bonding retreats, parent-child workshops, and multi-generational programs building stronger families and lasting legacies.",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1400&q=80",
    page: "FamilyPrograms",
    accent: "#EC4899",
  },
  {
    icon: BookOpen,
    title: "School Programs",
    subtitle: "Ages 8–18",
    description: "Personality development, leadership camps,  speaking, and life skills workshops for school students.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    page: "SchoolPrograms",
    accent: "#3B82F6",
  },
  {
    icon: GraduationCap,
    title: "College Programs",
    subtitle: "Ages 18–25",
    description: "Career-readiness bootcamps, entrepreneurship workshops, and professional leadership training for college students.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
    page: "CollegePrograms",
    accent: "#6366F1",
  },
  {
    icon: Briefcase,
    title: "Corporate Programs",
    subtitle: "Working Professionals",
    description: "Executive coaching, team building, and leadership programs for businesses looking to build high-performing teams.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    page: "CorporatePrograms",
    accent: "#D4AF37",
  },
];

export default function ProgramsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="programs" ref={ref} className="py-20 sm:py-24 bg-[#080F20] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: "radial-gradient(circle, rgba(212,175,55,0.4) 1px, transparent 1px)", backgroundSize: "40px 40px"}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">Our <span className="text-[#D4AF37]">Programs</span></h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm">Tailored leadership journeys for every stage of life — from classroom to boardroom to home.</p>
        </div>

        {/* 2x2 grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {programs.map((p, i) => (
            <Link
              key={p.title}
              to={createPageUrl(p.page)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 block ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="aspect-[16/9] sm:aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1832] via-[#0B1832]/70 to-transparent" />

              {/* Accent color glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at bottom left, ${p.accent}25 0%, transparent 60%)` }} />

              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-white/20 transition-all duration-300" style={{ boxShadow: hovered === i ? `0 0 40px ${p.accent}20` : "none" }} />

              <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/20 bg-white/10 backdrop-blur-sm group-hover:border-white/40 transition-all">
                        <p.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/70 group-hover:text-white/90 transition-colors">{p.subtitle}</span>
                    </div>
                    <h3 className="text-white font-black text-xl sm:text-2xl mb-1 group-hover:text-white transition-colors">{p.title}</h3>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-xs group-hover:text-white/70 transition-colors line-clamp-2">{p.description}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center shrink-0 ml-4 group-hover:border-[#D4AF37]/70 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}