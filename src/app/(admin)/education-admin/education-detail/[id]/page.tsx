"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { educationType } from "@/types/education-admin-type";
import { RefreshCw, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
// import { Textarea } from "@/components/ui/textarea";

export default function EducationDetailPage() {
  const { id } = useParams();
  const [education, setEducation] = useState<educationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const handleBack = () => {
    // setLoading(true);
    router.push("/education-admin");
  };

  useEffect(() => {
    const education = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/educations?filters[documentId][$eq]=${id}`
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
            createdAt: found.createdAt,
          });
        } else {
          setError("No data found.");
        }
      } catch (error) {
        setError("Failed to fetch education");
        console.error("Error fetching education:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) education();
  }, [id, BASE_URL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }
  if (error || !education) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <p className="text-gray-400 text-xl">{error || "No data found."}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="space-y-4">
          <Button
            variant="secondary_admin"
            onClick={handleBack}
            className="group flex items-center gap-2"
          >
            <MoveLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-4">Education Detail</h1>
          <p className="text-gray-400">View your education detail here.</p>
        </div>
      </div>

      {/* Education Detail Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Institution */}
        <div className="space-y-2">
          <label
            htmlFor="institution"
            className="block text-sm font-medium text-gray-700"
          >
            Insitituion
          </label>
          <input
            id="institution"
            type="text"
            value={education.insitituion}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Course */}
        <div className="space-y-2">
          <label
            htmlFor="course"
            className="block text-sm font-medium text-gray-700"
          >
            Course
          </label>
          <input
            id="course"
            type="text"
            value={education.course}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Description - spans full width on larger screens */}
        <div className="space-y-2 lg:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={education.description}
            readOnly
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            id="date"
            type="text"
            value={education.date}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            value={education.location}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            ID
          </label>
          <input
            id="location"
            type="text"
            value={education.id}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Created At */}
        <div>
          <label className="block text-gray-900 text-sm font-medium mb-2">
            Created At
          </label>
          <input
            type="text"
            value={new Date(education.createdAt).toLocaleString()}
            readOnly
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </>
  );
}
