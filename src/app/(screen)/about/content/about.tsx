"use client";

import React, { use } from "react";
import Image from "next/image";
import ProfileImage from "@/assets/me.jpg";
import { Button } from "@/components/ui/button";
import { useConnect, useViewWork } from "@/constant/functions";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  const connectBtn = useConnect();
  const viewMyWork = useViewWork();

  return (
    <section className="w-full min-h-screen flex items-center justify-center text-white px-4 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
              {/* Decorative background circles - responsive */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[#00ff99]/20 rounded-full blur-xl sm:blur-2xl animate-pulse" />
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-[#00ff99]/10 rounded-full blur-lg sm:blur-xl" />

              {/* Main image container - fully responsive */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#00ff99]/30 bg-gradient-to-br from-[#00ff99]/10 to-transparent backdrop-blur-sm">
                <Image
                  src={ProfileImage}
                  alt="Professional headshot of developer"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                  sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, (max-width: 1024px) 40vw, 30vw"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 order-1 lg:order-2 text-center lg:text-left px-2 sm:px-4 lg:px-0">
            {/* Header */}
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <div className="inline-block">
                <motion.span
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[#00ff99] text-xs xs:text-sm sm:text-sm md:text-base font-semibold uppercase tracking-wider mb-1 xs:mb-2 block"
                >
                  Get to know me
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight"
                >
                  About Me
                </motion.h1>
              </div>

              {/* Decorative line */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="w-12 xs:w-14 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-[#00ff99] to-[#00ff99]/50 rounded-full mx-auto lg:mx-0"
              />
            </div>

            {/* Description */}
            <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 text-gray-300 leading-relaxed max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto lg:mx-0">
              <motion.p
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl"
              >
                Hello! I'm a passionate developer with a love for creating{" "}
                <span className="text-[#00ff99] font-semibold">
                  innovative solutions
                </span>
                . My journey in tech has been driven by a desire to learn and
                grow, and I enjoy tackling challenges head-on with creativity
                and determination.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl"
              >
                In my free time, I love exploring{" "}
                <span className="text-[#00ff99] font-semibold">
                  new technologies
                </span>
                , contributing to open-source projects, and sharing knowledge
                with the developer community. I believe in continuous learning
                and the power of collaboration.
              </motion.p>
            </div>

            {/* Stats or highlights - responsive grid */}
            {/* <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 pt-3 xs:pt-4 sm:pt-5 md:pt-6 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left p-2 xs:p-3 sm:p-4 md:p-5 rounded-lg bg-white/5 backdrop-blur-sm border border-[#00ff99]/20 hover:bg-white/10 hover:border-[#00ff99]/40 transition-all duration-300">
                <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-[#00ff99]">
                  3+
                </div>
                <div className="text-xs xs:text-xs sm:text-sm md:text-sm text-gray-400 uppercase tracking-wide mt-0.5 xs:mt-1">
                  Years Experience
                </div>
              </div>
              <div className="text-center lg:text-left p-2 xs:p-3 sm:p-4 md:p-5 rounded-lg bg-white/5 backdrop-blur-sm border border-[#00ff99]/20 hover:bg-white/10 hover:border-[#00ff99]/40 transition-all duration-300">
                <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-[#00ff99]">
                  50+
                </div>
                <div className="text-xs xs:text-xs sm:text-sm md:text-sm text-gray-400 uppercase tracking-wide mt-0.5 xs:mt-1">
                  Projects Completed
                </div>
              </div>
            </div> */}

            {/* CTA Button - responsive sizing */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-3 xs:pt-4 sm:pt-5 md:pt-6 space-x-2 sm:space-x-4"
            >
              <Button
                type="button"
                onClick={connectBtn}
                variant="secondary"
                className="p-6 sm:p-8 lg:p-6 text-sm sm:text-xl lg:text-sm font-semibold"
              >
                Let's Connect
                <MoveRight className="inline-block ml-1 xs:ml-2" size={16} />
              </Button>

              <Button
                type="button"
                onClick={viewMyWork}
                variant="outline"
                className="p-6 sm:p-8 lg:p-6 text-sm sm:text-xl lg:text-sm font-semibold"
              >
                View My Work
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background decorative elements - responsive positioning */}
      <div className="absolute top-1/4 left-2 sm:left-6 lg:left-10 w-1 sm:w-2 h-8 sm:h-12 lg:h-16 bg-gradient-to-b from-[#00ff99] to-transparent rounded-full opacity-30" />
      <div className="absolute bottom-1/4 right-2 sm:right-6 lg:right-10 w-1 sm:w-2 h-10 sm:h-16 lg:h-20 bg-gradient-to-t from-[#00ff99] to-transparent rounded-full opacity-30" />

      {/* Additional mobile decorative elements */}
      <div className="absolute top-10 right-4 w-1 h-6 bg-gradient-to-b from-[#00ff99]/50 to-transparent rounded-full opacity-40 sm:hidden" />
      <div className="absolute bottom-10 left-4 w-1 h-8 bg-gradient-to-t from-[#00ff99]/50 to-transparent rounded-full opacity-40 sm:hidden" />
    </section>
  );
};

export default About;
