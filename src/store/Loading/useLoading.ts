import { create } from "zustand";

type LoadingState = {
  pageLoading: boolean;
  btnLoading: boolean;
  setPageLoading: (value: boolean) => void;
  setBtnLoading: (value: boolean) => void;
};

export const useLoading = create<LoadingState>((set) => ({
  pageLoading: true,
  btnLoading: false,
  setPageLoading: (value) => set({ pageLoading: value }),
  setBtnLoading: (value) => set({ btnLoading: value }),
}));
