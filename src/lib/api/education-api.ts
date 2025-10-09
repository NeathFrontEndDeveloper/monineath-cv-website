import api from "@/lib/request";
import { educationType } from "@/types/education-type";
// import { useLoading } from "@/store/Loading/useLoading";

export const getEducations = async (): Promise<educationType[]> => {
  const res = await api.get("/educations");
  const json = res.data;

  return json.data.map((item: educationType) => ({
    id: String(item.id),
    documentId: item.documentId,
    createdAt: item.createdAt,
    institution: item.institution,
    course: item.course,
    description: item.description,
    date: item.date,
    location: item.location,
  }));
};

export const deleteEdu = async (documentId: string) => {
  await api.delete(`/educations/${documentId}`);
};

// fetch a single data
export const fetchEducationById = async (
  id: string
): Promise<educationType | null> => {
  try {
    const res = await api.get(`/educations?filters[documentId][$eq]=${id}`);
    const json = await res.data;
    const found = json.data[0];

    if (!found) return null;

    return {
      id: found.id,
      documentId: found.documentId,
      institution: found.institution,
      course: found.course,
      description: found.description,
      date: found.date,
      location: found.location,
      createdAt: found.createdAt,
    };
  } catch (err) {
    console.error("fetchEducationById error:", err);
    return null;
  }
};

// Fetch Edit Education Logic
export async function updateEducation(id: string, updatedData: educationType) {
  try {
    const res = await api.put(`/educations/${id}`, {
      data: updatedData, // <-- only this, no "id" here
    });

    return res.data;
  } catch (err) {
    console.error("Failed to update education:", err);
    throw err;
  }
}

// Create Education Logic
// export const createEducation = async (values: any) => {
//   const res = await api.post("/educations", { data: values });
//   return res.data;
// };
