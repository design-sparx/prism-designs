/**
 * Utility Functions
 *
 * These are framework-agnostic helpers that can be used across the design system.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind class merging.
 *
 * This utility combines clsx (for conditional classes) with tailwind-merge
 * (to properly merge Tailwind utility classes and avoid conflicts).
 *
 * @example
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4' (px-4 overrides px-2)
 * cn('btn', isActive && 'btn-active') // => 'btn btn-active'
 *
 * Why tailwind-merge?
 * - Prevents class conflicts (e.g., 'text-sm text-lg' → 'text-lg')
 * - Properly handles Tailwind's specificity
 * - Essential for variant composition
 *
 * @param inputs - Class values (strings, objects, arrays, booleans)
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
