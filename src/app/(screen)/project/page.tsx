"use client";

import { motion } from "framer-motion";

export default function ProjectsPage() {
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
        </div>
      </section>
    </div>
  );
}
