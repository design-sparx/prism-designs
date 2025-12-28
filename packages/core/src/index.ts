/**
 * Prism Core
 *
 * Core utilities and types shared across the design system.
 * This package contains framework-agnostic utilities that can be used
 * by any package in the monorepo.
 *
 * What goes in core?
 * - Utility functions (string manipulation, class name builders, etc.)
 * - Shared TypeScript types and interfaces
 * - Constants and enums
 * - Validators and transformers
 *
 * What doesn't go in core?
 * - Framework-specific code (React hooks, Vue composables)
 * - Component implementations
 * - Styling or CSS
 */

export * from "./utils";
export * from "./types";
