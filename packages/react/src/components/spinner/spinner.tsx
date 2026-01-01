/**
 * Spinner Component
 *
 * A loading indicator that displays an animated spinning icon.
 * Built with:
 * - Pure SVG (no external icon dependencies)
 * - Tailwind CSS for styling and animation
 * - class-variance-authority for size variants
 *
 * Educational Notes:
 * - Uses an inline SVG circle element to avoid icon library dependencies
 * - The animate-spin utility class provides the rotation animation
 * - Includes proper accessibility attributes (role, aria-label)
 * - Provides size variants for different use cases (buttons, full-page loaders)
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@prism/core";

/**
 * Spinner Variants
 *
 * Educational Note:
 * - Size variants map to common use cases:
 *   - 'sm': For inline usage in buttons or small UI elements
 *   - 'md': Default size for general loading states
 *   - 'lg': For prominent loading states or empty states
 * - Uses Tailwind's size-* utilities for consistent sizing (width = height)
 * - animate-spin is a Tailwind utility that applies infinite rotation
 */
const spinnerVariants = cva(
  // Base styles applied to ALL spinners
  ["animate-spin"].join(" "),
  {
    variants: {
      /**
       * Size variants
       *
       * Educational Note:
       * - size-4 (16px): Small, for buttons and compact spaces
       * - size-6 (24px): Medium, default for most loading states
       * - size-8 (32px): Large, for full-page loaders or empty states
       */
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
      },
    },

    /**
     * Default variant
     * Applied when no size prop is specified
     */
    defaultVariants: {
      size: "md",
    },
  },
);

/**
 * Spinner Props
 *
 * Extends native HTML SVG attributes + our variant props
 *
 * Educational Note:
 * - Uses React.SVGAttributes<SVGSVGElement> for proper SVG typing
 * - Inherits all standard SVG props (width, height, viewBox, etc.)
 * - Adding VariantProps gives us the 'size' prop with autocomplete
 */
export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

/**
 * Spinner Component
 *
 * @example Basic usage
 * <Spinner />
 *
 * @example With sizes
 * <Spinner size="sm" />
 * <Spinner size="md" />
 * <Spinner size="lg" />
 *
 * @example With custom color
 * <Spinner className="text-primary-500" />
 * <Spinner className="text-error-main" />
 *
 * @example In a button
 * <button>
 *   <Spinner size="sm" className="mr-2" />
 *   Loading...
 * </button>
 *
 * Educational Note:
 * - Uses forwardRef to allow parent components to access the SVG element
 * - The 'ref' pattern is important for accessibility and DOM manipulation
 * - role="status" tells screen readers this is a status indicator
 * - aria-label provides context for assistive technologies
 */
const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <svg
        aria-label="Loading"
        className={cn(spinnerVariants({ size }), className)}
        fill="none"
        ref={ref}
        role="status"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {/**
         * SVG Circle Element
         *
         * Educational Note:
         * - Creates a circular loading indicator
         * - opacity-25: Makes the full circle background subtle (25% visible)
         * - opacity-75: Makes the animated arc more prominent (75% visible)
         * - strokeDasharray creates the "incomplete circle" effect
         * - currentColor inherits the text color, allowing easy customization
         */}
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        />
      </svg>
    );
  },
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
