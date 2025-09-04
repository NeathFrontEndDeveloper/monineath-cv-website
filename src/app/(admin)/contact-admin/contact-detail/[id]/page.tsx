"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RefreshCw, MoveLeft } from "lucide-react";
import { ContactType } from "@/types/contact-admin-type";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ContactDetailPage() {
  const { id } = useParams();
  const [contact, setContact] = useState<ContactType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleBack = () => {
    // setLoading(true);
    router.push("/contact-admin");
  };

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/contacts?filters[documentId][$eq]=${id}`
        );
        const json = await res.json();

        const found = json.data[0];
        if (found) {
          setContact({
            id: found.id,
            documentId: found.documentId,
            fullName: found.fullName,
            email: found.email,
            message: found.message,
            createdAt: found.createdAt,
          });
        } else {
          setError("No contact found");
        }
      } catch (err) {
        setError("Failed to fetch contact");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchContact();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <p className="text-gray-400 text-xl">
            {error || "No contact found."}
          </p>
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
          <h1 className="text-4xl font-bold text-gray-900">Contact Detail</h1>
          <p className="text-gray-400">View your contact details</p>
        </div>
      </div>

      {/* Contact Details Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-gray-900 text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={contact.fullName}
            readOnly
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-900 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={contact.email}
            readOnly
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Message */}
        <div className="lg:col-span-2">
          <label className="block text-gray-900 text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            value={contact.message}
            readOnly
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Created At */}
        <div>
          <label className="block text-gray-900 text-sm font-medium mb-2">
            Created At
          </label>
          <input
            type="text"
            value={new Date(contact.createdAt).toLocaleString()}
            readOnly
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </>
  );
}
