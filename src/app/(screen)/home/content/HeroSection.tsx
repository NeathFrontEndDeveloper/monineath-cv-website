"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TextType from "@/constant/TextType";
import Profile from "@/assets/Profile.jpg";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useViewWork, useConnect } from "@/constant/functions";

const HeroSection = () => {
  const ViewWorkClick = useViewWork();
  const ConnectClick = useConnect();

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        className="relative z-10 mt-6 sm:mt-12 md:mt-14 lg:mt-16 flex flex-col items-center justify-center space-y-6 px-4"
        initial="hidden"
        animate="visible"
      >
        {/* Profile section */}
        <motion.div className="">
          <div className="relative group">
            <div className="w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 rounded-full overflow-hidden flex items-center justify-center ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
              <Image
                src={Profile}
                alt="Neath - Front-end Developer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce delay-500" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div className="pt-4 md:pt-6 lg:pt-8 text-center space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Hi, I&apos;m <span className="text-[#00ff7b]">Neath</span>
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
            <span className="text-gray-300">I&apos;m a </span>
            <span className="text-white font-semibold">
              <TextType
                text={["Front-end Developer", "Graphic Designer"]}
                typingSpeed={75}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="|"
              />
            </span>
          </div>

          <motion.p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed pt-4">
            Crafting beautiful, responsive web experiences with modern
            technologies. Let&apos;s bring your ideas to life!
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6">
          <Button
            onClick={ConnectClick}
            size="lg"
            variant="outline"
            className="p-6 sm:p-8 lg:p-6 text-sm sm:text-xl lg:text-sm font-semibold"
          >
            Let&apos;s Connect
          </Button>

          <Button
            onClick={ViewWorkClick}
            size="lg"
            variant="secondary"
            className="group p-6 sm:p-8 lg:p-6 text-sm sm:text-xl lg:text-sm font-semibold"
          >
            About Me
            <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
