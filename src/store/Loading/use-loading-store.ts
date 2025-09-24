import { create } from "zustand";

type LoadingState = {
  pageLoading: boolean;
  editEduLoading: boolean;
  setPageLoading: (value: boolean) => void;
  setEditEduLoading: (value: boolean) => void;
};

export const useLoading = create<LoadingState>((set) => ({
  pageLoading: true,
  editEduLoading: false,
  setPageLoading: (value) => set({ pageLoading: value }),
  setEditEduLoading: (value) => set({ editEduLoading: value }),
}));
