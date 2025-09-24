import { create } from "zustand";
import type { AuthState } from "@/types/auth-type";

export const useAuth = create<AuthState>((set) => ({
  user: null,
  username: "",
  email: "",
  password: "",
  isLoading: false,
  error: null,

  // Actions
  setAuth: (user) => set({ user }),

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // Replace with your actual API call to Strapi or your backend
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: credentials.email || credentials.username,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the API call fails, set the error state.
        throw new Error(data.error.message || "Login failed");
      }

      // If successful, set the user and a token (if your API returns one)
      set({ user: data.user, isLoading: false });
      // You can also persist the authentication token here, e.g., in local storage.
      localStorage.setItem("authToken", data.jwt);
    } catch (err) {
      // Handle errors
      // set({ isLoading: false, error: err.message });
      console.log(err, "===response error===");
    }
  },

  logout: () => {
    // Clear the user from the store and remove the token.
    set({ user: null });
    localStorage.removeItem("authToken");
  },
}));
