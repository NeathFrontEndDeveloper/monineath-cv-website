"use client";

import Image from "next/image";
import Me from "@/assets/me.jpg";
import { Button } from "@/components/ui/button";
import { useAboutMe, useSkills } from "@/constant/functions";
import { MoveRight } from "lucide-react";

const AboutSection = () => {
  const readMore = useAboutMe();
  const viewStack = useSkills();

  return (
    <section className="w-full h-auto">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Content Section */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight">
                About
                <span className="text-[#00ff7b] relative">
                  Me
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#00ff7b] rounded-full opacity-50"></span>
                </span>
              </h1>

              {/* <div className="w-20 h-1 bg-gradient-to-r from-[#00ff7b] to-transparent mx-auto lg:mx-0 rounded-full"></div> */}
            </div>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Hi! I&apos;m a passionate developer who loves building creative
              solutions, learning new technologies, and sharing knowledge with
              the community. I enjoy tackling challenges and believe in
              continuous growth through collaboration.
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {["React", "Next.js", "TypeScript", "Node.js", "UI/UX"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-800/50 text-[#00ff7b] rounded-full text-sm font-medium border border-gray-700/50 hover:border-[#00ff7b]/30 transition-colors"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="outline"
                size="lg"
                onClick={viewStack}
                className="p-6 sm:p-8 lg:p-6 text-sm sm:text-xl lg:text-sm font-semibold"
              >
                View Stack
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={readMore}
                className="group flex items-center gap-2 p-6 sm:p-8 lg:p-6 text-sm sm:text-xl lg:text-sm font-semibold"
              >
                Read More
                <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-shrink-0">
            <div className="relative group">
              {/* Gradient background effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00ff7b]/20 to-blue-500/20 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Image container */}
              <div className="relative">
                <div className="w-80 h-96 md:w-96 md:h-[28rem] relative overflow-hidden rounded-2xl border border-gray-700/50 shadow-2xl">
                  <Image
                    src={Me}
                    alt="Profile picture - passionate developer"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Floating accent */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#00ff7b]/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
