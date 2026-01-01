import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@prism/core";

/**
 * Label variants define the visual styles for labels.
 *
 * Educational note: We keep this simple with just basic styling.
 * Labels should be clear and readable, so we focus on:
 * - Typography (font size, weight)
 * - Cursor behavior (pointer when clickable)
 * - Disabled state (reduced opacity)
 */
const labelVariants = cva(
  // Base styles: all labels get these
  "text-sm font-medium leading-none cursor-pointer",
  {
    variants: {
      /**
       * Disabled state reduces opacity to indicate the associated
       * form control is not interactive
       */
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  /**
   * The id of the form control this label is associated with.
   * This creates a programmatic relationship for screen readers
   * and makes the label clickable to focus the control.
   */
  htmlFor?: string;

  /**
   * When true, styles the label to indicate the associated
   * form control is disabled
   */
  disabled?: boolean;
}

/**
 * Label component provides an accessible text description for form controls.
 *
 * Educational notes:
 * - Always use htmlFor to connect the label to its form control
 * - This creates accessibility benefits (screen readers announce the label)
 * - Clicking the label focuses/activates the associated control
 * - We use React.forwardRef to allow parent components to access the DOM node
 *
 * Example usage:
 * ```tsx
 * <Label htmlFor="email">Email Address</Label>
 * <input id="email" type="email" />
 * ```
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control -- Label supports both htmlFor and wrapping patterns
      <label
        className={cn(labelVariants({ disabled, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Label.displayName = "Label";

export { Label, labelVariants };
