"use client";

import AboutSection from "./content/AboutSection";
import HeroSection from "./content/HeroSection";
import SkillSection from "./content/SkillSection";

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
      </div>
    </>
  );
};

export default Home;
