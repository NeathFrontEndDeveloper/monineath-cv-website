"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { skillsData } from "@/constant/data";
import { getSkillInfo, totalSkills, expertSkills } from "@/constant/functions";

const Skills = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const skillCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center text-white px-4 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="text-[#00ff99] text-sm sm:text-base font-semibold uppercase tracking-wider mb-2 block">
              What I Know
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
              My Tech Stack
            </h1>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#00ff99] to-[#00ff99]/50 rounded-full mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            A comprehensive overview of my technical skills and expertise across
            different domains of software development.
          </motion.p>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12 sm:space-y-16 lg:space-y-20"
        >
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="relative"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8 sm:mb-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-3 sm:p-4 rounded-xl shadow-lg border-2 backdrop-blur-sm"
                  style={{
                    backgroundColor: `${category.color}20`,
                    borderColor: `${category.color}40`,
                    color: category.color,
                  }}
                >
                  {React.createElement(category.icon, { className: "w-6 h-6" })}
                </motion.div>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    {category.title}
                  </h2>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: categoryIndex * 0.2 + 0.3,
                      duration: 0.6,
                    }}
                    className="w-16 sm:w-20 h-0.5 rounded-full mt-2 origin-left"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
              </div>

              {/* Skills Grid */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              >
                {category.skills.map((skill, skillIndex) => {
                  const skillInfo = getSkillInfo(skill.level);

                  return (
                    <motion.div
                      key={skill.name}
                      variants={skillCardVariants}
                      whileHover="hover"
                      className="group relative p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      {/* Skill Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#00ff99] transition-colors duration-300">
                          {skill.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star
                            className="w-4 h-4"
                            style={{ color: skillInfo.color }}
                            fill={skill.level >= 90 ? skillInfo.color : "none"}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: skillInfo.color }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative mb-3">
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              delay: categoryIndex * 0.3 + skillIndex * 0.1,
                              duration: 1,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: skillInfo.color }}
                          />
                        </div>
                      </div>

                      {/* Skill Level Badge */}
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: `${skillInfo.color}20`,
                            color: skillInfo.color,
                          }}
                        >
                          {skillInfo.text}
                        </span>



                        {/* Skill dots */}
                        <div className="flex gap-1">
                          {Array.from({
                            length: Math.floor(skill.level / 25),
                          }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay:
                                  categoryIndex * 0.3 +
                                  skillIndex * 0.1 +
                                  i * 0.1,
                                duration: 0.3,
                              }}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: skillInfo.color }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${category.color}40 0%, transparent 70%)`,
                        }}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
        >
          {[
            { number: `${totalSkills}+`, label: "Total Skills" },
            { number: skillsData.length, label: "Categories" },
            { number: expertSkills, label: "Expert Level" },
            { number: "0", label: "comeing soon..." },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-[#00ff99]/20"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                className="text-3xl sm:text-4xl font-bold text-[#00ff99] mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-sm sm:text-base text-gray-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
