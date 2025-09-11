import React from "react";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSkills } from "@/constant/functions";
import { skills } from "@/constant/data";

const SkillSection: React.FC = () => {
  const viewMore = useSkills();

  return (
    <section className="w-full h-auto mb-16 mt-28">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            My Tech{" "}
            <span className="text-[#00ff7b] relative inline-block">
              Stack
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#00ff7b] rounded-full opacity-60"></span>
            </span>
          </h1>

          {/* <div className="w-20 h-1 bg-gradient-to-r from-[#00ff7b] to-transparent mx-auto rounded-full"></div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={index}
                className="group text-center p-6 rounded-lg bg-white/5 hover:bg-white/10 hover:shadow-lg hover:shadow-[#00ff7b] transition-all duration-300 cursor-pointer"
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-gray-800 shadow-md shadow-[#00ff7b] rounded-lg 
                    group-hover:scale-110 transition-transform duration-300"
                >
                  <IconComponent className="w-6 h-6 text-[#00ff7b]" />
                </div>
                <h3 className="text-lg font-semibold text-[#00ff7b] mb-2">
                  {skill.name}
                </h3>
                <p className="text-sm text-white">{skill.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            variant="secondary"
            onClick={viewMore}
            size="lg"
            className="group gap-2 p-6 sm:p-8 lg:p-6 text-sm sm:text-xl lg:text-sm font-semibold"
          >
            View More
            <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
