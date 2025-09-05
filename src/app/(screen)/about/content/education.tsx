"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Award, ChevronDown, ChevronUp } from "lucide-react";
import { education } from "@/constant/data";
import { motion } from "framer-motion";

const Education: React.FC = () => {
  const [expandedEducation, setExpandedEducation] = useState<number | null>(
    null
  );
  // const [visibleSkills, setVisibleSkills] = useState(false);

  const toggleEducation = (id: number) => {
    setExpandedEducation(expandedEducation === id ? null : id);
  };

  // const continuousLearningSkills = [
  //   "Machine Learning",
  //   "Cloud Architecture",
  //   "DevOps",
  //   "Microservices",
  //   "Blockchain",
  //   "Cybersecurity",
  //   "Mobile Development",
  //   "AI/ML",
  // ];

  return (
    <div className="min-h-screen bg-transparent py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Header */}
        <div className="text-center mb-16 space-y-6 relative">
          <motion.span
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[#00ff99] px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider"
          >
            My Education Background
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
          >
            Education
          </motion.h1>

          <div className="w-full flex items-center justify-center ">
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-12 xs:w-14 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-[#00ff99] to-[#00ff99]/50 rounded-full mx-auto lg:mx-0"
            />
          </div>
        </div>

        {/* Education Timeline */}
        <div className="mb-20">
          {/* <h2 className="text-3xl font-bold text-white mb-12 flex items-center justify-center">
            <div className="bg-gradient-to-r from-[#00ff7b] to-white/20 p-3 rounded-xl mr-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-[#1c1c22]" />
            </div>
            Academic Background
          </h2> */}

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={edu.id} className="relative group">
                {/* Timeline line */}
                {index !== education.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-1 bg-gradient-to-b  from-[#00ff7b] to-white/20 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
                )}

                <div className="flex items-start">
                  {/* Enhanced Timeline dot */}
                  {/* <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-[#00ff7b] to-white/20 rounded-2xl flex items-center justify-center mr-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <GraduationCap className="w-8 h-8 text-[#1c1c22] relative z-10" />
                  </div> */}

                  {/* Enhanced Content Card */}
                  <div className="flex-grow bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-[#32f38f] hover:border-[#00ff7b]">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-[#00ff7b] mb-2">
                          {edu.institution}
                        </h3>
                        <p className="text-md font-bold text-white">
                          {edu.field}
                        </p>
                      </div>

                      <div className="flex flex-col lg:items-end space-y-2">
                        <div className="flex items-center text-[#1c1c22] bg-[#00ff7b] px-3 py-1 rounded-full shadow-md">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">
                            {edu.period}
                          </span>
                        </div>
                        <div className="flex items-center text-[#1c1c22] bg-[#00ff7b] px-3 py-1 rounded-full shadow-md">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-white text-lg leading-relaxed mb-6">
                      {edu.description}
                    </p>

                    {/* Collapsible Details */}
                    <button
                      onClick={() => toggleEducation(edu.id)}
                      className="flex items-center text-blue-500 hover:text-blue-700 font-semibold mb-4 transition-colors duration-200 cursor-pointer"
                      aria-expanded={expandedEducation === edu.id}
                    >
                      {expandedEducation === edu.id ? (
                        <>
                          <ChevronUp className="w-5 h-5 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-5 h-5 mr-1" />
                          Show Details
                        </>
                      )}
                    </button>

                    {expandedEducation === edu.id && (
                      <div className="space-y-6 animate-in slide-in-from-top-4 duration-300">
                        {edu.achievements && (
                          <div>
                            <h4 className="font-bold text-[#00ff7b] mb-3 text-lg">
                              Key Achievements:
                            </h4>
                            <ul className="space-y-2">
                              {edu.achievements.map((achievement, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start text-white"
                                >
                                  <Award className="w-5 h-5 mr-3 mt-0.5 text-amber-500 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Certifications */}
        {/* <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center justify-center">
            <div className="bg-gradient-to-r from-[#00ff7b] to-white/20 p-3 rounded-xl mr-4 shadow-lg">
              <Award className="w-8 h-8 text-[#1c1c22]" />
            </div>
            Certifications & Professional Development
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-[#00ff7b] group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-xl group-hover:from-emerald-100 group-hover:to-teal-100 transition-colors duration-300">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
                    {cert.date}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {cert.issuer}
                </p>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {cert.description}
                </p>

                {cert.credential_id && (
                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-xs text-slate-400 flex items-center">
                      <span className="mr-2">Credential ID:</span>
                      <code className="bg-slate-100 px-2 py-1 rounded font-mono">
                        {cert.credential_id}
                      </code>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* Enhanced Continuous Learning Section */}
        {/* <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>

          <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl text-lg font-bold shadow-lg mb-6">
                <Sparkles className="w-5 h-5" />
                Continuous Learning
              </div>

              <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                I believe in lifelong learning and staying current with emerging
                technologies and industry best practices.
              </p>

              <button
                onClick={() => setVisibleSkills(!visibleSkills)}
                className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {visibleSkills ? (
                  <>
                    <ChevronUp className="w-5 h-5" />
                    Hide Skills
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5" />
                    Explore Skills
                  </>
                )}
              </button>
            </div>

            {visibleSkills && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-top-6 duration-500">
                {continuousLearningSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm text-slate-700 px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center border border-white/50 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="group-hover:text-indigo-600 transition-colors duration-200">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Education;
