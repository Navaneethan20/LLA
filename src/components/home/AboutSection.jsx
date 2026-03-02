import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    alt: "Character"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80",
    alt: "Confidence"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    alt: "Communication"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=8",
    alt: "Contribution"
  }
];


export default function AboutSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
  const interval = setInterval(() => {
    setShowMain(true);

    setTimeout(() => {
      setShowMain(false);
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Big image visible for 4 seconds

  }, 8000); // Total cycle 8 seconds

  return () => clearInterval(interval);
}, []);

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

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE UPDATED ONLY */}
        <div className="relative h-[450px] flex items-center justify-center overflow-hidden">

           {/* Main Big Image */}
  <img
    src="/img5.jpeg"
    alt="Leadership Model"
    className={`absolute max-h-full max-w-full object-contain transition-all duration-1000 ease-in-out
    ${showMain ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-3"}`}
  />
             

          {/* Small Images Grid */}
          {/* Small Images Grid */}
  <div
    className={`grid grid-cols-2 gap-6 w-full h-full place-items-center transition-all duration-1000
    ${showMain ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
  >
    {images.map((img, index) => (
      <img
        key={img.id}
        src={img.src}
        alt={img.alt}
        className={`w-[180px] h-[180px] md:w-[300px] md:h-[210px] object-cover rounded-xl border-2 transition-all duration-700
        ${
          activeIndex === index
            ? "border-[#D4AF37] scale-110 shadow-2xl shadow-[#D4AF37]/40"
            : "border-white/20"
        }`}
      />
    ))}
  </div>
        </div>


        {/* Text */}
        <div className={`transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
          <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">About Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            Nurturing <span className="text-[#D4AF37]">Excellence</span> Since a Decade
          </h2>
          <p className="text-white/60 leading-relaxed mb-5 text-sm sm:text-base">
           Living Leadership Academy was founded to address one of the most critical challenges of our time — <span className="text-[#D4AF37]">the growing gap between information and wisdom</span>. 
         
          </p>
          <p className="text-white/60 leading-relaxed mb-7 text-sm sm:text-base">
            Through transformational training and mentorship, we equip individuals to think clearly, communicate confidently, act responsibly, and lead courageously. we are building a leadership movement that transforms society.
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