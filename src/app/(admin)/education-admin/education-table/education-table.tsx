"use client";

import * as React from "react";
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
import { ChevronDown } from "lucide-react";

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
import { useRouter } from "next/navigation";
import type { educationTableType } from "@/constant/education-type";

export const columns: ColumnDef<educationTableType>[] = [
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
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
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
    cell: ({ row }) => {
      const router = useRouter();
      const education = row.original;
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

      const handleView = () => {
        router.push(
          `/education-admin/education-detail/${education.documentId}`
        );
      };

      const handleDelete = async () => {
        try {
          const res = await fetch(
            `${BASE_URL}/api/educations?filters[documentId][$eq]=${education.documentId}`
          );
          const data = await res.json();

          if (!data.data.length) {
            console.error("Education not found");
            return;
          }

          const id = data.data[0].id;

          await fetch(`${BASE_URL}/api/educations/${id}`, {
            method: "DELETE",
          });

          console.log("Deleted Education:", education.documentId);
        } catch (error) {
          console.error("Error deleting:", error);
        }
      };

      return (
        <div className="flex gap-2">
          <Button variant="outline_admin" size="sm" onClick={handleView}>
            View
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      );
    },
  },
];

const EducationTable = () => {
  const [data, setData] = React.useState<educationTableType[]>([]);
  const [loading, setLoading] = React.useState(true);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch contacts
  React.useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/educations`);
        const json = await res.json();
        const items = json.data;

        const getEducation: educationTableType[] = items.map((item: any) => ({
          id: String(item.id),
          documentId: item.documentId,
          insitituion: item.insitituion,
          course: item.course,
          description: item.description,
          date: item.date,
          location: item.location,
        }));

        setData(getEducation);
        console.log(getEducation, "===contacts===");
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    return <p className="p-4">Loading contacts...</p>;
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
          <DropdownMenuTrigger asChild>
            <Button variant="outline_admin" className="shrink-0">
              <span className="mr-2">Columns</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
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
            variant="outline_admin"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="transition-all duration-200 disabled:opacity-50"
          >
            Previous
          </Button>
          <Button
            variant="outline_admin"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="transition-all duration-200 disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationTable;
