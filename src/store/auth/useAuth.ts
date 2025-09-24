import { create } from "zustand";
import { AuthType } from "@/types/auth-type";
import Cookies from "js-cookie";

export const useAuthStore = create<AuthType>((set) => ({
  token: null,
  user: null,
  loading: false,
  error: null,

  setAuth: (token, user) => set({ token, user, error: null }),
  clearAuth: () => set({ token: null, user: null, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export const Logout = () => {
  Cookies.remove("token");
  window.location.href = "/login";
};
