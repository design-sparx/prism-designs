import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@prism/core";

/**
 * Switch Component
 *
 * A control that allows users to toggle between checked and unchecked states.
 *
 * Educational Notes:
 * - Built on Radix UI Switch primitive for accessibility
 * - Similar to checkbox but with on/off visual metaphor
 * - Commonly used for settings and preferences
 * - Supports both controlled and uncontrolled modes
 *
 * Why Radix UI?
 * - Handles ARIA attributes automatically (role="switch", aria-checked)
 * - Manages focus states and keyboard interaction (Space/Enter to toggle)
 * - Provides smooth checked/unchecked transitions
 *
 * Learning Focus:
 * - This is simpler than RadioGroup - just a single toggle control
 * - The "thumb" is the circular indicator that slides left/right
 * - data-[state=checked] and data-[state=unchecked] are used for styling
 * - Always pair with a Label for better accessibility
 */

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      // Base styles - rounded pill shape
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
      // Focus state
      "focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
      // Disabled state
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Unchecked state (default) - gray background
      "bg-neutral-200",
      // Checked state - primary color background
      "data-[state=checked]:bg-primary-500",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        // Base styles for the thumb (circle that slides)
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
        // Unchecked position - left side with small offset
        "translate-x-0",
        // Checked position - slide to the right
        "data-[state=checked]:translate-x-5",
      )}
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
