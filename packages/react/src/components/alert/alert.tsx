import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@prism/core";

/**
 * Alert variants using CVA
 *
 * Educational notes:
 * - default: neutral styling for general information
 * - destructive: red/error styling for warnings and errors
 * - success: green styling for positive feedback
 * - info: blue styling for informational messages
 */
const alertVariants = cva(
  // Base styles: card-like container with border
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "border-green-500/50 text-green-900 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400 bg-green-50 dark:bg-green-950/20",
        info: "border-blue-500/50 text-blue-900 dark:border-blue-500 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400 bg-blue-50 dark:bg-blue-950/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Alert component props
 */
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

/**
 * Alert - Displays important information to the user
 *
 * Educational notes:
 * - Uses role="alert" for accessibility (announced by screen readers)
 * - Supports icons via children (positioned absolutely in top-left)
 * - Complex CSS selector [&\>svg~*]:pl-7 adds left padding to content after icon
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(alertVariants({ variant }), className)}
        ref={ref}
        role="alert"
        {...props}
      />
    );
  },
);

Alert.displayName = "Alert";

/**
 * AlertTitle component props
 */
export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * AlertTitle - Heading for the alert
 *
 * Educational notes:
 * - Uses <h5> for semantic heading hierarchy
 * - mb-1 provides spacing before description
 * - font-medium and tracking-tight for visual hierarchy
 */
const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      // Content comes from props.children via spread
      // eslint-disable-next-line jsx-a11y/heading-has-content -- children passed via props spread
      <h5
        className={cn(
          "mb-1 leading-none font-medium tracking-tight",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

AlertTitle.displayName = "AlertTitle";

/**
 * AlertDescription component props
 */
export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * AlertDescription - Body text for the alert
 *
 * Educational notes:
 * - Uses <div> instead of <p> to allow nested block elements
 * - text-sm for smaller, secondary text
 * - leading-relaxed for better readability
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      ref={ref}
      {...props}
    />
  );
});

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle, alertVariants };
