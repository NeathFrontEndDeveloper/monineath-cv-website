"use client";

import { useState, useEffect, useCallback } from "react";
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
  Trash,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import type { educationTableType } from "@/types/education-admin-type";
import { Row } from "@tanstack/react-table";

const EducationTable = () => {
  const [data, setData] = useState<educationTableType[]>([]);
  const [loading, setLoading] = useState(true);
  const [createEduLoading, setCreateEduLoading] = useState(false);
  const [editEduLoading, setEditEduLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<educationTableType>[] = [
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
      accessorKey: "insitituion",
      header: "Insitituion",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("insitituion")}</div>
      ),
    },
    {
      accessorKey: "course",
      header: "Course",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("course")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div>Description</div>,
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return (
          <div className="text-center w-40 overflow-hidden font-medium">
            {description}
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("date")}</div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("location")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <ActionCell row={row} fetchEducation={fetchEducation} />
      ),
    },
  ];

  const ActionCell = ({
    row,
    fetchEducation,
  }: {
    row: Row<educationTableType>;
    fetchEducation: () => void;
  }) => {
    const router = useRouter();
    const education = row.original;
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleView = () => {
      router.push(`/education-admin/education-detail/${education.documentId}`);
    };

    const handleEdit = () => {
      setEditEduLoading(true);
      router.push(`/education-admin/education-edit/${education.id}`);
    };

    const handleDelete = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/educations/${education.documentId}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) throw new Error("Failed to delete education");

        console.log("Deleted Education:", education.documentId);

        // Refetch to update table
        fetchEducation();
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
          {editEduLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
          ) : (
            <SquarePen className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          )}
          <span>{editEduLoading ? "Loading" : "Edit"}</span>
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

  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch education
  const fetchEducation = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/educations`);
      const json = await res.json();
      const items = json.data;

      // const items: educationType[] = json.data;

      const getEducation: educationTableType[] = items.map(
        (item: educationTableType): educationTableType => ({
          id: String(item.id),
          documentId: item.documentId,
          createdAt: item.createdAt,
          insitituion: item.insitituion,
          course: item.course,
          description: item.description,
          date: item.date,
          location: item.location,
        })
      );

      setData(getEducation);
      console.log(getEducation, "===education===");
    } catch (error) {
      console.error("Error fetching education:", error);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  const handleCreateEducation = () => {
    setCreateEduLoading(true);
    router.push("/education-admin/create-education");
  };

  const table = useReactTable({
    data,
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 mt-4">
      {/* Header Section with Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Filter education info by course..."
            value={
              (table.getColumn("course")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("course")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        </div>
        <DropdownMenu>
          <div className="flex items-center space-x-2 ml-auto">
            <div>
              <Button
                variant="outline_admin"
                className="group flex items-center gap-2"
                onClick={handleCreateEducation}
                disabled={createEduLoading}
              >
                {createEduLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                ) : (
                  <Plus className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                )}
                <span>
                  {createEduLoading ? "Loading..." : "Create Education"}
                </span>
              </Button>
            </div>
            <DropdownMenuTrigger asChild>
              <Button variant="primary_admin" className="shrink-0">
                <span className="mr-2">Columns</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="end" className="w-48">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-gray-200"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="font-semibold text-gray-900"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
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
                      <div className="text-lg font-medium">
                        No results found
                      </div>
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
      </div>

      {/* Footer Section with Pagination */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm text-gray-600 order-2 sm:order-1">
          <span className="font-medium">
            {table.getFilteredSelectedRowModel().rows.length}
          </span>{" "}
          of{" "}
          <span className="font-medium">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          row(s) selected
        </div>
        <div className="flex items-center space-x-2 order-1 sm:order-2">
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

export default EducationTable;
