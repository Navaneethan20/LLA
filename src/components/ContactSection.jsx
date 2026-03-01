import { useState } from "react";
import { Send, Phone, Mail, MapPinned } from "lucide-react";

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Form Submitted:", form);

      setLoading(false);
      setSent(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        program: "",
        message: "",
      });

      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 bg-[#0B1832] relative overflow-hidden"
    >
      <div id="enroll" />

      {/* Decorative Layers (Click-through enabled) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Start Your <span className="text-[#D4AF37]">Leadership</span> Journey
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-sm">
            Reach out to enroll, inquire, or learn more about any of our programs across India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 mb-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-4">

            {/* Phone */}
            <a
              href="tel:+916381474857"
              className="flex items-start gap-4 p-4 rounded-2xl bg-[#112244] border border-white/5
              hover:border-[#D4AF37]/40 transition-all group
              hover:scale-[1.02] hover:shadow-lg hover:shadow-[#D4AF37]/10 active:scale-[0.98]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-all">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1 font-bold">
                  Call Us
                </p>
                <p className="text-white font-bold text-sm">
                  +91 63814 74857
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:livingleadership7@gmail.com"
              className="flex items-start gap-4 p-4 rounded-2xl bg-[#112244] border border-white/5
              hover:border-[#D4AF37]/40 transition-all group
              hover:scale-[1.02] hover:shadow-lg hover:shadow-[#D4AF37]/10 active:scale-[0.98]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-all">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1 font-bold">
                  Email Us
                </p>
                <p className="text-white font-bold text-sm">
                  livingleadership7@gmail.com
                </p>
              </div>
            </a>

            {/* Visit Us */}
            <a
              href="https://maps.app.goo.gl/6RFkgKUxqCpxwTf37"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-2xl bg-[#112244] border border-white/5
              hover:border-[#D4AF37]/40 transition-all group
              hover:scale-[1.02] hover:shadow-lg hover:shadow-[#D4AF37]/10 active:scale-[0.98]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-all">
                <MapPinned className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1 font-bold">
                  Visit Us
                </p>
                <p className="text-white font-bold text-sm">
                  Koyambedu, Chennai — 600107
                </p>
              </div>
            </a>

            {/* Embedded Map */}
            <div className="rounded-2xl bg-[#112244] border border-white/5 overflow-hidden hover:border-[#D4AF37]/40 transition-all">
              <a
                href="https://maps.app.goo.gl/6RFkgKUxqCpxwTf37"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-52"
              >
                <iframe
                  title="LLA Location"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3886.3428510441386!2d80.1907222!3d13.0774444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDA0JzM4LjgiTiA4MMKwMTEnMjYuNiJF!5e0!3m2!1sen!2sin!4v1772345785626!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{
                    border: 0,
                    filter:
                      "invert(88%) hue-rotate(180deg) brightness(0.85) contrast(1.1)",
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN - FORM */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-[#112244] rounded-3xl p-6 sm:p-8 border border-white/5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} required />

                <InputField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} />

                <InputField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} />

                <div>
                  <label className="label-style">Program Interest</label>
                  <select
                    name="program"
                    value={form.program}
                    onChange={handleChange}
                    className="input-style"
                  >
                    <option value="">Select a Program</option>
                    <option>Family Programs</option>
                    <option>School Programs</option>
                    <option>College Programs</option>
                    <option>Corporate Programs</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="label-style">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us more about your requirements..."
                  className="input-style resize-none"
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

/* Reusable Input Component */
function InputField({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="label-style">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        type={type}
        placeholder={`Enter ${label}`}
        className="input-style"
      />
    </div>
  );
}