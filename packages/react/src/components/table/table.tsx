import * as React from "react";
import { cn } from "@prism/core";

/**
 * Table Component
 *
 * A semantic HTML table component for displaying structured data in rows and columns.
 * This component follows the composition pattern, exposing individual table parts
 * (Table, TableHeader, TableBody, etc.) that can be combined to create flexible layouts.
 *
 * Educational Notes:
 * - Uses semantic HTML elements (<table>, <thead>, <tbody>, etc.) for accessibility
 * - Each sub-component is independently styled but follows a cohesive design system
 * - Composition pattern allows maximum flexibility for different table structures
 * - Base styling is minimal to encourage customization via className
 */

/**
 * Table - Root container for the table
 *
 * Wraps the entire table structure. Sets up basic styling like borders and spacing.
 * The `relative` class enables absolute positioning of child elements if needed.
 * The `w-full` ensures the table takes up available width by default.
 */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

/**
 * TableHeader - Container for table header rows
 *
 * Uses <thead> for semantic HTML. Screen readers announce this as the table header section.
 */
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  ),
);
TableHeader.displayName = "TableHeader";

/**
 * TableBody - Container for table body rows
 *
 * Uses <tbody> for semantic HTML. Contains the main data rows.
 * The `[&_tr:last-child]:border-0` removes border from the last row for cleaner appearance.
 */
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  ),
);
TableBody.displayName = "TableBody";

/**
 * TableFooter - Container for table footer rows
 *
 * Uses <tfoot> for semantic HTML. Typically used for summary rows or totals.
 * The `border-t` adds a top border to visually separate from body content.
 * Background color helps distinguish footer from body rows.
 */
export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t bg-neutral-100/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  ),
);
TableFooter.displayName = "TableFooter";

/**
 * TableRow - Container for a single row of cells
 *
 * Uses <tr> for semantic HTML. Represents a single row in the table.
 * Hover state provides visual feedback for interactive tables.
 * The `data-[state=selected]` attribute is used by data tables for row selection styling.
 */
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-neutral-100/50 data-[state=selected]:bg-neutral-100",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

/**
 * TableHead - Column header cell
 *
 * Uses <th> for semantic HTML. Represents a header cell in the table.
 * Screen readers use this to announce column headers when navigating cells.
 * Text alignment is left by default but can be customized via className.
 * The `[&:has([role=checkbox])]:pr-0` removes padding when checkbox is present for better alignment.
 */
export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-neutral-500 [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

/**
 * TableCell - Data cell
 *
 * Uses <td> for semantic HTML. Represents a data cell in the table.
 * Padding and alignment match TableHead for visual consistency.
 * The `[&:has([role=checkbox])]:pr-0` removes padding when checkbox is present.
 */
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

/**
 * TableCaption - Descriptive caption for the table
 *
 * Uses <caption> for semantic HTML. Provides a description of the table's content.
 * Screen readers announce this first, helping users understand the table's purpose.
 * Positioned at the bottom with `caption-bottom` class on the table element.
 */
export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {}

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-neutral-500", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
