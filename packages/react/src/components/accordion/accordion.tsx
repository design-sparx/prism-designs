import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@prism/core";

/**
 * Accordion component
 *
 * A vertically stacked set of interactive headings that reveal associated content sections.
 *
 * Educational notes:
 * - Radix Accordion supports both single and multiple item expansion
 * - 'type="single"' allows only one item open at a time (exclusive)
 * - 'type="multiple"' allows multiple items to be open simultaneously
 * - 'collapsible' prop (single mode) allows the open item to be collapsed
 * - Built with proper ARIA attributes for accessibility
 *
 * Usage:
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
const Accordion = AccordionPrimitive.Root;

/**
 * AccordionItem component
 *
 * Wraps a single accordion section (trigger + content).
 *
 * Educational notes:
 * - Each item must have a unique 'value' prop for state management
 * - The value is used to control which items are open/closed
 * - Items are styled with a bottom border to separate sections
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

/**
 * AccordionTrigger component
 *
 * The clickable header that expands/collapses the accordion content.
 *
 * Educational notes:
 * - Renders as a button for keyboard accessibility
 * - Icon rotates 180deg when expanded (data-[state=open])
 * - Full width with left-aligned text and right-aligned icon
 * - Hover and focus states improve discoverability
 * - ARIA attributes are handled automatically by Radix
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/**
 * AccordionContent component
 *
 * The collapsible content section of an accordion item.
 *
 * Educational notes:
 * - Uses CSS animations for smooth expand/collapse
 * - data-[state=open] and data-[state=closed] control animations
 * - Padding and overflow are carefully managed for smooth transitions
 * - Content is hidden when collapsed (accessibility best practice)
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all"
    {...props}
  >
    <div className={cn("pt-0 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
