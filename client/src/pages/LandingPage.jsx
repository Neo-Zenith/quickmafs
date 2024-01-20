import AboutSection from "../components/AboutSection/AboutSection";
import HeroSection from "../components/HeroSection/HeroSection";
import Navbar from "../components/Navbar/Navbar";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="bg">
        <HeroSection />
        <AboutSection />
      </div>
    </>
  );
}
