"use client";
import Image from "next/image";
import { Maximize2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { StrapiImage } from "@/types/strapi";
import { ProjectImageModal } from "@/app/(admin)/project-admin/components/modal/project-image-modal";

export const ProjectImage = ({
  title,
  image,
  BASE_URL,
}: {
  title: string;
  image: StrapiImage | null;
  BASE_URL: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!image) {
    return (
      <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <p>No image available</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 lg:col-span-2">
      <label className="block text-sm font-medium text-gray-700">
        Project Image
      </label>

      {/* Thumbnail */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative group focus:outline-none"
        >
          <Image
            src={`${BASE_URL}${image.formats?.medium?.url || image.url}`}
            alt="Project thumbnail"
            width={400}
            height={300}
            className="rounded-lg border border-gray-200 transition-all hover:border-blue-300 shadow-sm"
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center">
            <div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              <Maximize2 size={16} />
              Click to enlarge
            </div>
          </div>
        </button>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <ProjectImageModal
          title={title}
          image={image}
          BASE_URL={BASE_URL}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
