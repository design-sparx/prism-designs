/**
 * Shared TypeScript Types
 *
 * These types are used across multiple packages in the design system.
 */

/**
 * Common component sizes used throughout the design system.
 * Ensures consistency in component sizing across different components.
 */
export type Size = "sm" | "md" | "lg";

/**
 * Common component variants.
 * Most components will offer these basic style variants.
 */
export type Variant = "primary" | "secondary" | "outline" | "ghost";

/**
 * Color intent for semantic components (alerts, badges, etc.)
 */
export type ColorIntent = "success" | "error" | "warning" | "info";
