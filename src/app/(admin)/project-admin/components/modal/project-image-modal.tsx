"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  RefreshCw,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
} from "lucide-react";
import { StrapiImage } from "@/types/strapi";

type ProjectImageProps = {
  title: string;
  image: StrapiImage | null;
  BASE_URL: string;
  onClose: () => void;
};

export const ProjectImageModal = ({
  title,
  image,
  BASE_URL,
}: ProjectImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoading, setImageLoading] = useState(false);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.1));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);
  const handleFitToScreen = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    handleFitToScreen();
    setIsDragging(false);
  }, [setIsOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
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

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.deltaY < 0 ? handleZoomIn() : handleZoomOut();
  };

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
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, zoom, handleClose]);

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
            className="rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
            onLoadStart={() => setImageLoading(true)}
            onLoad={() => setImageLoading(false)}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all rounded-lg flex items-center justify-center">
            <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              <Maximize2 size={16} /> Click to enlarge
            </div>
          </div>
        </button>
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          // onClick={(e) => e.target === e.currentTarget && handleClose()}
          // onClick={(e) => {
          //   if (e.target === e.currentTarget) {
          //     handleClose();
          //   }
          // }}
          onClick={(e) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            e.target === e.currentTarget && handleClose()
          }
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full"
          >
            <X size={24} />
          </button>

          {/* Controls */}
          <div className="absolute bottom-6 flex gap-2 bg-black/60 p-2 rounded-full">
            <button onClick={handleZoomOut} disabled={zoom <= 0.1}>
              <ZoomOut className="text-white" />
            </button>
            <button onClick={handleFitToScreen}>
              <Maximize2 className="text-white" />
            </button>
            <button onClick={handleZoomIn} disabled={zoom >= 5}>
              <ZoomIn className="text-white" />
            </button>
            <button onClick={handleRotate}>
              <RotateCw className="text-white" />
            </button>
          </div>

          {/* Image */}
          <div
            className="flex items-center justify-center h-full p-16"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            }}
          >
            <div
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
              }}
            >
              <Image
                src={`${BASE_URL}${image.url}`}
                alt={title}
                width={image.width}
                height={image.height}
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl select-none"
                draggable={false}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
