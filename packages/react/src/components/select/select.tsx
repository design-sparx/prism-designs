/**
 * Select Component
 *
 * A simple dropdown selection component built with Radix UI primitives.
 *
 * Educational Notes:
 * - Built on `@radix-ui/react-select` for accessibility and behavior
 * - Exports 5 core subcomponents: Select, SelectTrigger, SelectValue, SelectContent, SelectItem
 * - Radix UI handles keyboard navigation, ARIA attributes, and focus management
 * - We only style the components - behavior comes from Radix UI
 *
 * Why Radix UI?
 * - Complex components like Select require extensive accessibility work
 * - Radix provides unstyled, accessible primitives (headless UI)
 * - We can focus on design while Radix handles WCAG compliance
 *
 * Learning Focus:
 * - This is a simpler version focusing on core Select functionality
 * - Advanced features like grouping, separators, and scroll buttons are omitted
 * - Perfect for understanding the basics of compound components and Radix UI
 */

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@prism/core";

/**
 * Select Root
 *
 * The main Select component that wraps everything.
 * Radix UI provides the state management and accessibility.
 *
 * Props from Radix:
 * - value: Controlled value
 * - onValueChange: Callback when selection changes
 * - defaultValue: Uncontrolled default value
 * - disabled: Disable the entire select
 */
const Select = SelectPrimitive.Root;

/**
 * SelectValue
 *
 * Displays the selected value or placeholder text.
 * Must be used inside SelectTrigger.
 *
 * Props:
 * - placeholder: Text shown when no value is selected
 */
const SelectValue = SelectPrimitive.Value;

/**
 * SelectTrigger
 *
 * The button that opens the dropdown.
 *
 * Educational Notes:
 * - forwardRef allows parent components to access the button element
 * - Radix handles the aria-* attributes and keyboard events automatically
 * - We style it to match our Input component for visual consistency
 * - The ChevronDown icon is automatically added by Radix's Icon component
 *
 * Pattern Note:
 * - React.ElementRef extracts the ref type from the Radix component
 * - React.ComponentPropsWithoutRef extracts all props except ref
 * - This is a common pattern when wrapping third-party components
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    className={cn(
      [
        // Layout - match Input component
        "flex h-10 w-full items-center justify-between",
        "rounded-md border border-neutral-300 bg-white",
        "px-3 py-2",
        "text-base text-neutral-900",
        // Focus styles
        "focus:ring-2 focus:outline-none",
        "focus:ring-primary-500 focus:ring-offset-2",
        // Disabled styles
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Truncate long text
        "[&>span]:line-clamp-1",
      ].join(" "),
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    {/* Icon component automatically rotates when open */}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * SelectContent
 *
 * The dropdown panel that contains the options.
 *
 * Educational Notes:
 * - Portal renders outside the DOM hierarchy to avoid z-index issues
 * - This is important when Select is inside a container with overflow: hidden
 * - Position="popper" positions the dropdown relative to the trigger
 * - Radix handles focus trap and keyboard navigation automatically
 *
 * Why Portal?
 * - Renders in a separate DOM tree (appended to document.body)
 * - Prevents parent containers from clipping the dropdown
 * - Ensures dropdown appears above other content
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        [
          // Positioning and size
          "relative z-50 min-w-[8rem]",
          "max-h-96 overflow-hidden",
          // Styling
          "rounded-md border border-neutral-200",
          "bg-white text-neutral-900 shadow-md",
        ].join(" "),
        className,
      )}
      position={position}
      ref={ref}
      {...props}
    >
      {/* Viewport contains the actual items */}
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          // Match trigger width when using popper positioning
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * SelectItem
 *
 * An individual selectable option.
 *
 * Educational Notes:
 * - Radix handles selection state and ARIA attributes automatically
 * - Shows a check icon when this item is selected
 * - Keyboard navigation (arrow keys, Enter, Space, etc.) works out of the box
 * - The `value` prop is required and determines what gets selected
 *
 * Compound Component Pattern:
 * - SelectItem uses child components (ItemIndicator, ItemText)
 * - This gives Radix control over rendering and accessibility
 * - We provide the styling, Radix provides the behavior
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    className={cn(
      [
        // Layout
        "relative flex w-full cursor-default items-center select-none",
        "rounded-sm py-1.5 pr-2 pl-8 text-sm",
        // Interactive states
        "outline-none",
        "focus:bg-neutral-100 focus:text-neutral-900",
        // Disabled state
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      ].join(" "),
      className,
    )}
    ref={ref}
    {...props}
  >
    {/* Check icon - only visible when selected */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    {/* The actual text content */}
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * Exports
 *
 * Only the 5 core components needed for a basic Select:
 * 1. Select - Root wrapper
 * 2. SelectTrigger - The button that opens the dropdown
 * 3. SelectValue - Displays selected value
 * 4. SelectContent - The dropdown panel
 * 5. SelectItem - Individual options
 */
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
