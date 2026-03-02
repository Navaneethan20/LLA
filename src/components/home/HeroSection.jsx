import { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const words = ["Leaders", "Visionaries", "Trend makers", "Pioneers"];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="Home" className="relative min-h-screen flex items-center overflow-hidden bg-[#0B1832]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#1a3a7a]/40 blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-5"
        style={{backgroundImage: "linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6">
            <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-black tracking-widest uppercase"> India's Premier Leadership Academy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-4">
            <span className="text-white">We Build</span>
            <br />
            <span key={wordIdx} className="text-[#D4AF37] inline-block" style={{animation: "fadeSlideIn 0.5s ease-out"}}>
              {words[wordIdx]}
            </span>
            <br />
            <span className="text-white">of Tomorrow</span>
          </h1>

          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
            Transformative leadership programs for families, schools, colleges, and corporates — shaping confident, purposeful, and impactful individuals across India.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#D4AF37] text-[#0B1832] font-black text-sm hover:bg-[#F0CE6A] transition-all pulse-gold hover:shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-105"
            >
              Enroll Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
  onClick={() =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }
  className="group relative overflow-hidden px-8 py-4 rounded-full
             font-bold text-sm tracking-wide text-white
             transition-all duration-300 ease-out
             bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#0F172A]
             border border-[#D4AF37]/50
             shadow-[0_0_15px_rgba(212,175,55,0.3)]
             hover:border-[#D4AF37]
             hover:shadow-[0_0_35px_rgba(212,175,55,0.8)]
             hover:scale-110
             active:scale-95
             animate-[pulseGlow_3s_infinite]"
>
  {/* Soft Hover Background */}
  <span className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

  {/* Shine Sweep Effect */}
  <span className="absolute top-0 -left-full w-full h-full 
                   bg-gradient-to-r from-transparent via-white/20 to-transparent
                   group-hover:left-full
                   transition-all duration-700 ease-in-out">
  </span>

  {/* Text + Arrow */}
  <span className="relative z-10 flex items-center gap-2">
    Discover More
    <span className="transition-transform duration-300 group-hover:translate-x-2">
      →
    </span>
  </span>
</button>
          </div>
        </div>

        <div className={`relative transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"} mt-6 lg:mt-0`}>
          <div className="relative float">
            <div className="absolute inset-0 rounded-3xl border border-[#D4AF37]/20 scale-105" />
            <div className="absolute inset-0 rounded-3xl border border-[#D4AF37]/10 scale-110" />
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-xs sm:max-w-sm mx-auto lg:max-w-none">
              <img
                src="/Homehero 1.jpeg"
                alt="Leadership Training"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1832]/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 bg-[#D4AF37] rounded-2xl p-3 sm:p-4 shadow-xl">
              <p className="text-[#0B1832] font-black text-lg sm:text-xl">14+</p>
              <p className="text-[#0B1832]/70 text-[10px] sm:text-xs font-bold">Years</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}