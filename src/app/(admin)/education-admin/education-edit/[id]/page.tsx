"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { educationType } from "@/types/education-admin-type";
import { RefreshCw, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const UpdateEduForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<educationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleBack = () => router.push("/education-admin");

  useEffect(() => {
    const fetchEducation = async () => {
      if (!id) return;

      try {
        const res = await axios.get(`${BASE_URL}/api/educations/${id}`);
        const found = res.data.data;

        if (found) {
          setFormData({
            id: found.id,
            documentId: found.attributes.documentId,
            insitituion: found.attributes.insitituion,
            course: found.attributes.course,
            description: found.attributes.description,
            date: found.attributes.date,
            location: found.attributes.location,
            createdAt: found.attributes.createdAt,
          });
        } else {
          setError("No data found.");
        }
      } catch (err) {
        console.error("Error fetching education:", err);
        setError("Failed to fetch education.");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [id, BASE_URL]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSubmitting(true);
    try {
      await axios.put(`${BASE_URL}/api/educations/${formData.id}`, {
        data: formData,
      });
      router.push("/education-admin");
    } catch (err) {
      console.error("Update failed:", err);
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
            onClick={handleBack}
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
          <label
            htmlFor="insitituion"
            className="block text-sm font-medium text-gray-700"
          >
            Institution
          </label>
          <input
            id="insitituion"
            type="text"
            value={formData.insitituion}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
            value={formData.course}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="space-y-2 lg:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
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
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
        <Button type="button" variant="secondary" onClick={handleBack}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UpdateEduForm;
