"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProjectAdminType } from "@/types/project-type";
import {
  RefreshCw,
  MoveLeft,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLoading } from "@/store/Loading/useLoading";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectAdminType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const setPageLoading = useLoading.getState().setPageLoading;

  // Zoom controls with keyboard shortcuts and smooth transitions
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 5)); // max 5x
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.1)); // min 0.1x
  const handleRotate = () => setRotation((r) => (r + 90) % 360);
  const handleFitToScreen = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleClose = () => {
    setIsOpen(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
    setIsDragging(false);
  };

  const handleBack = () => {
    router.push("/project-admin");
  };

  // Download image
  const handleDownload = async () => {
    if (!project?.image) return;

    try {
      const imageUrl = `${BASE_URL}${project.image.url}`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "+":
        case "=":
          e.preventDefault();
          handleZoomIn();
          break;
        case "-":
          e.preventDefault();
          handleZoomOut();
          break;
        case "r":
        case "R":
          e.preventDefault();
          handleRotate();
          break;
        case "f":
        case "F":
          e.preventDefault();
          handleFitToScreen();
          break;
        case "d":
        case "D":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleDownload();
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, zoom]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  useEffect(() => {
    const project = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/projects?filters[documentId][$eq]=${id}&populate=image`
        );
        const json = await res.json();

        const found = json.data[0];
        if (found) {
          setProject({
            id: found.id,
            documentId: found.documentId,
            title: found.title,
            description: found.description,
            features: found.features,
            techStack: found.techStack,
            active: found.active,
            image: found.image,
            createdAt: found.createdAt,
          });
        } else {
          setError("No data found.");
        }
      } catch (error) {
        setError("Failed to fetch project");
        console.error("Error fetching project:", error);
      } finally {
        setPageLoading(false);
      }
    };

    if (id) project();
  }, [id, BASE_URL]);

  if (error || !project) {
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
          <h1 className="text-4xl font-bold mb-4">Project Detail</h1>
          <p className="text-gray-400">View your Project detail here.</p>
        </div>
      </div>

      {/* Project Detail Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Title */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Project Title
          </label>
          <input
            id="title"
            type="text"
            value={project.title}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label
            htmlFor="active"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <input
            id="active"
            value={project.active ? "Completed" : "In Development"}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
            value={project.description}
            readOnly
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
          />
        </div>

        {/* Features */}
        <div className="space-y-2">
          <label
            htmlFor="features"
            className="block text-sm font-medium text-gray-700"
          >
            Key Features
          </label>
          <textarea
            id="features"
            value={project.features}
            readOnly
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
          />
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <label
            htmlFor="techStack"
            className="block text-sm font-medium text-gray-700"
          >
            Tech Stack
          </label>
          <input
            id="techStack"
            value={project.techStack}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Enhanced Image Section */}
        <div className="space-y-2 lg:col-span-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Project Image
          </label>

          {project.image ? (
            <div className="space-y-4">
              {/* Thumbnail with preview button */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="relative group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <Image
                    src={`${BASE_URL}${
                      project.image.formats?.medium?.url || project.image.url
                    }`}
                    alt="Project thumbnail"
                    width={400}
                    height={300}
                    className="rounded-lg border border-gray-200 transition-all duration-300 hover:border-blue-300 shadow-sm hover:shadow-md"
                    onLoadStart={() => setImageLoading(true)}
                    onLoad={() => setImageLoading(false)}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 transform scale-95 group-hover:scale-100 transition-all duration-200">
                      <Maximize2 size={16} />
                      Click to enlarge
                    </div>
                  </div>
                </button>

                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg transition-all duration-300">
                    <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                  </div>
                )}
              </div>

              {/* Enhanced Modal */}
              {isOpen && (
                <div
                  className={`fixed inset-0 z-50 backdrop-blur-sm transition-all duration-300 ease-out ${
                    isOpen ? "bg-black/95 opacity-100" : "bg-black/0 opacity-0"
                  }`}
                  onClick={(e) => e.target === e.currentTarget && handleClose()}
                >
                  {/* Header with controls */}
                  <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent transform transition-all duration-500 ease-out translate-y-0 opacity-100">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-4 transform transition-all duration-700 ease-out translate-x-0 opacity-100">
                        <h3 className="text-lg font-medium truncate">
                          {project.title}
                        </h3>
                        <span className="text-sm text-gray-300 transition-all duration-300">
                          {Math.round(zoom * 100)}%
                        </span>
                      </div>
                      <button
                        onClick={handleClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110 transform"
                        title="Close (Esc)"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>

                  {/* Bottom controls */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-500 ease-out translate-y-0 opacity-100">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full p-2 transform transition-all duration-300 hover:scale-105">
                      <button
                        onClick={handleZoomOut}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        title="Zoom Out (-)"
                        disabled={zoom <= 0.1}
                      >
                        <ZoomOut size={20} />
                      </button>

                      <button
                        onClick={handleFitToScreen}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110 transform"
                        title="Fit to Screen (F)"
                      >
                        <Maximize2 size={20} />
                      </button>

                      <button
                        onClick={handleZoomIn}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        title="Zoom In (+)"
                        disabled={zoom >= 5}
                      >
                        <ZoomIn size={20} />
                      </button>

                      <div className="w-px h-8 bg-white/20 mx-1 transition-all duration-300"></div>

                      <button
                        onClick={handleRotate}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110 transform hover:rotate-90"
                        title="Rotate (R)"
                      >
                        <RotateCw size={20} />
                      </button>

                      <button
                        onClick={handleDownload}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110 transform"
                        title="Download (Ctrl+D)"
                      >
                        <Download size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Image container */}
                  <div
                    className="flex items-center justify-center h-full p-16 transition-all duration-300 ease-out"
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{
                      cursor:
                        zoom > 1
                          ? isDragging
                            ? "grabbing"
                            : "grab"
                          : "default",
                    }}
                  >
                    <div
                      className="transition-all duration-500 ease-out transform-gpu"
                      style={{
                        transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
                        willChange: "transform",
                      }}
                    >
                      <Image
                        src={`${BASE_URL}${project.image.url}`}
                        alt="Full project image"
                        width={project.image.width}
                        height={project.image.height}
                        className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl select-none transition-all duration-300 hover:shadow-3xl"
                        draggable={false}
                        priority
                      />
                    </div>
                  </div>

                  {/* Keyboard shortcuts help */}
                  <div className="absolute bottom-6 right-6 text-white/60 text-xs transform transition-all duration-700 ease-out translate-x-0 opacity-100">
                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 space-y-1 transition-all duration-300 hover:bg-black/60">
                      <p className="transition-all duration-200">
                        <kbd className="bg-white/20 px-1 rounded transition-all duration-200 hover:bg-white/30">
                          Esc
                        </kbd>{" "}
                        Close
                      </p>
                      <p className="transition-all duration-200">
                        <kbd className="bg-white/20 px-1 rounded transition-all duration-200 hover:bg-white/30">
                          +/-
                        </kbd>{" "}
                        Zoom
                      </p>
                      <p className="transition-all duration-200">
                        <kbd className="bg-white/20 px-1 rounded transition-all duration-200 hover:bg-white/30">
                          R
                        </kbd>{" "}
                        Rotate
                      </p>
                      <p className="transition-all duration-200">
                        <kbd className="bg-white/20 px-1 rounded transition-all duration-200 hover:bg-white/30">
                          F
                        </kbd>{" "}
                        Fit
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <p>No image available</p>
            </div>
          )}
        </div>

        {/* Created At */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Created At
          </label>
          <input
            type="text"
            value={new Date(project.createdAt).toLocaleString()}
            readOnly
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
