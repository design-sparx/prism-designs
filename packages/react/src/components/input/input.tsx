/**
 * Input Component
 *
 * A flexible input component for form fields built with:
 * - React forwardRef for ref forwarding
 * - Tailwind CSS for styling
 * - Full HTML input compatibility
 *
 * Educational Notes:
 * - Extends native HTML input props for full compatibility
 * - Uses forwardRef to allow parent components to access the input element
 * - No CVA needed - Input is simpler than Button with consistent styling
 * - Follows shadcn/ui patterns for form components
 */

import * as React from "react";

import { cn } from "@prism/core";

/**
 * Input Props
 *
 * Extends native HTML input attributes for full compatibility.
 * This means you can use any standard input prop: type, placeholder,
 * value, onChange, disabled, etc.
 *
 * Educational Note:
 * - We don't need custom props beyond className
 * - The native InputHTMLAttributes gives us everything we need
 * - This is simpler than Button because inputs don't have variants
 */
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Input Component
 *
 * A styled input field that supports all native HTML input features.
 *
 * Educational Notes:
 * - forwardRef allows parent components to access the input DOM element
 * - This is essential for focus management and form libraries
 * - We merge custom className with our base styles using cn()
 * - The `file:` prefix in Tailwind applies styles only to file inputs
 *
 * @example Basic usage
 * ```tsx
 * <Input type="email" placeholder="Email" />
 * ```
 *
 * @example With label
 * ```tsx
 * <label htmlFor="email">Email</label>
 * <Input id="email" type="email" />
 * ```
 *
 * @example Disabled
 * ```tsx
 * <Input disabled placeholder="Disabled input" />
 * ```
 *
 * @example With ref
 * ```tsx
 * const inputRef = useRef<HTMLInputElement>(null)
 * <Input ref={inputRef} />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={cn(
          // Base styles
          [
            "flex h-10 w-full rounded-md",
            "border border-neutral-300 bg-white",
            "px-3 py-2",
            "text-base text-neutral-900",
            "ring-offset-white",
            // Placeholder styles
            "placeholder:text-neutral-500",
            // Focus styles
            "focus-visible:ring-2 focus-visible:outline-none",
            "focus-visible:ring-primary-500 focus-visible:ring-offset-2",
            // Disabled styles
            "disabled:cursor-not-allowed disabled:opacity-50",
            // File input specific styles
            // Educational Note: The file: prefix applies styles only to type="file"
            "file:border-0 file:bg-transparent",
            "file:text-sm file:font-medium",
            "file:text-neutral-900",
          ].join(" "),
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
