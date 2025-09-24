"use client";

import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConnect } from "@/constant/functions";

const ContactBanner: React.FC = () => {
  const hireMe = useConnect();

  return (
    <div className="relative overflow-hidden py-16 px-6">
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Looking for a Developer?
            <span className="text-[#00ff7b] block">Hire Me Today</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            I help bring ideas to life with clean code and creative solutions.
            Let&apos;s work together to build your next big project.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-12">
          <Button
            variant="secondary"
            onClick={hireMe}
            size="lg"
            className="group gap-2 p-6 sm:p-8 lg:p-6 text-sm sm:text-xl lg:text-sm font-semibold"
          >
            Hire Me
            <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
