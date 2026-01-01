/**
 * Popover Component
 *
 * A popover displays rich content in a portal, triggered by a button or other interactive element.
 * Built on Radix UI's Popover primitive for full accessibility and keyboard navigation.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <p>Place content for the popover here.</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * Educational notes:
 * - Popover vs Tooltip: Use popovers for rich interactive content, tooltips for simple text hints
 * - Portal rendering: Content is rendered outside the DOM hierarchy to avoid z-index issues
 * - asChild prop: Allows the trigger to merge props with its child instead of wrapping it
 * - Accessibility: Built-in keyboard navigation (Esc to close) and ARIA attributes
 */

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@prism/core";

/**
 * Root Popover component
 *
 * Wraps the trigger and content. Manages open/close state.
 */
const Popover = PopoverPrimitive.Root;

/**
 * Popover Trigger
 *
 * The element that opens the popover when interacted with.
 * Use `asChild` to merge props with a custom trigger element.
 */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * PopoverContent Props
 *
 * Extends Radix UI PopoverContent with custom styling
 */
export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /**
   * The preferred alignment of the popover relative to the trigger
   * Defaults to "center"
   */
  align?: "start" | "center" | "end";
  /**
   * The distance in pixels from the trigger
   * Defaults to 4
   */
  sideOffset?: number;
}

/**
 * Popover Content
 *
 * The container for popover content. Rendered in a portal with animations.
 *
 * Features:
 * - Smooth fade and zoom animations
 * - Configurable alignment and offset
 * - Default width of 18rem (w-72) - override with className
 * - Proper focus management and keyboard navigation
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      className={cn(
        // Base styles
        "border-border bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none",
        // Animations: fade and zoom on open/close
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        // Slide in from the direction of the trigger
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        // Transform origin for smooth animations
        "origin-[--radix-popover-content-transform-origin]",
        className,
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverTrigger };
