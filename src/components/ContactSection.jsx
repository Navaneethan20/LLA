import { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
   const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // IMPORTANT

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form Submitted:", form);

      setLoading(false);
      setSent(true);

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        program: "",
        message: "",
      });

      // Hide success message after 3 sec
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#0B1832] relative overflow-hidden">
      <div id="enroll" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.06)_0%,_transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Start Your <span className="text-[#D4AF37]">Leadership</span> Journey
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-sm">Reach out to enroll, inquire, or learn more about any of our programs across South India.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 mb-8">
          {/* Info Column */}
          <div className="lg:col-span-2 space-y-3">
            {/* Phone */}
            <a href="tel:+919876543210"
              className="flex items-start gap-4 p-4 rounded-2xl bg-[#112244] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-all">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1 font-bold">Call Us</p>
                <p className="text-white font-bold text-sm">+91 98765 43210</p>
              </div>
            </a>

            {/* Email */}
            <a href="mailto:info@livingleadership.in"
              className="flex items-start gap-4 p-4 rounded-2xl bg-[#112244] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-all">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1 font-bold">Email Us</p>
                <p className="text-white font-bold text-sm">info@livingleadership.in</p>
              </div>
            </a>

            {/* Visit Us + Compact Map */}
            <div className="rounded-2xl bg-[#112244] border border-white/5 overflow-hidden">
              <a href="https://maps.google.com/?q=Anna+Nagar+Chennai+Tamil+Nadu" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 hover:bg-[#D4AF37]/5 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-all">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1 font-bold">Visit Us</p>
                  <p className="text-white font-bold text-sm">Anna Nagar, Chennai — 600040</p>
                </div>
              </a>
            </div>

            <div className="rounded-2xl bg-[#112244] border border-white/5 overflow-hidden">
            <div className="h-50 border-t border-white/5">
                <iframe
                  title="LLA Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4535!2d80.2089!3d13.0850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526614f1c5c3f7%3A0x7e59bac5d8e0c1a0!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(88%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-3 relative ">
      <form
        onSubmit={handleSubmit}
        className="bg-[#112244] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-white/50 text-[10px] uppercase tracking-wider mb-2 block font-bold">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              type="text"
              placeholder="Your full name"
              className="w-full bg-[#0B1832] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors font-semibold"
            />
          </div>

          <div>
            <label className="text-white/50 text-[10px] uppercase tracking-wider mb-2 block font-bold">
              Email Address
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="your@email.com"
              className="w-full bg-[#0B1832] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors font-semibold"
            />
          </div>

          <div>
            <label className="text-white/50 text-[10px] uppercase tracking-wider mb-2 block font-bold">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className="w-full bg-[#0B1832] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors font-semibold"
            />
          </div>

          <div>
            <label className="text-white/50 text-[10px] uppercase tracking-wider mb-2 block font-bold">
              Program Interest
            </label>
            <select
              name="program"
              value={form.program}
              onChange={handleChange}
              className="w-full bg-[#0B1832] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors font-semibold"
            >
              <option value="">Select a Program</option>
              <option>School Programs</option>
              <option>College Programs</option>
              <option>Corporate Programs</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-white/50 text-[10px] uppercase tracking-wider mb-2 block font-bold">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us more about your requirements..."
            className="w-full bg-[#0B1832] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none font-semibold"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#D4AF37] text-[#0B1832] font-black hover:bg-[#F0CE6A] transition-all text-sm hover:scale-[1.02] hover:shadow-xl hover:shadow-[#D4AF37]/30 active:scale-[0.98] disabled:opacity-70"
        >
          {sent
            ? "✓ Message Sent! We'll contact you soon."
            : loading
            ? "Sending..."
            : (
              <>
                <Send className="w-4 h-4" />
                Send Message & Enroll
              </>
            )}
        </button>
      </form>
    </div>
        </div>
      </div>
    </section>
  );
}