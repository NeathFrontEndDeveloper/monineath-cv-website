"use client";

import { useEffect } from "react";
import { useProjects } from "@/store/project-store/useProject";
import { useLoading } from "@/store/Loading/useLoading";
import LoadingScreen from "@/components/shared/Loading";
import Image from "next/image";
import { ProjectAdminType } from "@/types/project-type";

const ProjectsPage = () => {
  const pageLoading = useLoading((state) => state.pageLoading);
  const { projects, fetchProjects } = useProjects();

  useEffect(() => {
    (async () => {
      await fetchProjects();
    })();
  }, [fetchProjects]);

  return (
    <div className="min-h-screen w-full">
      <section className="relative px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <span className="inline-flex items-center gap-2 bg-[#00ff99]/10 text-[#00ff99] px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider border border-[#00ff99]/20 shadow-lg shadow-[#00ff99]/5">
              <span className="w-2 h-2 bg-[#00ff99] rounded-full animate-pulse" />
              View my work
            </span>

            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              My Projects
            </h1>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              A curated collection of my latest work, showcasing modern web
              development, mobile applications, and creative design solutions.
            </p>
          </div>

          {/* Project Grid */}
          <div className="mt-20">
            {pageLoading ? (
              <LoadingScreen />
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: ProjectAdminType) => (
                  <div
                    key={project.id}
                    className="group relative bg-white/5 rounded-xl overflow-hidden border border-slate-700/50 hover:border-[#00ff99]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00ff99]/10 hover:-translate-y-2"
                  >
                    {project.image && (
                      <div className="relative w-full h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    )}

                    <div className="p-6 space-y-4">
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-[#00ff99]">
                          {project.title}
                        </h2>
                        <p className="text-white leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {project.features ? (
                        <div className="space-y-2 pt-3 border-t border-[#00ff99]/50">
                          <h3 className="text-sm font-semibold text-[#00ff99] uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#00ff99] rounded-full" />
                            Features
                          </h3>
                          <p className="text-sm text-white leading-relaxed line-clamp-2">
                            {project.features}
                          </p>
                        </div>
                      ) : (
                        <div className="pt-3">
                          <h3 className="text-sm font-semibold text-[#00ff99] uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#00ff99] rounded-full" />
                            Features
                          </h3>
                          <p className="text-sm text-white leading-relaxed line-clamp-2">
                            Features not found.
                          </p>
                        </div>
                      )}

                      {project.techStack && (
                        <div className="space-y-2">
                          <h3 className="text-sm font-semibold text-[#00ff99] uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-1 text-[#00ff99] bg-white rounded-full" />
                            Tech Stack
                          </h3>
                          <p className="text-sm text-white leading-relaxed line-clamp-2">
                            {project.techStack}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
                  <svg
                    className="w-10 h-10 text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-xl text-slate-400 font-medium">
                  No projects found.
                </p>
                <p className="text-white mt-2">Check back soon for new work!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
