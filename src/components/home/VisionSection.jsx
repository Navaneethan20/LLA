import { useEffect, useRef, useState } from "react";
import { Eye, Target, Heart } from "lucide-react";

export default function VisionSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const pillars = [
    {
      icon: Eye,
      title: "Our Vision",
      text: "To be South India's most transformative leadership institution — building a generation of empowered, compassionate, and impactful leaders.",
    },
    {
      icon: Target,
      title: "Our Mission",
      text: "To deliver world-class leadership experiences that combine practical skills, emotional intelligence, and purposeful living for every participant.",
    },
    {
      icon: Heart,
      title: "Our Values",
      text: "Integrity, Excellence, Empathy, Innovation, and Service — the core values that drive every program, interaction, and outcome at LLA.",
    },
  ];

  return (
    <section ref={ref} className="py-20 sm:py-24 bg-[#080F20] relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=40" alt="bg" className="w-full h-full object-cover opacity-4" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080F20] via-[#080F20]/85 to-[#080F20]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">Our Foundation</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Vision, Mission &amp; <span className="text-[#D4AF37]">Values</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-[#D4AF37]/40 bg-white/3 backdrop-blur-sm transition-all duration-700 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0B1832] border border-[#D4AF37]/40 flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-all">
                <p.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" />
              </div>
              <div className="pt-5 sm:pt-6 text-center">
                <h3 className="text-white font-black text-base sm:text-xl mb-3 sm:mb-4">{p.title}</h3>
                <p className="text-white/55 text-xs sm:text-sm leading-relaxed">{p.text}</p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/60 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}