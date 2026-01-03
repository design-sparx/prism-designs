import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type Table as TanStackTable,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

/**
 * DataTable Component
 *
 * A powerful data table built on TanStack Table (formerly React Table).
 * Provides sorting, filtering, pagination, and column visibility out of the box.
 *
 * Educational Notes:
 * - TanStack Table is a "headless" UI library - it provides table logic without styling
 * - We combine it with our Table components to create a fully-featured data table
 * - State management is handled externally for maximum flexibility
 * - The render callback pattern gives full control over the table instance
 *
 * Architecture:
 * 1. TanStack Table manages the data transformation (sorting, filtering, pagination)
 * 2. Our Table components provide the styled UI elements
 * 3. The render prop pattern exposes the table instance for custom controls
 *
 * Key Concepts:
 * - ColumnDef: Defines how each column displays and behaves
 * - Row Model: Transforms raw data (core -\> sorted -\> filtered -\> paginated)
 * - State: Sorting, filters, visibility, pagination are all controllable
 */

export interface DataTableProps<TData, TValue = unknown> {
  /**
   * Column definitions - defines structure, accessors, and rendering
   */
  columns: ColumnDef<TData, TValue>[];

  /**
   * The data array to display
   */
  data: TData[];

  /**
   * Optional sorting state (controlled)
   */
  sorting?: SortingState;

  /**
   * Optional sorting state change handler (controlled)
   */
  onSortingChange?: (sorting: SortingState) => void;

  /**
   * Optional column filters state (controlled)
   */
  columnFilters?: ColumnFiltersState;

  /**
   * Optional column filters change handler (controlled)
   */
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;

  /**
   * Optional column visibility state (controlled)
   */
  columnVisibility?: VisibilityState;

  /**
   * Optional column visibility change handler (controlled)
   */
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;

  /**
   * Optional row selection state (controlled)
   */
  rowSelection?: Record<string, boolean>;

  /**
   * Optional row selection change handler (controlled)
   */
  onRowSelectionChange?: (selection: Record<string, boolean>) => void;

  /**
   * Enable pagination (default: false)
   */
  enablePagination?: boolean;

  /**
   * Page size for pagination (default: 10)
   */
  pageSize?: number;

  /**
   * Render function for custom controls (filters, pagination, etc.)
   * Receives the table instance for full access to table state and methods
   */
  renderControls?: (table: TanStackTable<TData>) => React.ReactNode;

  /**
   * Custom className for the table wrapper
   */
  className?: string;
}

/**
 * DataTable - A flexible, feature-rich data table component
 *
 * This component demonstrates the "render props" pattern, where the parent
 * can inject custom UI (like filters and pagination controls) via the
 * renderControls function while the DataTable handles the core table rendering.
 */
export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  sorting: controlledSorting,
  onSortingChange: controlledOnSortingChange,
  columnFilters: controlledColumnFilters,
  onColumnFiltersChange: controlledOnColumnFiltersChange,
  columnVisibility: controlledColumnVisibility,
  onColumnVisibilityChange: controlledOnColumnVisibilityChange,
  rowSelection: controlledRowSelection,
  onRowSelectionChange: controlledOnRowSelectionChange,
  enablePagination = false,
  pageSize = 10,
  renderControls,
  className,
}: DataTableProps<TData, TValue>): React.ReactElement {
  /**
   * Internal state management
   * These are used when the component is uncontrolled (parent doesn't pass state)
   * If controlled props are provided, these are ignored
   */
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    [],
  );
  const [internalColumnFilters, setInternalColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [internalColumnVisibility, setInternalColumnVisibility] =
    React.useState<VisibilityState>({});
  const [internalRowSelection, setInternalRowSelection] = React.useState<
    Record<string, boolean>
  >({});

  /**
   * Determine if controlled or uncontrolled for each state piece
   * This pattern allows mixing controlled and uncontrolled state
   */
  const sorting = controlledSorting ?? internalSorting;
  const onSortingChange = controlledOnSortingChange ?? setInternalSorting;

  const columnFilters = controlledColumnFilters ?? internalColumnFilters;
  const onColumnFiltersChange =
    controlledOnColumnFiltersChange ?? setInternalColumnFilters;

  const columnVisibility =
    controlledColumnVisibility ?? internalColumnVisibility;
  const onColumnVisibilityChange =
    controlledOnColumnVisibilityChange ?? setInternalColumnVisibility;

  const rowSelection = controlledRowSelection ?? internalRowSelection;
  const onRowSelectionChange =
    controlledOnRowSelectionChange ?? setInternalRowSelection;

  /**
   * Initialize TanStack Table
   *
   * Key configuration:
   * - data & columns: The source data and column definitions
   * - state: Current state of sorting, filters, visibility, selection
   * - onXChange: State update handlers (works with both controlled and uncontrolled)
   * - getCoreRowModel: Base model that transforms data to rows
   * - getSortedRowModel: Applies sorting transformations
   * - getFilteredRowModel: Applies filter transformations
   * - getPaginationRowModel: Splits rows into pages (optional)
   *
   * The order of row models matters: Core -\> Sorted -\> Filtered -\> Paginated
   */
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange,
    onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(enablePagination && {
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageSize,
        },
      },
    }),
  });

  return (
    <div className={className}>
      {/* Custom controls (filters, pagination, etc.) */}
      {renderControls ? (
        <div className="mb-4">{renderControls(table)}</div>
      ) : null}

      {/* Table */}
      <div className="rounded-md border">
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
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/**
 * Export TanStack Table types for convenience
 * This allows users to import everything they need from one place
 */
export type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TanStackTable,
  VisibilityState,
} from "@tanstack/react-table";
