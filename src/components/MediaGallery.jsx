import { useState, useEffect, useRef } from "react";

export default function MediaGallery({ title, subtitle, media = [] }) {
  const [lightbox, setLightbox] = useState(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#070F1F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {subtitle && (
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              {subtitle}
            </p>
          )}
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            {title}
          </h2>
        </div>

        {/* COOL GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[180px] gap-4">

          {media.map((item, i) => {

            // Make some tiles bigger randomly
            const isLarge =
              i % 7 === 0 ;

            return (
              <div
                key={i}
                onClick={() => setLightbox(item)}
                className={`
                  group relative rounded-3xl overflow-hidden cursor-pointer
                  transition-all duration-700
                  ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                  ${isLarge ? "col-span-2 row-span-2" : ""}
                `}
                style={{ transitionDelay: `${i * 70}ms` }}
              >

              <div className="relative w-full h-full rounded-3xl 
                  ring-0 group-hover:ring-2 
                  ring-[#D4AF37] 
                  group-hover:shadow-[0_0_25px_#D4AF37]
                  transition-all duration-500">

  
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}

                {/* Glass Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6">

                  <div className="backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/20 text-white text-sm tracking-wide">
                    View
                  </div>

                </div>
                
              </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-lg"
          onClick={() => setLightbox(null)}
        >
          {lightbox.type === "video" ? (
            <video
              src={lightbox.src}
              controls
              autoPlay
              className="max-w-full max-h-full rounded-3xl shadow-2xl"
            />
          ) : (
            <img
              src={lightbox.src}
              alt=""
              className="max-w-full max-h-full rounded-3xl shadow-2xl"
            />
          )}
        </div>
      )}
    </section>
  );
}