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
import { Row } from "@tanstack/react-table";
import { SquarePen, Trash, Eye, RefreshCw } from "lucide-react";
import { educationType } from "@/types/education-type";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteEdu } from "@/lib/api/education-api";
import { useLoading } from "@/store/Loading/useLoading";

export const ActionCell = ({
  row,
  fetchEducation,
}: {
  row: Row<educationType>;
  fetchEducation: () => void;
}) => {
  const router = useRouter();
  const education = row.original;
  console.log("Education Row Data:", education);

  const { btnLoading, setBtnLoading } = useLoading.getState();

  const handleView = () => {
    router.push(`/education-admin/education-detail/${education.documentId}`);
  };

  const handleEdit = () => {
    setBtnLoading(true);
    router.push(`/education-admin/education-edit/${education.documentId}`);

    setTimeout(() => setBtnLoading(false), 1000);
  };

  const handleDelete = async () => {
    try {
      await deleteEdu(education.documentId);
      fetchEducation();
    } catch (error) {
      console.log(error);
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
          <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
        ) : (
          <SquarePen className="h-4 w-4" />
        )}
        <span>{btnLoading ? "Loading..." : "Edit"}</span>
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
              education record.
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
