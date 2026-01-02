import * as React from "react";

import { cn } from "@prism/core";

/**
 * Skeleton component props
 * Extends native div attributes for flexibility
 */
export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton - Loading placeholder component
 *
 * Educational notes:
 * - Uses CSS animation for the shimmer effect
 * - animate-pulse is a Tailwind utility for a breathing animation
 * - Flexible sizing via className (consumer controls dimensions)
 * - Semantic: Uses div with role="status" for accessibility
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        aria-busy="true"
        aria-live="polite"
        className={cn(
          // Base styles: gray background with pulse animation
          "bg-muted animate-pulse rounded-md",
          className,
        )}
        ref={ref}
        role="status"
        {...props}
      >
        {/* Screen reader text - hidden visually but announced */}
        <span className="sr-only">Loading...</span>
      </div>
    );
  },
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
