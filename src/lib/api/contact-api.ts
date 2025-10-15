import api from "@/lib/request";
import { ContactType, contactTableType } from "@/types/contact-type";
import { useLoading } from "@/store/Loading/useLoading";

// Get All contacts
export const fetchContacts = async (): Promise<contactTableType[]> => {
  const res = await api.get("/contacts");
  const items: ContactType[] = res.data.data;

  return items.map((item) => ({
    id: String(item.id),
    documentId: item.documentId,
    fullName: item.fullName,
    email: item.email,
    message: item.message,
  }));
};

export const deleteContact = async (documentId: string) => {
  await api.delete(`/contacts/${documentId}`);
};

// Fetch a single Contact by DocumentsId
export const fetchContactById = async (
  documentId: string
): Promise<ContactType | null> => {
  const { setPageLoading } = useLoading.getState();
  try {
    const res = await api.get(
      `/contacts?filters[documentId][$eq]=${documentId}`
    );

    const found = res.data.data[0];
    if (!found) return null;

    return {
      id: found.id,
      documentId: found.documentId,
      fullName: found.fullName,
      email: found.email,
      message: found.message,
      createdAt: found.createdAt,
    };
  } catch (error) {
    console.error("Failed to fetch contact:", error);
    throw new Error("Failed to fetch contact");
  } finally {
    setPageLoading(false);
  }
};
