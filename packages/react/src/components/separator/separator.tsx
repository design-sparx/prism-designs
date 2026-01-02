import * as React from "react";

import { cn } from "@prism/core";

/**
 * Separator component props
 * Extends native div attributes for flexibility
 */
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Orientation of the separator
   * Defaults to 'horizontal'
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Whether the separator is purely decorative (not semantic)
   * When true, uses a div instead of hr for accessibility
   * Defaults to true
   */
  decorative?: boolean;
}

/**
 * Separator - A visual or semantic divider between content
 *
 * Educational notes:
 * - Uses <hr> for semantic separators (accessible to screen readers)
 * - Uses <div> for decorative separators (hidden from screen readers)
 * - Horizontal separators span full width by default
 * - Vertical separators are self-aligning and work in flex containers
 */
const Separator = React.forwardRef<
  HTMLDivElement | HTMLHRElement,
  SeparatorProps
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => {
    // Choose element type based on decorative flag
    // Decorative separators use div (hidden from screen readers)
    // Semantic separators use hr (announced by screen readers)
    const Component = decorative ? "div" : "hr";

    return (
      <Component
        aria-hidden={decorative ? "true" : undefined}
        aria-orientation={decorative ? orientation : undefined}
        className={cn(
          // Base styles: thin border, no background
          "bg-border shrink-0",
          // Horizontal: full width, thin height
          orientation === "horizontal"
            ? "h-[1px] w-full"
            : // Vertical: full height, thin width
              "h-full w-[1px]",
          className,
        )}
        // Polymorphic component requires any for ref compatibility
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment -- polymorphic ref
        ref={ref as any}
        role={decorative ? "separator" : undefined}
        {...props}
      />
    );
  },
);

Separator.displayName = "Separator";

export { Separator };
