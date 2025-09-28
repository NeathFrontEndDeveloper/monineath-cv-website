import { create } from "zustand";
import type { contactTableType } from "@/types/contact-type";
import { fetchContacts as fetchContactsApi } from "@/lib/api/contact-api";
import { useLoading } from "@/store/Loading/useLoading";

interface ContactState {
  contacts: contactTableType[];
  error: string | null;
  fetchContacts: () => Promise<void>;
}

export const useContacts = create<ContactState>((set) => ({
  contacts: [],
  error: null,

  fetchContacts: async () => {
    const { setPageLoading } = useLoading.getState();

    try {
      setPageLoading(true);
      set({ error: null });

      const contacts = await fetchContactsApi();
      set({ contacts });
    } catch (err) {
      console.error("Error fetching contacts:", err);
      set({ error: "Failed to fetch contacts" });
    } finally {
      setPageLoading(false);
    }
  },
}));
