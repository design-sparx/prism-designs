/**
 * Select Component
 *
 * A dropdown selection component built with Radix UI primitives.
 *
 * Educational Notes:
 * - Built on `@radix-ui/react-select` for accessibility and behavior
 * - Exports multiple subcomponents for composition (Trigger, Content, Item, etc.)
 * - Radix UI handles keyboard navigation, ARIA attributes, and focus management
 * - We only style the components - behavior comes from Radix UI
 *
 * Why Radix UI?
 * - Complex components like Select require extensive accessibility work
 * - Radix provides unstyled, accessible primitives
 * - We can focus on design while Radix handles WCAG compliance
 */

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@prism/core";

/**
 * Select Root
 *
 * The main Select component that wraps everything.
 * Radix UI provides the state management and accessibility.
 */
const Select = SelectPrimitive.Root;

/**
 * SelectGroup
 *
 * Groups related options together with an optional label.
 * Useful for categorizing options (e.g., "Fruits" vs "Vegetables").
 */
const SelectGroup = SelectPrimitive.Group;

/**
 * SelectValue
 *
 * Displays the selected value or placeholder text.
 * Used inside SelectTrigger.
 */
const SelectValue = SelectPrimitive.Value;

/**
 * SelectTrigger
 *
 * The button that opens the dropdown.
 *
 * Educational Notes:
 * - forwardRef allows parent components to access the button element
 * - Radix handles the aria-* attributes and keyboard events
 * - We style it to look like our Input component for consistency
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    className={cn(
      // Match Input component styling
      [
        "flex h-10 w-full items-center justify-between",
        "rounded-md border border-neutral-300 bg-white",
        "px-3 py-2",
        "text-base text-neutral-900",
        "ring-offset-white",
        // Placeholder styling
        "placeholder:text-neutral-500",
        // Focus styles
        "focus:ring-2 focus:outline-none",
        "focus:ring-primary-500 focus:ring-offset-2",
        // Disabled styles
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Remove default select appearance
        "[&>span]:line-clamp-1",
      ].join(" "),
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * SelectScrollUpButton
 *
 * Button shown when there are items above the viewport.
 * Radix UI shows/hides this automatically.
 */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    ref={ref}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/**
 * SelectScrollDownButton
 *
 * Button shown when there are items below the viewport.
 */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    ref={ref}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

/**
 * SelectContent
 *
 * The dropdown panel that contains the options.
 *
 * Educational Notes:
 * - Portal renders outside the DOM hierarchy to avoid z-index issues
 * - Position="popper" aligns with the trigger button
 * - Radix handles focus trap and keyboard navigation
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        [
          "relative z-50",
          "max-h-96 min-w-[8rem] overflow-hidden",
          "rounded-md border border-neutral-200 bg-white text-neutral-900",
          "shadow-md",
          // Animation
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
        ].join(" "),
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      ref={ref}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * SelectLabel
 *
 * Labels a group of options.
 * Used inside SelectGroup.
 */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    className={cn("py-1.5 pr-2 pl-8 text-sm font-semibold", className)}
    ref={ref}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 * SelectItem
 *
 * An individual selectable option.
 *
 * Educational Notes:
 * - Radix handles selection state and ARIA attributes
 * - Shows a check icon when selected
 * - Keyboard navigation (arrows, Enter, etc.) is automatic
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    className={cn(
      [
        "relative flex w-full cursor-default items-center select-none",
        "rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none",
        "focus:bg-neutral-100 focus:text-neutral-900",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      ].join(" "),
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * SelectSeparator
 *
 * A visual separator between groups of options.
 */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    className={cn("-mx-1 my-1 h-px bg-neutral-200", className)}
    ref={ref}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
