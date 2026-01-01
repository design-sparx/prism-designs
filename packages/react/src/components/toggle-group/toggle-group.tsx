import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@prism/core";

import { toggleVariants } from "../toggle/toggle";

/**
 * ToggleGroup Context
 *
 * Provides variant and size props to all ToggleGroupItem children.
 * This allows us to apply consistent styling across all items in the group
 * without having to pass props to each individual item.
 *
 * Educational note: Context is perfect for sharing configuration across
 * related components. We use it here to avoid "prop drilling" - passing
 * variant/size through every level of the component tree.
 */
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

/**
 * ToggleGroup Component
 *
 * A container for multiple Toggle buttons that can work in two modes:
 * - Single: Only one item can be active at a time (radio button behavior)
 * - Multiple: Multiple items can be active simultaneously (checkbox behavior)
 *
 * Educational note: Toggle groups are commonly used for:
 * - Text formatting toolbars (bold, italic, underline)
 * - View switchers (grid, list, compact)
 * - Filter controls where multiple options can be selected
 *
 * The component uses Radix UI's ToggleGroup primitive which handles:
 * - Keyboard navigation (arrow keys)
 * - ARIA attributes for accessibility
 * - State management (single vs multiple selection)
 *
 * @example
 * ```tsx
 * <ToggleGroup type="single">
 *   <ToggleGroupItem value="left" aria-label="Align left">
 *     <AlignLeft className="h-4 w-4" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="center" aria-label="Align center">
 *     <AlignCenter className="h-4 w-4" />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
const ToggleGroup = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    className={cn("flex items-center justify-center gap-1", className)}
    ref={ref}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

/**
 * ToggleGroupItem Component
 *
 * An individual toggle button within a ToggleGroup.
 * Inherits variant and size from the parent ToggleGroup via context.
 *
 * Educational note: Each item must have a unique `value` prop which is used
 * to identify which items are selected. The parent ToggleGroup manages the
 * state and passes down the selected value(s).
 *
 * Accessibility: Always include an aria-label when using icon-only items,
 * so screen reader users know what each button does.
 *
 * @example
 * ```tsx
 * <ToggleGroupItem value="bold" aria-label="Toggle bold">
 *   <Bold className="h-4 w-4" />
 * </ToggleGroupItem>
 * ```
 */
const ToggleGroupItem = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        toggleVariants({
          variant: variant || context.variant,
          size: size || context.size,
        }),
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
