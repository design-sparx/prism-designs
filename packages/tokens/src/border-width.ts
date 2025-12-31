/**
 * Border Width Tokens
 *
 * Why use border width tokens?
 * - Consistent border thickness across components
 * - Defines the visual weight of outlines
 * - Easy to adjust globally (subtle → bold borders)
 * - Common values prevent arbitrary widths
 *
 * Educational Note:
 * - Default (1px) for most UI elements
 * - '2' for emphasized borders (outline buttons, focus rings)
 * - '4' for very prominent borders (rarely used)
 * - '0' to remove borders entirely
 */

export const borderWidth = {
  0: "0",
  DEFAULT: "1px", // Standard border width
  2: "2px", // Emphasized borders (outline buttons)
  4: "4px", // Strong borders (focus rings)
  8: "8px", // Very thick borders (decorative)
} as const;

export type BorderWidthToken = typeof borderWidth;
