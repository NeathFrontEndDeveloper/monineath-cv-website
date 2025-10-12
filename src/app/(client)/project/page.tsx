"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useProjects } from "@/store/project-store/useProject";
import { useLoading } from "@/store/Loading/useLoading";
import Image from "next/image";
import { ProjectAdminType } from "@/types/project-type";

export default function ProjectsPage() {
  const pageLoading = useLoading((state) => state.pageLoading);
  const { projects, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[#00ff99] px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider"
            >
              View my work
            </motion.span>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              My Projects
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A curated collection of my latest work, showcasing modern web
              development, mobile applications, and creative design solutions.
            </p>
          </motion.div>

          {/* project grid */}
          <div className="mt-12">
            {pageLoading ? (
              <div className="text-center text-white">
                <p>Loading...</p>
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project: ProjectAdminType) => (
                  <div key={project.id} className="p-4 border rounded-lg">
                    {project.image && (
                      <div className="relative w-full h-48 mb-4">
                        <Image
                          src={project.image.url}
                          alt={project.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <h2 className="text-xl font-bold text-white">
                      {project.title}
                    </h2>
                    <p className="text-slate-300">{project.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-white">
                <p>No projects found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
