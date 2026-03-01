import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
const founderImg = new URL("/src/image/Founder.jpeg", import.meta.url).href;

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
          <p className="text-[#D4AF37]/60 text-sm font-bold mb-6 tracking-wide">Founder & CEO — Living Leadership Academy, Chennai</p>

          <div className="relative pl-6 mb-7 border-l-4 border-[#D4AF37]">
            <Quote className="w-6 h-6 text-[#D4AF37]/40 absolute -top-1 -left-3 fill-[#D4AF37]/20" />
            <p className="text-white/70 text-base sm:text-lg leading-relaxed italic">
              “To develop confident leaders who lead with character, clarity, and purpose in every area of life.”
              <br />  “Leaders are not born, they are built….” 
            </p>
          </div>

          <p className="text-white/60 leading-relaxed mb-4 text-sm sm:text-base">
            <span className="text-[#D4AF37] font-semibold">Satheesh Kumar S </span> is an educator, leadership trainer, and mentor with over <span className="text-[#D4AF37] font-semibold">14+ </span> years of 
            experience in education, leadership development, and teacher training. With a background in 
            Master’s degree in Philosophy, he brings together practical education experience and deep 
            insight into character, values, and leadership. 
            Throughout his career, Satheesh has worked closely with schools, educators, students, and 
            families, helping them develop strong communication skills, leadership qualities, and life skills 
            that go beyond academic success. 
            As a teacher, life skills trainer, and academic manager, he has trained hundreds of teachers and 
            impacted thousands of students through leadership workshops, communication programs, and 
            teacher development initiatives. 
          </p>
          <p className="text-white/60 leading-relaxed mb-7 text-sm sm:text-base">

            Satheesh believes that leadership is not just a position but a way of life, and that every individual 
            can grow into a leader who positively influences others. <br />
            Through Living Leadership Academy, he continues to work with schools, colleges, organizations, 
            and families, helping them build cultures of leadership, responsibility, and excellence. 
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
              <p className="text-[#0B1832] font-black text-xl sm:text-2xl leading-none">14+</p>
              <p className="text-[#0B1832]/70 text-[10px] font-bold">Years</p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={founderImg}
              alt="Satheesh Kumar S  — Founder"
              className="w-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080F20]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-[#0B1832]/90 backdrop-blur-md rounded-2xl p-4 border border-[#D4AF37]/20">
              <p className="text-white font-black text-base">Satheesh Kumar S </p>
              <p className="text-[#D4AF37] text-xs font-semibold tracking-wide">Founder & CEO · LLA Chennai</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}