import { create } from "zustand";
import { educationType } from "@/types/education-type";
import { getEducations } from "@/lib/api/education-api";
import { useLoading } from "@/store/Loading/useLoading";

interface EducationState {
  educations: educationType[];
  error: string | null;
  fetchEducation: () => Promise<void>;
}

export const useEducations = create<EducationState>((set) => ({
  educations: [],
  error: null,

  fetchEducation: async () => {
    const { setPageLoading } = useLoading.getState();

    try {
      setPageLoading(true);
      set({ error: null });

      const educations = await getEducations();
      set({ educations });
    } catch (err) {
      console.error("Error fetching educations:", err);
      set({ error: "Failed to fetch educations" });
    } finally {
      setPageLoading(false);
    }
  },
}));
