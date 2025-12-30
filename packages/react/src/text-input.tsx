/**
 * TextInput Component
 *
 * A simple input component built with:
 * - Tailwind CSS for styling
 * - class-variance-authority for variant management
 *
 * Educational Notes:
 * - CVA manages variants in a type-safe, maintainable way
 * - Extends native input props for full HTML compatibility
 * - Uses forwardRef for form library compatibility (React Hook Form, Formik, etc.)
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@prism/core";

/**
 * TextInput Variants
 *
 * CVA (class-variance-authority) provides type-safe variant management.
 * Each variant is a collection of Tailwind classes.
 *
 * Why CVA?
 * - Type-safe: TypeScript knows which variants exist
 * - Composable: Variants can be combined
 * - Maintainable: All styling in one place
 * - DX: IntelliSense for variant names
 *
 * Why no size variants?
 * - Text inputs benefit from consistent sizing across the app
 * - Avoids conflict with HTML's native `size` attribute (number type)
 * - Simpler API for consumers
 */
const textInputVariants = cva(
  // Base styles applied to ALL inputs
  [
    "w-full",
    "h-10 px-4",
    "text-base",
    "rounded-lg",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "placeholder:text-neutral-400",
  ].join(" "),
  {
    variants: {
      /**
       * Visual variants
       *
       * - default: Outlined input with border
       * - filled: Input with background fill
       * - ghost: Minimal borderless input
       */
      variant: {
        default: [
          "border border-neutral-300 bg-white",
          "hover:border-neutral-400",
          "focus-visible:border-primary-500 focus-visible:ring-primary-500",
        ].join(" "),
        filled: [
          "border border-transparent bg-neutral-100",
          "hover:bg-neutral-200",
          "focus-visible:bg-white focus-visible:border-primary-500 focus-visible:ring-primary-500",
        ].join(" "),
        ghost: [
          "border border-transparent bg-transparent",
          "hover:bg-neutral-50",
          "focus-visible:bg-white focus-visible:border-neutral-300 focus-visible:ring-neutral-300",
        ].join(" "),
      },
    },
    /**
     * Default variants
     *
     * Applied when no variant props are specified
     */
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * TextInput Props
 *
 * Extends native HTML input attributes + our custom variant props
 *
 * Why extend InputHTMLAttributes?
 * - Inherits all standard input props (onChange, value, placeholder, etc.)
 * - Provides type safety for native HTML attributes
 * - Works seamlessly with form libraries
 */
export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textInputVariants> {}

/**
 * TextInput Component
 *
 * A simple, accessible text input component.
 *
 * Usage examples:
 * - Basic: `<TextInput placeholder="Enter text..." />`
 * - Variants: `<TextInput variant="filled" />` or `<TextInput variant="ghost" />`
 * - With React Hook Form: Spread the register function as props
 * - Controlled: Pass value and onChange props
 * - Disabled: Add the disabled prop
 */
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, variant, type = "text", ...props }, ref) => {
    return (
      <input
        className={cn(textInputVariants({ variant, className }))}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);

TextInput.displayName = "TextInput";

export { TextInput, textInputVariants };
