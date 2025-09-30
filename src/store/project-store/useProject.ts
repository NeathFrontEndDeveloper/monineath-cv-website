import { create } from "zustand";
import { ProjectAdminType } from "@/types/project-type";
import { getProjects } from "@/lib/api/project-api";
import { useLoading } from "@/store/Loading/useLoading";

interface ProjectState {
  projects: ProjectAdminType[];
  error: string | null;
  fetchProjects: () => Promise<void>;
}

export const useProjects = create<ProjectState>((set) => ({
  projects: [],
  error: null,

  fetchProjects: async () => {
    const { setPageLoading } = useLoading.getState();

    try {
      setPageLoading(true);
      set({ error: null });

      const data = await getProjects();
      set({ projects: data });
    } catch (err) {
      console.log(err);
      // set({ error: "Failed to fetch projects" });
      console.error("Error fetching projects:", err);
    } finally {
      setPageLoading(false);
    }
  },
}));
