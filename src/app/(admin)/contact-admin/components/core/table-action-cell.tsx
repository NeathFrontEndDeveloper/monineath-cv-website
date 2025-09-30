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
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { contactTableType } from "@/types/contact-type";
import { Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteContact } from "@/lib/api/contact-api";

export const ActionCell = ({
  row,
  fetchContacts,
}: {
  row: Row<contactTableType>;
  fetchContacts: () => void;
}) => {
  const router = useRouter();
  const contact = row.original;

  const handleView = () => {
    router.push(`/contact-admin/contact-detail/${contact.documentId}`);
  };

  const handleDelete = async (documentId: string) => {
    try {
      await deleteContact(documentId);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline_admin" size="sm" onClick={handleView}>
        <Eye className="h-4 w-4" />
        View
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
              contact record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete.bind(null, contact.documentId)}
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
