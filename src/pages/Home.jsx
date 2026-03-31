import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FounderSection from "../components/home/FounderSection";
import AboutSection from "../components/home/AboutSection";
import ProgramsSection from "../components/home/ProgramsSection";
import GallerySection from "../components/home/GallerySection";
import ReviewsSection from "../components/home/ReviewsSection";
import VisionSection from "../components/home/VisionSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#0B1832]">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FounderSection />
      <AboutSection />
      <ProgramsSection />
      <GallerySection />
      <ReviewsSection />
      <VisionSection />
      <ContactSection />
      <Footer />
    </div>
  );
}