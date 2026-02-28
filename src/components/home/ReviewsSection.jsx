import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Kavitha Rajan",
    role: "Student, Grade 11 — Kendriya Vidyalaya, Chennai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    text: "The school leadership camp completely transformed how I see myself. I walked in as a shy girl and walked out as a confident speaker. Truly life-changing!",
    rating: 5,
  },
  {
    name: "Vijay Anand",
    role: "MBA Graduate — PSG College, Coimbatore",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    text: "The college bootcamp helped me crack my campus placements at Infosys. The GD and communication sessions gave me an edge no classroom ever could.",
    rating: 5,
  },
  {
    name: "Priya Subramanian",
    role: "HR Manager — Cognizant, Chennai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    text: "We enrolled our entire mid-management team in LLA's corporate program. Team synergy and productivity improvements were visible within weeks.",
    rating: 5,
  },
  {
    name: "Murugan Selvam",
    role: "Parent — Madurai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "My son's transformation after the summer leadership camp was remarkable. His confidence, discipline, and communication have improved tremendously.",
    rating: 5,
  },
  {
    name: "Deepa Krishnaswamy",
    role: "COO — Chennai-based Tech Startup",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80",
    text: "LLA's executive coaching reshaped our leadership culture. Dr. Arjun's approach was both profound and practically applicable to our organisation.",
    rating: 5,
  },
];

export default function ReviewsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const prev = () => setIdx((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIdx((i) => (i + 1) % reviews.length);
  const visible3 = [reviews[idx % reviews.length], reviews[(idx + 1) % reviews.length], reviews[(idx + 2) % reviews.length]];

  return (
    <section ref={ref} className="py-20 sm:py-24 bg-[#0B1832] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.06)_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            What Our <span className="text-[#D4AF37]">Community</span> Says
          </h2>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
          {visible3.map((r, i) => (
            <div key={i} className={`bg-[#112244] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 ${i === 1 ? "lg:-translate-y-4 border-[#D4AF37]/20" : ""}`}>
              <div className="flex gap-1 mb-4">
                {Array(r.rating).fill(0).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />)}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-5 italic">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <img src={r.avatar} alt={r.name} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#D4AF37]/40" />
                <div>
                  <p className="text-white font-bold text-sm">{r.name}</p>
                  <p className="text-white/40 text-xs">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-8 sm:mt-10">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}