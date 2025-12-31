/**
 * Badge Component
 *
 * A simple component for displaying small labels or status indicators.
 * Built with:
 * - Tailwind CSS for styling
 * - class-variance-authority for variant management
 *
 * Educational Notes:
 * - Badges are inline elements (span) for text-level semantics
 * - Unlike Button, Badge doesn't need Radix Slot (simpler use case)
 * - Variants use consistent color system from design tokens
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@prism/core";

/**
 * Badge Variants
 *
 * Educational Note:
 * - Kept simple with just 4 variants (matching shadcn pattern)
 * - Uses inline-flex for centering content
 * - Small padding and text for compact appearance
 * - No complex states like hover (badges are typically non-interactive)
 */
const badgeVariants = cva(
  // Base styles applied to ALL badges
  [
    "inline-flex items-center",
    "rounded-full px-2.5 py-0.5",
    "text-xs font-semibold",
    "transition-colors",
  ].join(" "),
  {
    variants: {
      /**
       * Visual variants
       *
       * Educational Note:
       * - 'default' uses primary colors (most common use case)
       * - 'secondary' for less important information
       * - 'destructive' for errors/warnings
       * - 'outline' provides a lighter alternative
       */
      variant: {
        default: "bg-primary-500 text-white",
        secondary: "bg-neutral-200 text-neutral-900",
        destructive: "bg-error-main text-white",
        outline: "border border-neutral-300 text-neutral-900",
      },
    },

    /**
     * Default variant
     * Applied when no variant prop is specified
     */
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Badge Props
 *
 * Extends native HTML span attributes + our variant props
 *
 * Educational Note:
 * - Uses HTMLAttributes<HTMLSpanElement> (not button/div)
 * - Badges are inline elements, not block-level
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge Component
 *
 * @example Basic usage
 * <Badge>New</Badge>
 *
 * @example With variants
 * <Badge variant="secondary">Beta</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Coming Soon</Badge>
 *
 * @example With custom className
 * <Badge className="ml-2">Custom</Badge>
 */
function Badge({
  className,
  variant,
  ...props
}: BadgeProps): React.ReactElement {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
