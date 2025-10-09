"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const DetailHeader = () => {
  const router = useRouter();
  return (
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
        <h1 className="text-4xl font-bold mb-4">Project Detail</h1>
        <p className="text-gray-400">View your Project detail here.</p>
      </div>
    </div>
  );
};

export default DetailHeader;
