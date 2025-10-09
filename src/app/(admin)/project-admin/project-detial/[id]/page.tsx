"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ProjectAdminType } from "@/types/project-type";
import { useLoading } from "@/store/Loading/useLoading";
import { ProjectForm } from "@/app/(admin)/project-admin/components/core/project-detail-form";
import { ProjectImage } from "@/app/(admin)/project-admin/components/core/project-detail-image";
import { ProjectError } from "@/app/(admin)/project-admin/components/core/project-detail-error";
import DetailHeader from "@/app/(admin)/project-admin/components/core/project-detail-header";
import LoadingScreen from "@/components/shared/Loading";
import { fetchProjectDetail } from "@/lib/api/project-api";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectAdminType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { pageLoading, setPageLoading } = useLoading.getState();

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

  const loadProjectDetail = useCallback(async () => {
    try {
      const found = await fetchProjectDetail(id as string);
      if (found) {
        setProject(found);
      } else {
        setError("No data found.");
      }
    } catch (err) {
      // setError(err.message || "Failed to fetch project");
      console.log(err, "<<< error");
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
      <DetailHeader />
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
