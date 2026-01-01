import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@prism/core";

/**
 * Progress Component
 *
 * A visual indicator showing task completion status as a progress bar.
 *
 * Educational Notes:
 * - Built on Radix UI Progress primitive for accessibility
 * - Displays a horizontal bar that fills based on the value prop (0-100)
 * - Commonly used for file uploads, downloads, form completion, etc.
 * - Supports indeterminate state (no value provided)
 *
 * Why Radix UI?
 * - Handles ARIA attributes automatically (role="progressbar", aria-valuemin/max/now)
 * - Manages state updates and transitions smoothly
 * - Provides proper semantics for screen readers
 * - Supports both determinate and indeterminate states
 *
 * Learning Focus:
 * - The progress component has two main parts:
 *   1. Root: The container (background bar)
 *   2. Indicator: The filled portion (shows progress)
 * - The indicator uses CSS transform to animate the fill
 * - Value is always between 0-100 (percentage)
 * - The component is purely presentational (no user interaction)
 */

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    className={cn(
      // Base styles - rounded container with light background
      "relative h-2 w-full overflow-hidden rounded-full bg-neutral-200",
      className,
    )}
    ref={ref}
    {...props}
  >
    {/**
     * Indicator Component
     *
     * Educational Note:
     * - The indicator is the filled portion of the progress bar
     * - Uses translateX transform to create the fill animation
     * - Starts at -100% (fully hidden) and moves to 0% (fully visible)
     * - The transform calculation: -100% + value% = final position
     * - transition-all provides smooth animation when value changes
     */}
    <ProgressPrimitive.Indicator
      className={cn("bg-primary-500 h-full w-full flex-1 transition-all")}
      style={{
        /**
         * Transform explanation:
         * - When value = 0: translateX(-100%) → completely hidden (left)
         * - When value = 50: translateX(-50%) → half visible
         * - When value = 100: translateX(0%) → fully visible
         *
         * This creates a left-to-right fill animation
         */
        transform: `translateX(-${100 - (value || 0)}%)`,
      }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
