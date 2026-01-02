/**
 * DatePicker Component
 *
 * A date picker built by composing the Calendar and Popover components.
 * Provides a user-friendly interface for selecting dates.
 *
 * Educational notes:
 * - Composition pattern: Built from smaller, reusable components (Button, Popover, Calendar)
 * - Controlled component: Uses React state to manage the selected date
 * - date-fns for formatting: Industry standard for date manipulation
 * - Accessible: Keyboard navigation, ARIA labels, screen reader support
 *
 * @example
 * ```tsx
 * const [date, setDate] = React.useState<Date>();
 *
 * <DatePicker
 *   date={date}
 *   onDateChange={setDate}
 *   placeholder="Pick a date"
 * />
 * ```
 */

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@prism/core";

import { Button } from "../button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

/**
 * Calendar icon component
 *
 * Simple SVG icon for the date picker trigger.
 * Kept inline to avoid additional dependencies.
 */
function CalendarIcon({
  className,
}: {
  className?: string;
}): React.ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect height="18" rx="2" width="18" x="3" y="4" />
      <path d="M3 10h18" />
    </svg>
  );
}

export interface DatePickerProps {
  /**
   * The currently selected date
   */
  date?: Date;

  /**
   * Callback when the date changes
   */
  onDateChange?: (date: Date | undefined) => void;

  /**
   * Placeholder text when no date is selected
   *
   * Defaults to "Pick a date"
   */
  placeholder?: string;

  /**
   * Format string for displaying the selected date
   * Uses date-fns format tokens
   *
   * Defaults to "PPP" (e.g., "Apr 29, 2024")
   *
   * @see https://date-fns.org/docs/format
   */
  dateFormat?: string;

  /**
   * Whether the date picker is disabled
   */
  disabled?: boolean;

  /**
   * Additional CSS classes for the trigger button
   */
  className?: string;

  /**
   * Disable dates before this date
   */
  fromDate?: Date;

  /**
   * Disable dates after this date
   */
  toDate?: Date;
}

/**
 * DatePicker Component
 *
 * A composed component that provides a popover-based date selection interface.
 *
 * Implementation notes:
 * - Uses uncontrolled popover state (Popover manages its own open/close)
 * - Controlled date state (parent component manages the selected date)
 * - Automatically closes popover when a date is selected (better UX)
 * - Uses date-fns for reliable date formatting
 */
const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      date,
      onDateChange,
      placeholder = "Pick a date",
      dateFormat = "PPP",
      disabled = false,
      className,
      fromDate,
      toDate,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);

    /**
     * Handle date selection
     *
     * When a date is selected:
     * 1. Update the date state via callback
     * 2. Close the popover (expected UX for date pickers)
     */
    const handleDateSelect = (selectedDate: Date | undefined): void => {
      onDateChange?.(selectedDate);
      // Close popover after selection for better UX
      if (selectedDate) {
        setIsOpen(false);
      }
    };

    return (
      <Popover onOpenChange={setIsOpen} open={isOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-label={
              date ? `Selected date: ${format(date, dateFormat)}` : placeholder
            }
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-neutral-500",
              className,
            )}
            disabled={disabled}
            ref={ref}
            variant="outline"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, dateFormat) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            disabled={(() => {
              if (fromDate && toDate) {
                return { before: fromDate, after: toDate };
              }
              if (fromDate) {
                return { before: fromDate };
              }
              if (toDate) {
                return { after: toDate };
              }
              return undefined;
            })()}
            initialFocus
            mode="single"
            onSelect={handleDateSelect}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
