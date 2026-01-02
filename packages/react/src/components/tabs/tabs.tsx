import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@prism/core";

/**
 * Tabs component
 *
 * A set of layered sections of content (tab panels) that are displayed one at a time.
 *
 * Educational notes:
 * - Tabs follow the WAI-ARIA Tabs pattern for accessibility
 * - Supports keyboard navigation (Arrow keys, Home, End)
 * - Only one tab panel is visible at a time
 * - Can be controlled or uncontrolled (defaultValue vs value)
 * - Tabs are commonly used for organizing related content
 *
 * Usage:
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = TabsPrimitive.Root;

/**
 * TabsList component
 *
 * Container for tab triggers (the clickable tab buttons).
 *
 * Educational notes:
 * - Renders as a role="tablist" for screen readers
 * - Styled as a horizontal bar with rounded corners
 * - Background provides visual grouping of related tabs
 * - Uses flexbox for responsive tab layout
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * TabsTrigger component
 *
 * Individual tab button that controls which content panel is visible.
 *
 * Educational notes:
 * - Each trigger must have a unique 'value' prop
 * - The value matches the corresponding TabsContent
 * - Active tab gets highlighted with background and text color
 * - data-[state=active] attribute allows styling active state
 * - Transitions provide smooth visual feedback
 * - Focus ring ensures keyboard accessibility
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap ring-offset-white transition-all focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * TabsContent component
 *
 * The content panel associated with a tab trigger.
 *
 * Educational notes:
 * - Only the active content panel is visible (others are hidden)
 * - Each content must have a 'value' matching its trigger
 * - Content is hidden but still in DOM (preserves state)
 * - Focus ring ensures keyboard navigation works correctly
 * - Animations can be added via data-[state=active]
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={cn(
      "mt-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
