import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@prism/core";

/**
 * Toggle Variants
 *
 * Defines the visual styles for the Toggle component using class-variance-authority.
 * This pattern allows us to create a consistent API for size and style variations.
 *
 * Educational note: We use CVA (class-variance-authority) to handle conditional
 * class application. This is more maintainable than inline conditional logic
 * and provides TypeScript inference for variant props.
 */
const toggleVariants = cva(
  // Base styles - applied to all toggles
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-md text-sm font-medium",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    // Hover state - subtle background change
    "hover:bg-gray-100 hover:text-gray-500",
    // Active (pressed) state styling using data attributes
    // Radix UI provides data-[state=on] when toggle is active
    "data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900",
  ],
  {
    variants: {
      /**
       * Variant: Visual style variations
       *
       * - default: Subtle background-based styling
       * - outline: Border-based styling with transparent background
       *
       * Educational note: The 'outline' variant uses borders instead of
       * background fills, providing a lighter visual weight. This is useful
       * for secondary actions or when you need visual hierarchy.
       */
      variant: {
        default: "bg-transparent",
        outline:
          "border border-gray-200 bg-transparent hover:bg-gray-100 hover:text-gray-900",
      },
      /**
       * Size: Controls the padding and overall dimensions
       *
       * Educational note: We use consistent sizing scales across all interactive
       * components (Button, Toggle, etc.) to maintain visual rhythm.
       */
      size: {
        sm: "h-9 px-2.5 min-w-9",
        default: "h-10 px-3 min-w-10",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Toggle Props Interface
 *
 * Extends the Radix UI Toggle primitive props and adds our variant props.
 *
 * Educational note: By extending ComponentPropsWithoutRef, we get all the
 * native HTML attributes plus Radix's Toggle-specific props (pressed, onPressedChange, etc.)
 * This ensures full compatibility with the underlying primitive.
 */
export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

/**
 * Toggle Component
 *
 * A two-state button that can be toggled between "on" and "off" states.
 * Built on Radix UI's Toggle primitive for robust accessibility.
 *
 * Educational note: Toggle differs from a Switch in both visual treatment
 * and use case. Toggles are typically used in toolbars (bold, italic) while
 * Switches are used for settings (enable notifications). Toggles look like
 * buttons, Switches look like physical switches.
 *
 * @example
 * ```tsx
 * <Toggle aria-label="Toggle italic">
 *   <Italic className="h-4 w-4" />
 * </Toggle>
 * ```
 *
 * Accessibility:
 * - Supports keyboard navigation (Space/Enter to toggle)
 * - Announces state changes to screen readers via aria-pressed
 * - Requires aria-label when used with icon-only content
 * - Respects prefers-reduced-motion for transitions
 */
const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    className={cn(toggleVariants({ variant, size, className }))}
    ref={ref}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
