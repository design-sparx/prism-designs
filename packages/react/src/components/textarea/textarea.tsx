import * as React from "react";

import { cn } from "@prism/core";

/**
 * Textarea Component
 *
 * A styled textarea element for multi-line text input.
 *
 * Educational Notes:
 * - This is a simple wrapper around the native HTML textarea element
 * - No Radix UI needed - textarea is a standard form element
 * - We just add styling and forward refs for React integration
 * - Extends all native textarea attributes (rows, cols, disabled, etc.)
 *
 * Why keep it simple?
 * - Native textarea already has great accessibility
 * - No complex state management needed
 * - Let the browser handle the behavior
 *
 * Learning Focus:
 * - How to style native form elements
 * - Proper ref forwarding for form elements
 * - TypeScript typing with HTMLTextAreaElement
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Extends native textarea attributes
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles
          "flex min-h-20 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm",
          // Placeholder styling
          "placeholder:text-neutral-500",
          // Focus state
          "focus-visible:border-primary-500 focus-visible:ring-primary-500/20 focus-visible:ring-2 focus-visible:outline-none",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
