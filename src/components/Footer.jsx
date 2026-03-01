import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
  { Icon: Instagram, href: " https://www.instagram.com/livingleadership7?igsh=MW00YnhuNmY4dXljeg==", label: "Instagram" },
  { Icon: Facebook, href: "https://www.facebook.com/share/1DY5gmux5o/", label: "Facebook" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/satheesh-kumar-s-0143482a?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
  { Icon: Youtube, href: "https://youtube.com/@livingleadershipwithsatz?si=WKViBxy6yxA0oYSy", label: "YouTube" },
];

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#060D1A] border-t border-[#D4AF37]/20 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <img src="public/Logo.jpeg" alt="Living Leadership Logo" className="w-10 h-10 rounded-full border-2 border-[#D4AF37]" />
                  <div>
                  <span className="text-white font-black text-base"><span className="text-[#D4AF37]">Living</span> Leadership</span>
                  <p className="text-white/30 text-[9px] tracking-widest uppercase">Academy · India</p>
                  </div>
                </div>
                <p className="text-white/45 text-sm leading-relaxed mb-5">
                  Transforming lives through leadership. Serving families, schools, colleges, corporates, and families across India.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </a>
                  ))}
                </div>
                </div>

                {/* Programs */}
          <div>
            <h4 className="text-[#D4AF37] font-black mb-4 text-xs uppercase tracking-widest">Programs</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Family Programs", page: "FamilyPrograms" },
                { label: "School Programs", page: "SchoolPrograms" },
                { label: "College Programs", page: "CollegePrograms" },
                { label: "Corporate Programs", page: "CorporatePrograms" },                
              ].map((p) => (
                <li key={p.page}>
                  <Link to={createPageUrl(p.page)} className="text-white/50 hover:text-[#D4AF37] text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition-colors" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#D4AF37] font-black mb-4 text-xs uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", action: () => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }), isBtn: true },
                { label: "About Us", action: () => scrollTo("about"), isBtn: true },
                { label: "Gallery", action: () => scrollTo("gallery"), isBtn: true },
                { label: "Contact", action: () => scrollTo("contact"), isBtn: true },
              ].map((item) => (
                <li key={item.label}>
                  <button onClick={item.action} className="text-white/50 hover:text-[#D4AF37] text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 group text-left">
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition-colors" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#D4AF37] font-black mb-4 text-xs uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://maps.app.goo.gl/6RFkgKUxqCpxwTf37" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/50 hover:text-[#D4AF37] text-sm transition-colors group">
                   <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                   <span>Koyambedu, Chennai, India</span>
                 </a>
              </li>
              <li>
                <a href="tel:+916381474857" className="flex items-center gap-3 text-white/50 hover:text-[#D4AF37] text-sm transition-colors">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>+91 63814 74857</span>
                </a>
              </li>
              <li>
                <a href="mailto:livingleadership7@gmail.com" className="flex items-center gap-3 text-white/50 hover:text-[#D4AF37] text-sm transition-colors">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>livingleadership7@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs text-center">© 2026 Living Leadership Academy, Chennai. All rights reserved.</p>
          <p className="text-white/25 text-xs">Crafted with purpose · Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}