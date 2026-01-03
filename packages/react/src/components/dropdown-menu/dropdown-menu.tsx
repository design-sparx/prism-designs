import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@prism/core";

/**
 * Dropdown Menu Component
 *
 * A menu component that displays when triggered, typically used for navigation or actions.
 * Built on Radix UI's DropdownMenu primitive for accessibility and keyboard navigation.
 *
 * Educational Notes:
 * - Uses compound component pattern for flexibility
 * - Implements full keyboard navigation (Arrow keys, Enter, Escape)
 * - Supports nested submenus
 * - Properly handles focus management
 * - Includes separators, labels, and checkable items
 */

// Root component - manages open state
const DropdownMenu = DropdownMenuPrimitive.Root;

// Trigger - button that opens the menu
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

// Group - groups related menu items
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

// Portal - renders menu in a portal for proper stacking
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

// Sub - creates a submenu
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

// RadioGroup - for radio-style menu items
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// SubTrigger - trigger for opening a submenu
const dropdownMenuSubTriggerVariants = cva(
  "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-neutral-100 data-[state=open]:bg-neutral-100",
);

export interface DropdownMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<
      typeof DropdownMenuPrimitive.SubTrigger
    >,
    VariantProps<typeof dropdownMenuSubTriggerVariants> {
  inset?: boolean;
}

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(dropdownMenuSubTriggerVariants(), inset && "pl-8", className)}
    ref={ref}
    {...props}
  >
    {children}
    <svg
      className="ml-auto"
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </DropdownMenuPrimitive.SubTrigger>
));

DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

// SubContent - content of a submenu
const dropdownMenuSubContentVariants = cva(
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
);

export interface DropdownMenuSubContentProps
  extends React.ComponentPropsWithoutRef<
      typeof DropdownMenuPrimitive.SubContent
    >,
    VariantProps<typeof dropdownMenuSubContentVariants> {}

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(dropdownMenuSubContentVariants(), className)}
    ref={ref}
    {...props}
  />
));

DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

// Content - main menu content
const dropdownMenuContentVariants = cva(
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
);

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
    VariantProps<typeof dropdownMenuContentVariants> {}

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={cn(dropdownMenuContentVariants(), className)}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// Item - individual menu item
const dropdownMenuItemVariants = cva(
  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
);

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
    VariantProps<typeof dropdownMenuItemVariants> {
  inset?: boolean;
}

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    className={cn(dropdownMenuItemVariants(), inset && "pl-8", className)}
    ref={ref}
    {...props}
  />
));

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// CheckboxItem - menu item with checkbox
const dropdownMenuCheckboxItemVariants = cva(
  "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
);

export interface DropdownMenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<
      typeof DropdownMenuPrimitive.CheckboxItem
    >,
    VariantProps<typeof dropdownMenuCheckboxItemVariants> {}

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    checked={checked}
    className={cn(dropdownMenuCheckboxItemVariants(), className)}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <svg
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));

DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

// RadioItem - menu item with radio button
const dropdownMenuRadioItemVariants = cva(
  "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
);

export interface DropdownMenuRadioItemProps
  extends React.ComponentPropsWithoutRef<
      typeof DropdownMenuPrimitive.RadioItem
    >,
    VariantProps<typeof dropdownMenuRadioItemVariants> {}

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(dropdownMenuRadioItemVariants(), className)}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <svg
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" fill="currentColor" r="4" />
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

// Label - non-interactive label for menu sections
const dropdownMenuLabelVariants = cva("px-2 py-1.5 text-sm font-semibold");

export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>,
    VariantProps<typeof dropdownMenuLabelVariants> {
  inset?: boolean;
}

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    className={cn(dropdownMenuLabelVariants(), inset && "pl-8", className)}
    ref={ref}
    {...props}
  />
));

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

// Separator - visual separator between menu items
const dropdownMenuSeparatorVariants = cva("-mx-1 my-1 h-px bg-neutral-200");

export interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<
      typeof DropdownMenuPrimitive.Separator
    >,
    VariantProps<typeof dropdownMenuSeparatorVariants> {}

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    className={cn(dropdownMenuSeparatorVariants(), className)}
    ref={ref}
    {...props}
  />
));

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// Shortcut - displays keyboard shortcut hint
const dropdownMenuShortcutVariants = cva(
  "ml-auto text-xs tracking-widest opacity-60",
);

export type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

const DropdownMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  DropdownMenuShortcutProps
>(({ className, ...props }, ref) => {
  return (
    <span
      className={cn(dropdownMenuShortcutVariants(), className)}
      ref={ref}
      {...props}
    />
  );
});

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  dropdownMenuCheckboxItemVariants,
  DropdownMenuContent,
  dropdownMenuContentVariants,
  DropdownMenuGroup,
  DropdownMenuItem,
  dropdownMenuItemVariants,
  DropdownMenuLabel,
  dropdownMenuLabelVariants,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  dropdownMenuRadioItemVariants,
  DropdownMenuSeparator,
  dropdownMenuSeparatorVariants,
  DropdownMenuShortcut,
  dropdownMenuShortcutVariants,
  DropdownMenuSub,
  DropdownMenuSubContent,
  dropdownMenuSubContentVariants,
  DropdownMenuSubTrigger,
  dropdownMenuSubTriggerVariants,
  DropdownMenuTrigger,
};
