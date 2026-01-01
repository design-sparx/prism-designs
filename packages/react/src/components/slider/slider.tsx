import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@prism/core";

/**
 * Slider Component
 *
 * An input control where users select a value from within a given range.
 *
 * Educational Notes:
 * - Built on Radix UI Slider primitive for accessibility
 * - Supports single or multiple values (thumbs)
 * - Keyboard accessible (Arrow keys, Home, End, Page Up/Down)
 * - Touch and mouse interaction support
 *
 * Why Radix UI?
 * - Handles complex ARIA attributes (role="slider", aria-valuemin, aria-valuemax, etc.)
 * - Manages focus states and keyboard navigation automatically
 * - Supports vertical and horizontal orientation
 * - Handles RTL (right-to-left) layouts
 *
 * Learning Focus:
 * - The slider has three main parts:
 *   1. Root: The container element
 *   2. Track: The background track (full range)
 *   3. Range: The filled portion (selected range)
 *   4. Thumb: The draggable handle(s)
 * - Values are always stored as an array (even for single value sliders)
 * - The component supports both controlled and uncontrolled modes
 * - Use defaultValue for uncontrolled, value + onValueChange for controlled
 */

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    className={cn(
      // Base styles - full width container with relative positioning
      "relative flex w-full touch-none items-center select-none",
      className,
    )}
    ref={ref}
    {...props}
  >
    {/**
     * Track Component
     *
     * Educational Note:
     * - The track is the full-width background bar
     * - Provides visual context for the slider range
     * - Typically a lighter color than the filled range
     */}
    <SliderPrimitive.Track
      className={cn(
        // Track styling - rounded bar with light background
        "relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-200",
      )}
    >
      {/**
       * Range Component
       *
       * Educational Note:
       * - The range is the filled portion of the track
       * - Shows the selected value(s) visually
       * - Positioned absolutely within the track
       * - For multi-thumb sliders, this represents the range between thumbs
       */}
      <SliderPrimitive.Range
        className={cn(
          // Range styling - primary color to indicate selection
          "bg-primary-500 absolute h-full",
        )}
      />
    </SliderPrimitive.Track>

    {/**
     * Thumb Component
     *
     * Educational Note:
     * - The thumb is the draggable handle
     * - One thumb for single value, multiple thumbs for range selection
     * - Radix automatically creates thumbs based on defaultValue/value array length
     * - Each thumb is keyboard focusable and draggable
     * - Focus ring provides visual feedback for accessibility
     */}
    <SliderPrimitive.Thumb
      className={cn(
        // Base styles - circular handle
        "border-primary-500 block h-5 w-5 rounded-full border-2 bg-white",
        // Shadow for depth
        "shadow-md",
        // Transitions for smooth interaction
        "transition-colors",
        // Focus state - visible ring for keyboard navigation
        "focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        // Disabled state - reduced opacity and no cursor
        "disabled:pointer-events-none disabled:opacity-50",
      )}
    />
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
