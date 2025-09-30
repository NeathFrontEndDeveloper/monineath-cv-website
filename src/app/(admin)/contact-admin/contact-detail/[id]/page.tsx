"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RefreshCw, MoveLeft } from "lucide-react";
import { ContactType } from "@/types/contact-type";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { fetchContactById } from "@/lib/api/contact-api";
import { useLoading } from "@/store/Loading/useLoading";

export default function ContactDetailPage() {
  const { id } = useParams();
  const [contact, setContact] = useState<ContactType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { pageLoading, setPageLoading } = useLoading.getState();
  const router = useRouter();

  useEffect(() => {
    const loadContact = async () => {
      try {
        if (!id) return;

        const found = await fetchContactById(String(id));
        if (found) {
          setContact(found);
        } else {
          setError("No contact found");
        }
      } catch {
        setError("Failed to fetch contact");
      } finally {
        setPageLoading(false);
      }
    };

    loadContact();
  }, [id, setPageLoading]);

  if (pageLoading) {
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
          <div className="mb-4">
            <h1 className="text-6xl ">Something went wrong.</h1>
          </div>
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
            onClick={() => router.back()}
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
            Contact Date
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
