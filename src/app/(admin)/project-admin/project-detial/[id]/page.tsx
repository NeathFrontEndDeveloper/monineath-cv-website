"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ProjectAdminType } from "@/types/project-type";
import { useLoading } from "@/store/Loading/use-loading-store";
import { ProjectForm } from "@/app/(admin)/project-admin/components/core/project-detail-form";
import { ProjectImage } from "@/app/(admin)/project-admin/components/core/project-detail-image";
import { ProjectError } from "@/app/(admin)/project-admin/components/core/project-detail-error";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/request";
import LoadingScreen from "@/components/shared/Loading";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectAdminType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
  const { pageLoading, setPageLoading } = useLoading.getState();
  const router = useRouter();

  const handleBack = () => {
    router.push("/project-admin");
  };

  const fetchProject = useCallback(async () => {
    try {
      const res = await api.get(
        `/projects?filters[documentId][$eq]=${id}&populate=image`
      );
      const found = res.data.data[0];
      if (found) {
        setProject(found);
      } else {
        setError("No data found.");
      }
    } catch (err) {
      console.error("Error fetching project:", err);
      setError("Failed to fetch project");
    } finally {
      setPageLoading(false);
    }
  }, [id, setPageLoading]);

  useEffect(() => {
    if (id) fetchProject();
  }, [fetchProject, setPageLoading, id]);

  if (pageLoading) return <LoadingScreen />;
  if (error || !project) return <ProjectError message={error || "No data"} />;

  return (
    <>
      <div className="mb-8">
        {/* Project Header */}
        <div className="space-y-4">
          <Button
            variant="secondary_admin"
            onClick={handleBack}
            className="group flex items-center gap-2"
          >
            <MoveLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-4">Project Detail</h1>
          <p className="text-gray-400">View your Project detail here.</p>
        </div>
      </div>
      <ProjectForm project={project} />
      <ProjectImage
        title={project.title}
        image={project.image}
        BASE_URL={BASE_URL}
      />
    </>
  );
};

export default ProjectDetailPage;
