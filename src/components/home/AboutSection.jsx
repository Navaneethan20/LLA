import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const points = [
    "Bilingual programs in English & regional languages",
    "Certified expert coaches from India",
    "Tailored for every age — school to C-suite",
    "Real-world leadership simulations & activities",
  ];

  return (
    <section id="about" ref={ref} className="py-20 sm:py-24 bg-[#0B1832] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Images Collage */}
        <div className={`relative transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl overflow-hidden aspect-square">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80" alt="Students learning" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square mt-6 sm:mt-8">
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80" alt="Leadership event" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square -mt-6 sm:-mt-8">
              <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80" alt="Workshop" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square">
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80" alt="Youth leaders" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 border-4 border-[#D4AF37] rounded-2xl -z-10" />
        </div>

        {/* Text */}
        <div className={`transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
          <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">About Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            Nurturing <span className="text-[#D4AF37]">Excellence</span> Since a Decade
          </h2>
          <p className="text-white/60 leading-relaxed mb-5 text-sm sm:text-base">
           Living Leadership Academy was founded to address one of the most critical challenges of our time — <span className="text-[#D4AF37]">the growing gap between information and wisdom</span>. While qualifications are increasing, confidence, character, and clarity of purpose are often declining across students, educators, families, and organizations.
           At Living Leadership Academy, we believe the world does not just need more professionals — <span className="text-[#D4AF37]">it needs better leaders</span>. We see leadership not as a position or title, but as influence — <span className="text-[#D4AF37]">the ability to positively impact people and situations</span>.
          </p>
          <p className="text-white/60 leading-relaxed mb-7 text-sm sm:text-base">
            Through transformational training and mentorship, we equip individuals to think clearly, communicate confidently, act responsibly, and lead courageously. Our programs are designed to create real-world impact beyond classrooms and boardrooms. 
            We are committed to building leaders who strengthen families, transform classrooms, inspire communities, and lead organizations with integrity. Our purpose goes beyond conducting workshops — <span className="text-[#D4AF37]">we are building a leadership movement that transforms society</span>.
          </p>

          <ul className="space-y-3 mb-7 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-white/70 text-xs sm:text-sm font-semibold">{p}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] font-black text-sm hover:bg-[#D4AF37] hover:text-[#0B1832] transition-all duration-300 hover:scale-105"
          >
            Explore Our Programs
          </button>
        </div>
      </div>
    </section>
  );
}