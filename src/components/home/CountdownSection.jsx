import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-04-15T09:00:00");

function pad(n) { return String(n).padStart(2, "0"); }

export default function CountdownSection() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = TARGET_DATE - new Date();
      if (diff <= 0) return setTime({ d: 0, h: 0, m: 0, s: 0 });
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []); 

  return (
    <section className="py-24 relative overflow-hidden bg-[#0B1832]">
      {/* Gold line decoration */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.07)_0%,_transparent_70%)]" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-3">Don't Miss Out</p>
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-3">
          Next <span className="text-[#D4AF37]">Batch</span> Starting In
        </h2>
        <p className="text-white/50 mb-12">April 15, 2026 — Registrations Closing Soon</p>

        <div className="flex items-center justify-center gap-4 md:gap-8">
          {[
            { val: pad(time.d), label: "Days" },
            { val: pad(time.h), label: "Hours" },
            { val: pad(time.m), label: "Minutes" },
            { val: pad(time.s), label: "Seconds" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-4 md:gap-8">
              <div className="relative">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-[#112244] border border-[#D4AF37]/30 flex flex-col items-center justify-center shadow-xl pulse-gold">
                  <span className="text-3xl md:text-5xl font-bold text-[#D4AF37] tabular-nums">{item.val}</span>
                </div>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-2">{item.label}</p>
              </div>
              {i < 3 && (
                <span className="text-[#D4AF37] text-3xl font-bold mb-4 hidden sm:block">:</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="#enroll"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#D4AF37] text-[#0B1832] font-bold text-sm hover:bg-[#F0CE6A] transition-all duration-300 shadow-lg shadow-[#D4AF37]/20"
          >
            Reserve Your Spot Now
          </a>
        </div>
      </div>
    </section>
  );
}