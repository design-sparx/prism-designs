/**
 * Utility Functions
 *
 * These are framework-agnostic helpers that can be used across the design system.
 */

/**
 * Combines class names, filtering out falsy values.
 * Useful for conditionally applying CSS classes.
 *
 * @example
 * cn('btn', isActive && 'btn-active', 'btn-primary')
 * // => "btn btn-active btn-primary"
 *
 * @param classes - Array of class names (strings, booleans, undefined, null)
 * @returns Combined class string
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
