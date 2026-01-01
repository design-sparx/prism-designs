import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@prism/core";

/**
 * Checkbox component allows users to toggle between checked and unchecked states.
 *
 * Educational notes:
 * - Built on Radix UI's accessible checkbox primitive
 * - Supports controlled (checked) and uncontrolled (defaultChecked) modes
 * - The check icon appears when the checkbox is in the checked state
 * - We use Radix UI instead of native <input type="checkbox"/> for:
 *   - Better styling control (native checkboxes are hard to style)
 *   - Consistent cross-browser appearance
 *   - Built-in accessibility (ARIA attributes, keyboard navigation)
 *
 * Example controlled usage:
 * ```tsx
 * const [checked, setChecked] = useState(false);
 * <Checkbox checked={checked} onCheckedChange={setChecked} />
 * ```
 *
 * Example uncontrolled usage:
 * ```tsx
 * <Checkbox defaultChecked={true} />
 * ```
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    className={cn(
      // Base styles - size, shape, border
      "peer h-4 w-4 shrink-0 rounded-sm border border-neutral-300",
      // Focus state - visible outline for keyboard navigation
      "focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
      // Disabled state - reduced opacity, no pointer events
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Checked state - filled background with primary color
      "data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 data-[state=checked]:text-white",
      className,
    )}
    ref={ref}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {/* Check icon that appears when checkbox is checked */}
      <Check className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
