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
import LoadingScreen from "@/components/shared/Loading";
import { ProjectAdminType } from "@/types/project-type";
import { ActionCell } from "@/app/(admin)/project-admin/components/core/table-action-cell";
import { useLoading } from "@/store/Loading/useLoading";
import { useProjects } from "@/store/project-store/useProject";

const ProjectTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { projects, fetchProjects } = useProjects();
  const { btnLoading, setBtnLoading } = useLoading();
  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = () => {
    setBtnLoading(true);
    router.push("/project-admin/create-project");
  };

  useEffect(() => {
    setBtnLoading(false);
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
                disabled={btnLoading}
              >
                {btnLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                ) : (
                  <Plus className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                )}
                <span>{btnLoading ? "Loading..." : "Create Project"}</span>
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
          >
            Previous
          </Button>
          <Button
            variant="outline_admin"
            size="sm"
            onClick={() => table.nextPage()}
            className="group flex items-center gap-2 py-5 px-4"
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
