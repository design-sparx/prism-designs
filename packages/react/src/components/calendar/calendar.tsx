import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";

import { cn } from "@prism/core";

import "react-day-picker/style.css";

export type CalendarProps = DayPickerProps;

/**
 * Calendar component for date selection.
 *
 * This component wraps react-day-picker with custom Prism styling.
 * It's used as the foundation for date pickers and date range selectors.
 *
 * Educational notes:
 * - Wrapping third-party components allows us to control styling and behavior
 * - We re-export the DayPickerProps type so consumers don't need to import from react-day-picker
 * - Custom CSS classes override the default react-day-picker styles to match our design system
 */
const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, classNames, showOutsideDays = true, ...props }, ref) => {
    return (
      <div className={cn("p-3", className)} ref={ref}>
        <DayPicker
          className={cn("w-full", className)}
          classNames={{
            months:
              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            month_caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            button_previous: cn(
              "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              "inline-flex items-center justify-center rounded-md text-sm font-medium",
              "transition-colors hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50",
            ),
            button_next: cn(
              "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              "inline-flex items-center justify-center rounded-md text-sm font-medium",
              "transition-colors hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50",
            ),
            month_grid: "w-full border-collapse space-y-1",
            weekdays: "flex",
            weekday: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
            week: "flex w-full mt-2",
            day: cn(
              "h-9 w-9 text-center text-sm p-0 relative",
              "rounded-md hover:bg-gray-100",
              "focus-within:relative focus-within:z-20",
            ),
            day_button: cn(
              "h-9 w-9 p-0 font-normal",
              "inline-flex items-center justify-center rounded-md text-sm",
              "transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400",
            ),
            range_end: "day-range-end",
            selected: cn(
              "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
              "focus:bg-blue-600 focus:text-white",
            ),
            today: "bg-gray-100 text-gray-900",
            outside: cn(
              "day-outside text-gray-400 opacity-50",
              "aria-selected:bg-gray-100 aria-selected:text-gray-400 aria-selected:opacity-30",
            ),
            disabled: "text-gray-400 opacity-50",
            range_middle:
              "aria-selected:bg-gray-100 aria-selected:text-gray-900",
            hidden: "invisible",
            ...classNames,
          }}
          showOutsideDays={showOutsideDays}
          {...props}
        />
      </div>
    );
  },
);

Calendar.displayName = "Calendar";

export { Calendar };
