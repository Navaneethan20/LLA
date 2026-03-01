import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppPopup from "../components/WhatsAppPopup";
import MediaGallery from "../components/MediaGallery";
import { CheckCircle, Quote, ArrowDown, Phone, Mail, ArrowRight } from "lucide-react";

const programs = [
  { icon: "🔥", title: "Professional Skills Program", description: "Enhancing workplace effectiveness and communication.", outcomes: ["Business communication and presentation skills", "Professional email and workplace communication", "Time management and productivity ", "Workplace etiquette and professionalism ", "Collaboration and teamwork "], duration: "3-Month Program" },
  { icon: "👑", title: "Leadership Development Program ", description: "Preparing managers and leaders to lead with clarity and impact.", outcomes: ["Leadership mindset and decision-making", "Coaching and mentoring teams", "Strategic thinking and problem-solving", "Conflict resolution and negotiation ", "Building high-performance teams"], duration: "1–2 Day Offsite" },
  { icon: "⚡", title: "Culture & People Development Program", description: "Creating positive and productive organizational environments.", outcomes: ["Emotional intelligence in the workplace", "Building trust and collaboration ", "Employee engagement and motivation ", "Managing stress and workplace challenges ", "Strengthening organizational culture"], duration: "6-Month Engagement" },
  { icon: "📊", title: "Shaping Principles & Values Program", description: "Developing ethical leaders and principled organizations.", outcomes: ["Integrity and ethical decision-making ", "Values-based leadership ", "Personal accountability and responsibility", "Building trust and credibility ", "Leading with purpose and character"], duration: "4-Week Module" },
];

const stories = [
  { name: "Supriya Venkataraman", achievement: "HR Head, Cognizant — 22% productivity increase", quote: "After LLA's team building program, our inter-departmental collaboration hit a new high. Employee satisfaction scores jumped 22% in one quarter.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
  { name: "Karthik Sundaram", achievement: "CEO, FinTech Startup — Scaled to ₹75Cr ARR", quote: "Dr. Arjun's executive coaching reframed how I lead. My decision-making clarity and executive presence improved dramatically.", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { name: "Meenakshi Rajan", achievement: "COO, Media Company — Culture Transformation", quote: "LLA's culture transformation program was the most impactful investment we made. Our leadership team is now aligned and inspired.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80" },
];



const corporateMedia = [
  { type: "image", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
  { type: "image", src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80" },
  { type: "image", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80" },
  { type: "image", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80" },
  { type: "image", src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80" },
];

function ProgramCard({ p, visible, i }) {
  return (
    <div className={`group relative bg-[#112244] rounded-2xl p-5 sm:p-7 border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: `${i * 100}ms` }}>
      <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-4 text-xl">{p.icon}</div>
      <h3 className="text-white font-black text-base mb-2 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
      <p className="text-white/55 text-xs leading-relaxed mb-4">{p.description}</p>
      <ul className="space-y-1.5 mb-3">{p.outcomes.map(o => <li key={o} className="flex items-center gap-2 text-white/50 text-xs"><CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /><span className="font-semibold">{o}</span></li>)}</ul>
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-black">{p.duration}</span>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/50 rounded-b-2xl transition-all duration-500" />
    </div>
  );
}

function StoryCard({ s, visible, i }) {
  return (
    <div className={`relative bg-[#112244] rounded-2xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: `${i * 120}ms` }}>
      <div className="aspect-video overflow-hidden relative">
        <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#112244] via-transparent to-transparent" />
      </div>
      <div className="p-5 relative">
        <Quote className="w-7 h-7 text-[#D4AF37]/20 absolute top-3 right-5" />
        <p className="text-white/70 text-sm leading-relaxed italic mb-4">"{s.quote}"</p>
        <div className="flex items-center gap-3">
          <img src={s.avatar} alt={s.name} className="w-9 h-9 rounded-full object-cover border-2 border-[#D4AF37]/40" />
          <div><p className="text-white font-bold text-sm">{s.name}</p><p className="text-[#D4AF37] text-xs font-semibold">{s.achievement}</p></div>
        </div>
      </div>
    </div>
  );
}

function SubContact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setSent(true); setForm({ name: "", phone: "", message: "" }); setTimeout(() => setSent(false), 5000); }, 1000); };
  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#080F20] relative overflow-hidden">
      <div id="enroll" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-6">Enroll Today</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">Ready to join <span className="text-[#D4AF37]">Corporate Programs?</span></h2>
            <p className="text-white/55 text-sm leading-relaxed mb-8">Fill in your details and our team will get in touch within 24 hours.</p>
            <div className="space-y-3">
              <a href="tel:+916381474857" className="flex items-center gap-4 p-4 rounded-2xl bg-[#112244]/50 border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37]/20 shrink-0"><Phone className="w-5 h-5 text-[#D4AF37]" /></div>
                <div><p className="text-white/40 text-[10px] uppercase tracking-wider font-bold">Call us</p><p className="text-white font-bold text-sm">+91 63814 74857</p></div>
              </a>
              <a href="mailto:livingleadership7@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-[#112244]/50 border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37]/20 shrink-0"><Mail className="w-5 h-5 text-[#D4AF37]" /></div>
                <div><p className="text-white/40 text-[10px] uppercase tracking-wider font-bold">Email us</p><p className="text-white font-bold text-sm">livingleadership7@gmail.com</p></div>
              </a>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#112244] to-[#0d1e3a] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/20 shadow-2xl">
            <div className="flex items-center gap-3 mb-6"><div className="w-2 h-8 bg-[#D4AF37] rounded-full" /><p className="text-white font-black text-lg">Quick Enquiry</p></div>
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-4"><span className="text-green-400 text-2xl font-black">✓</span></div>
                <p className="text-white font-black text-lg mb-2">Enquiry Sent!</p>
                <p className="text-white/50 text-sm">Our team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="text-white/40 text-[10px] uppercase tracking-wider font-black block mb-2">Full Name *</label><input name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" type="text" autoComplete="name" className="w-full bg-[#0B1832] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4AF37]/60 transition-colors font-semibold" /></div>
                <div><label className="text-white/40 text-[10px] uppercase tracking-wider font-black block mb-2">Phone Number *</label><input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" type="tel" autoComplete="tel" className="w-full bg-[#0B1832] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4AF37]/60 transition-colors font-semibold" /></div>
                <div><label className="text-white/40 text-[10px] uppercase tracking-wider font-black block mb-2">Message</label><textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Any specific requirement..." className="w-full bg-[#0B1832] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4AF37]/60 transition-colors resize-none font-semibold" /></div>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#D4AF37] text-[#0B1832] font-black text-sm hover:bg-[#F0CE6A] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70">{loading ? "Sending..." : (<>Request Callback <ArrowRight className="w-4 h-4" /></>)}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CorporatePrograms() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const ref1 = useRef(null); const ref2 = useRef(null); const ref3 = useRef(null);

  useEffect(() => {
    const observe = (ref, setter) => {
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setter(true); }, { threshold: 0.1 });
      if (ref.current) obs.observe(ref.current);
      return obs;
    };
    const o1 = observe(ref1, setVisible1); const o2 = observe(ref2, setVisible2); const o3 = observe(ref3, setVisible3);
    return () => { o1.disconnect(); o2.disconnect(); o3.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1832]">
      <Navbar />
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 blur-sm">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80" alt="Corporate Programs" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1832]/96 via-[#0B1832]/80 to-[#0B1832]/30 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1832] via-transparent to-[#0B1832]/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 mb-6"><span className="text-[#D4AF37] text-xs font-black tracking-widest uppercase">For Organisations & Working Professionals</span></div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight">Corporate Programs</h1>
            <p className="text-[#D4AF37] text-base sm:text-xl font-bold mb-4">Forging Leaders Who Drive Results</p>
            <p className="text-white/60 text-sm sm:text-lg leading-relaxed mb-8 max-w-lg">Helping organizations develop strong leaders, productive teams, and healthy workplace 
cultures. </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button onClick={() => document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" })} className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#D4AF37] text-[#0B1832] font-black text-sm hover:bg-[#F0CE6A] transition-all hover:scale-105">Enroll Now</button>
              <button onClick={() => document.getElementById("programs-offered")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/30 text-white font-bold text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">View Programs <ArrowDown className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      </section>

      <section id="programs-offered" ref={ref1} className="py-20 sm:py-24 bg-[#0B1832]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${visible1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}><p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">What We Offer</p><h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Programs <span className="text-[#D4AF37]">Offered</span></h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">{programs.map((p, i) => <ProgramCard key={p.title} p={p} visible={visible1} i={i} />)}</div>
        </div>
      </section>

      <MediaGallery
  subtitle="In Action"
  title="Corporate Programs Gallery"
  media={corporateMedia}
/>;

      <section ref={ref3} className="py-20 sm:py-24 bg-[#0B1832]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${visible3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}><p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">Real Impact</p><h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Success <span className="text-[#D4AF37]">Stories</span></h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">{stories.map((s, i) => <StoryCard key={i} s={s} visible={visible3} i={i} />)}</div>
        </div>
      </section>

      <SubContact />
      <Footer />
      <WhatsAppPopup programName="Corporate Programs" groupLink="https://chat.whatsapp.com/livingleadership-corporate" />
    </div>
  );
}