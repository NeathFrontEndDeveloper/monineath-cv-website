"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ProjectAdminType } from "@/types/project-type";
import { useLoading } from "@/store/Loading/useLoading";
import { ProjectForm } from "@/app/(admin)/project-admin/components/core/project-detail-form";
import { ProjectImage } from "@/app/(admin)/project-admin/components/core/project-detail-image";
import { ProjectError } from "@/app/(admin)/project-admin/components/core/project-detail-error";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import LoadingScreen from "@/components/shared/Loading";
import { fetchProjectDetail } from "@/lib/api/project-api";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectAdminType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { pageLoading, setPageLoading } = useLoading.getState();
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

  const loadProjectDetail = useCallback(async () => {
    try {
      const found = await fetchProjectDetail(id as string);
      if (found) {
        setProject(found);
      } else {
        setError("No data found.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch project");
    } finally {
      setPageLoading(false);
    }
  }, [id, setPageLoading]);

  useEffect(() => {
    if (id) loadProjectDetail();
  }, [loadProjectDetail, id]);

  if (pageLoading) return <LoadingScreen />;
  if (error || !project) return <ProjectError message={error || "No data"} />;

  return (
    <>
      <div className="mb-8">
        <div className="space-y-4">
          <Button
            variant="secondary_admin"
            onClick={() => router.back()}
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
