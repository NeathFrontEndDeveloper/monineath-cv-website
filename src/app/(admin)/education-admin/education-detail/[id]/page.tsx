"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { educationType } from "@/constant/education-type";

export default function EducationDetailPage() {
  const { id } = useParams();
  const [education, setEducation] = useState<educationType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const education = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/educations?filters[documentId][$eq]=${id}`
        );
        const json = await res.json();

        // Strapi returns an array inside data
        const found = json.data[0];
        if (found) {
          setEducation({
            id: found.id,
            documentId: found.documentId,
            insitituion: found.insitituion,
            course: found.course,
            description: found.description,
            date: found.date,
            location: found.location,
          });
        }
      } catch (error) {
        console.error("Error fetching education:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) education();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!education) return <p>No data found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">education Detail</h1>
      {/* <p>
        <strong>ID:</strong> {education.id}
      </p> */}
      {/* <p>
        <strong>Document ID:</strong> {contact.documentId}
      </p> */}
      <p>
        <strong>insitituion:</strong> {education.insitituion}
      </p>
      <p>
        <strong>course:</strong> {education.course}
      </p>
      <p>
        <strong>description:</strong> {education.description}
      </p>
      <p>
        <strong>date:</strong> {education.date}
      </p>
      <p>
        <strong>location:</strong> {education.location}
      </p>
    </div>
  );
}
