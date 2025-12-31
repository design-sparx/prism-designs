/**
 * Border Radius Tokens
 *
 * Why use border radius tokens?
 * - Consistent rounded corners across components
 * - Defines the visual style of your design system
 * - Easy to update globally (e.g., sharp → rounded design)
 * - Common values prevent arbitrary radius choices
 *
 * Educational Note:
 * - 'sm' for subtle rounding (badges, tags)
 * - 'md' for standard UI elements (buttons, inputs)
 * - 'lg' for cards and larger containers
 * - 'full' for circular elements (avatars, pills)
 */

export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px - subtle rounding
  md: "0.375rem", // 6px - standard elements
  lg: "0.5rem", // 8px - buttons, inputs, cards
  xl: "0.75rem", // 12px - large cards
  "2xl": "1rem", // 16px - extra large containers
  full: "9999px", // circular/pill shapes
} as const;

export type BorderRadiusToken = typeof borderRadius;
