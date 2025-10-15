import api from "@/lib/request";
import { ProjectAdminType, ProjectCreateInput } from "@/types/project-type";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProjects = async (): Promise<ProjectAdminType[]> => {
  const res = await api.get("/projects?populate=*");
  const json = res.data;

  return json.data.map((item: any) => {
    const imageUrl = item.image?.url ? `${BASE_URL}${item.image.url}` : "";

    return {
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      description: item.description,
      features: item.features,
      techStack: item.techStack,
      active: item.active,
      image: imageUrl,
      createdAt: item.createdAt,
    };
  });
};

// Project Detail logic
export const fetchProjectDetail = async (
  documentId: string,
): Promise<ProjectAdminType | null> => {
  try {
    const res = await api.get(
      `/projects?filters[documentId][$eq]=${documentId}&populate=image`,
    );

    const found = res.data.data[0];
    return found || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("Failed to fetch project");
  }
};

// Create Project Logic
export const createProject = async (
  values: ProjectCreateInput,
  image?: File | null,
) => {
  let imageId: number | null = null;

  if (image) {
    imageId = await uploadImage(image);
  }

  const projectData = {
    ...values,
    image: imageId,
  };

  const res = await api.post("/projects", { data: projectData });
  return res.data;
};

// Upload image and return its ID
export const uploadImage = async (file: File): Promise<number | null> => {
  const formData = new FormData();
  formData.append("files", file);

  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data[0]?.id ?? null;
};
