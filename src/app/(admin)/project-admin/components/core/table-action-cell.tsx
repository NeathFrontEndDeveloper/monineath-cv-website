"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { RefreshCw, Trash, Eye, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { ProjectAdminType } from "@/types/project-type";
import { useLoading } from "@/store/Loading/useLoading";
import api from "@/lib/request";

type Props = {
  row: Row<ProjectAdminType>;
  fetchProjects: () => void;
};

export const ActionCell = ({ row, fetchProjects }: Props) => {
  const { btnLoading, setBtnLoading } = useLoading();

  const router = useRouter();
  const project = row.original;

  const handleView = () => {
    router.push(`/project-admin/project-detial/${project.documentId}`);
  };

  const handleEdit = () => {
    setBtnLoading(true);
    router.push(`/project-admin/edit-project/${project.id}`);

    setTimeout(() => setBtnLoading(false), 1000);
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/projects/${project.documentId}`);

      if (![200, 204].includes(res.status)) {
        throw new Error("Failed to delete project");
      }

      console.log("Deleted Project:", project.documentId);

      // Refetch to update table
      fetchProjects();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline_admin" size="sm" onClick={handleView}>
        <Eye className="h-4 w-4" />
        View
      </Button>

      <Button variant="ghost_admin" size="sm" onClick={handleEdit}>
        {btnLoading ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            <SquarePen className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Edit</span>
          </>
        )}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="cursor-pointer">
            <Trash className="h-4 w-4" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently delete this
              project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="cursor-pointer"
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
