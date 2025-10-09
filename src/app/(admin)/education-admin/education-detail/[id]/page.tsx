"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { educationType } from "@/types/education-type";
import { fetchEducationById } from "@/lib/api/education-api";
import { RefreshCw, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const EducationDetailPage = () => {
  const { id } = useParams();
  const [education, setEducation] = useState<educationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleBack = () => {
    router.push("/education-admin");
  };

  useEffect(() => {
    const loadEducation = async () => {
      if (!id) return;
      setLoading(true);
      const data = await fetchEducationById(id as string);
      if (data) {
        setEducation(data);
        setError(null);
      } else {
        setError("No data found.");
      }
      setLoading(false);
    };

    loadEducation();
  }, [id]);

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
          <label className="block text-sm font-medium text-gray-700">
            Institution
          </label>
          <input
            type="text"
            value={education.institution}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
          />
        </div>

        {/* Course */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Course
          </label>
          <input
            type="text"
            value={education.course}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="space-y-2 lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={education.description}
            readOnly
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg resize-none"
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="text"
            value={education.date}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={education.location}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
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
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default EducationDetailPage;
