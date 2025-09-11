"use client";

import AboutSection from "./content/AboutSection";
import HeroSection from "./content/HeroSection";
import SkillSection from "./content/SkillSection";
import ContactBanner from "./content/ContactBanner";

const Home = () => {
  // Functions
  // const viewTechStack = useSkills();
  // const aboutMe = useAboutMe();

  return (
    <>
      <div className="w-full max-w-7xl container mx-auto">
        {/* Hero Section */}
        <HeroSection />
        {/* About section */}
        <AboutSection />
        {/* SkillSection */}
        <SkillSection />
        {/* Contact banner */}
        <ContactBanner />
      </div>
    </>
  );
};

export default Home;
