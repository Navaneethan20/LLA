import { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, delay, started }) {
  const num = useCountUp(value, 2200, started);
  return (
    <div className="text-center px-4 sm:px-8 py-8 sm:py-10 relative group cursor-default" style={{ transitionDelay: `${delay}ms` }}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 sm:h-16 bg-[#D4AF37]/20 hidden md:block last:hidden" />
      <div className="relative inline-block mb-2">
        <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#D4AF37] tabular-nums">
          {num.toLocaleString()}{suffix}
        </span>
        <div className="absolute -inset-4  rounded-full bg-[#D4AF37]/5 group-hover:bg-[#D4AF37]/10 transition-all duration-500 blur-xl" />
      </div>
      <p className="text-white/50 text-[10px] sm:text-sm uppercase tracking-widest mt-2 font-bold">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { value: 1000, suffix: "+", label: "Schools Visted PAN-India", delay: 0 },
    { value: 10000, suffix: "+", label: "Teachers empowered", delay: 150 },
    { value: 100000, suffix: "+", label: "Students impacted", delay: 300 },     
  ];

  return (
    <section ref={ref} className="relative py-2 bg-[#0B1832] overflow-hidden">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06)_0%,_transparent_70%)]" />

      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 divide-[#D4AF37]/10 md:divide-x">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} started={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}