import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@prism/core";

/**
 * Tooltip Component
 *
 * A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
 * Built on Radix UI's Tooltip primitive for accessibility.
 *
 * Educational Notes:
 * - Uses TooltipProvider to share hover delay across multiple tooltips
 * - Implements proper ARIA attributes for accessibility
 * - Supports keyboard navigation (focus triggers tooltip)
 * - Respects prefers-reduced-motion
 * - Automatically positions to avoid viewport overflow
 */

// Provider - Required wrapper for tooltip functionality
// Shares state between multiple tooltips (hover delay, etc.)
const TooltipProvider = TooltipPrimitive.Provider;

// Root - Manages open/close state
const Tooltip = TooltipPrimitive.Root;

// Trigger - Element that triggers the tooltip
const TooltipTrigger = TooltipPrimitive.Trigger;

// Content - The tooltip popup
const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md border bg-neutral-900 px-3 py-1.5 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
);

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    className={cn(tooltipContentVariants(), className)}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipContent,
  tooltipContentVariants,
  TooltipProvider,
  TooltipTrigger,
};
