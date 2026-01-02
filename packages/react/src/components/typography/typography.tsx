import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@prism/core";

/**
 * Typography variants using CVA
 *
 * Educational notes:
 * - Provides consistent text hierarchy across the application
 * - Each variant maps to semantic HTML elements
 * - Uses Tailwind's type scale for consistent sizing
 */
const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

/**
 * Maps typography variants to their semantic HTML elements
 *
 * Educational note:
 * This ensures we use the correct HTML element for each variant,
 * maintaining semantic HTML and accessibility best practices
 */
const variantElementMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  blockquote: "blockquote",
  list: "ul",
  inlineCode: "code",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
} as const;

/**
 * Typography component props
 */
export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /**
   * Override the default HTML element for this variant
   * Useful when you need a different element for semantic/structural reasons
   */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Typography - Semantic text component with consistent styling
 *
 * Educational notes:
 * - Automatically selects the correct HTML element based on variant
 * - Supports custom element override via "as" prop
 * - Uses polymorphic component pattern for maximum flexibility
 * - Provides consistent text hierarchy across the design system
 *
 * @example
 * // Renders an <h1> element with h1 styling
 * <Typography variant="h1">Page Title</Typography>
 *
 * @example
 * // Renders a <p> element with h2 styling (custom override)
 * <Typography variant="h2" as="p">Styled as h2, but semantically a paragraph</Typography>
 */
// Polymorphic component - ref type varies by rendered element
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- polymorphic ref type
const Typography = React.forwardRef<any, TypographyProps>(
  ({ className, variant = "p", as, ...props }, ref) => {
    // Determine which element to render
    // Priority: as prop > variant mapping > default 'p'
    // Polymorphic element requires any type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- polymorphic element
    const Element = (as ||
      (variant ? variantElementMap[variant] : undefined) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- polymorphic element type
      "p") as any;

    return (
      <Element
        className={cn(typographyVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
