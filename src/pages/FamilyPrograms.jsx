import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppPopup from "../components/WhatsAppPopup";
import { CheckCircle, Quote, ArrowDown, Phone, Mail, ArrowRight } from "lucide-react";

const programs = [
  { icon: "❤️", title: "Family Bonding Retreat", description: "A weekend immersive experience where families rediscover connection through shared challenges, communication exercises, and trust-building activities.", outcomes: ["Deeper trust", "Open communication", "Shared memories"], duration: "2-Day Retreat" },
  { icon: "🗣️", title: "Parent-Child Communication", description: "Structured workshops helping parents and children understand each other's perspectives, bridge generational gaps, and build empathy.", outcomes: ["Active listening", "Empathy", "Conflict resolution"], duration: "1-Day Workshop" },
  { icon: "🧩", title: "Family Leadership Dynamics", description: "Learn how leadership principles apply within the family unit — from decision-making to creating a shared family vision and values.", outcomes: ["Family vision", "Shared values", "Role clarity"], duration: "Half-Day Module" },
  { icon: "🌱", title: "Parenting Excellence Program", description: "Evidence-based coaching for parents on nurturing leadership qualities, emotional intelligence, and resilience in children.", outcomes: ["Emotional coaching", "Positive discipline", "Growth mindset"], duration: "4-Week Program" },
  { icon: "💬", title: "Couple Harmony Workshop", description: "Strengthen your partnership through communication tools, conflict resolution frameworks, and aligned goal setting as a couple.", outcomes: ["Relationship alignment", "Conflict tools", "Shared goals"], duration: "Weekend Program" },
  { icon: "🏡", title: "Multi-Generation Leadership", description: "Unique program for grandparents, parents, and children to build a legacy of leadership, wisdom-sharing, and family culture.", outcomes: ["Legacy building", "Wisdom transfer", "Family culture"], duration: "3-Day Experience" },
];

const stories = [
  { name: "Ramesh & Priya Sharma", achievement: "Transformed family communication after 15 years", quote: "We came in as a family struggling to talk to each other. We left as a team with a shared vision. LLA's family retreat changed everything.", image: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=600&q=80", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
  { name: "Ananya Krishnamurthy", achievement: "Single parent — rebuilt confidence and family bond", quote: "As a single parent, I felt lost. The parenting excellence program gave me a framework and a community. My children now look up to me differently.", image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=80", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
  { name: "The Kumar Family", achievement: "3 generations — one unified family vision", quote: "My grandfather, my father, and I attended together. The multi-generation program helped us understand and respect each other in a whole new way.", image: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&q=80", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&q=80", label: "Family Retreat", featured: true },
  { src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=500&q=80", label: "Parent-Child Workshop" },
  { src: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=500&q=80", label: "Bonding Activities" },
  { src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=500&q=80", label: "Couple Harmony" },
  { src: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=500&q=80", label: "Family Leadership" },
  { src: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=500&q=80", label: "Multi-Gen Session" },
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80", label: "Team Building" },
  { src: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=500&q=80", label: "Parenting Excellence" },
  { src: "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=500&q=80", label: "Family Vision" },
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
  const handleSubmit = (e) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); setForm({ name: "", phone: "", message: "" }); setTimeout(() => setSent(false), 5000); }, 1000);
  };
  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#080F20] relative overflow-hidden">
      <div id="enroll" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-6">Enroll Today</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight">Ready to join <span className="text-[#D4AF37]">Family Programs?</span></h2>
            <p className="text-white/55 text-sm leading-relaxed mb-8">Fill in your details and our team will get in touch within 24 hours. Programs available across India.</p>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-4 p-4 rounded-2xl bg-[#112244]/50 border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-all shrink-0"><Phone className="w-5 h-5 text-[#D4AF37]" /></div>
                <div><p className="text-white/40 text-[10px] uppercase tracking-wider font-bold">Call us</p><p className="text-white font-bold text-sm">+91 98765 43210</p></div>
              </a>
              <a href="mailto:info@livingleadership.in" className="flex items-center gap-4 p-4 rounded-2xl bg-[#112244]/50 border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-all shrink-0"><Mail className="w-5 h-5 text-[#D4AF37]" /></div>
                <div><p className="text-white/40 text-[10px] uppercase tracking-wider font-bold">Email us</p><p className="text-white font-bold text-sm">info@livingleadership.in</p></div>
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

function GallerySection({ imgs, visible }) {
  const [lightbox, setLightbox] = useState(null);
  const [hovered, setHovered] = useState(null);

  const GalleryItem = ({ item, className, delay = 0 }) => (
    <div
      onClick={() => setLightbox(item.src)}
      onMouseEnter={() => setHovered(item.src)}
      onMouseLeave={() => setHovered(null)}
      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-700 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1832]/85 via-[#0B1832]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${hovered === item.src ? "border-[#D4AF37]/60" : "border-transparent"}`} />
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
        <p className="text-white font-black text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.label}</p>
        <div className="h-0.5 w-0 group-hover:w-10 bg-[#D4AF37] rounded-full transition-all duration-500 mt-1" />
      </div>
      <div className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 group-hover:border-[#D4AF37]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
        <span className="text-[#D4AF37] text-sm font-black">+</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Row 1: 1 big + 2 medium */}
      <div className="grid grid-cols-12 gap-2 sm:gap-3 mb-2 sm:mb-3" style={{ height: "280px" }}>
        <GalleryItem item={imgs[0]} className="col-span-12 sm:col-span-6" delay={0} />
        <GalleryItem item={imgs[1]} className="col-span-6 sm:col-span-3" delay={80} />
        <GalleryItem item={imgs[2]} className="col-span-6 sm:col-span-3" delay={160} />
      </div>
      {/* Row 2: 3 equal */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3" style={{ height: "200px" }}>
        <GalleryItem item={imgs[3]} className="" delay={200} />
        <GalleryItem item={imgs[4]} className="" delay={260} />
        <GalleryItem item={imgs[5]} className="" delay={320} />
      </div>
      {/* Row 3: 2 + 1 wide */}
      <div className="grid grid-cols-12 gap-2 sm:gap-3" style={{ height: "200px" }}>
        <GalleryItem item={imgs[6]} className="col-span-6 sm:col-span-4" delay={360} />
        <GalleryItem item={imgs[7]} className="col-span-6 sm:col-span-4" delay={420} />
        <GalleryItem item={imgs[8]} className="hidden sm:block col-span-4" delay={480} />
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full">
            <img src={lightbox} alt="" className="w-full rounded-2xl shadow-2xl" />
            <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:border-[#D4AF37]/60 transition-all">✕</button>
          </div>
        </div>
      )}
    </>
  );
}

export default function FamilyPrograms() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
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

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 blur-sm">
          <img src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1400&q=80" alt="Family Programs" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1832]/96 via-[#0B1832]/80 to-[#0B1832]/30 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1832] via-transparent to-[#0B1832]/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 mb-6">
              <span className="text-[#D4AF37] text-xs font-black tracking-widest uppercase">For Families · Every Generation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight">Family Programs</h1>
            <p className="text-[#D4AF37] text-base sm:text-xl font-bold mb-4">Leading Together, Growing Together</p>
            <p className="text-white/60 text-sm sm:text-lg leading-relaxed mb-8 max-w-lg">Transformative programs for couples, parents, children, and multi-generational families — building stronger bonds, better communication, and a shared legacy of leadership.</p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button onClick={() => document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" })} className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#D4AF37] text-[#0B1832] font-black text-sm hover:bg-[#F0CE6A] transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#D4AF37]/30">Enroll Now</button>
              <button onClick={() => document.getElementById("programs-offered")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/30 text-white font-bold text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">View Programs <ArrowDown className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      </section>

      {/* Programs Offered */}
      <section id="programs-offered" ref={ref1} className="py-20 sm:py-24 bg-[#0B1832]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${visible1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Programs <span className="text-[#D4AF37]">Offered</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {programs.map((p, i) => <ProgramCard key={p.title} p={p} visible={visible1} i={i} />)}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="about" ref={ref2} className="py-20 sm:py-24 bg-[#080F20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${visible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">In Action</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Family Programs <span className="text-[#D4AF37]">Gallery</span></h2>
          </div>
          <GallerySection imgs={gallery} visible={visible2} />

        </div>
      </section>

      {/* Success Stories */}
      <section ref={ref3} className="py-20 sm:py-24 bg-[#0B1832]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${visible3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">Real Impact</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Success <span className="text-[#D4AF37]">Stories</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {stories.map((s, i) => <StoryCard key={i} s={s} visible={visible3} i={i} />)}
          </div>
        </div>
      </section>

      <SubContact />
      <Footer />
      <WhatsAppPopup programName="Family Programs" groupLink="https://chat.whatsapp.com/livingleadership-family" />
    </div>
  );
}