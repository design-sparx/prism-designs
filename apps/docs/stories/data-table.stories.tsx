import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@prism/react/button";
import { Checkbox } from "@prism/react/checkbox";
import { type ColumnDef, DataTable } from "@prism/react/data-table";
import { Input } from "@prism/react/input";

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
interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

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
    function PaginatedTable(): JSX.Element {
      return (
        <DataTable
          columns={columns}
          data={payments}
          enablePagination
          pageSize={5}
          renderControls={(table) => (
            <div className="flex items-center justify-end space-x-2">
              <Button
                disabled={!table.getCanPreviousPage()}
                onClick={() => {
                  table.previousPage();
                }}
                size="sm"
                variant="outline"
              >
                Previous
              </Button>
              <div className="text-sm text-neutral-500">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <Button
                disabled={!table.getCanNextPage()}
                onClick={() => {
                  table.nextPage();
                }}
                size="sm"
                variant="outline"
              >
                Next
              </Button>
            </div>
          )}
        />
      );
    }

    return <PaginatedTable />;
  },
};

/**
 * Data table with column filtering.
 */
export const WithFiltering: Story = {
  render: () => {
    function FilterableTable(): JSX.Element {
      const [columnFilters, setColumnFilters] = useState<unknown[]>([]);

      return (
        <DataTable
          columnFilters={columnFilters}
          columns={columns}
          data={payments}
          onColumnFiltersChange={setColumnFilters}
          renderControls={(table) => (
            <div className="flex items-center gap-2">
              <Input
                className="max-w-sm"
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                placeholder="Filter emails..."
                value={
                  (table.getColumn("email")?.getFilterValue() as string) ?? ""
                }
              />
              {table.getColumn("email")?.getFilterValue() ? (
                <Button
                  onClick={() => table.getColumn("email")?.setFilterValue("")}
                  size="sm"
                  variant="ghost"
                >
                  Clear
                </Button>
              ) : null}
            </div>
          )}
        />
      );
    }

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
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
              size="sm"
              variant="ghost"
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
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
              size="sm"
              variant="ghost"
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
                onClick={() => {
                  column.toggleSorting(column.getIsSorted() === "asc");
                }}
                size="sm"
                variant="ghost"
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
    function SelectableTable(): JSX.Element {
      const [rowSelection, setRowSelection] = useState<Record<string, boolean>>(
        {},
      );

      const selectableColumns: ColumnDef<Payment>[] = [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              aria-label="Select all"
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) => {
                table.toggleAllPageRowsSelected(Boolean(value));
              }}
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onCheckedChange={(value) => {
                row.toggleSelected(Boolean(value));
              }}
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
          onRowSelectionChange={setRowSelection}
          renderControls={(table) => (
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-500">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <Button
                  onClick={() => {
                    table.resetRowSelection();
                  }}
                  size="sm"
                  variant="outline"
                >
                  Clear Selection
                </Button>
              )}
            </div>
          )}
          rowSelection={rowSelection}
        />
      );
    }

    return <SelectableTable />;
  },
};

/**
 * Data table with column visibility controls.
 */
export const WithColumnVisibility: Story = {
  render: () => {
    function VisibilityTable(): JSX.Element {
      const [columnVisibility, setColumnVisibility] = useState<
        Record<string, boolean>
      >({});

      return (
        <DataTable
          columnVisibility={columnVisibility}
          columns={columns}
          data={payments}
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
                          className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-neutral-100"
                          key={column.id}
                        >
                          <Checkbox
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) => {
                              column.toggleVisibility(Boolean(value));
                            }}
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
    }

    return <VisibilityTable />;
  },
};

/**
 * Complete example with all features enabled.
 */
export const FullFeatured: Story = {
  render: () => {
    function FullTable(): JSX.Element {
      const [sorting, setSorting] = useState<unknown[]>([]);
      const [columnFilters, setColumnFilters] = useState<unknown[]>([]);
      const [columnVisibility, setColumnVisibility] = useState<
        Record<string, boolean>
      >({});
      const [rowSelection, setRowSelection] = useState<Record<string, boolean>>(
        {},
      );

      const fullColumns: ColumnDef<Payment>[] = [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              aria-label="Select all"
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) => {
                table.toggleAllPageRowsSelected(Boolean(value));
              }}
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onCheckedChange={(value) => {
                row.toggleSelected(Boolean(value));
              }}
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
                onClick={() => {
                  column.toggleSorting(column.getIsSorted() === "asc");
                }}
                size="sm"
                variant="ghost"
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            const status = row.getValue("status");
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
                onClick={() => {
                  column.toggleSorting(column.getIsSorted() === "asc");
                }}
                size="sm"
                variant="ghost"
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
                  onClick={() => {
                    column.toggleSorting(column.getIsSorted() === "asc");
                  }}
                  size="sm"
                  variant="ghost"
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
            columnFilters={columnFilters}
            columnVisibility={columnVisibility}
            columns={fullColumns}
            data={payments}
            enablePagination
            onColumnFiltersChange={setColumnFilters}
            onColumnVisibilityChange={setColumnVisibility}
            onRowSelectionChange={setRowSelection}
            onSortingChange={setSorting}
            pageSize={5}
            renderControls={(table) => (
              <div className="space-y-4">
                {/* Filters and Column Visibility */}
                <div className="flex items-center justify-between">
                  <Input
                    className="max-w-sm"
                    onChange={(event) =>
                      table
                        .getColumn("email")
                        ?.setFilterValue(event.target.value)
                    }
                    placeholder="Filter emails..."
                    value={
                      (table.getColumn("email")?.getFilterValue() as string) ??
                      ""
                    }
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
                              className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-neutral-100"
                              key={column.id}
                            >
                              <Checkbox
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => {
                                  column.toggleVisibility(Boolean(value));
                                }}
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
                      disabled={!table.getCanPreviousPage()}
                      onClick={() => {
                        table.previousPage();
                      }}
                      size="sm"
                      variant="outline"
                    >
                      Previous
                    </Button>
                    <div className="text-sm text-neutral-500">
                      Page {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </div>
                    <Button
                      disabled={!table.getCanNextPage()}
                      onClick={() => {
                        table.nextPage();
                      }}
                      size="sm"
                      variant="outline"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
            rowSelection={rowSelection}
            sorting={sorting}
          />
        </div>
      );
    }

    return <FullTable />;
  },
};
