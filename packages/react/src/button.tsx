/**
 * Button Component
 *
 * A flexible button component built with:
 * - Radix UI Slot for composition
 * - Tailwind CSS for styling
 * - class-variance-authority for variant management
 *
 * Educational Notes:
 * - Radix Slot allows this component to render as any element (polymorphism)
 * - CVA manages variants in a type-safe, maintainable way
 * - Extends native button props for full HTML compatibility
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@prism/core";

/**
 * Button Variants
 *
 * CVA (class-variance-authority) provides type-safe variant management.
 * Each variant is a collection of Tailwind classes.
 *
 * Why CVA?
 * - Type-safe: TypeScript knows which variants exist
 * - Composable: Variants can be combined
 * - Maintainable: All styling in one place
 * - DX: IntelliSense for variant names
 */
const buttonVariants = cva(
  // Base styles applied to ALL buttons
  [
    "inline-flex items-center justify-center",
    "rounded-lg font-medium",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      /**
       * Visual variants
       *
       * These use our design tokens from @prism/tokens
       * mapped through Tailwind's @theme directive
       */
      variant: {
        primary: [
          "bg-primary-500 text-white",
          "hover:bg-primary-600",
          "focus-visible:ring-primary-500",
        ].join(" "),
        secondary: [
          "bg-neutral-200 text-neutral-900",
          "hover:bg-neutral-300",
          "focus-visible:ring-neutral-500",
        ].join(" "),
        outline: [
          "border-2 border-neutral-300 bg-transparent",
          "hover:bg-neutral-100",
          "focus-visible:ring-neutral-500",
        ].join(" "),
        ghost: [
          "bg-transparent",
          "hover:bg-neutral-100",
          "focus-visible:ring-neutral-500",
        ].join(" "),
        destructive: [
          "bg-error-main text-white",
          "hover:bg-error-dark",
          "focus-visible:ring-error-main",
        ].join(" "),
      },

      /**
       * Size variants
       *
       * Use spacing tokens from @prism/tokens
       */
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10", // Square button for icons
      },
    },

    /**
     * Default variants
     *
     * Applied when no variant props are specified
     */
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Button Props
 *
 * Extends native HTML button attributes + our custom variant props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as a child component (polymorphism)
   *
   * When true, the button renders as its child element.
   * Useful for links that should look like buttons.
   *
   * @example
   * <Button asChild>
   *   <a href="/home">Go Home</a>
   * </Button>
   */
  asChild?: boolean;
}

/**
 * Button Component
 *
 * @example Basic usage
 * <Button>Click me</Button>
 *
 * @example With variants
 * <Button variant="secondary" size="lg">Large Secondary</Button>
 *
 * @example As a link
 * <Button asChild>
 *   <a href="/about">About</a>
 * </Button>
 *
 * @example Disabled
 * <Button disabled>Can't click</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
