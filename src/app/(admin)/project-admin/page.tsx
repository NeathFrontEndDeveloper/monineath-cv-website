"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectTable from "./project-table/project-table";

interface ProjectType {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string;
  techStack: string;
  active: boolean;
}

const Project = () => {
  return (
    <>
      {/* header */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Project Management
          </h1>
        </div>

        <p className="text-gray-700 text-sm md:text-md font-medium max-w-2xl">
          View your Project and manage them effectively.
        </p>
      </div>

      {/* project grid */}
      <div className="mt-6">
        <ProjectTable />
      </div>
    </>
  );
};

export default Project;
