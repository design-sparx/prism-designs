import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { type ColumnDef, DataTable } from "./data-table";

/**
 * Test data structure
 */
interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

/**
 * Sample data for testing
 */
const mockData: Payment[] = [
  {
    id: "1",
    amount: 100,
    status: "pending",
    email: "alice@example.com",
  },
  {
    id: "2",
    amount: 200,
    status: "processing",
    email: "bob@example.com",
  },
  {
    id: "3",
    amount: 300,
    status: "success",
    email: "charlie@example.com",
  },
  {
    id: "4",
    amount: 400,
    status: "failed",
    email: "david@example.com",
  },
];

/**
 * Sample column definitions
 */
const mockColumns: ColumnDef<Payment>[] = [
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
      return formatted;
    },
  },
];

describe("DataTable", () => {
  describe("Basic rendering", () => {
    it("should render a table with data", () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("alice@example.com")).toBeInTheDocument();
      expect(screen.getByText("bob@example.com")).toBeInTheDocument();
    });

    it("should render column headers", () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Amount")).toBeInTheDocument();
    });

    it("should render all rows", () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      const rows = screen.getAllByRole("row");
      // 1 header row + 4 data rows
      expect(rows).toHaveLength(5);
    });

    it("should render formatted cell content", () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      expect(screen.getByText("$100.00")).toBeInTheDocument();
      expect(screen.getByText("$200.00")).toBeInTheDocument();
    });

    it("should show 'No results' when data is empty", () => {
      render(<DataTable columns={mockColumns} data={[]} />);

      expect(screen.getByText("No results.")).toBeInTheDocument();
    });
  });

  describe("Sorting", () => {
    it("should support controlled sorting", () => {
      const onSortingChange = vi.fn();

      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          onSortingChange={onSortingChange}
          sorting={[]}
        />,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("should work with uncontrolled sorting (internal state)", () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      // Internal sorting state is managed automatically
    });
  });

  describe("Filtering", () => {
    it("should support controlled column filters", () => {
      const onColumnFiltersChange = vi.fn();

      render(
        <DataTable
          columnFilters={[]}
          columns={mockColumns}
          data={mockData}
          onColumnFiltersChange={onColumnFiltersChange}
        />,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("should filter data when column filter is applied", () => {
      render(
        <DataTable
          columnFilters={[{ id: "status", value: "success" }]}
          columns={mockColumns}
          data={mockData}
        />,
      );

      // Only the success row should be visible
      expect(screen.getByText("charlie@example.com")).toBeInTheDocument();
      expect(screen.queryByText("alice@example.com")).not.toBeInTheDocument();
    });
  });

  describe("Column Visibility", () => {
    it("should support controlled column visibility", () => {
      const onColumnVisibilityChange = vi.fn();

      render(
        <DataTable
          columnVisibility={{}}
          columns={mockColumns}
          data={mockData}
          onColumnVisibilityChange={onColumnVisibilityChange}
        />,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("should hide columns based on visibility state", () => {
      render(
        <DataTable
          columnVisibility={{ email: false }}
          columns={mockColumns}
          data={mockData}
        />,
      );

      // Email header and cells should not be visible
      expect(screen.queryByText("Email")).not.toBeInTheDocument();
      expect(screen.queryByText("alice@example.com")).not.toBeInTheDocument();

      // Other columns should still be visible
      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
    });
  });

  describe("Row Selection", () => {
    const selectableColumns: ColumnDef<Payment>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <input
            aria-label="Select all"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            type="checkbox"
          />
        ),
        cell: ({ row }) => (
          <input
            aria-label={`Select row ${row.id}`}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            type="checkbox"
          />
        ),
      },
      ...mockColumns,
    ];

    it("should support controlled row selection", () => {
      const onRowSelectionChange = vi.fn();

      render(
        <DataTable
          columns={selectableColumns}
          data={mockData}
          onRowSelectionChange={onRowSelectionChange}
          rowSelection={{}}
        />,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("should render checkboxes for row selection", () => {
      render(<DataTable columns={selectableColumns} data={mockData} />);

      const checkboxes = screen.getAllByRole("checkbox");
      // 1 header checkbox + 4 row checkboxes
      expect(checkboxes).toHaveLength(5);
    });

    it("should toggle row selection when checkbox is clicked", async () => {
      const user = userEvent.setup();

      render(<DataTable columns={selectableColumns} data={mockData} />);

      const rowCheckbox = screen.getByLabelText("Select row 0");
      await user.click(rowCheckbox);

      expect(rowCheckbox).toBeChecked();
    });

    it("should apply selected state to row", async () => {
      const user = userEvent.setup();

      render(<DataTable columns={selectableColumns} data={mockData} />);

      const rowCheckbox = screen.getByLabelText("Select row 0");
      await user.click(rowCheckbox);

      const rows = screen.getAllByRole("row");
      const dataRow = rows[1]; // First data row (skip header)

      expect(dataRow).toHaveAttribute("data-state", "selected");
    });
  });

  describe("Pagination", () => {
    it("should support pagination when enabled", () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          enablePagination
          pageSize={2}
        />,
      );

      const rows = screen.getAllByRole("row");
      // 1 header row + 2 data rows (page size = 2)
      expect(rows).toHaveLength(3);
    });

    it("should disable pagination by default", () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      const rows = screen.getAllByRole("row");
      // 1 header row + all 4 data rows
      expect(rows).toHaveLength(5);
    });

    it("should use default page size of 10", () => {
      const largeData = Array.from({ length: 15 }, (_, i) => ({
        id: `${i}`,
        amount: 100,
        status: "pending" as const,
        email: `user${i}@example.com`,
      }));

      render(
        <DataTable columns={mockColumns} data={largeData} enablePagination />,
      );

      const rows = screen.getAllByRole("row");
      // 1 header row + 10 data rows (default page size)
      expect(rows).toHaveLength(11);
    });
  });

  describe("Custom Controls", () => {
    it("should render custom controls via renderControls", () => {
      const renderControls = (): React.ReactElement => (
        <div data-testid="custom-controls">Custom Controls</div>
      );

      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          renderControls={renderControls}
        />,
      );

      expect(screen.getByTestId("custom-controls")).toBeInTheDocument();
      expect(screen.getByText("Custom Controls")).toBeInTheDocument();
    });

    it("should pass table instance to renderControls", () => {
      const renderControls = vi.fn(() => <div>Controls</div>);

      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          renderControls={renderControls}
        />,
      );

      expect(renderControls).toHaveBeenCalled();
      expect(renderControls.mock.calls[0][0]).toHaveProperty("getRowModel");
      expect(renderControls.mock.calls[0][0]).toHaveProperty("getHeaderGroups");
    });

    it("should allow filter controls through renderControls", async () => {
      const user = userEvent.setup();

      function FilterableTable(): React.ReactElement {
        const [columnFilters, setColumnFilters] = React.useState([]);

        return (
          <DataTable
            columnFilters={columnFilters}
            columns={mockColumns}
            data={mockData}
            onColumnFiltersChange={setColumnFilters}
            renderControls={(table) => (
              <input
                data-testid="email-filter"
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                placeholder="Filter emails..."
                value={
                  (table.getColumn("email")?.getFilterValue() as
                    | string
                    | undefined) ?? ""
                }
              />
            )}
          />
        );
      }

      render(<FilterableTable />);

      const filterInput = screen.getByTestId("email-filter");
      await user.type(filterInput, "alice");

      // Only Alice's row should be visible after filtering
      expect(screen.getByText("alice@example.com")).toBeInTheDocument();
      expect(screen.queryByText("bob@example.com")).not.toBeInTheDocument();
    });
  });

  describe("Custom className", () => {
    it("should apply custom className to wrapper", () => {
      const { container } = render(
        <DataTable
          className="custom-table-wrapper"
          columns={mockColumns}
          data={mockData}
        />,
      );

      const wrapper = container.querySelector(".custom-table-wrapper");
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper table structure", () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      const table = screen.getByRole("table");
      const rowgroups = within(table).getAllByRole("rowgroup");

      expect(table).toBeInTheDocument();
      // Should have both thead and tbody (both have rowgroup role)
      expect(rowgroups).toHaveLength(2);
    });

    it("should use semantic HTML elements", () => {
      const { container } = render(
        <DataTable columns={mockColumns} data={mockData} />,
      );

      expect(container.querySelector("table")).toBeInTheDocument();
      expect(container.querySelector("thead")).toBeInTheDocument();
      expect(container.querySelector("tbody")).toBeInTheDocument();
      expect(container.querySelector("tr")).toBeInTheDocument();
      expect(container.querySelector("th")).toBeInTheDocument();
      expect(container.querySelector("td")).toBeInTheDocument();
    });
  });
});
