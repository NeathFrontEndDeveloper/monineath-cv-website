"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { educationType } from "@/types/education-type";
import { fetchEducationById, updateEducation } from "@/lib/api/education-api";
import { RefreshCw, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const EditEduPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<educationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch education details
  useEffect(() => {
    const loadEducation = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await fetchEducationById(id as string);
        if (data) {
          setFormData(data);
          setError(null);
        } else {
          setError("No data found.");
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load education.");
      } finally {
        setLoading(false);
      }
    };

    loadEducation();
  }, [id]);

  // Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      setSubmitting(true);
      await updateEducation(id as string, formData);
      router.push("/education-admin");
    } catch (err) {
      console.error(err);
      setError("Failed to update education.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !formData) {
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
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div className="mb-8">
        <div className="space-y-4">
          <Button
            type="button"
            variant="secondary_admin"
            onClick={() => router.back()}
            className="group flex items-center gap-2"
          >
            <MoveLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back
          </Button>
          <h1 className="text-4xl font-bold mb-4">Edit Education</h1>
          <p className="text-gray-400">Update your education details here.</p>
        </div>
      </div>

      {/* Editable Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Institution */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Institution
          </label>
          <input
            name="institution"
            type="text"
            value={formData.institution}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Course */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Course
          </label>
          <input
            name="course"
            type="text"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="space-y-2 lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            name="date"
            type="text"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8 flex gap-4">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Updating..." : "Save Changes"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditEduPage;
