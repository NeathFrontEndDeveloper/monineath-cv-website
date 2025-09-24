"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import type { ProjectAdminType } from "@/types/project-type";

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectAdminType[]>([]);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/projects`, {
          headers: { "Content-Type": "application/json" },
        });
        setProjects(res.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [BASE_URL]);

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
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 border rounded-lg">
                    <h2 className="text-xl font-bold">{project.title}</h2>
                    <p>{project.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No projects found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
