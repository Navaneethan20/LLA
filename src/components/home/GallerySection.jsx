import { useEffect, useRef, useState } from "react";

const images = [
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", label: "School Camp" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", label: "Leadership Summit" },
  { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80", label: "College Bootcamp" },
  { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", label: "Corporate Offsite" },
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80", label: "Team Dynamics" },
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80", label: "Group Training" },
  { src: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&q=80", label: "Family Retreat" },
  { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80", label: "Executive Workshop" },
  { src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=80", label: "Parent Programs" },
];

export default function GallerySection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="gallery" ref={ref} className="py-20 sm:py-24 bg-[#080F20] relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(212,175,55,0.12) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 sm:mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">Our Moments</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">Life at <span className="text-[#D4AF37]">LLA</span></h2>
          <p className="text-white/35 text-sm">Real moments of transformation</p>
        </div>

        {/* Creative multi-row gallery */}
        {(() => {
          const Item = ({ img, i, className }) => (
            <div
              onClick={() => setLightbox(img.src)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`group relative overflow-hidden cursor-pointer rounded-xl sm:rounded-2xl transition-all duration-700 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"} ${className}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1832]/80 via-[#0B1832]/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${hoveredIdx === i ? "border-[#D4AF37]/55" : "border-transparent"}`} />
              <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-black text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{img.label}</p>
                <div className="h-0.5 w-0 group-hover:w-8 bg-[#D4AF37] rounded-full transition-all duration-500 mt-0.5" />
              </div>
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 group-hover:border-[#D4AF37]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                <span className="text-[#D4AF37] text-xs font-black">+</span>
              </div>
            </div>
          );
          return (
            <div className="space-y-2 sm:space-y-3">
              {/* Row 1: wide + 2 stacked */}
              <div className="grid grid-cols-12 gap-2 sm:gap-3" style={{ height: "260px" }}>
                <Item img={images[0]} i={0} className="col-span-12 sm:col-span-7" />
                <Item img={images[1]} i={1} className="col-span-6 sm:col-span-3" />
                <Item img={images[2]} i={2} className="col-span-6 sm:col-span-2" />
              </div>
              {/* Row 2: 3 equal */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3" style={{ height: "190px" }}>
                <Item img={images[3]} i={3} className="" />
                <Item img={images[4]} i={4} className="" />
                <Item img={images[5]} i={5} className="" />
              </div>
              {/* Row 3: small + wide + small */}
              <div className="grid grid-cols-12 gap-2 sm:gap-3" style={{ height: "200px" }}>
                <Item img={images[6]} i={6} className="col-span-6 sm:col-span-3" />
                <Item img={images[7]} i={7} className="col-span-6 sm:col-span-6" />
                <Item img={images[8]} i={8} className="hidden sm:block col-span-3" />
              </div>
            </div>
          );
        })()}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img src={lightbox} alt="Gallery" className="w-full rounded-2xl shadow-2xl" />
            <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:border-[#D4AF37]/60 transition-all">✕</button>
          </div>
        </div>
      )}
    </section>
  );
}