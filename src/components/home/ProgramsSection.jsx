import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight, GraduationCap, BookOpen, Briefcase } from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    title: "School Programs",
    subtitle: "Ages 8–18",
    description: "Personality development, leadership camps, public speaking, and life skills workshops for school students across South India.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    page: "SchoolPrograms",
    color: "from-blue-900/80",
  },
  {
    icon: GraduationCap,
    title: "College Programs",
    subtitle: "Ages 18–25",
    description: "Career-readiness bootcamps, entrepreneurship workshops, and professional leadership training for college students.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
    page: "CollegePrograms",
    color: "from-indigo-900/80",
  },
  {
    icon: Briefcase,
    title: "Corporate Programs",
    subtitle: "Working Professionals",
    description: "Executive coaching, team building, and leadership programs for businesses looking to build high-performing teams.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    page: "CorporatePrograms",
    color: "from-slate-900/90",
  },
];

export default function ProgramsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="programs" ref={ref} className="py-20 sm:py-24 bg-[#080F20] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{backgroundImage: "radial-gradient(circle, rgba(212,175,55,0.4) 1px, transparent 1px)", backgroundSize: "40px 40px"}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Our <span className="text-[#D4AF37]">Programs</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm">Tailored leadership journeys for every stage of life — from classroom to boardroom.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {programs.map((p, i) => (
            <Link
              
              key={p.title}
              to={createPageUrl(p.page)}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 block ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-t ${p.color} to-transparent`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1832] via-[#0B1832]/60 to-transparent" />

              <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center mb-3">
                  <p.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                </div>
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-1 font-bold">{p.subtitle}</p>
                <h3 className="text-white font-black text-lg sm:text-xl mb-2">{p.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">{p.description}</p>
                <span className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-black group-hover:gap-3 transition-all duration-300">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}