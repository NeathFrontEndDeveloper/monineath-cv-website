"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
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
import {
  ChevronDown,
  RefreshCw,
  MoveRight,
  Plus,
  SquarePen,
  Eye,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProjectAdminType } from "@/types/project-type";
import { Row } from "@tanstack/react-table";
import { useLoading } from "@/store/Loading/use-loading-store";
import LoadingScreen from "@/components/shared/Loading";
import api from "@/lib/request";

const ProjectTable = () => {
  const [projects, setProjects] = useState<ProjectAdminType[]>([]);
  const [editProjectLoading, setEditProjectLoading] = useState(false);
  const [createProject, setCreateProject] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const setPageLoading = useLoading.getState().setPageLoading;

  const columns: ColumnDef<ProjectAdminType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: () => (
        <div className="text-left font-semibold">Project Title</div>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div className="text-left font-semibold">Description</div>,
      cell: ({ row }) => (
        <div className="capitalize text-left w-40 overflow-hidden font-medium">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "image",
      header: () => <div className="text-left font-semibold">Image</div>,
      cell: ({ row }) => {
        const imageUrl = row.getValue("image") as string;
        return imageUrl ? (
          <Image
            src={imageUrl}
            alt="project image"
            width={70}
            height={70}
            className="h-12 w-12 object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        );
      },
    },
    {
      accessorKey: "features",
      header: () => <div className="text-left font-semibold">Key Features</div>,
      cell: ({ row }) => (
        <div className="capitalize text-left font-medium w-40 overflow-hidden">
          {row.getValue("features")}
        </div>
      ),
    },
    {
      accessorKey: "techStack",
      header: () => <div className="text-left font-semibold">Tech Stack</div>,
      cell: ({ row }) => (
        <div className="capitalize text-left font-medium w-40 overflow-hidden">
          {row.getValue("techStack")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <ActionCell row={row} fetchProjects={fetchProjects} />,
    },
  ];

  const ActionCell = ({
    row,
    fetchProjects,
  }: {
    row: Row<ProjectAdminType>;
    fetchProjects: () => void;
  }) => {
    const router = useRouter();
    const project = row.original;
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleView = () => {
      router.push(`/project-admin/project-detial/${project.documentId}`);
    };

    const handleEdit = () => {
      setEditProjectLoading(true);
      router.push(`/project-admin/edit-project/${project.id}`);
    };

    const handleDelete = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/projects/${project.documentId}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) throw new Error("Failed to delete education");

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
          {editProjectLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
          ) : (
            <SquarePen className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          )}
          <span>{editProjectLoading ? "Loading" : "Edit"}</span>
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

  const table = useReactTable({
    data: projects,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const pathname = usePathname();

  const fetchProjects = useCallback(async () => {
    try {
      setPageLoading(true);
      const res = await api.get("/projects?populate=*");
      const json = await res.data;

      const getProject = json.data.map((item: ProjectAdminType) => {
        const imageUrl = item.image?.url ? `${BASE_URL}${item.image.url}` : "";

        return {
          id: item.id,
          title: item.title,
          description: item.description,
          features: item.features,
          techStack: item.techStack,
          image: imageUrl,
          documentId: item.documentId,
        };
      });

      setProjects(getProject);
      console.log(getProject, "===projects===");
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setPageLoading(false);
    }
  }, [BASE_URL, setPageLoading]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = () => {
    setCreateProject(true);
    router.push("/project-admin/create-project");
  };

  useEffect(() => {
    setCreateProject(false);
  }, [pathname]);

  return (
    <div className="w-full">
      <LoadingScreen />
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <div className="flex items-center space-x-2 ml-auto">
            <div>
              <Button
                variant="outline_admin"
                className="group flex items-center gap-2"
                onClick={handleCreateProject}
                disabled={createProject}
              >
                {createProject ? (
                  <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                ) : (
                  <Plus className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                )}
                <span>{createProject ? "Loading..." : "Create Project"}</span>
              </Button>
            </div>

            <DropdownMenuTrigger asChild>
              <Button variant="primary_admin">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-lg font-medium">No results found</div>
                    <div className="text-sm">
                      Try adjusting your search criteria
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="primary_admin"
            size="sm"
            onClick={() => table.previousPage()}
            className="py-5 px-4"
            // disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline_admin"
            size="sm"
            onClick={() => table.nextPage()}
            className="group flex items-center gap-2 py-5 px-4"
            // disabled={!table.getCanNextPage()}
          >
            Next
            <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
