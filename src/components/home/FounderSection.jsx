import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

export default function FounderSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 sm:py-24 bg-[#080F20] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/4 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4AF37]/4 rounded-full blur-3xl" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Text */}
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
          <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">Meet the Visionary</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 leading-tight">
            The Man Behind <span className="text-[#D4AF37]">the Mission</span>
          </h2>
          <p className="text-[#D4AF37]/60 text-sm font-bold mb-6 tracking-wide">Founder & Chief Mentor — Living Leadership Academy, Chennai</p>

          <div className="relative pl-6 mb-7 border-l-4 border-[#D4AF37]">
            <Quote className="w-6 h-6 text-[#D4AF37]/40 absolute -top-1 -left-3 fill-[#D4AF37]/20" />
            <p className="text-white/70 text-base sm:text-lg leading-relaxed italic">
              "Leadership is not a title you earn — it is a life you choose. My mission is to awaken the leader within every single person."
            </p>
          </div>

          <p className="text-white/60 leading-relaxed mb-4 text-sm sm:text-base">
            Dr. Arjun Murugesan, a Chennai-born leadership coach and TEDx speaker, has spent over 15 years transforming students and professionals across South India. He has trained more than 50,000 individuals from government schools, engineering colleges, and Fortune 500 companies.
          </p>
          <p className="text-white/60 leading-relaxed mb-7 text-sm sm:text-base">
            A certified NLP practitioner and bestselling author — his book <span className="text-[#D4AF37] font-semibold">"Live as a Leader"</span> has sold over 1 lakh copies — he combines ancient wisdom with modern leadership science.
          </p>

          <div className="flex flex-wrap gap-3">
            {["TEDx Speaker", "Bestselling Author", "NLP Practitioner", "15+ Years"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold tracking-wide hover:bg-[#D4AF37]/10 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className={`relative transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
          <div className="absolute -inset-4 rounded-3xl border border-[#D4AF37]/10" />
          <div className="absolute -top-6 -right-6 w-20 h-20 sm:w-24 sm:h-24 bg-[#D4AF37] rounded-2xl flex items-center justify-center shadow-xl z-10">
            <div className="text-center">
              <p className="text-[#0B1832] font-black text-xl sm:text-2xl leading-none">15+</p>
              <p className="text-[#0B1832]/70 text-[10px] font-bold">Years</p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80"
              alt="Dr. Arjun Murugesan — Founder"
              className="w-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080F20]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-[#0B1832]/90 backdrop-blur-md rounded-2xl p-4 border border-[#D4AF37]/20">
              <p className="text-white font-black text-base">Dr. Arjun Murugesan</p>
              <p className="text-[#D4AF37] text-xs font-semibold tracking-wide">Founder & Chief Mentor · LLA Chennai</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}