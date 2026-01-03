import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTable, type ColumnDef } from "@prism/react/data-table";
import { Button } from "@prism/react/button";
import { Input } from "@prism/react/input";
import { Checkbox } from "@prism/react/checkbox";
import { ArrowUpDown, ChevronDown } from "lucide-react";

/**
 * The DataTable component is a powerful data table built on TanStack Table.
 * It provides sorting, filtering, pagination, row selection, and column visibility
 * out of the box.
 *
 * ## Features
 * - **Sorting** - Click column headers to sort data
 * - **Filtering** - Filter data by column values
 * - **Pagination** - Split large datasets into pages
 * - **Row Selection** - Select single or multiple rows
 * - **Column Visibility** - Show/hide columns dynamically
 * - **Controlled & Uncontrolled** - Supports both state management patterns
 * - **Render Props** - Custom controls via `renderControls` prop
 *
 * ## Based on TanStack Table
 * TanStack Table is a headless UI library that provides the table logic
 * without prescribing the UI. This gives you full control over styling
 * while leveraging powerful table features.
 */
const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Sample payment data type
 */
type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

/**
 * Sample data
 */
const payments: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "xj9k2lp3",
    amount: 123,
    status: "pending",
    email: "john@example.com",
  },
  {
    id: "8n4m2kl1",
    amount: 456,
    status: "processing",
    email: "jane@example.com",
  },
  {
    id: "p9q3r5t7",
    amount: 789,
    status: "success",
    email: "bob@example.com",
  },
];

/**
 * Basic column definitions
 */
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

/**
 * Basic data table with default settings.
 */
export const Default: Story = {
  render: () => <DataTable columns={columns} data={payments} />,
};

/**
 * Data table with pagination enabled.
 */
export const WithPagination: Story = {
  render: () => {
    const PaginatedTable = () => {
      return (
        <DataTable
          columns={columns}
          data={payments}
          enablePagination={true}
          pageSize={5}
          renderControls={(table) => (
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <div className="text-sm text-neutral-500">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          )}
        />
      );
    };

    return <PaginatedTable />;
  },
};

/**
 * Data table with column filtering.
 */
export const WithFiltering: Story = {
  render: () => {
    const FilterableTable = () => {
      const [columnFilters, setColumnFilters] = useState([]);

      return (
        <DataTable
          columns={columns}
          data={payments}
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
          renderControls={(table) => (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Filter emails..."
                value={
                  (table.getColumn("email")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              {table.getColumn("email")?.getFilterValue() && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => table.getColumn("email")?.setFilterValue("")}
                >
                  Clear
                </Button>
              )}
            </div>
          )}
        />
      );
    };

    return <FilterableTable />;
  },
};

/**
 * Data table with sortable columns.
 */
export const WithSorting: Story = {
  render: () => {
    const sortableColumns: ColumnDef<Payment>[] = [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "amount",
        header: ({ column }) => {
          return (
            <div className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          );
        },
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount);
          return <div className="text-right font-medium">{formatted}</div>;
        },
      },
    ];

    return <DataTable columns={sortableColumns} data={payments} />;
  },
};

/**
 * Data table with row selection.
 */
export const WithRowSelection: Story = {
  render: () => {
    const SelectableTable = () => {
      const [rowSelection, setRowSelection] = useState({});

      const selectableColumns: ColumnDef<Payment>[] = [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
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
        ...columns,
      ];

      return (
        <DataTable
          columns={selectableColumns}
          data={payments}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          renderControls={(table) => (
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-500">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.resetRowSelection()}
                >
                  Clear Selection
                </Button>
              )}
            </div>
          )}
        />
      );
    };

    return <SelectableTable />;
  },
};

/**
 * Data table with column visibility controls.
 */
export const WithColumnVisibility: Story = {
  render: () => {
    const VisibilityTable = () => {
      const [columnVisibility, setColumnVisibility] = useState({});

      return (
        <DataTable
          columns={columns}
          data={payments}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          renderControls={(table) => (
            <div className="flex items-center gap-2">
              <details className="relative">
                <summary className="inline-flex h-9 cursor-pointer items-center justify-center rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </summary>
                <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <label
                          key={column.id}
                          className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-neutral-100"
                        >
                          <Checkbox
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          />
                          <span className="text-sm capitalize">
                            {column.id}
                          </span>
                        </label>
                      );
                    })}
                </div>
              </details>
            </div>
          )}
        />
      );
    };

    return <VisibilityTable />;
  },
};

/**
 * Complete example with all features enabled.
 */
export const FullFeatured: Story = {
  render: () => {
    const FullTable = () => {
      const [sorting, setSorting] = useState([]);
      const [columnFilters, setColumnFilters] = useState([]);
      const [columnVisibility, setColumnVisibility] = useState({});
      const [rowSelection, setRowSelection] = useState({});

      const fullColumns: ColumnDef<Payment>[] = [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
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
          accessorKey: "id",
          header: "ID",
        },
        {
          accessorKey: "status",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const colorMap = {
              success: "bg-green-100 text-green-700",
              processing: "bg-blue-100 text-blue-700",
              pending: "bg-yellow-100 text-yellow-700",
              failed: "bg-red-100 text-red-700",
            };
            return (
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${colorMap[status as keyof typeof colorMap]}`}
              >
                {status}
              </span>
            );
          },
        },
        {
          accessorKey: "email",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
        },
        {
          accessorKey: "amount",
          header: ({ column }) => {
            return (
              <div className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Amount
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
          },
        },
      ];

      return (
        <div className="w-full max-w-4xl">
          <DataTable
            columns={fullColumns}
            data={payments}
            sorting={sorting}
            onSortingChange={setSorting}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            enablePagination={true}
            pageSize={5}
            renderControls={(table) => (
              <div className="space-y-4">
                {/* Filters and Column Visibility */}
                <div className="flex items-center justify-between">
                  <Input
                    placeholder="Filter emails..."
                    value={
                      (table.getColumn("email")?.getFilterValue() as string) ??
                      ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("email")
                        ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                  />
                  <details className="relative">
                    <summary className="inline-flex h-9 cursor-pointer items-center justify-center rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100">
                      Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </summary>
                    <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg">
                      {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                          return (
                            <label
                              key={column.id}
                              className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-neutral-100"
                            >
                              <Checkbox
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                  column.toggleVisibility(!!value)
                                }
                              />
                              <span className="text-sm capitalize">
                                {column.id}
                              </span>
                            </label>
                          );
                        })}
                    </div>
                  </details>
                </div>

                {/* Row Selection Counter and Pagination */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-500">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      Previous
                    </Button>
                    <div className="text-sm text-neutral-500">
                      Page {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      );
    };

    return <FullTable />;
  },
};
