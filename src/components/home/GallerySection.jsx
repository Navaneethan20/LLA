import { useEffect, useRef, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80",
];

export default function GallerySection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="gallery" ref={ref} className="py-20 sm:py-24 bg-[#080F20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">Our Moments</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Life at <span className="text-[#D4AF37]">LLA</span>
          </h2>
          <p className="text-white/40 text-sm">From Chennai to Coimbatore — moments of transformation</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              onClick={() => setLightbox(src)}
              className={`group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80}ms`, aspectRatio: i === 0 || i === 3 ? "1/1.3" : "1" }}
            >
              <img src={src} alt="LLA Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-[#0B1832]/0 group-hover:bg-[#0B1832]/40 transition-all duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 flex items-center justify-center">
                  <span className="text-[#D4AF37] text-lg font-black">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-full rounded-2xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}