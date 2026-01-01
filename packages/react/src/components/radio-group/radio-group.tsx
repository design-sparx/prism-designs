import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@prism/core";

/**
 * RadioGroup component allows users to select a single option from a set of choices.
 *
 * Educational notes:
 * - Built on Radix UI's accessible radio group primitive
 * - Supports controlled (value) and uncontrolled (defaultValue) modes
 * - Only one option can be selected at a time (mutually exclusive)
 * - We use Radix UI instead of native <input type="radio"/> for:
 *   - Better styling control (native radio buttons are hard to style)
 *   - Consistent cross-browser appearance
 *   - Built-in accessibility (ARIA attributes, keyboard navigation)
 *
 * Example controlled usage:
 * ```tsx
 * const [value, setValue] = useState('option1');
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <RadioGroupItem value="option1" id="r1" />
 *   <RadioGroupItem value="option2" id="r2" />
 * </RadioGroup>
 * ```
 *
 * Example uncontrolled usage:
 * ```tsx
 * <RadioGroup defaultValue="option1">
 *   <RadioGroupItem value="option1" id="r1" />
 *   <RadioGroupItem value="option2" id="r2" />
 * </RadioGroup>
 * ```
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * RadioGroupItem represents a single radio button option.
 *
 * Educational notes:
 * - Must be used within a RadioGroup
 * - The 'value' prop identifies this option
 * - Pair with a Label for better accessibility
 * - The circle indicator appears when selected
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        // Base styles - size, shape, border
        "aspect-square h-4 w-4 rounded-full border border-neutral-300",
        // Focus state - visible outline for keyboard navigation
        "focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        // Disabled state - reduced opacity, no pointer events
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Selected state - border changes to primary color
        "data-[state=checked]:border-primary-500",
        className,
      )}
      ref={ref}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* Circle indicator that appears when radio is selected */}
        <Circle className="text-primary-500 h-2.5 w-2.5 fill-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
