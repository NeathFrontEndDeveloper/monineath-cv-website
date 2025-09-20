"use client";

import { useLoading } from "@/store/Loading/useLoading";
import { RefreshCw } from "lucide-react";

const LoadingScreen = () => {
  const pageLoading = useLoading((state) => state.pageLoading);

  if (!pageLoading) return null;

  return (
    <div className="flex items-center justify-center h-screen">
      <RefreshCw className="h-10 w-10 animate-spin text-blue-500" />
    </div>
  );
};

export default LoadingScreen;
